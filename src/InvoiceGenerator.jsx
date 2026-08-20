import { useState, useCallback } from "react";
import {
  FileText, Receipt, ClipboardList, Calculator, ShoppingCart,
  CreditCard, AlertCircle, Truck, FileMinus, BarChart3,
  Wallet, Plus, Trash2, Sparkles, Download, ChevronDown,
  ArrowLeft, CheckCircle, Lock
} from "lucide-react";

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const BRAND = { teal: "#1AA3B0", pink: "#F0409A" };

const DOC_TYPES = [
  { id: "invoice",           label: "Invoice",                  icon: FileText,      desc: "Formal payment request" },
  { id: "receipt",           label: "Receipt",                  icon: Receipt,       desc: "Proof of completed payment" },
  { id: "quote",             label: "Quote",                    icon: ClipboardList, desc: "Proposed pricing for services" },
  { id: "estimate",          label: "Estimate",                 icon: Calculator,    desc: "Anticipated project cost" },
  { id: "purchase_order",    label: "Purchase Order",           icon: ShoppingCart,  desc: "Official buyer goods request" },
  { id: "credit_note",       label: "Credit Note",              icon: CreditCard,    desc: "Seller-issued buyer refund" },
  { id: "debit_note",        label: "Debit Note",               icon: AlertCircle,   desc: "Formal buyer debt reminder" },
  { id: "delivery_note",     label: "Delivery Note",            icon: Truck,         desc: "Proof of goods delivery" },
  { id: "proforma_invoice",  label: "Pro Forma Invoice",        icon: FileMinus,     desc: "Preliminary dispatch valuation" },
  { id: "statement",         label: "Statement of Account",     icon: BarChart3,     desc: "Summary of customer transactions" },
  { id: "expense_report",    label: "Expense Report",           icon: Wallet,        desc: "Employee spending reimbursement" },
];

const CURRENCIES = ["KES","USD","EUR","GBP","ZAR","TZS","UGX"];

const emptyItem = () => ({ description: "", quantity: 1, unit_price: 0, discount: 0 });

// ─────────────────────────────────────────────
// Utility
// ─────────────────────────────────────────────
function fmt(val, currency) {
  return `${currency} ${Number(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function calcTotals(items, taxRate, globalDiscount, deposit) {
  const subtotal = items.reduce((s, i) => {
    const line = i.quantity * i.unit_price;
    const disc = line * (Number(i.discount) / 100);
    return s + line - disc;
  }, 0);
  const globalDisc = subtotal * (Number(globalDiscount) / 100);
  const taxable = subtotal - globalDisc;
  const tax = taxable * (Number(taxRate) / 100);
  const grand = taxable + tax;
  const balance = grand - Number(deposit);
  return { subtotal, globalDisc, taxable, tax, grand, balance };
}

// ─────────────────────────────────────────────
// Worker URL — your Cloudflare Worker endpoint.
// After deploying the worker, paste its URL here.
// e.g. "https://lcn254-api-proxy.YOUR-SUBDOMAIN.workers.dev"
// ─────────────────────────────────────────────
const WORKER_URL = "https://lcn254-api-proxy.levnyan2018.workers.dev";

// ─────────────────────────────────────────────
// AI generation — calls the secure worker proxy, NOT Anthropic directly.
// The paymentToken is issued by your payment provider after a successful
// charge and verified server-side in the worker.
// ─────────────────────────────────────────────
async function generateWithAI(docType, formData, items, totals, paymentToken, checkoutRequestId = null) {
  const docLabel = DOC_TYPES.find(d => d.id === docType)?.label || "Document";

  const prompt = `You are a professional financial document writer. Generate a complete, professional ${docLabel} in clean HTML format suitable for PDF rendering.

Document Details:
- Type: ${docLabel}
- Number: ${formData.docNumber}
- Issue Date: ${formData.issueDate}
- Due Date: ${formData.dueDate || "N/A"}
- Currency: ${formData.currency}

Issuer (From):
- Business Name: ${formData.issuerName}
- Address: ${formData.issuerAddress}
- Email: ${formData.issuerEmail}
- Tax/VAT ID: ${formData.issuerTaxId || "N/A"}
- Payment Info: ${formData.paymentInfo || "N/A"}

Client (To):
- Name: ${formData.clientName}
- Address: ${formData.clientAddress}
- Email: ${formData.clientEmail}
- Tax/VAT ID: ${formData.clientTaxId || "N/A"}

Line Items:
${items.map((item, i) => `${i + 1}. ${item.description} — Qty: ${item.quantity} × ${formData.currency} ${item.unit_price} (${item.discount}% disc)`).join("\n")}

Financials:
- Subtotal: ${fmt(totals.subtotal, formData.currency)}
- Discount: ${fmt(totals.globalDisc, formData.currency)}
- Tax (${formData.taxRate}%): ${fmt(totals.tax, formData.currency)}
- Grand Total: ${fmt(totals.grand, formData.currency)}
- Deposit Paid: ${fmt(formData.deposit || 0, formData.currency)}
- Balance Due: ${fmt(totals.balance, formData.currency)}

Notes: ${formData.notes || "None"}
Payment Terms: ${formData.paymentTerms || "None"}

Generate a professional HTML document with:
1. Clean, minimal design with a color accent of #1AA3B0 (teal)
2. Clear header with document type prominently displayed
3. Issuer and client details in a two-column layout
4. A well-formatted line items table with columns: Description, Qty, Unit Price, Discount, Amount
5. Financial summary section with all totals
6. Payment terms and notes section at the bottom
7. Professional footer with "Generated by LCN254.site"
8. Use only inline CSS — no external stylesheets, no JavaScript
9. Use @page CSS for proper PDF margins
10. Return ONLY the complete HTML document starting with <!doctype html> — no markdown, no explanation`;

  const response = await fetch(`${WORKER_URL}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, paymentToken, checkoutRequestId }),
  });

  if (response.status === 402) {
    throw new Error("Payment required before generating the document.");
  }

  // Read raw text first — never assume JSON
  const rawText = await response.text();

  if (!response.ok) {
    // Try to parse as JSON error, fall back to raw text
    try {
      const errData = JSON.parse(rawText);
      throw new Error(errData.error || `Server error: ${response.status}`);
    } catch {
      throw new Error(`Server error ${response.status}: ${rawText.slice(0, 200)}`);
    }
  }

  // Parse the JSON wrapper from the worker
  let data;
  try {
    data = JSON.parse(rawText);
  } catch {
    // Worker returned raw text — shouldn't happen but handle gracefully
    throw new Error("Unexpected response from server. Check Cloudflare worker logs.");
  }

  const text = data.result || "";
  if (!text) throw new Error("AI returned an empty document. Please try again.");

  return text.replace(/^```html?\n?/i, "").replace(/\n?```$/, "").trim();
}

// ─────────────────────────────────────────────
// PDF download via print-to-PDF (no jsPDF dep)
// ─────────────────────────────────────────────
function downloadAsPDF(htmlString, filename) {
  const win = window.open("", "_blank");
  if (!win) { alert("Please allow popups for this site to download the PDF."); return; }
  win.document.write(htmlString);
  win.document.close();
  win.focus();
  setTimeout(() => { win.print(); }, 600);
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────
function Field({ label, children, half }) {
  return (
    <div className={half ? "col-span-1" : "col-span-2 sm:col-span-1"}>
      <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:border-[#1AA3B0] focus:outline-none transition-colors placeholder-slate-500";
const selectCls = inputCls + " cursor-pointer";

function SectionHeading({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-6">
      <div className="h-px flex-1 bg-slate-700" />
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{children}</span>
      <div className="h-px flex-1 bg-slate-700" />
    </div>
  );
}

// ─────────────────────────────────────────────
// Payment Step Component
// ─────────────────────────────────────────────
function PaymentStep({ docType, form, totals, onBack, onPaid, error, setError }) {
  const [tab, setTab] = useState("mpesa");
  const [phone, setPhone] = useState("");
  const [mpesaState, setMpesaState] = useState("idle"); // idle | sending | waiting | failed
  const [checkoutId, setCheckoutId] = useState("");
  const [pollCount, setPollCount] = useState(0);

  const docLabel = DOC_TYPES.find(d => d.id === docType)?.label || "Document";
  const KES_AMOUNT = Math.ceil(totals.grand > 0 ? totals.grand : 130); // use doc total or flat $1 equiv

  // ── M-Pesa STK Push ──────────────────────────────────────────────────────
  const handleMpesa = async () => {
    setError("");
    if (!phone || phone.replace(/\D/g, "").length < 9) {
      setError("Please enter a valid M-Pesa phone number."); return;
    }
    setMpesaState("sending");
    try {
      const res = await fetch(`${WORKER_URL}/mpesa/stkpush`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          amount: KES_AMOUNT,
          reference: form.docNumber || "LCN254",
          docId: docType,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "STK push failed");
      setCheckoutId(data.checkoutRequestId);
      setMpesaState("waiting");
      pollMpesaStatus(data.checkoutRequestId);
    } catch (e) {
      setError(e.message);
      setMpesaState("failed");
    }
  };

  // Poll payment status every 3 seconds for up to 2 minutes
  const pollMpesaStatus = async (id, count = 0) => {
    if (count > 40) { setMpesaState("failed"); setError("Payment timed out. Please try again."); return; }
    try {
      const res = await fetch(`${WORKER_URL}/payment/status?id=${id}`);
      const data = await res.json();
      setPollCount(count);
      if (data.status === "paid") {
        onPaid(null, id); // pass checkoutRequestId
      } else if (data.status === "failed") {
        setMpesaState("failed");
        setError("Payment was cancelled or failed. Please try again.");
      } else {
        setTimeout(() => pollMpesaStatus(id, count + 1), 3000);
      }
    } catch {
      setTimeout(() => pollMpesaStatus(id, count + 1), 3000);
    }
  };

  // ── Stripe (Payment Link — simplest no-backend approach) ─────────────────
  // Replace STRIPE_PAYMENT_LINK with your real Stripe Payment Link URL
  // Create one at: dashboard.stripe.com → Payment Links → Create
  const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/YOUR_STRIPE_PAYMENT_LINK";

  // ── PayPal (Payment Link) ─────────────────────────────────────────────────
  // Replace with your real PayPal.me link or PayPal button URL
  const PAYPAL_LINK = "https://paypal.me/lcn254/1";

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to form
        </button>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-slate-700 text-center"
            style={{ background: "linear-gradient(135deg, rgba(26,163,176,0.08), rgba(240,64,154,0.08))" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
              style={{ background: "rgba(26,163,176,0.15)" }}>
              <Lock className="h-6 w-6" style={{ color: BRAND.teal }} />
            </div>
            <h2 className="text-xl font-bold mb-1">Complete Payment</h2>
            <p className="text-slate-400 text-sm">
              {docLabel} · {fmt(KES_AMOUNT, form.currency || "KES")}
            </p>
          </div>

          {/* Payment tabs */}
          <div className="flex border-b border-slate-700">
            {[
              { id: "mpesa", label: "M-Pesa", color: "#00A651" },
              { id: "stripe", label: "Card", color: "#635BFF" },
              { id: "paypal", label: "PayPal", color: "#003087" },
            ].map(t => (
              <button key={t.id} onClick={() => { setTab(t.id); setError(""); }}
                className="flex-1 py-3 text-sm font-semibold transition-colors"
                style={tab === t.id
                  ? { color: t.color, borderBottom: `2px solid ${t.color}`, marginBottom: -1 }
                  : { color: "#64748b" }}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* ── M-Pesa tab ── */}
            {tab === "mpesa" && (
              <div>
                {mpesaState === "idle" || mpesaState === "failed" ? (
                  <>
                    <p className="text-sm text-slate-400 mb-4">Enter your M-Pesa number. You'll get a PIN prompt on your phone.</p>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="0712 345 678 or 254712345678"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className={inputCls + " mb-4"}
                    />
                    {error && <p className="text-red-400 text-sm mb-4 bg-red-400/10 rounded-lg px-3 py-2">{error}</p>}
                    <button onClick={handleMpesa}
                      className="w-full py-3.5 rounded-xl font-bold text-white transition-colors"
                      style={{ background: "#00A651" }}>
                      Send STK Push — KES {KES_AMOUNT}
                    </button>
                  </>
                ) : mpesaState === "sending" ? (
                  <div className="text-center py-6">
                    <div className="h-10 w-10 border-2 border-[#00A651]/30 border-t-[#00A651] rounded-full animate-spin mx-auto mb-4" />
                    <p className="font-semibold">Sending prompt to {phone}…</p>
                  </div>
                ) : mpesaState === "waiting" ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: "rgba(0,166,81,0.1)", border: "2px solid rgba(0,166,81,0.3)" }}>
                      <span className="text-2xl">📱</span>
                    </div>
                    <p className="font-bold mb-2">Check your phone</p>
                    <p className="text-slate-400 text-sm mb-4">
                      Enter your M-Pesa PIN on the prompt sent to {phone}.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                      <div className="h-4 w-4 border border-[#00A651]/40 border-t-[#00A651] rounded-full animate-spin" />
                      Waiting for confirmation… ({pollCount * 3}s)
                    </div>
                    <button onClick={() => { setMpesaState("idle"); setCheckoutId(""); }}
                      className="mt-4 text-xs text-slate-500 hover:text-slate-300 transition-colors block">
                      Cancel and try again
                    </button>
                  </div>
                ) : null}
              </div>
            )}

            {/* ── Stripe tab ── */}
            {tab === "stripe" && (
              <div>
                <p className="text-sm text-slate-400 mb-6">
                  Pay securely with your debit or credit card via Stripe. You'll be redirected back after payment.
                </p>
                <div className="bg-slate-800 rounded-xl p-4 mb-6 text-sm">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400">{docLabel}</span>
                    <span className="font-semibold">{fmt(KES_AMOUNT, form.currency || "KES")}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Processed by Stripe</span>
                    <span>🔒 Secure</span>
                  </div>
                </div>
                <a href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-colors"
                  style={{ background: "#635BFF" }}>
                  Pay with Card (Stripe)
                </a>
                <p className="text-xs text-amber-500/80 text-center mt-3 bg-amber-500/10 rounded-lg px-3 py-2">
                  Card payment confirmation isn't wired up yet — this needs a real Stripe webhook before it can safely verify payment. Use M-Pesa for now, or check back soon.
                </p>
                <p className="text-xs text-slate-600 text-center mt-2">
                  ⓘ Replace STRIPE_PAYMENT_LINK in InvoiceGenerator.jsx with your real Stripe Payment Link
                </p>
              </div>
            )}

            {/* ── PayPal tab ── */}
            {tab === "paypal" && (
              <div>
                <p className="text-sm text-slate-400 mb-6">
                  Pay via PayPal. You'll be redirected to PayPal to complete the payment.
                </p>
                <div className="bg-slate-800 rounded-xl p-4 mb-6 text-sm">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400">{docLabel}</span>
                    <span className="font-semibold">$1.00 USD</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Processed by PayPal</span>
                    <span>🔒 Secure</span>
                  </div>
                </div>
                <a href={PAYPAL_LINK} target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-colors"
                  style={{ background: "#0070BA" }}>
                  Pay with PayPal — $1.00
                </a>
                <p className="text-xs text-amber-500/80 text-center mt-3 bg-amber-500/10 rounded-lg px-3 py-2">
                  PayPal payment confirmation isn't wired up yet — this needs real IPN verification before it can safely confirm payment. Use M-Pesa for now, or check back soon.
                </p>
                <p className="text-xs text-slate-600 text-center mt-2">
                  ⓘ Replace PAYPAL_LINK in InvoiceGenerator.jsx with your real PayPal.me link
                </p>
              </div>
            )}
          </div>

          <div className="px-6 pb-6 text-center">
            <p className="text-xs text-slate-600">🔒 LCN254 does not store card or M-Pesa details</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function InvoiceGenerator() {
  // Step: "type" | "form" | "preview" | "payment" | "done"
  const [step, setStep] = useState("type");
  const [docType, setDocType] = useState(null);

  const [form, setForm] = useState({
    docNumber: `INV-${new Date().getFullYear()}-001`,
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    currency: "KES",
    taxRate: "16",
    globalDiscount: "0",
    deposit: "0",
    paymentTerms: "Payment due within 30 days",
    notes: "",
    issuerName: "", issuerAddress: "", issuerEmail: "", issuerTaxId: "", paymentInfo: "",
    clientName: "", clientAddress: "", clientEmail: "", clientTaxId: "",
  });

  const [items, setItems] = useState([emptyItem()]);
  const [generating, setGenerating] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [error, setError] = useState("");
  const [paid, setPaid] = useState(false);
  const [paymentToken, setPaymentToken] = useState("");

  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const totals = calcTotals(items, form.taxRate, form.globalDiscount, form.deposit);

  const addItem = () => setItems(i => [...i, emptyItem()]);
  const removeItem = (idx) => setItems(i => i.filter((_, j) => j !== idx));
  const updateItem = (idx, key, val) => setItems(i => i.map((item, j) => j === idx ? { ...item, [key]: val } : item));

  const handleGenerate = useCallback(async (token, checkoutRequestId = null) => {
    setError("");
    setGenerating(true);
    try {
      const html = await generateWithAI(docType, form, items, totals, token, checkoutRequestId);
      setGeneratedHTML(html);
      setStep("done");
    } catch (e) {
      setError(e.message || "Generation failed. Please try again.");
      setStep("payment");
    } finally {
      setGenerating(false);
    }
  }, [docType, form, items, totals]);

  const handlePay = () => setStep("payment");

  const handlePaymentComplete = useCallback(async (token = null, checkoutRequestId = null) => {
    setPaid(true);
    setStep("generating");
    await handleGenerate(token, checkoutRequestId);
  }, [handleGenerate]);

  const handleDownload = () => {
    const docLabel = DOC_TYPES.find(d => d.id === docType)?.label || "Document";
    downloadAsPDF(generatedHTML, `${docLabel}-${form.docNumber}`);
  };

  // ── STEP: Choose document type ──────────────
  if (step === "type") return (
    <div className="min-h-screen bg-slate-950 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ── Coming Soon Banner ── */}
        <div className="mb-10 rounded-2xl border border-amber-400/30 bg-amber-400/5 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400 text-xl">
            🚧
          </div>
          <div className="flex-1">
            <p className="font-bold text-amber-300 mb-1">AI Invoice Generator — Coming Soon</p>
            <p className="text-sm text-amber-200/70 leading-relaxed">
              This feature is currently under development. We're finalising the payment integration and AI backend to make sure everything works perfectly before launch.
              You can explore the document types below, and we'll notify you when it's live.
            </p>
          </div>
          <a href="mailto:contact@lcn254.site?subject=Invoice Generator Waitlist"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-amber-400/40 px-4 py-2.5 text-sm font-semibold text-amber-300 hover:bg-amber-400/10 transition-colors whitespace-nowrap">
            Notify me →
          </a>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-1.5 mb-6 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5" style={{ color: BRAND.teal }} />
            <span className="text-xs font-medium uppercase tracking-wider text-slate-300">AI Document Generator</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            What do you need to{" "}
            <span className="bg-gradient-to-r from-[#1AA3B0] to-[#F0409A] bg-clip-text text-transparent">generate?</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">Choose a document type. Fill in your details. Our AI assembles a professional document — download it as PDF for $1.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 opacity-60 pointer-events-none select-none">
          {DOC_TYPES.map(({ id, label, icon: Icon, desc }) => (
            <div
              key={id}
              className="text-left p-5 rounded-2xl border border-slate-700 bg-slate-900/60 backdrop-blur-xl"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(26,163,176,0.12)" }}>
                <Icon className="h-5 w-5" style={{ color: BRAND.teal }} />
              </div>
              <div className="font-semibold text-white mb-1">{label}</div>
              <div className="text-xs text-slate-400">{desc}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-500 mt-10">Powered by Claude AI · $1 per download · No subscription</p>
      </div>
    </div>
  );

  // ── STEP: Form ───────────────────────────────
  if (step === "form") {
    const docLabel = DOC_TYPES.find(d => d.id === docType)?.label;
    return (
      <div className="min-h-screen bg-slate-950 text-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => setStep("type")} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to document types
          </button>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(26,163,176,0.15)" }}>
              {(() => { const Icon = DOC_TYPES.find(d => d.id === docType)?.icon || FileText; return <Icon className="h-5 w-5" style={{ color: BRAND.teal }} />; })()}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{docLabel}</h2>
              <p className="text-slate-400 text-sm">Fill in the details below — the AI will do the rest.</p>
            </div>
          </div>

          <div className="space-y-px">
            {/* Document metadata */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
              <SectionHeading>Document Info</SectionHeading>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Document Number"><input className={inputCls} value={form.docNumber} onChange={e => setF("docNumber", e.target.value)} /></Field>
                <Field label="Currency">
                  <select className={selectCls} value={form.currency} onChange={e => setF("currency", e.target.value)}>
                    {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Issue Date"><input type="date" className={inputCls} value={form.issueDate} onChange={e => setF("issueDate", e.target.value)} /></Field>
                <Field label="Due Date"><input type="date" className={inputCls} value={form.dueDate} onChange={e => setF("dueDate", e.target.value)} /></Field>
              </div>
            </div>

            {/* Issuer */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mt-3">
              <SectionHeading>Your Business (From)</SectionHeading>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Business Name"><input className={inputCls} placeholder="Acme Ltd." value={form.issuerName} onChange={e => setF("issuerName", e.target.value)} /></Field>
                <Field label="Email"><input type="email" className={inputCls} placeholder="billing@acme.co.ke" value={form.issuerEmail} onChange={e => setF("issuerEmail", e.target.value)} /></Field>
                <Field label="Address" half={false}><textarea className={inputCls} rows={2} placeholder="123 Main St, Nairobi, Kenya" value={form.issuerAddress} onChange={e => setF("issuerAddress", e.target.value)} /></Field>
                <Field label="Tax / VAT ID"><input className={inputCls} placeholder="P051234567X" value={form.issuerTaxId} onChange={e => setF("issuerTaxId", e.target.value)} /></Field>
                <Field label="Payment Info"><input className={inputCls} placeholder="M-Pesa: 0700000000 / Bank: Equity AC 1234" value={form.paymentInfo} onChange={e => setF("paymentInfo", e.target.value)} /></Field>
              </div>
            </div>

            {/* Client */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mt-3">
              <SectionHeading>Client (To)</SectionHeading>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Client Name"><input className={inputCls} placeholder="Jane Wanjiru" value={form.clientName} onChange={e => setF("clientName", e.target.value)} /></Field>
                <Field label="Client Email"><input type="email" className={inputCls} placeholder="jane@client.co.ke" value={form.clientEmail} onChange={e => setF("clientEmail", e.target.value)} /></Field>
                <Field label="Client Address" half={false}><textarea className={inputCls} rows={2} placeholder="456 Park Ave, Mombasa, Kenya" value={form.clientAddress} onChange={e => setF("clientAddress", e.target.value)} /></Field>
                <Field label="Client Tax / VAT ID"><input className={inputCls} placeholder="Optional" value={form.clientTaxId} onChange={e => setF("clientTaxId", e.target.value)} /></Field>
              </div>
            </div>

            {/* Line items */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mt-3">
              <SectionHeading>Line Items</SectionHeading>
              <div className="space-y-3 mb-4">
                {/* Column headers */}
                <div className="grid grid-cols-12 gap-2 px-1">
                  <span className="col-span-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Description</span>
                  <span className="col-span-2 text-xs font-semibold uppercase tracking-widest text-slate-500">Qty</span>
                  <span className="col-span-2 text-xs font-semibold uppercase tracking-widest text-slate-500">Unit Price</span>
                  <span className="col-span-2 text-xs font-semibold uppercase tracking-widest text-slate-500">Disc %</span>
                  <span className="col-span-1 text-xs font-semibold uppercase tracking-widest text-slate-500 text-right">Amount</span>
                  <span className="col-span-1"></span>
                </div>
                {items.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                    <input className={inputCls + " col-span-4"} placeholder="Description" value={item.description} onChange={e => updateItem(idx, "description", e.target.value)} />
                    <input className={inputCls + " col-span-2"} type="number" placeholder="Qty" min="1" value={item.quantity} onChange={e => updateItem(idx, "quantity", e.target.value)} />
                    <input className={inputCls + " col-span-2"} type="number" placeholder="Unit price" min="0" value={item.unit_price} onChange={e => updateItem(idx, "unit_price", e.target.value)} />
                    <input className={inputCls + " col-span-2"} type="number" placeholder="Disc %" min="0" max="100" value={item.discount} onChange={e => updateItem(idx, "discount", e.target.value)} />
                    <div className="col-span-1 text-right text-sm text-slate-400 font-mono text-xs">
                      {fmt(item.quantity * item.unit_price * (1 - item.discount / 100), form.currency)}
                    </div>
                    <button onClick={() => removeItem(idx)} disabled={items.length === 1} aria-label="Remove line item" className="col-span-1 flex justify-center text-slate-600 hover:text-red-400 disabled:opacity-20 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={addItem} className="flex items-center gap-2 text-sm text-[#1AA3B0] hover:text-[#3FC1CB] transition-colors">
                <Plus className="h-4 w-4" /> Add line item
              </button>
            </div>

            {/* Totals config */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mt-3">
              <SectionHeading>Tax, Discounts & Totals</SectionHeading>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <Field label="Tax Rate %"><input type="number" className={inputCls} min="0" max="100" value={form.taxRate} onChange={e => setF("taxRate", e.target.value)} /></Field>
                <Field label="Overall Disc %"><input type="number" className={inputCls} min="0" max="100" value={form.globalDiscount} onChange={e => setF("globalDiscount", e.target.value)} /></Field>
                <Field label="Deposit Paid"><input type="number" className={inputCls} min="0" value={form.deposit} onChange={e => setF("deposit", e.target.value)} /></Field>
                <div />
              </div>
              <div className="bg-slate-800 rounded-xl p-4 text-sm space-y-2 font-mono">
                <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>{fmt(totals.subtotal, form.currency)}</span></div>
                {totals.globalDisc > 0 && <div className="flex justify-between text-slate-400"><span>Discount</span><span>-{fmt(totals.globalDisc, form.currency)}</span></div>}
                <div className="flex justify-between text-slate-400"><span>Tax ({form.taxRate}%)</span><span>{fmt(totals.tax, form.currency)}</span></div>
                <div className="flex justify-between font-bold text-white border-t border-slate-700 pt-2"><span>Grand Total</span><span style={{ color: BRAND.teal }}>{fmt(totals.grand, form.currency)}</span></div>
                {totals.balance !== totals.grand && <div className="flex justify-between text-slate-400"><span>Balance Due</span><span>{fmt(totals.balance, form.currency)}</span></div>}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mt-3">
              <SectionHeading>Terms & Notes</SectionHeading>
              <div className="grid grid-cols-1 gap-4">
                <Field label="Payment Terms"><input className={inputCls} placeholder="Payment due within 30 days" value={form.paymentTerms} onChange={e => setF("paymentTerms", e.target.value)} /></Field>
                <Field label="Notes"><textarea className={inputCls} rows={3} placeholder="Additional notes, bank details, thank-you message…" value={form.notes} onChange={e => setF("notes", e.target.value)} /></Field>
              </div>
            </div>
          </div>

          {error && <p className="mt-4 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">{error}</p>}

          <button
            onClick={handlePay}
            disabled={!form.issuerName || !form.clientName || items.every(i => !i.description)}
            className="w-full mt-6 flex items-center justify-center gap-3 rounded-xl py-4 text-base font-bold text-slate-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
            style={{ background: `linear-gradient(135deg, ${BRAND.teal}, ${BRAND.pink})` }}
          >
            <Lock className="h-5 w-5" /> Pay $1 & Generate Document
          </button>
          <p className="text-center text-xs text-slate-500 mt-3">AI generates your document after payment · Instant PDF download</p>
        </div>
      </div>
    );
  }

  // ── STEP: Generating (post-payment spinner) ──
  if (step === "generating") return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(26,163,176,0.12)" }}>
          <div className="h-8 w-8 border-2 border-[#1AA3B0]/30 border-t-[#1AA3B0] rounded-full animate-spin" />
        </div>
        <h2 className="text-xl font-bold mb-2">Generating your document…</h2>
        <p className="text-slate-400 text-sm">Claude AI is writing your {DOC_TYPES.find(d => d.id === docType)?.label}.<br />This takes about 10–20 seconds.</p>
        {error && (
          <div className="mt-6 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 max-w-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );

  // ── STEP: Payment ────────────────────────────
  if (step === "payment") return (
    <PaymentStep
      docType={docType}
      form={form}
      totals={totals}
      onBack={() => setStep("form")}
      onPaid={handlePaymentComplete}
      error={error}
      setError={setError}
    />
  );

  // ── STEP: Done ───────────────────────────────
  if (step === "done") return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(26,163,176,0.12)" }}>
          <CheckCircle className="h-8 w-8" style={{ color: BRAND.teal }} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Payment complete!</h2>
        <p className="text-slate-400 mb-8">Your {DOC_TYPES.find(d => d.id === docType)?.label} is ready. Click below to download.</p>
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-slate-950 text-base mb-4 hover:scale-[1.02] transition-transform"
          style={{ background: `linear-gradient(135deg, ${BRAND.teal}, ${BRAND.pink})` }}
        >
          <Download className="h-5 w-5" /> Download PDF
        </button>
        <button
          onClick={() => { setStep("type"); setGeneratedHTML(""); setPaid(false); }}
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          Generate another document →
        </button>
      </div>
    </div>
  );
}
