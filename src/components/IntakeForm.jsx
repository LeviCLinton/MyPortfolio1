import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { SERVICES } from "../data/servicesData.js";
import { T, P } from "./PhaseFourUI.jsx";

/**
 * Project intake questionnaire (replaces the old generic contact form).
 *
 * Four short steps — About you · Your project · Budget & timeline · Tech
 * requirements — then explicit consent and submit. Answers are POSTed as JSON
 * to the Cloudflare Worker's /intake route (see lcn254-worker/worker.js),
 * which validates them and emails them to the LCN254 inbox.
 *
 * Nothing is faked: the success screen only shows after the Worker returns a
 * 2xx. On any failure the answers stay in the form and a mailto fallback with
 * the same content is offered.
 */
const WORKER_URL = "https://lcn254-api-proxy.levnyan2018.workers.dev";
const FALLBACK_EMAIL = "contact@lcn254.site";

const BUDGETS = [
  "Under $350",
  "$350 – $750",
  "$750 – $1,500",
  "$1,500 – $3,000",
  "$3,000+",
  "Not sure yet — advise me",
];
const TIMELINES = [
  "As soon as possible (under 2 weeks)",
  "2 – 4 weeks",
  "1 – 3 months",
  "3+ months",
  "Flexible",
];
const PROJECT_TYPES = ["New website", "Redesign of an existing site", "Add features to an existing site", "Ongoing maintenance", "Not sure"];
const SIZES = ["Single page", "2 – 5 pages", "6 – 10 pages", "10+ pages", "Not sure yet"];
const GOALS = [
  "Get more customers or enquiries",
  "Take bookings or reservations",
  "Sell products online",
  "Look more credible / professional",
  "Replace an outdated site",
  "Launch a new business or product",
];
const PLATFORMS = [
  "No preference — recommend what fits",
  "Custom-coded (React / static, fastest)",
  "Needs a CMS so I can edit content myself",
  "Must work with my existing stack",
];
const INTEGRATIONS = [
  "M-Pesa payments",
  "Card payments (Stripe)",
  "PayPal",
  "Online booking / calendar",
  "E-commerce / shopping cart",
  "WhatsApp chat or click-to-chat",
  "Email / newsletter signup",
  "User accounts / login",
  "Analytics & SEO setup",
  "Multiple languages",
];
const DOMAIN_STATUS = ["I have a domain", "I need a domain", "Not sure"];
const HOSTING = ["You host it for me", "I have my own hosting", "Not sure"];
const CONTENT_STATUS = ["Ready (text & images)", "Partly ready", "I need help with content"];
const CONTACT_PREF = ["Email", "WhatsApp", "Phone call"];

const STEPS = ["About you", "Your project", "Budget & timeline", "Tech requirements"];

const INITIAL = {
  name: "", email: "", phone: "", organisation: "", contactPref: "Email",
  service: "", projectType: "", scope: "", goals: [], size: "", existingSite: "",
  budget: "", timeline: "", deadline: "",
  platform: "", integrations: [], domain: "", hosting: "", content: "", techNotes: "",
  consent: false,
  // Honeypot: real people never see or fill this. Bots usually do.
  website: "",
};

const inputCls =
  "w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:border-[#1AA3B0] focus:outline-none transition-colors placeholder-slate-500";
const labelCls = "block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(step, f) {
  const e = {};
  if (step === 0) {
    if (!f.name.trim()) e.name = "Please tell us your name.";
    if (!f.email.trim()) e.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(f.email.trim())) e.email = "That email address doesn't look right.";
  }
  if (step === 1) {
    if (!f.service) e.service = "Choose the service closest to what you need.";
    if (f.scope.trim().length < 30) e.scope = "Please describe the project in at least a couple of sentences (30+ characters).";
  }
  if (step === 2) {
    if (!f.budget) e.budget = "Choose a budget range. \"Not sure yet\" is fine.";
    if (!f.timeline) e.timeline = "Choose when you'd like to launch.";
  }
  if (step === 3) {
    if (!f.consent) e.consent = "Please tick the box to let us use your answers to reply.";
  }
  return e;
}

function serviceName(slug) {
  if (slug === "not-sure") return "Not sure yet";
  return SERVICES.find((s) => s.slug === slug)?.name || slug;
}

function toMailto(f) {
  const lines = [
    `Name: ${f.name}`, `Email: ${f.email}`, `Phone: ${f.phone || "-"}`, `Organisation: ${f.organisation || "-"}`,
    `Service: ${serviceName(f.service)}`, `Project type: ${f.projectType || "-"}`,
    `Scope: ${f.scope}`, `Budget: ${f.budget}`, `Timeline: ${f.timeline}`, `Deadline: ${f.deadline || "-"}`,
    `Platform: ${f.platform || "-"}`, `Integrations: ${f.integrations.join(", ") || "-"}`,
    `Domain: ${f.domain || "-"}`, `Hosting: ${f.hosting || "-"}`, `Content: ${f.content || "-"}`,
  ];
  const body = encodeURIComponent(lines.join("\n")).slice(0, 1800);
  return `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent("Project enquiry — " + f.name)}&body=${body}`;
}

// ── Small field helpers ──────────────────────────────────────────────────────
function Field({ id, label, optional, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label} {optional && <span className="normal-case tracking-normal font-normal text-slate-500">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
      {error && <p id={`${id}-err`} className="mt-1.5 text-xs text-red-400" role="alert">{error}</p>}
    </div>
  );
}

function Select({ id, value, onChange, options, placeholder = "Select one", error }) {
  const hasPlaceholder = placeholder !== null;
  return (
    <select id={id} className={inputCls} value={value} onChange={(e) => onChange(e.target.value)}
      aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined}>
      {hasPlaceholder && <option className="bg-slate-900" value="">{placeholder}</option>}
      {options.map((o) => {
        const v = typeof o === "string" ? o : o.value;
        const l = typeof o === "string" ? o : o.label;
        return <option key={v} className="bg-slate-900" value={v}>{l}</option>;
      })}
    </select>
  );
}

function CheckGroup({ legend, options, values, onToggle }) {
  return (
    <fieldset>
      <legend className={labelCls}>{legend}</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((o) => {
          const on = values.includes(o);
          return (
            <label key={o}
              className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm cursor-pointer transition-colors ${on ? "border-[#1AA3B0]/60 bg-[#1AA3B0]/10 text-white" : "border-white/10 bg-slate-900/40 text-slate-300 hover:border-white/20"}`}>
              <input type="checkbox" className="h-4 w-4 accent-[#1AA3B0]" checked={on} onChange={() => onToggle(o)} />
              <span>{o}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

// ── Component ────────────────────────────────────────────────────────────────
export default function IntakeForm() {
  const [step, setStep] = useState(0);
  const [f, setF] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [serverError, setServerError] = useState("");
  const topRef = useRef(null);
  const firstRender = useRef(true);

  const set = (k, v) => { setF((p) => ({ ...p, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined })); };
  const toggle = (k, v) => set(k, f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v]);

  // Move focus/scroll to the top of the form when the step changes (not on first paint).
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, status]);

  const next = () => {
    const e = validate(step, f);
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => s + 1);
  };
  const back = () => { setErrors({}); setStep((s) => s - 1); };

  const submit = async (ev) => {
    ev.preventDefault();
    // Pressing Enter inside a field on steps 1-3 should advance, not submit.
    if (step < STEPS.length - 1) { next(); return; }
    // Re-validate every step so a skipped/edited earlier step can't slip through.
    for (let s = 0; s < STEPS.length; s++) {
      const e = validate(s, f);
      if (Object.keys(e).length) { setErrors(e); setStep(s); return; }
    }
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch(`${WORKER_URL}/intake`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, serviceName: serviceName(f.service), page: "/contact" }),
      });
      // Require an explicit { success: true } from the Worker, not just a 2xx:
      // a misrouted or stale Worker must never be reported to the user as "sent".
      let data = null;
      try { data = await res.json(); } catch { /* non-JSON body */ }
      if (!res.ok || data?.success !== true) {
        throw new Error(data?.error || `Server responded ${res.status}`);
      }
      setStatus("sent");
    } catch (err) {
      setServerError(err.message || "Network error");
      setStatus("error");
    }
  };

  // ── Success ────────────────────────────────────────────────────────────────
  if (status === "sent") {
    return (
      <div ref={topRef} className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-10 text-center" role="status">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${T}18` }}>
            <CheckCircle2 className="h-7 w-7" style={{ color: T }} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Thanks{f.name ? `, ${f.name.split(" ")[0]}` : ""} — we've got your brief.</h3>
          <p className="text-slate-400 max-w-md">
            We'll review your answers and reply to {f.email} ({f.contactPref.toLowerCase()} preferred) with questions or a proposal.
            Most replies go out within a few hours on business days.
          </p>
        </motion.div>
      </div>
    );
  }

  const sending = status === "sending";
  const last = step === STEPS.length - 1;

  return (
    <div ref={topRef} className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md scroll-mt-28">
      {/* Progress */}
      <ol className="flex items-center gap-2 mb-8" aria-label="Form progress">
        {STEPS.map((s, i) => (
          <li key={s} className="flex-1" aria-current={i === step ? "step" : undefined}>
            <div className="h-1 rounded-full mb-2 transition-colors"
              style={{ background: i <= step ? `linear-gradient(90deg,${T},${P})` : "rgba(255,255,255,0.08)" }} />
            <span className={`hidden sm:block text-[11px] font-mono uppercase tracking-wider ${i === step ? "text-white" : "text-slate-500"}`}>{s}</span>
          </li>
        ))}
      </ol>
      <p className="sm:hidden font-mono text-xs uppercase tracking-wider text-slate-400 -mt-4 mb-6">
        Step {step + 1} of {STEPS.length} · {STEPS[step]}
      </p>

      <form onSubmit={submit} noValidate>
        {/* Honeypot — visually hidden and skipped by keyboard / screen readers */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
          <label>Leave this field empty
            <input type="text" tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set("website", e.target.value)} />
          </label>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }} className="space-y-5">

            {step === 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field id="in-name" label="Your name" error={errors.name}>
                    <input id="in-name" className={inputCls} autoComplete="name" placeholder="Jane Wanjiru" value={f.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "in-name-err" : undefined} />
                  </Field>
                  <Field id="in-email" label="Email" error={errors.email}>
                    <input id="in-email" type="email" className={inputCls} autoComplete="email" placeholder="jane@business.co.ke" value={f.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "in-email-err" : undefined} />
                  </Field>
                  <Field id="in-phone" label="Phone / WhatsApp" optional>
                    <input id="in-phone" type="tel" className={inputCls} autoComplete="tel" placeholder="+254 700 000 000" value={f.phone} onChange={(e) => set("phone", e.target.value)} />
                  </Field>
                  <Field id="in-org" label="Business or organisation" optional>
                    <input id="in-org" className={inputCls} autoComplete="organization" placeholder="Acme Ltd." value={f.organisation} onChange={(e) => set("organisation", e.target.value)} />
                  </Field>
                </div>
                <Field id="in-pref" label="Best way to reach you">
                  <Select id="in-pref" value={f.contactPref} onChange={(v) => set("contactPref", v)} options={CONTACT_PREF} placeholder={null} />
                </Field>
              </>
            )}

            {step === 1 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field id="in-service" label="Service you need" error={errors.service}>
                    <Select id="in-service" value={f.service} onChange={(v) => set("service", v)} error={errors.service}
                      options={[...SERVICES.map((s) => ({ value: s.slug, label: s.name })), { value: "not-sure", label: "Not sure yet" }]} />
                  </Field>
                  <Field id="in-ptype" label="Project type" optional>
                    <Select id="in-ptype" value={f.projectType} onChange={(v) => set("projectType", v)} options={PROJECT_TYPES} />
                  </Field>
                </div>
                <Field id="in-scope" label="Project scope" error={errors.scope}
                  hint="What is the project, who is it for, and what should it do? The more specific, the more accurate our quote.">
                  <textarea id="in-scope" rows={5} maxLength={4000} className={inputCls} style={{ resize: "vertical" }}
                    placeholder="e.g. A website for our 12-room guesthouse in Naivasha. Guests should see rooms, rates and book directly, and pay a deposit by M-Pesa."
                    value={f.scope} onChange={(e) => set("scope", e.target.value)} aria-invalid={!!errors.scope} aria-describedby={errors.scope ? "in-scope-err" : undefined} />
                </Field>
                <CheckGroup legend="Main goals (pick any)" options={GOALS} values={f.goals} onToggle={(v) => toggle("goals", v)} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field id="in-size" label="Expected size" optional>
                    <Select id="in-size" value={f.size} onChange={(v) => set("size", v)} options={SIZES} />
                  </Field>
                  <Field id="in-site" label="Existing website" optional>
                    <input id="in-site" className={inputCls} inputMode="url" placeholder="https://yourbusiness.co.ke" value={f.existingSite} onChange={(e) => set("existingSite", e.target.value)} />
                  </Field>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field id="in-budget" label="Budget range" error={errors.budget} hint="Package pricing is in USD; we can invoice in KES.">
                    <Select id="in-budget" value={f.budget} onChange={(v) => set("budget", v)} options={BUDGETS} error={errors.budget} />
                  </Field>
                  <Field id="in-timeline" label="Target launch" error={errors.timeline}>
                    <Select id="in-timeline" value={f.timeline} onChange={(v) => set("timeline", v)} options={TIMELINES} error={errors.timeline} />
                  </Field>
                </div>
                <Field id="in-deadline" label="Hard deadline" optional hint="An event, campaign or opening date the site must be ready for.">
                  <input id="in-deadline" type="date" className={inputCls} value={f.deadline} onChange={(e) => set("deadline", e.target.value)} />
                </Field>
              </>
            )}

            {step === 3 && (
              <>
                <Field id="in-platform" label="Platform preference" optional>
                  <Select id="in-platform" value={f.platform} onChange={(v) => set("platform", v)} options={PLATFORMS} />
                </Field>
                <CheckGroup legend="Integrations & features needed" options={INTEGRATIONS} values={f.integrations} onToggle={(v) => toggle("integrations", v)} />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field id="in-domain" label="Domain" optional>
                    <Select id="in-domain" value={f.domain} onChange={(v) => set("domain", v)} options={DOMAIN_STATUS} />
                  </Field>
                  <Field id="in-hosting" label="Hosting" optional>
                    <Select id="in-hosting" value={f.hosting} onChange={(v) => set("hosting", v)} options={HOSTING} />
                  </Field>
                  <Field id="in-content" label="Content" optional>
                    <Select id="in-content" value={f.content} onChange={(v) => set("content", v)} options={CONTENT_STATUS} />
                  </Field>
                </div>
                <Field id="in-tech" label="Anything else technical" optional>
                  <textarea id="in-tech" rows={3} maxLength={2000} className={inputCls} style={{ resize: "vertical" }}
                    placeholder="Existing systems to connect to, accessibility needs, performance targets, brand guidelines…"
                    value={f.techNotes} onChange={(e) => set("techNotes", e.target.value)} />
                </Field>

                <div>
                  <label className={`flex items-start gap-3 rounded-xl border p-4 text-sm cursor-pointer ${errors.consent ? "border-red-400/60" : "border-white/10"} bg-slate-900/40`}>
                    <input type="checkbox" className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#1AA3B0]" checked={f.consent}
                      onChange={(e) => set("consent", e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "in-consent-err" : undefined} />
                    <span className="text-slate-300 leading-relaxed">
                      I agree that LCN254 may use the information above to reply to my enquiry and prepare a proposal, and that it may be processed by
                      LCN254's email and hosting providers, some of which are outside Kenya. See the{" "}
                      <a href="/privacy" target="_blank" rel="noopener noreferrer" data-native className="underline" style={{ color: T }}>Privacy Policy</a> and{" "}
                      <a href="/terms" target="_blank" rel="noopener noreferrer" data-native className="underline" style={{ color: T }}>Terms of Service</a>.
                      I can withdraw consent at any time.
                    </span>
                  </label>
                  {errors.consent && <p id="in-consent-err" className="mt-1.5 text-xs text-red-400" role="alert">{errors.consent}</p>}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {status === "error" && (
          <div className="mt-6 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm" role="alert">
            <p className="flex items-center gap-2 font-semibold text-red-300 mb-1"><AlertCircle className="h-4 w-4" /> We couldn't send your brief.</p>
            <p className="text-slate-300 leading-relaxed">
              Your answers are still here, so nothing is lost. Please try again, or{" "}
              <a href={toMailto(f)} data-native className="underline" style={{ color: T }}>send them by email instead</a>{" "}
              (or write to {FALLBACK_EMAIL}).
              {serverError && <span className="block mt-1 text-xs text-slate-500">Details: {serverError}</span>}
            </p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button type="button" onClick={back} disabled={sending}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors disabled:opacity-50">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          ) : <span />}

          {last ? (
            <button type="submit" disabled={sending}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-slate-950 disabled:opacity-60"
              style={{ background: `linear-gradient(135deg,${T},${P})` }}>
              {sending ? "Sending…" : <>Send my brief <Send className="h-4 w-4" /></>}
            </button>
          ) : (
            <button type="button" onClick={next}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-slate-950"
              style={{ background: `linear-gradient(135deg,${T},${P})` }}>
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
