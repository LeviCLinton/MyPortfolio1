/**
 * lcn254 — Secure Anthropic API Proxy
 * Cloudflare Worker
 *
 * Sits between the browser and api.anthropic.com so the Anthropic API key
 * never leaves the server. Also enforces CORS, basic rate limiting, and
 * a payment-verification hook you can wire to Stripe/M-Pesa webhooks.
 *
 * Environment variables (set in Cloudflare dashboard or wrangler.toml secrets):
 *   ANTHROPIC_API_KEY   — your Anthropic secret key
 *   ALLOWED_ORIGIN      — your site URL, e.g. https://lcn254.site
 *   PAYMENT_SECRET      — a random string you generate; sent by frontend after payment
 */

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigin = env.ALLOWED_ORIGIN || "https://lcn254.site";

    // ── CORS preflight ──────────────────────────────────────────────────────
    if (request.method === "OPTIONS") {
      return corsResponse(null, 204, allowedOrigin);
    }

    // ── Only accept POST to /generate ──────────────────────────────────────
    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/generate") {
      return corsResponse(JSON.stringify({ error: "Not found" }), 404, allowedOrigin);
    }

    // ── CORS origin check ───────────────────────────────────────────────────
    if (!origin.startsWith(allowedOrigin)) {
      return corsResponse(JSON.stringify({ error: "Forbidden" }), 403, allowedOrigin);
    }

    // ── Parse body ──────────────────────────────────────────────────────────
    let body;
    try {
      body = await request.json();
    } catch {
      return corsResponse(JSON.stringify({ error: "Invalid JSON" }), 400, allowedOrigin);
    }

    const { prompt, paymentToken } = body;

    // ── Payment verification ────────────────────────────────────────────────
    // Replace this with real Stripe/M-Pesa verification in production.
    // The frontend should send a short-lived token it received from your
    // payment provider's webhook after a successful charge.
    if (!paymentToken || paymentToken !== env.PAYMENT_SECRET) {
      return corsResponse(
        JSON.stringify({ error: "Payment required", code: "PAYMENT_REQUIRED" }),
        402,
        allowedOrigin
      );
    }

    if (!prompt || typeof prompt !== "string" || prompt.length > 8000) {
      return corsResponse(JSON.stringify({ error: "Invalid prompt" }), 400, allowedOrigin);
    }

    // ── Rate limiting (Cloudflare KV — optional but recommended) ───────────
    // Uncomment once you've bound a KV namespace called RATE_LIMIT in wrangler.toml
    /*
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const rateLimitKey = `rl:${ip}`;
    const hits = parseInt(await env.RATE_LIMIT.get(rateLimitKey) || "0");
    if (hits >= 20) {
      return corsResponse(JSON.stringify({ error: "Rate limit exceeded" }), 429, allowedOrigin);
    }
    await env.RATE_LIMIT.put(rateLimitKey, String(hits + 1), { expirationTtl: 3600 });
    */

    // ── Call Anthropic ──────────────────────────────────────────────────────
    try {
      const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 4000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!anthropicRes.ok) {
        const errText = await anthropicRes.text();
        console.error("Anthropic error:", anthropicRes.status, errText);
        return corsResponse(
          JSON.stringify({ error: "AI service error", status: anthropicRes.status }),
          502,
          allowedOrigin
        );
      }

      const data = await anthropicRes.json();
      const text = data.content?.find(b => b.type === "text")?.text || "";

      return corsResponse(JSON.stringify({ result: text }), 200, allowedOrigin);

    } catch (err) {
      console.error("Worker error:", err);
      return corsResponse(JSON.stringify({ error: "Internal server error" }), 500, allowedOrigin);
    }
  },
};

// ── Helper ──────────────────────────────────────────────────────────────────
function corsResponse(body, status, allowedOrigin) {
  const headers = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": body ? "application/json" : "text/plain",
  };
  return new Response(body, { status, headers });
}
