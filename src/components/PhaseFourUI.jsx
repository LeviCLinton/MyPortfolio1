import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { Plus, ArrowRight, CheckCircle2 } from "lucide-react";

const T = "#1AA3B0";
const P = "#F0409A";

export const GLOW = {
  cyan:    { text:"text-cyan-300",    ring:"hover:border-cyan-400/40",    pill:"bg-cyan-500/10 text-cyan-300 border-cyan-400/30" },
  indigo:  { text:"text-indigo-300",  ring:"hover:border-indigo-400/40",  pill:"bg-indigo-500/10 text-indigo-300 border-indigo-400/30" },
  amber:   { text:"text-amber-300",   ring:"hover:border-amber-400/40",   pill:"bg-amber-500/10 text-amber-300 border-amber-400/30" },
  teal:    { text:"text-[#3FC1CB]",   ring:"hover:border-[#1AA3B0]/40",   pill:"bg-[#1AA3B0]/10 text-[#3FC1CB] border-[#1AA3B0]/30" },
  pink:    { text:"text-[#F778B6]",   ring:"hover:border-[#F0409A]/40",   pill:"bg-[#F0409A]/10 text-[#F778B6] border-[#F0409A]/30" },
};

export function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.1 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function Icon({ name, className, style }) {
  const Cmp = Icons[name] || Icons.Circle;
  return <Cmp className={className} style={style} />;
}

/* ── Section heading ─────────────────────────────────────────────────── */
export function Kicker({ children }) {
  return <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: T }}>{children}</span>;
}
export function H1({ children }) {
  return (
    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-5"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {children}
    </h1>
  );
}
export function H2({ children, className = "" }) {
  return (
    <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4 ${className}`}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {children}
    </h2>
  );
}

/* ── Primary/secondary buttons — real anchors, real hrefs ───────────────── */
export function PrimaryLink({ href, children, className = "" }) {
  return (
    <motion.a href={href} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-slate-950 ${className}`}
      style={{ background: `linear-gradient(135deg,${T},${P})` }}>
      {children} <ArrowRight className="h-4 w-4" />
    </motion.a>
  );
}
export function SecondaryLink({ href, children, className = "" }) {
  return (
    <motion.a href={href} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors ${className}`}>
      {children}
    </motion.a>
  );
}

/* ── Service / Industry summary card (used on overview pages) ───────────── */
export function SummaryCard({ href, icon, color, title, desc, cta, bullets }) {
  const c = GLOW[color] || GLOW.teal;
  return (
    <motion.div whileHover={{ y: -3 }} className={`group rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md transition-colors ${c.ring}`}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(26,163,176,0.12)" }}>
        <Icon name={icon} className={`h-5 w-5 ${c.text}`} />
      </div>
      <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm mb-4 leading-relaxed">{desc}</p>
      {bullets && (
        <ul className="mb-5 space-y-1.5">
          {bullets.slice(0, 4).map((b) => (
            <li key={b} className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${c.text}`} />{b}
            </li>
          ))}
        </ul>
      )}
      <a href={href} className={`inline-flex items-center gap-1.5 text-sm font-semibold ${c.text}`}>
        {cta} <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
      </a>
    </motion.div>
  );
}

/* ── Work / portfolio card — real <a href>, not a JS-only button ────────── */
export function WorkCard({ item }) {
  return (
    <motion.div whileHover={{ y: -3 }} className="group rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md overflow-hidden hover:border-white/20 transition-colors">
      <div className="h-32 w-full relative flex items-center justify-center" style={{ background: item.heroGradient }}>
        {item.isConcept && (
          <span className="absolute top-3 left-3 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
            Concept Project
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold" style={{ color: T }}>{item.industry}</p>
        <h3 className="mt-1.5 mb-2 font-bold text-white group-hover:text-[#3FC1CB] transition-colors leading-snug">{item.name}</h3>
        <p className="text-slate-400 text-sm mb-3 leading-relaxed">{item.shortDesc}</p>
        <p className="text-xs text-slate-500 mb-4">Key feature: {item.keyFeature}</p>
        <a href={`/work/${item.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
          View Case Study <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

/* ── FAQ accordion ────────────────────────────────────────────────────── */
export function FAQBlock({ items, title = "Frequently Asked Questions" }) {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {title && <H2>{title}</H2>}
      <div>
        {items.map((faq, i) => (
          <div key={i} className="border-b border-white/5">
            <button onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left gap-4 group">
              <span className="font-semibold text-white group-hover:text-[#3FC1CB] transition-colors">{faq.q}</span>
              <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                className="shrink-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-slate-400">
                <Plus className="h-3.5 w-3.5" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                  <p className="pb-6 text-slate-400 leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 7-step process strip ────────────────────────────────────────────── */
const PROCESS_STEPS = [
  ["01", "Discover"], ["02", "Strategize"], ["03", "Design"], ["04", "Build"],
  ["05", "Test"], ["06", "Launch"], ["07", "Grow"],
];
export function ProcessStrip() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
      {PROCESS_STEPS.map(([n, label]) => (
        <div key={n} className="rounded-xl border border-white/5 bg-slate-900/40 p-4 text-center">
          <div className="font-mono text-xs mb-2" style={{ color: T }}>{n}</div>
          <div className="text-sm font-semibold text-white">{label}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Final CTA band, reused across every Phase 4 page ────────────────── */
export function FinalCTA({ headline, copy, primaryHref = "/contact", primaryLabel = "START YOUR PROJECT", secondaryHref = "/work", secondaryLabel = "VIEW OUR WORK" }) {
  return (
    <Reveal>
      <div className="text-center rounded-2xl border border-white/5 bg-slate-900/40 p-10">
        <h2 className="text-2xl font-bold text-white mb-3">{headline}</h2>
        {copy && <p className="text-slate-400 mb-6 max-w-xl mx-auto">{copy}</p>}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <PrimaryLink href={primaryHref}>{primaryLabel}</PrimaryLink>
          <SecondaryLink href={secondaryHref}>{secondaryLabel}</SecondaryLink>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Simple breadcrumb / internal link row ───────────────────────────── */
export function RelatedLinks({ title = "Explore Next", links }) {
  if (!links?.length) return null;
  return (
    <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">{title}</p>
      <div className="flex flex-wrap gap-3">
        {links.map((l) => (
          <a key={l.href} href={l.href}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10 hover:text-white transition-colors">
            {l.label} <ArrowRight className="h-3.5 w-3.5" />
          </a>
        ))}
      </div>
    </div>
  );
}

export { T, P };
