import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ArrowRight, Circle } from "lucide-react";

export const T = "#1AA3B0";
export const P = "#F0409A";

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

export function Kicker({ children }) {
  return (
    <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: T }}>
      {children}
    </span>
  );
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

export function PrimaryLink({ href, children }) {
  return (
    <a href={href}
      className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-slate-950"
      style={{ background: `linear-gradient(135deg,${T},${P})` }}>
      {children}
    </a>
  );
}

export function SecondaryLink({ href, children }) {
  return (
    <a href={href}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
      {children}
    </a>
  );
}

export function FinalCTA({ headline, copy, primaryLabel = "START YOUR PROJECT", primaryHref = "/contact", secondaryLabel = "VIEW OUR WORK", secondaryHref = "/work" }) {
  return (
    <Reveal>
      <div className="text-center rounded-2xl border border-white/5 bg-slate-900/40 p-10">
        <h2 className="text-2xl font-bold text-white mb-3">{headline}</h2>
        <p className="text-slate-400 mb-6 max-w-xl mx-auto">{copy}</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <PrimaryLink href={primaryHref}>{primaryLabel} <ArrowRight className="h-4 w-4 inline ml-1" /></PrimaryLink>
          <SecondaryLink href={secondaryHref}>{secondaryLabel}</SecondaryLink>
        </div>
      </div>
    </Reveal>
  );
}

export function RelatedLinks({ links = [] }) {
  if (links.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <a key={l.href} href={l.href}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10">
          {l.label} <ArrowRight className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
}

export function Icon({ name, className = "h-5 w-5", ...rest }) {
  const Cmp = LucideIcons[name] || Circle;
  return <Cmp className={className} {...rest} />;
}

export function FAQBlock({ items = [] }) {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {items.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-white/5">
            <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}
              className="w-full flex items-center justify-between py-5 text-left gap-4 group">
              <span className="font-semibold text-white group-hover:text-[#3FC1CB] transition-colors">{faq.q}</span>
              <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}
                className="shrink-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-slate-400">
                +
              </motion.span>
            </button>
            {/* BUG FIX: the answer used to be conditionally mounted
                ({isOpen && <motion.div>...}) via AnimatePresence, which
                means a collapsed FAQ item's answer text did not exist in
                the DOM at all — including in the static, prerendered HTML
                that search engines and AI crawlers actually read. A
                crawler fetching this page saw every question and zero
                answers. The answer is now always rendered; only its
                visual height/opacity animates on open/close, so the text
                is present and readable in the page source regardless of
                accordion state. (Content collapsed via CSS height/overflow
                in an accordion is normal, expected UI and is crawled and
                indexed normally — this isn't a hidden-text SEO risk.) */}
            <motion.div
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <p className="pb-6 text-slate-400 leading-relaxed">{faq.a}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Device mockups — real iframes of the actual site/app. This is
   deliberately not a static screenshot: showing the real, live thing in a
   chrome frame is both more honest and more impressive than a mockup
   image, and it stays accurate if the underlying project is ever updated.
   `src` may be a root-relative path (e.g. "demos/x.html", served from this
   site) or a full external URL (e.g. a live product hosted elsewhere) —
   both are handled the same way, just displayed differently in the fake
   address bar. ───────────────────────────────────────────────────────── */
function resolveFrameSrc(src) {
  const isExternal = /^https?:\/\//.test(src);
  return { url: isExternal ? src : `/${src}`, isExternal };
}

export function BrowserFrame({ src, title, height = 480 }) {
  const { url, isExternal } = resolveFrameSrc(src);
  const addressLabel = isExternal ? url.replace(/^https?:\/\//, "") : `lcn254.site/${src}`;
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 overflow-hidden shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-slate-950/70">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-3 bg-slate-800/80 rounded-md px-3 py-1 text-[11px] text-slate-400 font-mono truncate">
          {addressLabel}
        </div>
      </div>
      <iframe
        src={url}
        title={title}
        loading="lazy"
        style={{ width: "100%", height, border: "none", display: "block", background: "#fff" }}
      />
    </div>
  );
}

/**
 * PhoneFrame — shows the actual site rendered at a real mobile viewport
 * (390×844, matching common modern phone screens), scaled down uniformly
 * to fit a small decorative frame.
 *
 * BUG FIX: the previous version computed the iframe's internal height as
 * `innerWidth * (height / 390)`, which — since innerWidth was always
 * exactly 390 — algebraically collapses to just `height` again. That
 * pinned the iframe's internal height to the *desktop* preview height
 * (usually 420–520px) instead of a real mobile viewport height. A page
 * rendered at mobile width is almost always taller than at desktop width
 * once content stacks into a single column, so the iframe was silently
 * cutting off the bottom of the real mobile layout — showing a squished
 * fragment with dead space below it rather than a full phone screen.
 *
 * Fix: render the iframe at a genuine full mobile viewport (390×844) and
 * scale the *whole frame* down by one consistent factor, so nothing is
 * cropped — the visible frame is simply a smaller, complete rendering of
 * an actual phone screen, at the correct aspect ratio (390:844).
 */
export function PhoneFrame({ src, title, frameWidth = 260 }) {
  const { url } = resolveFrameSrc(src);
  const viewportWidth = 390;   // real mobile viewport width
  const viewportHeight = 844;  // real mobile viewport height (iPhone 12–15 class)
  const scale = frameWidth / viewportWidth;
  const frameHeight = Math.round(viewportHeight * scale);

  return (
    <div className="mx-auto" style={{ width: frameWidth }}>
      <div className="rounded-[28px] border-4 border-slate-800 bg-slate-900 overflow-hidden shadow-2xl shadow-black/40"
        style={{ width: frameWidth, height: frameHeight }}>
        <div className="relative w-full h-full overflow-hidden">
          <iframe
            src={url}
            title={title}
            loading="lazy"
            style={{
              width: viewportWidth,
              height: viewportHeight,
              border: "none",
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              background: "#fff",
            }}
          />
        </div>
      </div>
    </div>
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

/**
 * SummaryCard — generic icon + title + description card used for grid
 * layouts across the Services and Industries overview pages (the service
 * grid, the "Why work with LCN254" grid, the industries grid, etc).
 *
 * Props:
 *   icon        lucide-react icon name as a string (e.g. "Zap", "Globe"),
 *               rendered via the shared Icon component above
 *   title       card heading
 *   description card body copy
 *   href        optional — if provided, the whole card becomes a link
 *   color       optional accent color for the icon chip background/icon
 *               itself; defaults to the site teal (T)
 */
export function SummaryCard({ icon, title, description, href, color = T }) {
  const content = (
    <>
      {icon && (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}18` }}>
          <Icon name={icon} className="h-5 w-5" style={{ color }} />
        </div>
      )}
      <h3 className="font-bold text-white text-lg mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </>
  );

  const className = "rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md transition-colors hover:border-white/20";

  if (href) {
    return <a href={href} className={`block group ${className}`}>{content}</a>;
  }
  return <div className={className}>{content}</div>;
}

/**
 * ProcessStrip — the numbered process steps shown on the Services overview
 * page and reused on the dedicated Process page.
 *
 * Accepts an optional `steps` array of { n, title, description } so callers
 * can override the copy; if omitted, defaults to LCN254's standard 7-step
 * process so the component still renders correctly even when called with
 * no props at all (e.g. `<ProcessStrip />`).
 */
const DEFAULT_PROCESS_STEPS = [
  { n: "01", title: "Discover", description: "Understand the business, the goals, and who the site actually needs to work for." },
  { n: "02", title: "Strategize", description: "Map out the site structure, content, and conversion path before any design starts." },
  { n: "03", title: "Design", description: "Design the interface — layout, typography, and visual identity — around that strategy." },
  { n: "04", title: "Build", description: "Develop the real, working site: responsive, fast, and built on a maintainable codebase." },
  { n: "05", title: "Test", description: "Check every page across devices, browsers, and real content before anything ships." },
  { n: "06", title: "Launch", description: "Deploy to production, connect the domain, and confirm everything works live." },
  { n: "07", title: "Grow", description: "Ongoing updates, maintenance, and improvements after launch — not a one-time handoff." },
];

export function ProcessStrip({ steps = DEFAULT_PROCESS_STEPS }) {
  return (
    <div className="relative">
      <div className="hidden lg:block absolute top-5 left-[4%] right-[4%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.06}>
            <div className="relative text-left">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm font-bold mb-5 relative z-10"
                style={{ background: `linear-gradient(135deg,${T},${P})`, color: "#0f172a" }}>
                {s.n}
              </div>
              <h3 className="font-bold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

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
