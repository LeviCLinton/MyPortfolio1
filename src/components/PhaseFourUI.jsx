import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
export function H1({ children, style }) {
  return (
    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-5"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", ...style }}>
      {children}
    </h1>
  );
}
export function H2({ children, className = "", style }) {
  return (
    <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4 ${className}`}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", ...style }}>
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

/* ── Device mockups — real iframes of the actual demo pages, framed like a
   browser/phone. This is deliberately not a static screenshot: since every
   concept project has a genuine, working HTML/CSS/JS demo, showing it live
   in a chrome frame is both more honest and more impressive than a fake
   mockup image, and it stays accurate if a demo is ever updated. ────────── */
export function BrowserFrame({ src, title, height = 480 }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 overflow-hidden shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-slate-950/70">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-3 bg-slate-800/80 rounded-md px-3 py-1 text-[11px] text-slate-400 font-mono truncate">
          lcn254.site/{src}
        </div>
      </div>
      <iframe
        src={`/${src}`}
        title={title}
        loading="lazy"
        style={{ width: "100%", height, border: "none", display: "block", background: "#fff" }}
      />
    </div>
  );
}

export function PhoneFrame({ src, title, height = 480 }) {
  const innerWidth = 390;
  return (
    <div className="mx-auto" style={{ width: 220 }}>
      <div className="rounded-[28px] border-4 border-slate-800 bg-slate-900 overflow-hidden shadow-2xl shadow-black/40" style={{ height: 440 }}>
        <div className="relative w-full h-full overflow-hidden">
          <iframe
            src={`/${src}`}
            title={title}
            loading="lazy"
            style={{
              width: innerWidth,
              height: innerWidth * (height / 390) || 900,
              border: "none",
              transform: `scale(${220 / innerWidth})`,
              transformOrigin: "top left",
              background: "#fff",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Premium portfolio project card ──────────────────────────────────────
   Real <a href>, subtle image-area scale on hover, arrow shift, and a
   "View Case Study" label that appears on hover — kept understated per the
   Phase 5 design direction (no heavy glassmorphism/gradients/bounce). ───── */
export function ProjectCard({ item, large = false }) {
  return (
    <a href={`/work/${item.slug}`}
      className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 transition-colors hover:border-white/25 ${large ? "sm:col-span-2" : ""}`}>
      <div className={`relative overflow-hidden ${large ? "h-64 sm:h-80" : "h-52"}`}>
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          style={{ background: item.heroGradient }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        {item.isConcept && (
          <span className="absolute top-4 left-4 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
            Concept Project
          </span>
        )}
        <span className="absolute top-4 right-4 font-mono text-[11px] text-white/60">{item.category}</span>
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: T }}>{item.category}</p>
        <h3 className="mt-2 mb-2 text-xl font-bold text-white transition-transform duration-300 group-hover:translate-x-0.5"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {item.title || item.name}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.shortDesc}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
          View Case Study
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </a>
  );
}

/* ── Clip-path reveal — used once per case study, on the hero mockup only.
   A restrained "expensive" feel rather than a gimmick; no-ops entirely
   under prefers-reduced-motion. ─────────────────────────────────────────── */
export function ImageReveal({ children }) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <>{children}</>;
  return (
    <motion.div
      initial={{ clipPath: "inset(0 38% 0 0)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Magnetic CTA — used deliberately, only at the two decisive moments on
   a case study (open the live demo, start a project), not sitewide. Falls
   back to a normal static link when the user prefers reduced motion. ───── */
export function MagneticButton({ href, children, className = "", style, target, rel, strength = 18 }) {
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMove = (e) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const relY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setPos({ x: relX * strength, y: relY * strength });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 14, mass: 0.4 }}
      whileTap={{ scale: 0.97 }}
      className={className}
      style={style}
    >
      {children}
    </motion.a>
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
