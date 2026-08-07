/**
 * lcn254 — Unified Payment + AI Proxy Worker
 * Cloudflare Worker
 *
 * Handles:
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
  const shortcode   = env.MPESA_SHORTCODE || "174379";
  const passkey     = env.MPESA_PASSKEY   || "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
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
  const { prompt, paymentToken, checkoutRequestId, stripePaymentIntentId } = await request.json();

  // Verify payment — accept either a verified M-Pesa checkoutRequestId,
  // a verified Stripe paymentIntentId, or the PAYMENT_SECRET (for PayPal/manual)
  let paymentVerified = false;

  if (paymentToken && paymentToken === env.PAYMENT_SECRET) {
    paymentVerified = true; // PayPal or manual override
  }

  if (!paymentVerified && checkoutRequestId && env.PAYMENTS) {
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
  return new Response(res.body, { status: res.status, headers: newHeaders });
}
