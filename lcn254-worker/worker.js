/**
 * lcn254 — Unified Payment + AI Proxy Worker
 * Cloudflare Worker
 *
 * Handles:
 *   POST /intake           — Project intake questionnaire → email to LCN254 inbox (Resend)
 *   POST /generate         — AI document generation (Gemini) after payment verified
 *   POST /mpesa/stkpush    — Initiate M-Pesa STK Push
 *   POST /mpesa/callback   — Safaricom payment confirmation webhook
 *   POST /stripe/verify    — Stripe payment verification
 *   GET  /payment/status   — Poll payment status by checkoutRequestId
 *
 * Secrets (set in Cloudflare dashboard → Settings → Variables and Secrets):
 *   GEMINI_API_KEY
 *   MPESA_CONSUMER_KEY
 *   MPESA_CONSUMER_SECRET
 *   MPESA_SHORTCODE          (174379 for sandbox)
 *   MPESA_PASSKEY            (sandbox passkey or production passkey)
 *   MPESA_CALLBACK_URL       (https://lcn254-api-proxy.levnyan2018.workers.dev/mpesa/callback)
 *   STRIPE_SECRET_KEY        (sk_live_... or sk_test_...)
 *   STRIPE_WEBHOOK_SECRET    (whsec_...)
 *   RESEND_API_KEY           (re_... — used by POST /intake to send the enquiry email)
 *   ALLOWED_ORIGIN           (https://lcn254.site)
 *
 * KV namespace binding: PAYMENTS (stores payment status, bind in wrangler.toml)
 */

// ─── Sandbox vs Production toggle ──────────────────────────────────────────
const MPESA_BASE = "https://sandbox.safaricom.co.ke"; // swap to https://api.safaricom.co.ke for production

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigin = env.ALLOWED_ORIGIN || "https://lcn254.site";
    const url = new URL(request.url);

    // ── CORS preflight ────────────────────────────────────────────────────
    if (request.method === "OPTIONS") {
      return cors(null, 204, allowedOrigin);
    }

    // ── Router ────────────────────────────────────────────────────────────
    try {
      // M-Pesa callback comes from Safaricom (no CORS origin check needed)
      if (request.method === "POST" && url.pathname === "/mpesa/callback") {
        return await handleMpesaCallback(request, env);
      }

      // All other routes require correct origin
      if (origin && !origin.startsWith(allowedOrigin)) {
        return cors(json({ error: "Forbidden" }), 403, allowedOrigin);
      }

      if (request.method === "POST" && url.pathname === "/mpesa/stkpush") {
        return cors(await handleStkPush(request, env), 200, allowedOrigin);
      }

      if (request.method === "GET" && url.pathname === "/payment/status") {
        return cors(await handlePaymentStatus(request, env), 200, allowedOrigin);
      }

      if (request.method === "POST" && url.pathname === "/stripe/verify") {
        return cors(await handleStripeVerify(request, env), 200, allowedOrigin);
      }

      if (request.method === "POST" && url.pathname === "/intake") {
        return cors(await handleIntake(request, env), 200, allowedOrigin);
      }

      if (request.method === "POST" && url.pathname === "/generate") {
        return cors(await handleGenerate(request, env), 200, allowedOrigin);
      }

      return cors(json({ error: "Not found" }), 404, allowedOrigin);

    } catch (err) {
      console.error("Worker error:", err);
      return cors(json({ error: "Internal server error", detail: err.message }), 500, allowedOrigin);
    }
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// M-PESA STK PUSH
// ─────────────────────────────────────────────────────────────────────────────
async function handleStkPush(request, env) {
  const { phone, amount, reference, docId } = await request.json();

  if (!phone || !amount || !reference) {
    return json({ error: "Missing phone, amount or reference" }, 400);
  }

  // 1. Get OAuth token
  const token = await getMpesaToken(env);

  // 2. Build STK push payload
  const shortcode   = env.MPESA_SHORTCODE || "174379"; // 174379 is Safaricom's public sandbox shortcode, not a secret
  if (!env.MPESA_PASSKEY) {
    throw new Error("MPESA_PASSKEY is not configured. Set it via `wrangler secret put MPESA_PASSKEY` — refusing to fall back to a hardcoded value.");
  }
  const passkey     = env.MPESA_PASSKEY;
  const timestamp   = getTimestamp();
  const password    = btoa(`${shortcode}${passkey}${timestamp}`);
  const callbackUrl = env.MPESA_CALLBACK_URL || "https://lcn254-api-proxy.levnyan2018.workers.dev/mpesa/callback";

  // Sanitize phone — ensure format 2547XXXXXXXX
  const cleanPhone = phone.replace(/\D/g, "").replace(/^0/, "254").replace(/^\+/, "");

  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Math.ceil(Number(amount)),
    PartyA: cleanPhone,
    PartyB: shortcode,
    PhoneNumber: cleanPhone,
    CallBackURL: callbackUrl,
    AccountReference: reference.slice(0, 12),
    TransactionDesc: `lcn254 ${reference}`,
  };

  const stkRes = await fetch(`${MPESA_BASE}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const stkData = await stkRes.json();

  if (stkData.ResponseCode !== "0") {
    return json({ error: stkData.ResponseDescription || "STK push failed" }, 502);
  }

  // 3. Store pending status in KV so frontend can poll it
  if (env.PAYMENTS) {
    await env.PAYMENTS.put(
      `mpesa:${stkData.CheckoutRequestID}`,
      JSON.stringify({ status: "pending", docId, reference, ts: Date.now() }),
      { expirationTtl: 600 } // 10 min expiry
    );
  }

  return json({
    success: true,
    checkoutRequestId: stkData.CheckoutRequestID,
    message: "STK push sent. Enter your M-Pesa PIN on your phone.",
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// M-PESA CALLBACK (Safaricom calls this after customer pays / cancels)
// ─────────────────────────────────────────────────────────────────────────────
async function handleMpesaCallback(request, env) {
  const body = await request.json();
  const stk  = body?.Body?.stkCallback;

  if (!stk) return new Response("OK", { status: 200 });

  const checkoutId = stk.CheckoutRequestID;
  const resultCode = stk.ResultCode; // 0 = success

  if (env.PAYMENTS) {
    const existing = await env.PAYMENTS.get(`mpesa:${checkoutId}`);
    const record   = existing ? JSON.parse(existing) : {};

    await env.PAYMENTS.put(
      `mpesa:${checkoutId}`,
      JSON.stringify({
        ...record,
        status: resultCode === 0 ? "paid" : "failed",
        resultCode,
        resultDesc: stk.ResultDesc,
        // Extract M-Pesa receipt number if payment succeeded
        receiptNumber: stk.CallbackMetadata?.Item?.find(i => i.Name === "MpesaReceiptNumber")?.Value || null,
        paidAt: Date.now(),
      }),
      { expirationTtl: 3600 }
    );
  }

  return new Response("OK", { status: 200 });
}

// ─────────────────────────────────────────────────────────────────────────────
// PAYMENT STATUS POLL (frontend polls this every 3s waiting for callback)
// ─────────────────────────────────────────────────────────────────────────────
async function handlePaymentStatus(request, env) {
  const url = new URL(request.url);
  const checkoutId = url.searchParams.get("id");

  if (!checkoutId) return json({ error: "Missing id" }, 400);

  if (!env.PAYMENTS) {
    // KV not bound — for testing without KV, return pending
    return json({ status: "pending" });
  }

  const record = await env.PAYMENTS.get(`mpesa:${checkoutId}`);
  if (!record) return json({ status: "not_found" });

  const data = JSON.parse(record);
  return json({ status: data.status, receiptNumber: data.receiptNumber || null });
}

// ─────────────────────────────────────────────────────────────────────────────
// STRIPE VERIFY (client sends payment intent id; we verify with Stripe API)
// ─────────────────────────────────────────────────────────────────────────────
async function handleStripeVerify(request, env) {
  const { paymentIntentId } = await request.json();
  if (!paymentIntentId) return json({ error: "Missing paymentIntentId" }, 400);

  const stripeRes = await fetch(
    `https://api.stripe.com/v1/payment_intents/${paymentIntentId}`,
    {
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      },
    }
  );

  if (!stripeRes.ok) return json({ error: "Stripe verification failed" }, 502);

  const intent = await stripeRes.json();
  const paid   = intent.status === "succeeded";

  if (paid && env.PAYMENTS) {
    await env.PAYMENTS.put(
      `stripe:${paymentIntentId}`,
      JSON.stringify({ status: "paid", paidAt: Date.now() }),
      { expirationTtl: 3600 }
    );
  }

  return json({ paid, status: intent.status });
}

// ─────────────────────────────────────────────────────────────────────────────
// AI DOCUMENT GENERATION (Gemini — only after payment verified)
// ─────────────────────────────────────────────────────────────────────────────
async function handleGenerate(request, env) {
  const { prompt, checkoutRequestId, stripePaymentIntentId } = await request.json();

  // Verify payment — only two paths are trusted, and both are verified
  // server-side against a source of truth the client cannot forge:
  //   1. M-Pesa: Safaricom's callback webhook sets status="paid" in KV
  //   2. Stripe: this worker calls Stripe's API directly to confirm the
  //      payment intent before ever writing status="paid" to KV
  // There is deliberately no client-supplied "trust me, I paid" token —
  // any such token is exploitable the moment it exists in the public
  // client bundle, regardless of what string it is.
  let paymentVerified = false;

  if (checkoutRequestId && env.PAYMENTS) {
    const record = await env.PAYMENTS.get(`mpesa:${checkoutRequestId}`);
    if (record) {
      const data = JSON.parse(record);
      paymentVerified = data.status === "paid";
    }
  }

  if (!paymentVerified && stripePaymentIntentId && env.PAYMENTS) {
    const record = await env.PAYMENTS.get(`stripe:${stripePaymentIntentId}`);
    if (record) {
      const data = JSON.parse(record);
      paymentVerified = data.status === "paid";
    }
  }

  if (!paymentVerified) {
    return json({ error: "Payment required", code: "PAYMENT_REQUIRED" }, 402);
  }

  if (!prompt || typeof prompt !== "string" || prompt.length > 8000) {
    return json({ error: "Invalid prompt" }, 400);
  }

  // Call Gemini
  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 4096 },
      }),
    }
  );

  if (!geminiRes.ok) {
    const err = await geminiRes.text();
    console.error("Gemini error:", err);
    return json({ error: "AI service error" }, 502);
  }

  const data = await geminiRes.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return json({ result: text });
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT INTAKE (questionnaire on /contact → email to the LCN254 inbox)
//
// Validates the submission server-side (never trust the browser), then sends it
// as a plain-text email through Resend. Nothing is stored: the email in the
// inbox is the only record (this is what the Privacy Policy says).
//
// Config:  secret  RESEND_API_KEY
//          vars    INTAKE_TO   (default contact@lcn254.site)
//                  INTAKE_FROM (default "LCN254 Website <intake@lcn254.site>";
//                               the domain must be verified in Resend)
// ─────────────────────────────────────────────────────────────────────────────
const INTAKE_LIMITS = {
  name: 120, email: 254, phone: 40, organisation: 160, contactPref: 30,
  service: 80, serviceName: 120, projectType: 80, scope: 4000, size: 60, existingSite: 300,
  budget: 60, timeline: 80, deadline: 20,
  platform: 120, domain: 60, hosting: 60, content: 60, techNotes: 2000,
};
const INTAKE_LIST_LIMITS = { goals: 12, integrations: 20 };

// Strip CR/LF (header injection) and control chars from single-line values.
function oneLine(v, max) {
  return String(v ?? "").replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max);
}
// Multi-line text: keep newlines, drop other control chars.
function multiLine(v, max) {
  return String(v ?? "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim().slice(0, max);
}

function parseIntake(raw) {
  const d = {};
  const multi = new Set(["scope", "techNotes"]);
  for (const [k, max] of Object.entries(INTAKE_LIMITS)) {
    d[k] = multi.has(k) ? multiLine(raw?.[k], max) : oneLine(raw?.[k], max);
  }
  for (const [k, max] of Object.entries(INTAKE_LIST_LIMITS)) {
    d[k] = Array.isArray(raw?.[k]) ? raw[k].slice(0, max).map((x) => oneLine(x, 80)).filter(Boolean) : [];
  }
  d.consent = raw?.consent === true;
  return d;
}

function validateIntake(d) {
  const errors = [];
  if (!d.name) errors.push("name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) errors.push("email");
  if (!d.service) errors.push("service");
  if (d.scope.length < 30) errors.push("scope");
  if (!d.budget) errors.push("budget");
  if (!d.timeline) errors.push("timeline");
  if (!d.consent) errors.push("consent");
  return errors;
}

function buildIntakeEmail(d, meta = {}) {
  const row = (label, v) => `${label}: ${Array.isArray(v) ? (v.join(", ") || "-") : (v || "-")}`;
  const text = [
    "NEW PROJECT ENQUIRY — lcn254.site",
    "",
    "ABOUT",
    row("Name", d.name), row("Email", d.email), row("Phone / WhatsApp", d.phone),
    row("Organisation", d.organisation), row("Preferred contact", d.contactPref),
    "",
    "PROJECT",
    row("Service", d.serviceName || d.service), row("Project type", d.projectType),
    row("Goals", d.goals), row("Expected size", d.size), row("Existing site", d.existingSite),
    "Scope:", d.scope,
    "",
    "BUDGET & TIMELINE",
    row("Budget", d.budget), row("Target launch", d.timeline), row("Hard deadline", d.deadline),
    "",
    "TECH REQUIREMENTS",
    row("Platform", d.platform), row("Integrations", d.integrations),
    row("Domain", d.domain), row("Hosting", d.hosting), row("Content", d.content),
    "Other notes:", d.techNotes || "-",
    "",
    "CONSENT",
    `Consent to process given on form: yes (${meta.receivedAt || new Date().toISOString()})`,
  ].join("\n");
  return {
    subject: `New project enquiry — ${d.name} — ${d.serviceName || d.service}`.slice(0, 200),
    text,
  };
}

async function handleIntake(request, env) {
  let raw;
  try { raw = await request.json(); } catch { return json({ error: "Invalid request body" }, 400); }

  // Honeypot: a real visitor never fills this hidden field. Pretend success so
  // bots get no signal, but send nothing.
  if (typeof raw?.website === "string" && raw.website.trim() !== "") {
    return json({ success: true });
  }

  const d = parseIntake(raw);
  const bad = validateIntake(d);
  if (bad.length) return json({ error: `Missing or invalid: ${bad.join(", ")}` }, 400);

  if (!env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return json({ error: "Enquiry service is not configured yet" }, 503);
  }

  const { subject, text } = buildIntakeEmail(d, { receivedAt: new Date().toISOString() });
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.INTAKE_FROM || "LCN254 Website <intake@lcn254.site>",
      to: [env.INTAKE_TO || "contact@lcn254.site"],
      reply_to: d.email,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    console.error("Resend error:", res.status, (await res.text()).slice(0, 300));
    return json({ error: "Could not deliver your enquiry. Please try again or email us directly." }, 502);
  }
  return json({ success: true });
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
async function getMpesaToken(env) {
  const credentials = btoa(`${env.MPESA_CONSUMER_KEY}:${env.MPESA_CONSUMER_SECRET}`);
  const res = await fetch(`${MPESA_BASE}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${credentials}` },
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Failed to get M-Pesa token");
  return data.access_token;
}

function getTimestamp() {
  return new Date().toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function cors(response, status, allowedOrigin) {
  const headers = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (!response) return new Response(null, { status, headers });
  const res = response instanceof Response ? response : new Response(response.body, response);
  const newHeaders = new Headers(res.headers);
  Object.entries(headers).forEach(([k, v]) => newHeaders.set(k, v));
  // json() defaults to 200, so callers pass the real status separately for
  // errors (e.g. cors(json({error}), 403, origin)). Honour it; otherwise the
  // client sees HTTP 200 for a 403/404/500 and treats the failure as success.
  return new Response(res.body, { status: status !== 200 ? status : res.status, headers: newHeaders });
}
