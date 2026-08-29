import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogIndexPage, BlogArticlePage } from "./Blog.jsx";
import { RouterProvider, useRouter } from "./router.jsx";
import SEOHead from "./components/SEOHead.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import ServiceDetailPage from "./pages/ServiceDetailPage.jsx";
import WorkPage from "./pages/WorkPage.jsx";
import CaseStudyPage from "./pages/CaseStudyPage.jsx";
import IndustriesPage from "./pages/IndustriesPage.jsx";
import IndustryDetailPage from "./pages/IndustryDetailPage.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import ProcessPage from "./pages/ProcessPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { SERVICES } from "./data/servicesData.js";
import { INDUSTRIES } from "./data/industriesData.js";
import {
  Stethoscope, Scissors, BedDouble, Home as HomeIcon,
  Truck, ChefHat, ShoppingBag, CheckCircle2, PlayCircle, Rocket,
  ArrowRight, MessageCircle, Mail, Phone, Clock, Send, MapPin,
  Plus, Zap, Globe, Shield, TrendingUp, ChevronRight, Award, Users,
} from "lucide-react";

// ─── Brand tokens ───────────────────────────────────────────────────────────
const T = "#1AA3B0";  // teal
const P = "#F0409A";  // pink

// ─── Page transition wrapper ─────────────────────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, filter: "blur(8px)", scale: 0.98 },
  animate: { opacity: 1, filter: "blur(0px)", scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, filter: "blur(6px)", scale: 1.01,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

function PageWrap({ children, id }) {
  return (
    <motion.div key={id} variants={pageVariants}
      initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

// ─── Scroll-reveal ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 16, className = "" }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.1 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
// All links below are REAL <a href> anchors. Client-side interception happens
// globally in router.jsx, so these work identically with and without JS.
function Nav({ route }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Services",   href: "/services" },
    { label: "Work",       href: "/work" },
    { label: "Industries", href: "/industries" },
    { label: "Pricing",    href: "/pricing" },
    { label: "Blog",       href: "/blog" },
    { label: "About",      href: "/about" },
  ];

  const isActive = (href) => route === href || (href !== "/" && route.startsWith(href));

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      animate={{ backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
        background: scrolled ? "rgba(2,6,23,0.85)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-12">
        <a href="/" className="flex items-center gap-2.5">
          <img src={`${import.meta.env.BASE_URL}lcn254-logo.jpeg`} alt="LCN254 logo"
            width="36" height="36" fetchpriority="high" decoding="async"
            className="h-9 w-9 rounded-lg object-cover" />
          <span className="font-semibold tracking-tight text-white text-sm">
            LCN<span className="font-mono" style={{ color: T }}>254</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-400">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className={`transition-colors hover:text-white ${isActive(l.href) ? "text-white font-medium" : ""}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="/contact"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10">
            Get a Quote <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white p-2" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
          <div className="space-y-1.5">
            <motion.div className="h-0.5 w-6 bg-white" animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} />
            <motion.div className="h-0.5 w-6 bg-white" animate={{ opacity: menuOpen ? 0 : 1 }} />
            <motion.div className="h-0.5 w-6 bg-white" animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-slate-950/95 border-t border-white/5">
            <div className="px-6 py-4 space-y-3">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                  className="block text-slate-300 hover:text-white text-sm py-2 w-full text-left">
                  {l.label}
                </a>
              ))}
              <a href="/contact" onClick={() => setMenuOpen(false)}
                className="block text-sm py-2 font-medium" style={{ color: T }}>
                Get a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950 px-6 py-10 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8 text-sm">
          <div>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-3">Services</p>
            <ul className="space-y-2">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.slug}><a href={`/services/${s.slug}`} className="text-slate-400 hover:text-white transition-colors">{s.name}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-3">Industries</p>
            <ul className="space-y-2">
              {INDUSTRIES.slice(0, 5).map((i) => (
                <li key={i.slug}><a href={`/industries/${i.slug}`} className="text-slate-400 hover:text-white transition-colors">{i.name}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-3">Company</p>
            <ul className="space-y-2">
              <li><a href="/work" className="text-slate-400 hover:text-white transition-colors">Work</a></li>
              <li><a href="/process" className="text-slate-400 hover:text-white transition-colors">Process</a></li>
              <li><a href="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/about" className="text-slate-400 hover:text-white transition-colors">About</a></li>
              <li><a href="/blog" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-3">Get in Touch</p>
            <ul className="space-y-2">
              <li><a href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/faq" className="text-slate-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row border-t border-white/5 pt-6">
          <p>© {new Date().getFullYear()} LCN254. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Cinematic Hero ──────────────────────────────────────────────────────────
function CinematicHero() {
  const words = ["Small Businesses", "Growing Brands", "Enterprises", "Non-Profits", "Tech Startups", "Service Providers"];
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: "#020617" }}>
        <div style={{ position:"absolute", width:600, height:600, borderRadius:"60% 40% 70% 30% / 50% 60% 40% 50%",
          background:`radial-gradient(ellipse at center, ${T}18, transparent 70%)`, top:"-10%", left:"-5%",
          animation:"blob1 18s ease-in-out infinite", willChange:"transform" }} />
        <div style={{ position:"absolute", width:700, height:700, borderRadius:"40% 60% 30% 70% / 60% 40% 60% 40%",
          background:`radial-gradient(ellipse at center, ${P}12, transparent 70%)`, top:"10%", right:"-10%",
          animation:"blob2 22s ease-in-out infinite", willChange:"transform" }} />
        <div style={{ position:"absolute", width:500, height:500, borderRadius:"70% 30% 50% 50% / 40% 60% 40% 60%",
          background:"radial-gradient(ellipse at center, #6366f118, transparent 70%)", bottom:"-5%", left:"30%",
          animation:"blob3 26s ease-in-out infinite", willChange:"transform" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle, ${T}22 1px, transparent 1px)`,
          backgroundSize:"48px 48px", maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)", opacity:0.35 }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12 pt-28 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>

            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: T }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: T }} />
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
                Online now · Building across Kenya
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-4 leading-[1.02]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Websites for
              <br />
              <span className="relative inline-block min-w-[280px]">
                <AnimatePresence mode="wait">
                  <motion.span key={wordIdx}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 bg-gradient-to-r bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg,${T},${P})` }}>
                    {words[wordIdx]}
                  </motion.span>
                </AnimatePresence>
                <span className="invisible">{words[0]}</span>
              </span>
            </h1>

            <p className="text-slate-400 text-lg max-w-lg mb-10 leading-relaxed mt-6">
              We design and build modern, high-performance websites that help businesses establish credibility and generate customers online.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-slate-950 shadow-2xl"
                style={{ background: `linear-gradient(135deg,${T},${P})`, boxShadow: `0 0 40px ${T}40` }}>
                START YOUR PROJECT <ArrowRight className="h-5 w-5" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href="/work"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10">
                VIEW OUR WORK
              </motion.a>
            </div>

            <div className="mt-14 flex gap-8 sm:gap-12 flex-wrap">
              {[["3–5","Days to launch"],["Any","Business size"],["254","Kenya dial code"]].map(([v,l]) => (
                <motion.div key={l} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}>
                  <div className="text-2xl font-black text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{v}</div>
                  <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mt-0.5">{l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[420px]">
              <div className="absolute -inset-8 rounded-3xl blur-3xl opacity-25 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 60% 40%, ${T}, ${P})` }} />
              <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-md shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-slate-950/70">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 mx-3 bg-slate-800/80 rounded-md px-3 py-1.5 text-xs text-slate-400 font-mono flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: T }} />
                    <span>yourbusiness.co.ke</span>
                  </div>
                </div>
                <div className="p-5 space-y-4 bg-slate-900/60">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex-shrink-0" style={{ background: `linear-gradient(135deg,${T},${P})` }} />
                      <div className="h-2 w-16 rounded-full bg-white/20" />
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="h-2 w-8 rounded-full bg-white/10" />
                      <div className="h-2 w-8 rounded-full bg-white/10" />
                      <div className="h-7 w-20 rounded-lg text-xs font-bold flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg,${T},${P})`, color: "#0f172a", fontSize: 9 }}>Book Now</div>
                    </div>
                  </div>
                  <div className="rounded-xl p-4 space-y-2.5"
                    style={{ background: "linear-gradient(135deg,rgba(26,163,176,0.1),rgba(240,64,154,0.06))", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="h-3.5 w-3/4 rounded-full bg-white/25" />
                    <div className="h-3 w-1/2 rounded-full bg-white/15" />
                    <div className="h-2 w-5/6 rounded-full bg-white/10 mt-1" />
                    <div className="h-2 w-2/3 rounded-full bg-white/10" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[["Bookings","24",T],["Revenue","KSh 48k",P],["Visitors","1,204","#818cf8"]].map(([label,value,color]) => (
                      <div key={label} className="rounded-xl p-3 border border-white/5 bg-white/[0.03] text-center">
                        <div className="text-sm font-black text-white" style={{ color }}>{value}</div>
                        <div className="text-[9px] text-slate-500 mt-0.5 uppercase tracking-wider">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute -top-5 -right-5 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/95 px-3 py-2 backdrop-blur-md shadow-xl z-10">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: T }} />
                <span className="text-xs font-semibold text-white whitespace-nowrap">Site deployed ✓</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, transparent, ${T})` }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: T }} />
      </motion.div>
    </section>
  );
}

// ─── Home: Value strip ────────────────────────────────────────────────────────
function ValueStrip() {
  const features = [
    { icon: Zap,        title: "Live in 3–5 days",     desc: "From signed-off designs to a deployed URL." },
    { icon: Globe,      title: "Mobile-first always",   desc: "Your customers are on phones. So is our design process." },
    { icon: Shield,     title: "You own everything",    desc: "No lock-in, no proprietary CMS. Take the code anywhere." },
    { icon: TrendingUp, title: "Scales with you",       desc: "Add booking, payments, and integrations as your business grows." },
  ];
  return (
    <section className="px-6 py-20 lg:px-12 border-t border-white/5">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center mb-14">
            <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: T }}>Why LCN254</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Any business. Any scale. One agency.
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <motion.div whileHover={{ y: -4, borderColor: `${T}60` }}
                className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-md transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${T}18` }}>
                  <f.icon className="h-5 w-5" style={{ color: T }} />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Home: Services teaser (replaces old Templates teaser) ─────────────────
function ServicesTeaserStrip() {
  return (
    <section className="px-6 py-20 lg:px-12 border-t border-white/5">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest block mb-2" style={{ color: T }}>Services</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                What we build.
              </h2>
            </div>
            <a href="/services" className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors">
              View all services <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.slice(0, 6).map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <a href={`/services/${s.slug}`} className="group block rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-md hover:border-white/20 transition-colors">
                <h3 className="font-semibold text-white text-sm mb-1">{s.name}</h3>
                <p className="text-slate-500 text-xs">{s.shortDesc}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Home: Industries teaser ────────────────────────────────────────────────
function IndustriesTeaserStrip() {
  return (
    <section className="px-6 py-20 lg:px-12 border-t border-white/5">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest block mb-2" style={{ color: T }}>Industries</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Built around how your business works.
              </h2>
            </div>
            <a href="/industries" className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors">
              View all industries <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.slug} delay={i * 0.05}>
              <a href={`/industries/${ind.slug}`} className="group block rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center hover:border-white/20 transition-colors">
                <span className="text-sm font-semibold text-white">{ind.name}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Home: How it works ───────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n:"01", title:"Choose a starting point", desc:"Browse our services — from business websites to enterprise builds." },
    { n:"02", title:"Customize with us",     desc:"Tell us your branding, copy, and features. We handle the code." },
    { n:"03", title:"Go live in days",       desc:"We deploy, test on mobile, and hand you a site that works." },
  ];
  return (
    <section className="px-6 py-20 lg:px-12 border-t border-white/5">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="text-center mb-14">
            <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: T }}>Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Three steps to a live site.
            </h2>
          </div>
        </Reveal>
        <div className="relative">
          <div className="hidden sm:block absolute top-5 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="relative text-center sm:text-left">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm font-bold mx-auto sm:mx-0 mb-5 relative z-10"
                    style={{ background: `linear-gradient(135deg,${T},${P})`, color: "#0f172a" }}>{s.n}</div>
                  <h3 className="font-semibold text-white mb-3">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal>
          <div className="text-center mt-10">
            <a href="/process" className="text-sm font-semibold" style={{ color: T }}>See the full seven-step process →</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Home: Blog teaser ────────────────────────────────────────────────────────
function BlogTeaserStrip() {
  const previews = [
    { slug: "web-architecture-mistakes-costing-revenue", title: "Why Your Website Isn't Converting: 5 Invisible Web Architecture Mistakes", category: "Business Growth", date: "Aug 12, 2026", color: "#F0409A" },
    { slug: "ai-for-everyone-zuckerberg", title: "The Future Is for Everyone: Zuckerberg's Vision for Personal Superintelligence", category: "AI & Technology", date: "Aug 10, 2026", color: "#1AA3B0" },
    { slug: "why-your-business-needs-a-website-2026", title: "Why Every Kenyan Business Needs a Website in 2026 — Not a Facebook Page", category: "Business Growth", date: "Aug 5, 2026", color: "#6366f1" },
  ];
  return (
    <section className="px-6 py-20 lg:px-12 border-t border-white/5">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest block mb-2" style={{ color: T }}>From the Blog</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Tech news & business insights.
              </h2>
            </div>
            <a href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors">
              Read all articles <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {previews.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.07}>
              <a href={`/blog/${p.slug}`}
                className="group w-full text-left rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md overflow-hidden hover:border-white/20 transition-colors block">
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
                <div className="p-5">
                  <span className="text-xs font-semibold" style={{ color: p.color }}>{p.category}</span>
                  <h3 className="mt-2 font-semibold text-sm text-white group-hover:text-[#3FC1CB] transition-colors leading-snug">{p.title}</h3>
                  <p className="mt-3 text-xs text-slate-500">{p.date}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact page ─────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", business:"", message:"" });
  const [sent, setSent] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const inputCls = "w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:border-[#1AA3B0] focus:outline-none transition-colors placeholder-slate-500";

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <SEOHead title="Contact" description="Tell LCN254 about your business — get a quote or ask a question, we usually reply within a few hours." path="/contact" />
      <Nav route="/contact" />
      <main>
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-12">
              <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: T }}>Let's Talk</span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Tell us about your{" "}
                <span className="bg-gradient-to-r from-[#1AA3B0] to-[#F0409A] bg-clip-text text-transparent">business</span>.
              </h1>
              <p className="text-slate-400 max-w-xl">Pick a service, request a custom build, or just ask a question — we usually reply within a few hours.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <Reveal className="lg:col-span-3">
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md">
                {sent ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-12 text-center">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${T}18` }}>
                      <CheckCircle2 className="h-7 w-7" style={{ color: T }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Message sent!</h3>
                    <p className="text-slate-400">Thanks {form.name || ""}. We'll be in touch at {form.email} shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Name</label>
                        <input className={inputCls} placeholder="Jane Wanjiru" value={form.name} onChange={(e) => setF("name", e.target.value)} required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Email</label>
                        <input type="email" className={inputCls} placeholder="jane@business.co.ke" value={form.email} onChange={(e) => setF("email", e.target.value)} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Phone</label>
                        <input type="tel" className={inputCls} placeholder="+254 700 000 000" value={form.phone} onChange={(e) => setF("phone", e.target.value)} />
                      </div>
                      <div>
                        <label htmlFor="contact-business-select" className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Service interested in</label>
                        <select id="contact-business-select" className={inputCls} value={form.business} onChange={(e) => setF("business", e.target.value)}>
                          <option className="bg-slate-900" value="">Select one</option>
                          {SERVICES.map((s) => <option key={s.slug} className="bg-slate-900" value={s.slug}>{s.name}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Message</label>
                      <textarea className={inputCls} rows={4} placeholder="Tell us what you're building and any deadlines we should know about." value={form.message} onChange={(e) => setF("message", e.target.value)} required style={{ resize: "vertical" }} />
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-slate-950"
                      style={{ background: `linear-gradient(135deg,${T},${P})` }}>
                      Send Message <Send className="h-4 w-4" />
                    </motion.button>
                  </form>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-2 flex flex-col gap-4">
              {[
                { icon: MessageCircle, label: "WhatsApp", value: "+254 700 000 000", href: "https://wa.me/254700000000", color: "#00A651" },
                { icon: Mail,          label: "Email",    value: "contact@lcn254.site", href: "mailto:contact@lcn254.site", color: T },
                { icon: Phone,         label: "Call",     value: "+254 700 000 000", href: "tel:+254700000000", color: T },
                { icon: Clock,         label: "Response", value: "Usually 2–4 hours", href: null, color: null },
                { icon: MapPin,        label: "Based in", value: "Nairobi, Kenya — working nationwide", href: null, color: null },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <motion.div key={label} whileHover={{ x: 4 }}>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" data-native
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md transition-colors hover:border-[#1AA3B0]/40">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: `${color || T}18`, color: color || T }}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
                        <p className="text-sm text-white">{value}</p>
                      </div>
                      <ArrowRight className="ml-auto h-4 w-4 text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-[#3FC1CB]" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: `${T}18`, color: T }}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
                        <p className="text-sm text-white">{value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>

      <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer" data-native aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
        style={{ background: `linear-gradient(135deg,${T},${P})` }}>
        <MessageCircle className="h-6 w-6" />
      </a>

      </main>
      <Footer />
    </div>
  );
}

// ─── About page ───────────────────────────────────────────────────────────────
function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const timeline = [
    { year:"2022", event:"Started building sites for Nairobi restaurants and hotels — freelance, nothing formal." },
    { year:"2023", event:"Moved into a structured agency model after seeing the same problems across every industry: no online presence, broken booking flows, no payments." },
    { year:"2024", event:"Built our first repeatable service offerings — industry-specific approaches for SMEs that cut delivery time while maintaining quality." },
    { year:"2025", event:"Took on larger enterprise, e-commerce, and multi-page platform projects." },
    { year:"2026", event:"LCN254 today — a focused agency doing one thing well: fast, reliable websites for growing businesses." },
  ];
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <SEOHead title="About LCN254" description="LCN254 is a Nairobi-based web agency building fast, functional websites for businesses of every size, in Kenya and internationally." path="/about" />
      <Nav route="/about" />
      <main>
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-16">
              <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: T }}>About LCN254</span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Modern, high-performance websites for{" "}
                <span className="bg-gradient-to-r from-[#1AA3B0] to-[#F0409A] bg-clip-text text-transparent">growing businesses.</span>
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                LCN254 is a Nairobi-based web design and development agency. We build fast, functional websites for businesses in Kenya and internationally — from a first-time entrepreneur launching a landing page to an established company needing a full digital platform.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-16 p-6 rounded-2xl border border-white/5 bg-slate-900/40">
              {[["3–5","Days average"],["SME→Enterprise","Scale we serve"],["254","Kenya dial code"]].map(([v,l]) => (
                <div key={l} className="text-center">
                  <div className="text-3xl font-black mb-1 bg-gradient-to-r from-[#1AA3B0] to-[#F0409A] bg-clip-text text-transparent" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{v}</div>
                  <div className="text-slate-500 text-xs font-mono uppercase tracking-wider">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-16">
            <Reveal>
              <h2 className="text-2xl font-bold text-white mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>The name is the mission.</h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p><span className="text-white font-semibold">LCN254</span> — Local Commerce Network, dial code 254. The name says what we're here to do: help businesses compete online, starting from Kenya and working with clients worldwide.</p>
                <p>We started serving small businesses because that's where the gap was biggest. Today we work with SMEs, corporates, and service businesses of every size — the tools and standards are the same, the scope just grows.</p>
                <p>We're a small team. You talk directly to the person building your site — no account managers, no handoffs.</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative">
                <div className="absolute left-3.5 top-0 bottom-0 w-px bg-white/10" />
                <div className="space-y-7 relative">
                  {timeline.map((t, i) => (
                    <div key={t.year} className="flex gap-5 items-start">
                      <div className="relative shrink-0">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold relative z-10"
                          style={i === timeline.length-1
                            ? { background: `linear-gradient(135deg,${T},${P})`, color: "#0f172a" }
                            : { background: "#1e293b", color: "#64748b", border: "1px solid rgba(255,255,255,0.1)" }} />
                      </div>
                      <div>
                        <div className="font-mono text-xs mb-1" style={{ color: T }}>{t.year}</div>
                        <p className="text-slate-400 text-sm leading-relaxed">{t.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>What we actually believe.</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
              {[
                { icon:"⚡", t:"Speed is a feature",    d:"Slow sites lose customers, especially on mobile data." },
                { icon:"📍", t:"Built for how you work",  d:"M-Pesa, local pricing, and international client needs — we build for real business conditions." },
                { icon:"🔒", t:"No lock-in",             d:"You own everything we build. No proprietary CMS, no monthly platform fees." },
                { icon:"🎯", t:"Honest scoping",         d:"We quote what the work actually costs. No surprise invoices halfway through." },
              ].map((v) => (
                <motion.div key={v.t} whileHover={{ y: -3 }} className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-md">
                  <div className="text-2xl mb-3">{v.icon}</div>
                  <h3 className="font-semibold text-white mb-2">{v.t}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.d}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="text-center rounded-2xl border border-white/5 bg-slate-900/40 p-10">
              <h2 className="text-2xl font-bold text-white mb-3">Ready to build something?</h2>
              <p className="text-slate-400 mb-6">Browse our services, pick what fits, and get in touch.</p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <motion.a whileHover={{ scale: 1.02 }} href="/services"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-slate-950"
                  style={{ background: `linear-gradient(135deg,${T},${P})` }}>
                  Browse Services <ArrowRight className="h-4 w-4" />
                </motion.a>
                <motion.a whileHover={{ scale: 1.02 }} href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                  Get in Touch
                </motion.a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}

// ─── FAQ page ─────────────────────────────────────────────────────────────────
const FAQS = [
  { q:"How long does it take to launch my website?",     a:"Most business websites go live within 3–5 business days from the moment you confirm your content and branding. Larger or custom builds are scoped individually." },
  { q:"Do I own the website after it's built?",          a:"Yes. Once we hand it over, the site and all its code are yours." },
  { q:"Can I accept M-Pesa payments through my site?",   a:"Yes, where it's part of the agreed scope for an e-commerce or booking project — implemented and tested before launch." },
  { q:"Do you only work with small businesses?",         a:"No — we work with SMEs, corporates, and professional service businesses of every size, in Kenya and internationally." },
  { q:"Do you offer hosting?",                           a:"Yes, most sites we build are deployed to fast, reliable hosting we manage." },
  { q:"Can you update my site after launch?",            a:"Yes — see our Website Maintenance service for ongoing support plans." },
  { q:"Is my site going to be mobile-friendly?",         a:"Every site we build is fully responsive — mobile is always our primary design target." },
];
function FAQPage() {
  const [open, setOpen] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <SEOHead title="Frequently Asked Questions" description="Common questions about working with LCN254 — timelines, pricing, hosting, and payments." path="/faq" />
      <Nav route="/faq" />
      <main>
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: T }}>FAQ</span>
              <h1 className="text-4xl font-bold tracking-tight text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Questions we get a lot</h1>
              <p className="text-slate-400">Can't find what you're looking for? Email us at{" "}
                <a href="mailto:contact@lcn254.site" data-native className="underline" style={{ color: T }}>contact@lcn254.site</a>
              </p>
            </div>
          </Reveal>
          <div>
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="border-b border-white/5">
                  <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left gap-4 group">
                    <span className="font-semibold text-white group-hover:text-[#3FC1CB] transition-colors">{faq.q}</span>
                    <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                      className="shrink-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-slate-400">
                      <Plus className="h-3.5 w-3.5" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                        <p className="pb-6 text-slate-400 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}

// ─── Privacy page ─────────────────────────────────────────────────────────────
function PrivacyPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const sections = [
    { t:"1. Who We Are",           b:`LCN254 is a web design and development agency based in Nairobi, Kenya, serving clients in Kenya and internationally. Our website is lcn254.site — reach us at contact@lcn254.site.` },
    { t:"2. Information We Collect",b:`We collect your name, email, phone, and service of interest through our contact form.` },
    { t:"3. How We Use Your Information",b:`We use contact form submissions to respond to inquiries and quote requests only. We do not sell your data to any third party.` },
    { t:"4. Payments",             b:`Where payment integrations are part of a project (e.g. M-Pesa, card processors), we do not store card details or M-Pesa PINs.` },
    { t:"5. Cookies & Analytics",  b:`We do not use tracking cookies or analytics platforms that identify individual users.` },
    { t:"6. Data Storage & Security",b:`Contact form submissions go to contact@lcn254.site via Zoho Mail.` },
    { t:"7. Third-Party Services", b:`We use Google Fonts (CDN) and Framer Motion (bundled) in our own site.` },
    { t:"8. Your Rights (Kenya Data Protection Act 2019)",b:`You have the right to access, correct, or request deletion of personal data. Email contact@lcn254.site with subject "Data Request" — we respond within 14 days.` },
    { t:"9. Children's Privacy",   b:`Our services are not directed at children under 18.` },
    { t:"10. Contact",             b:`Questions about this policy? Email contact@lcn254.site or write to: LCN254, Nairobi, Kenya.` },
  ];
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <SEOHead title="Privacy Policy" description="LCN254's privacy policy covering data collection, use, and your rights." path="/privacy" />
      <Nav route="/privacy" />
      <main>
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="mb-10">
              <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: T }}>Legal</span>
              <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
              <p className="text-slate-500 text-sm">Last updated: {new Date().toLocaleDateString("en-KE",{year:"numeric",month:"long",day:"numeric"})}</p>
            </div>
          </Reveal>
          <div className="space-y-8">
            {sections.map((s,i) => (
              <Reveal key={s.t} delay={i * 0.04}>
                <div>
                  <h2 className="text-base font-semibold text-white mb-2">{s.t}</h2>
                  <p className="text-slate-400 leading-relaxed text-sm">{s.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}

// ─── Welcome Splash ──────────────────────────────────────────────────────────
function WelcomeSplash({ onDone }) {
  const [phase, setPhase] = useState("in");
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"), 1800);
    const t2 = setTimeout(() => onDone(), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);
  return (
    <motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950"
      animate={{ opacity: phase === "out" ? 0 : 1 }} transition={{ duration: 0.6 }}
      style={{ pointerEvents: phase === "out" ? "none" : "all" }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#1AA3B0]/20 blur-[100px]" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#F0409A]/15 blur-[100px]" />
      </div>
      <motion.div initial={{ opacity:0, scale:0.9, y:20 }} animate={{ opacity:1, scale:1, y:0 }}
        transition={{ duration:0.6, ease:[0.22,1,0.36,1] }} className="relative flex flex-col items-center text-center px-6">
        <img src={`${import.meta.env.BASE_URL}lcn254-logo.jpeg`} alt="LCN254" width="80" height="80" className="rounded-2xl object-cover mb-6 shadow-2xl" style={{ width:80,height:80 }} />
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
          Welcome to{" "}
          <span className="bg-gradient-to-r from-[#1AA3B0] to-[#F0409A] bg-clip-text text-transparent">LCN254</span>
        </h1>
        <p className="text-slate-400 max-w-xs">Modern, high-performance websites for businesses in Kenya and worldwide.</p>
        <div className="mt-10 w-48 h-0.5 bg-slate-800 rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg,${T},${P})` }}
            initial={{ width:"0%" }} animate={{ width:"100%" }} transition={{ duration:1.7, ease:"linear" }} />
        </div>
        <p className="mt-4 font-mono text-xs text-slate-600 uppercase tracking-widest">dial +254 · locally built</p>
      </motion.div>
    </motion.div>
  );
}

// ─── Home page ────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <SEOHead
        title="Modern Websites That Grow Your Business"
        description="LCN254 designs and builds modern, high-performance websites that help businesses establish credibility and generate customers online — in Kenya and worldwide."
        path="/"
      />
      <Nav route="/" />
      <main>
      <CinematicHero />
      <ValueStrip />
      <ServicesTeaserStrip />
      <IndustriesTeaserStrip />
      <HowItWorks />
      <BlogTeaserStrip />
      </main>
      <Footer />
    </div>
  );
}

// ─── Route table ──────────────────────────────────────────────────────────────
// Every route below corresponds to a real, crawlable URL. Dynamic segments
// (:slug) are resolved against the relevant data file inside each detail page.
function matchStatic(pathname, pattern) {
  return pathname === pattern;
}
function matchDynamic(pathname, prefix) {
  if (!pathname.startsWith(prefix + "/")) return null;
  return pathname.slice(prefix.length + 1);
}

function RouteOutlet() {
  const { pathname } = useRouter();

  if (matchStatic(pathname, "/")) return <HomePage />;
  if (matchStatic(pathname, "/services")) return (<><Nav route="/services" /><ServicesPage /><Footer /></>);
  if (matchStatic(pathname, "/work")) return (<><Nav route="/work" /><WorkPage /><Footer /></>);
  if (matchStatic(pathname, "/industries")) return (<><Nav route="/industries" /><IndustriesPage /><Footer /></>);
  if (matchStatic(pathname, "/pricing")) return (<><Nav route="/pricing" /><PricingPage /><Footer /></>);
  if (matchStatic(pathname, "/process")) return (<><Nav route="/process" /><ProcessPage /><Footer /></>);
  if (matchStatic(pathname, "/about")) return <AboutPage />;
  if (matchStatic(pathname, "/contact")) return <ContactPage />;
  if (matchStatic(pathname, "/faq")) return <FAQPage />;
  if (matchStatic(pathname, "/privacy")) return <PrivacyPage />;
  if (matchStatic(pathname, "/blog")) return (<><Nav route="/blog" /><BlogIndexPage /><Footer /></>);

  const blogSlug = matchDynamic(pathname, "/blog");
  if (blogSlug) return (<><Nav route="/blog" /><BlogArticlePage slug={blogSlug} /><Footer /></>);

  const serviceSlug = matchDynamic(pathname, "/services");
  if (serviceSlug) return (<><Nav route="/services" /><ServiceDetailPage slug={serviceSlug} /><Footer /></>);

  const workSlug = matchDynamic(pathname, "/work");
  if (workSlug) return (<><Nav route="/work" /><CaseStudyPage slug={workSlug} /><Footer /></>);

  const industrySlug = matchDynamic(pathname, "/industries");
  if (industrySlug) return (<><Nav route="/industries" /><IndustryDetailPage slug={industrySlug} /><Footer /></>);

  return (<><Nav route={pathname} /><NotFoundPage /><Footer /></>);
}

function AppInner() {
  const { pathname } = useRouter();
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("lcn254-welcomed") && pathname === "/";
  });

  const handleSplashDone = useCallback(() => {
    sessionStorage.setItem("lcn254-welcomed", "1");
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <WelcomeSplash onDone={handleSplashDone} />}
      <div style={{ opacity: showSplash ? 0 : 1, transition: "opacity 0.4s ease" }}>
        <AnimatePresence mode="wait">
          <PageWrap id={pathname}>
            <RouteOutlet />
          </PageWrap>
        </AnimatePresence>
      </div>
    </>
  );
}

export default function LCN254Portfolio({ url }) {
  return (
    <RouterProvider initialPath={url}>
      <AppInner />
    </RouterProvider>
  );
}
