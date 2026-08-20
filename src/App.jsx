import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InvoiceGenerator from "./InvoiceGenerator.jsx";
import { BlogIndexPage, BlogArticlePage } from "./Blog.jsx";
import AdUnit from "./AdUnit.jsx";
import {
  Sparkles, UtensilsCrossed, Stethoscope, Scissors, BedDouble, Home,
  Truck, ChefHat, ShoppingBag, CheckCircle2, PlayCircle, Rocket,
  ArrowRight, MessageCircle, Mail, Phone, Clock, Send, MapPin,
  Plus, ArrowLeft, Zap, Globe, Shield, TrendingUp, ChevronRight, Award, Users,
} from "lucide-react";

// ─── Brand tokens ───────────────────────────────────────────────────────────
const T = "#1AA3B0";  // teal
const P = "#F0409A";  // pink
const BG = "from-[#1AA3B0] to-[#F0409A]";

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

// ─── Template data ───────────────────────────────────────────────────────────
const FILTERS = [
  { id: "all",         label: "All Suites" },
  { id: "hospitality", label: "Hospitality & Food" },
  { id: "health",      label: "Health & Wellness" },
  { id: "services",    label: "Services & Commerce" },
  { id: "enterprise",  label: "Enterprise & Custom" },
];

const GLOW = {
  cyan:    { text:"text-cyan-300",    ring:"group-hover:border-cyan-400/40",    pill:"bg-cyan-500/10 text-cyan-300 border-cyan-400/30",    glow:"bg-cyan-500/25",    gradient:"from-cyan-400 to-cyan-600",    check:"text-cyan-400"    },
  indigo:  { text:"text-indigo-300",  ring:"group-hover:border-indigo-400/40",  pill:"bg-indigo-500/10 text-indigo-300 border-indigo-400/30",  glow:"bg-indigo-500/25",  gradient:"from-indigo-400 to-indigo-600",  check:"text-indigo-400"  },
  amber:   { text:"text-amber-300",   ring:"group-hover:border-amber-400/40",   pill:"bg-amber-500/10 text-amber-300 border-amber-400/30",   glow:"bg-amber-500/25",   gradient:"from-amber-400 to-amber-600",   check:"text-amber-400"   },
  teal:    { text:"text-[#3FC1CB]",   ring:"group-hover:border-[#1AA3B0]/40",   pill:"bg-[#1AA3B0]/10 text-[#3FC1CB] border-[#1AA3B0]/30",   glow:"bg-[#1AA3B0]/25",   gradient:"from-[#1AA3B0] to-[#12707A]",   check:"text-[#3FC1CB]"   },
  pink:    { text:"text-[#F778B6]",   ring:"group-hover:border-[#F0409A]/40",   pill:"bg-[#F0409A]/10 text-[#F778B6] border-[#F0409A]/30",   glow:"bg-[#F0409A]/25",   gradient:"from-[#F0409A] to-[#C21C6E]",   check:"text-[#F778B6]"   },
};

const TEMPLATE_TO_BUSINESS_TYPE = {
  restaurants:"restaurant", clinics:"clinic", spas:"spa", hotels:"hotel",
  airbnb:"rental", logistics:"logistics", catering:"catering", ecommerce:"ecommerce",
  corporate:"custom", ngo:"custom", saas:"custom", custom:"custom",
};
const TEMPLATE_TO_DEMO_PATH = {
  restaurants:"demos/restaurant.html", clinics:"demos/clinic.html",
  spas:"demos/spa-barbershop.html", hotels:"demos/boutique-hotel.html",
  airbnb:"demos/vacation-rental.html", logistics:"demos/logistics.html",
  catering:"demos/private-chef.html", ecommerce:"demos/ecommerce.html",
  corporate:null, ngo:null, saas:null, custom:null,
};

const TEMPLATES = [
  { id:"restaurants", category:"hospitality", icon:UtensilsCrossed, color:"cyan",   badge:"Restaurant Suite",     name:"Restaurants & Cafés",             description:"A digital dining room — guests browse the menu, reserve a table, and follow their order in real time.", features:["Live Table Booking","Digital Menu Builder","Order Status Tracking"] },
  { id:"clinics",     category:"health",      icon:Stethoscope,    color:"indigo", badge:"Clinical Suite",       name:"Medical Clinics & Health Centers", description:"Patients self-schedule, browse departments, and arrive prepared — no receptionist bottleneck.",           features:["Appointment Scheduling","Patient Portal Preview","Department Directory"] },
  { id:"spas",        category:"health",      icon:Scissors,       color:"pink",   badge:"Spa & Grooming Suite", name:"Spas & Barbershops",              description:"Clients choose a stylist, a slot, and a package with the price shown up front.",                          features:["Staff Selection Calendar","Priced Service Packages","Instant Rebooking"] },
  { id:"hotels",      category:"hospitality", icon:BedDouble,      color:"cyan",   badge:"Boutique Stay Suite",  name:"Small Hotels & Boutique Stays",   description:"Real-time room availability and a direct booking flow guests can complete before they even call.",         features:["Room Availability Engine","Virtual Room Tour","Direct Rate Booking"] },
  { id:"airbnb",      category:"hospitality", icon:Home,           color:"teal",   badge:"Vacation Rental Suite",name:"Airbnbs & Vacation Rentals",      description:"Your own booking engine, so a stay gets confirmed without a platform's commission.",                      features:["Zero Fee Bookings","Host Story & Bio","Property Showcase Gallery"] },
  { id:"logistics",   category:"services",    icon:Truck,          color:"indigo", badge:"Logistics Suite",      name:"Delivery & Logistics Services",   description:"Customers confirm coverage, get an instant quote, and track a package — no calls needed.",                 features:["Service-Area Checker","Instant Quote Calculator","Live Package Tracking"] },
  { id:"catering",    category:"hospitality", icon:ChefHat,        color:"pink",   badge:"Private Chef Suite",   name:"Private Chefs & Catering",        description:"Menus built with the client, events booked to a date, dietary needs captured — not lost in a chat thread.", features:["Custom Menu Builder","Event Inquiry Booking","Dietary Preference Forms"] },
  { id:"ecommerce",   category:"services",    icon:ShoppingBag,    color:"teal",   badge:"Retail Suite",         name:"E-commerce & Retail",             description:"A fast, focused checkout that keeps working on a weak connection and settles the moment it's back.",         features:["Offline-First Cart","Fast One-Page Checkout","M-Pesa / Card Ready"] },
  { id:"corporate",   category:"enterprise",  icon:Award,          color:"indigo", badge:"Corporate Suite",      name:"Corporates & SMEs",               description:"A professional web presence for established businesses — team pages, service directories, and lead capture that works.", features:["Service Directory","Team & Leadership Pages","Lead Generation Forms"] },
  { id:"ngo",         category:"enterprise",  icon:Users,          color:"teal",   badge:"NGO & Non-Profit Suite",name:"NGOs & Non-Profits",              description:"Impact reporting, donation flows, and programme showcases that tell your story and drive support.",               features:["Programme Showcase","Donation Integration","Impact Reporting"] },
  { id:"saas",        category:"enterprise",  icon:Globe,          color:"pink",   badge:"SaaS & Tech Suite",    name:"SaaS & Tech Products",            description:"Product landing pages, pricing tables, and onboarding flows built to convert trials into paying customers.",         features:["Pricing Table & Plans","Product Demo Section","Trial Signup Flow"] },
  { id:"custom",      category:"enterprise",  icon:Sparkles,       color:"amber",  badge:"Custom Build",         name:"Something Else Entirely",         description:"Outside the categories above? We scope, design, and build from scratch — same speed and quality standard.",          features:["Discovery & Scoping","Custom Design System","Fixed-Quote Build"] },
];

// ─── FAQs ───────────────────────────────────────────────────────────────────
const FAQS = [
  { q:"How long does it take to launch my website?",     a:"Most template-based sites go live within 3–5 business days from the moment you confirm your content and branding. Custom builds are scoped individually — we'll give you a clear timeline during the discovery call." },
  { q:"Do I own the website after it's built?",          a:"Yes. Once we hand it over, the site and all its code are yours. We can also manage hosting and updates for you on a monthly retainer if you prefer." },
  { q:"Can I accept M-Pesa payments through my site?",   a:"Yes — all our e-commerce and booking templates are M-Pesa ready via the Safaricom Daraja API. We handle the integration as part of the build." },
  { q:"Do you only work with small businesses?", a:"No — we started with small businesses because that's where the gap was biggest, but we work with SMEs, corporates, NGOs, and tech startups too. The standards are the same; the scope and budget just grow with the project." },
  { q:"Do you offer hosting?",                           a:"We deploy to fast, reliable infrastructure (GitHub Pages for static sites, Cloudflare Workers for server-side logic). Hosting is free for most sites." },
  { q:"What does the AI Invoice Generator cost?",        a:"It's launching at KES 130 (approx. $1) per document — pay once, download your PDF, no subscription or account required. It's finishing testing now; use the 'Notify me' link on the invoice page to hear when it's live." },
  { q:"Can you update my site after launch?",            a:"Yes. We offer ad-hoc updates (billed per session) and monthly maintenance retainers. Most small content changes can be quoted and delivered within 24 hours." },
  { q:"Is my site going to be mobile-friendly?",         a:"Every site we build is fully responsive — mobile is always our primary design target since most of your customers will arrive on a phone." },
];

// ─── Shared: Nav ─────────────────────────────────────────────────────────────
function Nav({ onNavigate, route }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Templates", hash: "#templates" },
    { label: "Pricing",   hash: "#pricing" },
    { label: "Blog",      hash: "#blog" },
    { label: "About",     hash: "#about" },
    { label: "Contact",   hash: "#contact" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      animate={{ backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
        background: scrolled ? "rgba(2,6,23,0.85)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-12">
        <button onClick={() => onNavigate("#home")} className="flex items-center gap-2.5">
          <img src={`${import.meta.env.BASE_URL}lcn254-logo.jpeg`} alt="LCN254 logo"
            width="36" height="36" fetchpriority="high" decoding="async"
            className="h-9 w-9 rounded-lg object-cover" />
          <span className="font-semibold tracking-tight text-white text-sm">
            LCN<span className="font-mono" style={{ color: T }}>254</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          {links.map(l => (
            <button key={l.hash} onClick={() => onNavigate(l.hash)}
              className={`transition-colors hover:text-white ${route === l.hash ? "text-white font-medium" : ""}`}>
              {l.label}
            </button>
          ))}
          <button onClick={() => onNavigate("#invoice")}
            className="font-medium transition-colors hover:text-white"
            style={{ color: T }}>
            ✦ Invoice AI
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => onNavigate("#contact")}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10">
            Get a Quote <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          <div className="space-y-1.5">
            <motion.div className="h-0.5 w-6 bg-white" animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} />
            <motion.div className="h-0.5 w-6 bg-white" animate={{ opacity: menuOpen ? 0 : 1 }} />
            <motion.div className="h-0.5 w-6 bg-white" animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-slate-950/95 border-t border-white/5">
            <div className="px-6 py-4 space-y-3">
              {links.map(l => (
                <button key={l.hash} onClick={() => { onNavigate(l.hash); setMenuOpen(false); }}
                  className="block text-slate-300 hover:text-white text-sm py-2 w-full text-left">
                  {l.label}
                </button>
              ))}
              <button onClick={() => { onNavigate("#invoice"); setMenuOpen(false); }}
                className="block text-sm py-2 font-medium" style={{ color: T }}>
                ✦ Invoice AI
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── Shared: Footer ──────────────────────────────────────────────────────────
function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-white/5 bg-slate-950 px-6 py-10 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row border-t border-white/5 pt-6">
          <p>© {new Date().getFullYear()} LCN254. All rights reserved.</p>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            {[["Templates","#templates"],["Pricing","#pricing"],["Blog","#blog"],["About","#about"],["Contact","#contact"],["FAQ","#faq"],["Privacy","#privacy"]].map(([l,h]) => (
              <button key={h} onClick={() => onNavigate(h)}
                className="transition-colors hover:text-white">{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Cinematic Hero ──────────────────────────────────────────────────────────
function CinematicHero({ onNavigate }) {
  const words = ["a home online.", "a website of its own.", "space to be told.", "room to grow.", "its own address.", "more than a caption."];
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Pure CSS background — runs entirely on compositor thread ── */}
      {/* No canvas, no JS animation loop, zero scroll impact */}
      <div className="absolute inset-0" style={{ background: "#020617" }}>

        {/* Morphing blobs — CSS only, transform & opacity only (compositor) */}
        <div style={{
          position:"absolute", width:600, height:600,
          borderRadius:"60% 40% 70% 30% / 50% 60% 40% 50%",
          background:`radial-gradient(ellipse at center, ${T}18, transparent 70%)`,
          top:"-10%", left:"-5%",
          animation:"blob1 18s ease-in-out infinite",
          willChange:"transform",
        }} />
        <div style={{
          position:"absolute", width:700, height:700,
          borderRadius:"40% 60% 30% 70% / 60% 40% 60% 40%",
          background:`radial-gradient(ellipse at center, ${P}12, transparent 70%)`,
          top:"10%", right:"-10%",
          animation:"blob2 22s ease-in-out infinite",
          willChange:"transform",
        }} />
        <div style={{
          position:"absolute", width:500, height:500,
          borderRadius:"70% 30% 50% 50% / 40% 60% 40% 60%",
          background:"radial-gradient(ellipse at center, #6366f118, transparent 70%)",
          bottom:"-5%", left:"30%",
          animation:"blob3 26s ease-in-out infinite",
          willChange:"transform",
        }} />

        {/* Dot-grid overlay — static SVG background, no animation */}
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:`radial-gradient(circle, ${T}22 1px, transparent 1px)`,
          backgroundSize:"48px 48px",
          maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          opacity:0.35,
        }} />
      </div>

      {/* Dark fade to page body */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12 pt-28 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">

          {/* ── LEFT: copy ── */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>

            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: T }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: T }} />
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
                Every story deserves to be told · Building across Kenya
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-4 leading-[1.02]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Every story deserves
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
              Human beings are storytellers. We put meaning into words, images, and emotion — then build the website that tells yours. Personal or professional, it's your story, told your way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate("#templates")}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-slate-950 shadow-2xl"
                style={{ background: `linear-gradient(135deg,${T},${P})`, boxShadow: `0 0 40px ${T}40` }}>
                Start Your Story <ArrowRight className="h-5 w-5" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate("#contact")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10">
                Get a Free Quote
              </motion.button>
            </div>

            {/* Stats */}
            <div className="mt-14 flex gap-8 sm:gap-12 flex-wrap">
              {[["48+","Sites delivered"],["3–5","Days to launch"],["Any","Business size"]].map(([v,l]) => (
                <motion.div key={l} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}>
                  <div className="text-2xl font-black text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{v}</div>
                  <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mt-0.5">{l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: floating mockup card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col items-center justify-center"
          >
            <div className="relative w-full max-w-[420px]">
              {/* Ambient glow behind card */}
              <div className="absolute -inset-8 rounded-3xl blur-3xl opacity-25 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 60% 40%, ${T}, ${P})` }} />

              {/* Main browser chrome */}
              <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-md shadow-2xl overflow-hidden">

                {/* Browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-slate-950/70">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 mx-3 bg-slate-800/80 rounded-md px-3 py-1.5 text-xs text-slate-400 font-mono flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: T }} />
                    <span>yourbusiness.co.ke</span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 1, ease: "steps(1)" }}
                      className="w-0.5 h-3 bg-slate-400 ml-auto"
                    />
                  </div>
                </div>

                {/* Simulated site content */}
                <div className="p-5 space-y-4 bg-slate-900/60">

                  {/* Mock nav bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex-shrink-0"
                        style={{ background: `linear-gradient(135deg,${T},${P})` }} />
                      <div className="h-2 w-16 rounded-full bg-white/20" />
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="h-2 w-8 rounded-full bg-white/10" />
                      <div className="h-2 w-8 rounded-full bg-white/10" />
                      <div className="h-7 w-20 rounded-lg text-xs font-bold flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg,${T},${P})`, color: "#0f172a", fontSize: 9 }}>
                        Book Now
                      </div>
                    </div>
                  </div>

                  {/* Mock hero */}
                  <div className="rounded-xl p-4 space-y-2.5"
                    style={{ background: "linear-gradient(135deg,rgba(26,163,176,0.1),rgba(240,64,154,0.06))", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="h-3.5 w-3/4 rounded-full bg-white/25" />
                    <div className="h-3 w-1/2 rounded-full bg-white/15" />
                    <div className="h-2 w-5/6 rounded-full bg-white/10 mt-1" />
                    <div className="h-2 w-2/3 rounded-full bg-white/10" />
                    <div className="flex gap-2 mt-3">
                      <div className="h-8 w-24 rounded-lg flex items-center justify-center text-[9px] font-bold"
                        style={{ background: `linear-gradient(135deg,${T},${P})`, color: "#0f172a" }}>
                        Get Started
                      </div>
                      <div className="h-8 w-20 rounded-lg border border-white/15 bg-white/5" />
                    </div>
                  </div>

                  {/* Live stats row */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Bookings", value: "24", color: T },
                      { label: "Revenue", value: "KSh 48k", color: P },
                      { label: "Visitors", value: "1,204", color: "#818cf8" },
                    ].map(s => (
                      <div key={s.label} className="rounded-xl p-3 border border-white/5 bg-white/[0.03] text-center">
                        <div className="text-sm font-black text-white" style={{ color: s.color }}>{s.value}</div>
                        <div className="text-[9px] text-slate-500 mt-0.5 uppercase tracking-wider">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Mock feature pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {[["M-Pesa",T],["Stripe",P],["Booking","#818cf8"],["WhatsApp","#22c55e"],["SEO","#f59e0b"]].map(([l, color]) => (
                      <div key={l} className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                        style={{ background: `${color}18`, color, border: `1px solid ${color}40` }}>
                        {l}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge — top right */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute -top-5 -right-5 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/95 px-3 py-2 backdrop-blur-md shadow-xl z-10"
              >
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: T }} />
                <span className="text-xs font-semibold text-white whitespace-nowrap">Site deployed ✓</span>
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-5 -left-5 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/95 px-3 py-2 backdrop-blur-md shadow-xl z-10"
              >
                <motion.div className="w-2 h-2 rounded-full flex-shrink-0"
                  animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.4 }}
                  style={{ background: "#22c55e" }} />
                <span className="text-xs font-semibold text-white whitespace-nowrap">New booking received</span>
              </motion.div>

              {/* Floating badge — middle right */}
              <div
                className="absolute top-1/2 -right-10 -translate-y-1/2 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/95 px-3 py-2 backdrop-blur-md shadow-xl z-10"
              >
                <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center"
                  style={{ background: `${P}20` }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: P }} />
                </div>
                <span className="text-xs font-semibold text-white whitespace-nowrap">M-Pesa paid</span>
              </div>
            </div>
            <p className="mt-9 text-center text-[11px] font-mono uppercase tracking-widest text-slate-600">
              Concept preview — not a real client site
            </p>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, transparent, ${T})` }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: T }} />
      </motion.div>
    </section>
  );
}

// ─── Home: Value strip ────────────────────────────────────────────────────────
function ValueStrip({ onNavigate }) {
  const features = [
    { icon: Zap,        title: "Told at the right pace",  desc: "From signed-off designs to a deployed URL in 3–5 days. A story worth telling shouldn't wait months to be heard." },
    { icon: Globe,      title: "Wherever they're reading", desc: "Most people meet your story on a phone first. So every site starts there, not as an afterthought." },
    { icon: Shield,     title: "Yours, not ours",          desc: "No lock-in, no proprietary CMS. It's your story — you should be able to take it anywhere." },
    { icon: TrendingUp, title: "Room to keep growing",     desc: "Start with a single page. Add booking, payments, and new chapters as the story continues." },
  ];

  return (
    <section className="px-6 py-20 lg:px-12 border-t border-white/5">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center mb-14">
            <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: T }}>How We Tell It</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Words, design, and feeling — built to last.
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <motion.div whileHover={{ y: -4, borderColor: `${T}60` }}
                className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-md transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${T}18` }}>
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

// ─── Home: Template teaser ────────────────────────────────────────────────────
function TemplateTeaserStrip({ onNavigate }) {
  const preview = TEMPLATES.slice(0, 4);
  return (
    <section className="px-6 py-20 lg:px-12 border-t border-white/5">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest block mb-2" style={{ color: T }}>Starting Points</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Every story needs a shape.
              </h2>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNavigate("#templates")}
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors">
              View all templates <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {preview.map((t, i) => {
            const c = GLOW[t.color];
            return (
              <Reveal key={t.id} delay={i * 0.07}>
                <motion.div whileHover={{ y: -3 }}
                  className={`group rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-md cursor-pointer transition-colors ${c.ring}`}
                  onClick={() => onNavigate("#templates")}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${c.glow} bg-opacity-20`}
                    style={{ background: `rgba(26,163,176,0.12)` }}>
                    <t.icon className={`h-5 w-5 ${c.text}`} />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1">{t.name}</h3>
                  <p className="text-slate-500 text-xs">{t.features[0]} · {t.features[1]}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Home: Pricing teaser ──────────────────────────────────────────────────────
function PricingTeaserStrip({ onNavigate }) {
  const rows = [
    { name: "Launch",     price: "From KSh 35,000", desc: "Landing page, 3–5 days" },
    { name: "Business",   price: "From KSh 75,000", desc: "Booking + payments, 5–7 days" },
    { name: "Enterprise", price: "Custom quote",     desc: "Portals & integrations, scoped" },
  ];
  return (
    <section className="px-6 py-20 lg:px-12 border-t border-white/5">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest block mb-2" style={{ color: T }}>Pricing</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                No surprise invoices.
              </h2>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNavigate("#pricing")}
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors">
              See full pricing <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {rows.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.07}>
              <motion.button whileHover={{ y: -3 }} onClick={() => onNavigate("#pricing")}
                className="w-full text-left rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md hover:border-white/20 transition-colors">
                <h3 className="font-semibold text-white mb-1">{r.name}</h3>
                <div className="text-xl font-black text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{r.price}</div>
                <p className="text-slate-500 text-xs">{r.desc}</p>
              </motion.button>
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
    { n:"01", title:"Tell us your story", desc:"Browse our template library as a starting shape, or start from a blank page if nothing quite fits. Either way, it begins with what you want to say." },
    { n:"02", title:"We help you shape it",     desc:"Your words, your images, your voice. We handle the code and the craft — you stay focused on the story itself." },
    { n:"03", title:"It goes live in days",       desc:"We deploy, test on mobile, and hand you a site that works. No waiting weeks for 'revisions.'" },
  ];
  return (
    <section className="px-6 py-20 lg:px-12 border-t border-white/5">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="text-center mb-14">
            <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: T }}>How We Write It</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Three steps to telling it online.
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
                    style={{ background: `linear-gradient(135deg,${T},${P})`, color: "#0f172a" }}>
                    {s.n}
                  </div>
                  <h3 className="font-semibold text-white mb-3">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Home: Blog teaser ────────────────────────────────────────────────────────
function BlogTeaserStrip({ onNavigate }) {
  // Import ARTICLES lazily via a static preview so App.jsx stays clean
  const previews = [
    {
      slug: "web-architecture-mistakes-costing-revenue",
      title: "Why Your Website Isn't Converting: 5 Invisible Web Architecture Mistakes",
      category: "Business Growth",
      date: "Aug 12, 2026",
      color: "#F0409A",
    },
    {
      slug: "ai-for-everyone-zuckerberg",
      title: "The Future Is for Everyone: Zuckerberg's Vision for Personal Superintelligence",
      category: "AI & Technology",
      date: "Aug 10, 2026",
      color: "#1AA3B0",
    },
    {
      slug: "why-your-business-needs-a-website-2026",
      title: "Why Every Kenyan Business Needs a Website in 2026 — Not a Facebook Page",
      category: "Business Growth",
      date: "Aug 5, 2026",
      color: "#6366f1",
    },
  ];

  return (
    <section className="px-6 py-20 lg:px-12 border-t border-white/5">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest block mb-2" style={{ color: T }}>From the Blog</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Tech news & business insights.
              </h2>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNavigate("#blog")}
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors">
              Read all articles <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {previews.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.07}>
              <motion.button whileHover={{ y: -3 }}
                onClick={() => onNavigate(`#blog/${p.slug}`)}
                className="group w-full text-left rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md overflow-hidden hover:border-white/20 transition-colors">
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
                <div className="p-5">
                  <span className="text-xs font-semibold" style={{ color: p.color }}>{p.category}</span>
                  <h3 className="mt-2 font-semibold text-sm text-white group-hover:text-[#3FC1CB] transition-colors leading-snug">{p.title}</h3>
                  <p className="mt-3 text-xs text-slate-500">{p.date}</p>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Home: Invoice CTA banner ─────────────────────────────────────────────────
function InvoiceBanner({ onNavigate }) {
  return (
    <Reveal>
      <section className="px-6 py-12 lg:px-12 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <motion.div whileHover={{ scale: 1.01 }}
            className="relative overflow-hidden rounded-3xl p-8 sm:p-10 cursor-pointer"
            style={{ background: `linear-gradient(135deg,rgba(26,163,176,0.12),rgba(240,64,154,0.12))`, border: "1px solid rgba(255,255,255,0.07)" }}
            onClick={() => onNavigate("#invoice")}>
            <div className="pointer-events-none absolute right-0 top-0 w-64 h-64 rounded-full blur-3xl opacity-30"
              style={{ background: `radial-gradient(circle, ${P}, transparent)` }} />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white font-bold text-xl">✦ AI Invoice Generator</span>
                  <span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{ background: `${P}30`, color: "#F778B6" }}>COMING SOON</span>
                </div>
                <p className="text-slate-400 max-w-md">
                  Invoices, quotes, receipts, purchase orders, and 7 more financial document types — generated by AI in seconds. Download as PDF for just $1.
                </p>
              </div>
              <motion.div whileHover={{ x: 4 }}
                className="shrink-0 inline-flex items-center gap-2 text-base font-bold px-7 py-4 rounded-xl text-slate-950"
                style={{ background: `linear-gradient(135deg,${T},${P})` }}>
                Get notified <ArrowRight className="h-5 w-5" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </Reveal>
  );
}

// ─── Templates page ───────────────────────────────────────────────────────────
function TemplateCard({ template, onDeploy }) {
  const c = GLOW[template.color];
  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.28 }}
      whileHover={{ y: -3 }} className="group relative">
      <div className={`pointer-events-none absolute -inset-3 rounded-3xl ${c.glow} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`} />
      <div className={`relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 shadow-2xl shadow-black/40 backdrop-blur-md transition-colors duration-300 ${c.ring}`}>
        <div className="relative h-40 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />
          <div className={`absolute inset-0 flex items-center justify-center ${c.text}`}>
            <template.icon className="h-14 w-14 opacity-70 transition-transform duration-500 ease-out group-hover:scale-110" strokeWidth={1.25} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
          <div className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium backdrop-blur-md ${c.pill}`}>
            <template.icon className="h-3 w-3" />{template.badge}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-1.5 text-base font-bold text-white">{template.name}</h3>
          <p className="mb-4 text-xs leading-relaxed text-slate-400">{template.description}</p>
          <ul className="mb-5 flex flex-col gap-1.5">
            {template.features.map(f => (
              <li key={f} className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${c.check}`} />{f}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-center gap-2.5 border-t border-white/10 pt-4">
            {TEMPLATE_TO_DEMO_PATH[template.id] ? (
              <a href={`${import.meta.env.BASE_URL}${TEMPLATE_TO_DEMO_PATH[template.id]}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-medium text-slate-200 transition-colors hover:bg-white/10">
                <PlayCircle className="h-3.5 w-3.5" />Live Demo
              </a>
            ) : (
              <span className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5 text-xs font-medium text-slate-500 cursor-default">
                Demo on request
              </span>
            )}
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => onDeploy(TEMPLATE_TO_BUSINESS_TYPE[template.id])}
              className={`inline-flex flex-1 items-center justify-center gap-1 rounded-xl bg-gradient-to-r px-3 py-2.5 text-xs font-semibold text-slate-950 ${c.gradient}`}>
              <Rocket className="h-3.5 w-3.5" />Deploy This
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TemplatesPage({ onNavigate, onDeploy }) {
  const [active, setActive] = useState("all");
  const visible = useMemo(() =>
    active === "all" ? TEMPLATES : TEMPLATES.filter(t => t.category === active),
    [active]
  );
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <Nav onNavigate={onNavigate} route="#templates" />
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-12 text-center">
              <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: T }}>Deployment-Ready Suites</span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Your business,{" "}
                <span className="bg-gradient-to-r from-[#1AA3B0] to-[#F0409A] bg-clip-text text-transparent">your website.</span>
              </h1>
              <p className="text-slate-400 max-w-xl mx-auto">Browse our template library for small businesses and enterprises alike — or request a fully custom build scoped around your exact workflow.</p>
            </div>
          </Reveal>

          {/* Filter tabs */}
          <Reveal>
            <div className="flex justify-center mb-10">
              <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full border border-white/10 bg-slate-900/60 p-1.5 backdrop-blur-md">
                {FILTERS.map(f => {
                  const isActive = f.id === active;
                  return (
                    <button key={f.id} onClick={() => setActive(f.id)}
                      className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors">
                      {isActive && (
                        <motion.div layoutId="activeTab"
                          className="absolute inset-0 rounded-full"
                          style={{ background: `linear-gradient(135deg,${T}cc,${P}cc)` }}
                          transition={{ type: "spring", stiffness: 350, damping: 30 }} />
                      )}
                      <span className={`relative z-10 ${isActive ? "text-white" : "text-slate-400 hover:text-white"}`}>
                        {f.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <AdUnit slot="templatesBanner" className="mb-8" />
          </Reveal>

          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map(t => <TemplateCard key={t.id} template={t} onDeploy={(bt) => { onDeploy(bt); onNavigate("#contact"); }} />)}
            </div>
          </AnimatePresence>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─── Contact page ─────────────────────────────────────────────────────────────
function ContactPage({ onNavigate, prefilledBusiness }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", business: prefilledBusiness || "", message:"" });
  const [sent, setSent] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { if (prefilledBusiness) setForm(f => ({ ...f, business: prefilledBusiness })); }, [prefilledBusiness]);

  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inputCls = "w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:border-[#1AA3B0] focus:outline-none transition-colors placeholder-slate-500";

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <Nav onNavigate={onNavigate} route="#contact" />
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-12">
              <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: T }}>Let's Talk</span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Tell us about your{" "}
                <span className="bg-gradient-to-r from-[#1AA3B0] to-[#F0409A] bg-clip-text text-transparent">business</span>.
              </h1>
              <p className="text-slate-400 max-w-xl">Pick a template, request a custom build, or just ask a question — we usually reply within a few hours.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <Reveal className="lg:col-span-3">
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md">
                {sent ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-12 text-center">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                      style={{ background: `${T}18` }}>
                      <CheckCircle2 className="h-7 w-7" style={{ color: T }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Message sent!</h3>
                    <p className="text-slate-400">Thanks {form.name || ""}. We'll be in touch at {form.email} shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Name</label>
                        <input className={inputCls} placeholder="Jane Wanjiru" value={form.name} onChange={e => setF("name", e.target.value)} required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Email</label>
                        <input type="email" className={inputCls} placeholder="jane@business.co.ke" value={form.email} onChange={e => setF("email", e.target.value)} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Phone</label>
                        <input type="tel" className={inputCls} placeholder="+254 700 000 000" value={form.phone} onChange={e => setF("phone", e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                          Business type {prefilledBusiness && <span className="text-[#3FC1CB] normal-case font-normal">— pre-filled</span>}
                        </label>
                        <select className={inputCls} value={form.business} onChange={e => setF("business", e.target.value)}>
                          <option className="bg-slate-900" value="">Select one</option>
                          {[["restaurant","Restaurant / Café"],["clinic","Clinic / Health Center"],["spa","Spa / Barbershop"],["hotel","Hotel / Boutique Stay"],["rental","Airbnb / Vacation Rental"],["logistics","Delivery / Logistics"],["catering","Private Chef / Catering"],["ecommerce","E-commerce / Retail"],["corporate","Corporate / SME"],["ngo","NGO / Non-Profit"],["saas","SaaS / Tech Product"],["custom","Something custom / Enterprise"]].map(([v,l]) => (
                            <option key={v} className="bg-slate-900" value={v}>{l}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Message</label>
                      <textarea className={inputCls} rows={4} placeholder="Tell us what you're building and any deadlines we should know about." value={form.message} onChange={e => setF("message", e.target.value)} required style={{ resize: "vertical" }} />
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

            {/* Contact details */}
            <Reveal delay={0.1} className="lg:col-span-2 flex flex-col gap-4">
              {[
                { icon: MessageCircle, label: "WhatsApp", value: "+254 708 015 027", href: "https://wa.me/254708015027", color: "#00A651" },
                { icon: Mail,          label: "Email",    value: "contact@lcn254.site", href: "mailto:contact@lcn254.site", color: T },
                { icon: Phone,         label: "Call",     value: "+254 700 000 000", href: "tel:+254700000000", color: T },
                { icon: Clock,         label: "Response", value: "Usually 2–4 hours", href: null, color: null },
                { icon: MapPin,        label: "Based in", value: "Nairobi, Kenya — working nationwide", href: null, color: null },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <motion.div key={label} whileHover={{ x: 4 }}>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
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

      {/* WhatsApp FAB */}
      <a href="https://wa.me/254708015027" target="_blank" rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
        style={{ background: `linear-gradient(135deg,${T},${P})` }}>
        <MessageCircle className="h-6 w-6" />
      </a>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─── About page ───────────────────────────────────────────────────────────────
function AboutPage({ onNavigate }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const timeline = [
    { year:"2022", event:"Started building sites for Nairobi restaurants and hotels — freelance, nothing formal." },
    { year:"2023", event:"Moved into a structured agency model after seeing the same problems across every industry: no online presence, broken booking flows, no payments." },
    { year:"2024", event:"Built the first version of our template library — industry-specific starting points for SMEs that cut delivery time while maintaining quality. Began taking on larger enterprise and NGO projects." },
    { year:"2025", event:"Launched the AI Invoice Generator — a tool for the same SME clients who needed professional documents without an accountant." },
    { year:"2026", event:"LCN254 today — a focused agency doing one thing well: fast, reliable websites for Kenyan businesses." },
  ];
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <Nav onNavigate={onNavigate} route="#about" />
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-16">
              <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: T }}>About LCN254</span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Human beings are{" "}
                <span className="bg-gradient-to-r from-[#1AA3B0] to-[#F0409A] bg-clip-text text-transparent">storytellers.</span>
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                We put meaning into words, images, and emotion — it's how we always have. A website is just where that meaning lives online. LCN254 is a Nairobi-based web agency that builds the site that tells your story, personal or professional: from a first-time entrepreneur launching a single page to an established enterprise that needs a full digital platform.
              </p>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16 p-6 rounded-2xl border border-white/5 bg-slate-900/40">
              {[["48+","Sites delivered"],["3–5","Days average"],["SME→Enterprise","Scale we serve"],["254","Kenya dial code"]].map(([v,l]) => (
                <div key={l} className="text-center">
                  <div className="text-3xl font-black mb-1 bg-gradient-to-r from-[#1AA3B0] to-[#F0409A] bg-clip-text text-transparent"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{v}</div>
                  <div className="text-slate-500 text-xs font-mono uppercase tracking-wider">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Story + Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-16">
            <Reveal>
              <h2 className="text-2xl font-bold text-white mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>The name is the mission.</h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p><span className="text-white font-semibold">LCN254</span> — Local Commerce Network, dial code 254. The name says what we're here to do: help Kenyan businesses compete online.</p>
                <p>We started serving small businesses because that's where the gap was biggest. Today, we work with SMEs, corporates, NGOs, and tech startups too — the tools and standards are the same, the scope just grows.</p>
                <p>We're a small team. You talk directly to the person building your site — no account managers, no handoffs.</p>
                <p>And underneath all of it, the same belief: every business, every founder, every family has a story worth telling well.</p>
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

          {/* Values */}
          <Reveal>
            <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>What we actually believe.</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
              {[
                { icon:"⚡", t:"Speed is a feature",    d:"Slow sites lose customers, especially on 4G in Nairobi traffic." },
                { icon:"📍", t:"Built for this market",  d:"M-Pesa, local pricing, Kenyan business hours — we build for how business works here." },
                { icon:"🔒", t:"No lock-in",             d:"You own everything we build. No proprietary CMS, no monthly platform fees." },
                { icon:"🎯", t:"Honest scoping",         d:"We quote what the work actually costs. No surprise invoices halfway through." },
              ].map(v => (
                <motion.div key={v.t} whileHover={{ y: -3 }}
                  className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-md">
                  <div className="text-2xl mb-3">{v.icon}</div>
                  <h3 className="font-semibold text-white mb-2">{v.t}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.d}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal>
            <div className="text-center rounded-2xl border border-white/5 bg-slate-900/40 p-10">
              <h2 className="text-2xl font-bold text-white mb-3">Ready to build something?</h2>
              <p className="text-slate-400 mb-6">Browse the templates, pick what fits, and get in touch.</p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNavigate("#templates")}
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-slate-950"
                  style={{ background: `linear-gradient(135deg,${T},${P})` }}>
                  Browse Templates <ArrowRight className="h-4 w-4" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNavigate("#contact")}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                  Get in Touch
                </motion.button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─── Pricing page ──────────────────────────────────────────────────────────────
const PRICING_TIERS = [
  {
    id: "launch",
    name: "Launch",
    price: "KSh 35,000",
    unit: "one-time",
    tagline: "A focused landing page to get a business online fast.",
    features: [
      "1–5 page site from our template library",
      "Mobile-first, pre-rendered for fast load",
      "Contact form to your email",
      "Free hosting on GitHub Pages + custom domain setup",
      "3–5 day delivery",
    ],
    cta: "Get started",
    highlight: false,
  },
  {
    id: "business",
    name: "Business",
    price: "KSh 75,000",
    unit: "one-time",
    tagline: "For businesses that take bookings or payments online.",
    features: [
      "Everything in Launch",
      "Booking / scheduling flow",
      "M-Pesa (Daraja) and card payment integration",
      "Basic SEO setup (meta tags, sitemap, structured data)",
      "1 round of revisions after launch",
      "5–7 day delivery",
    ],
    cta: "Get started",
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise & Custom",
    price: "Custom quote",
    unit: "scoped per project",
    tagline: "Multi-location, portals, or integrations with your existing systems.",
    features: [
      "Everything in Business",
      "Custom design system, not a template",
      "Staff/admin portals, multi-location support",
      "Integrations with your CRM, ERP, or booking systems",
      "Ongoing maintenance retainer available",
    ],
    cta: "Talk to us",
    highlight: false,
  },
];

function PricingPage({ onNavigate }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <Nav onNavigate={onNavigate} route="#pricing" />
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-14 text-center">
              <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: T }}>Pricing</span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Straightforward pricing,{" "}
                <span className="bg-gradient-to-r from-[#1AA3B0] to-[#F0409A] bg-clip-text text-transparent">no surprises.</span>
              </h1>
              <p className="text-slate-400 max-w-xl mx-auto">
                Every project is quoted before we start. These are our standard starting prices — final cost depends on scope, content, and integrations.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {PRICING_TIERS.map((tier, i) => (
              <Reveal key={tier.id} delay={i * 0.08}>
                <div className={`relative flex h-full flex-col rounded-2xl border p-7 backdrop-blur-md ${
                  tier.highlight ? "border-[#1AA3B0]/50 bg-slate-900/70" : "border-white/10 bg-slate-900/40"
                }`}>
                  {tier.highlight && (
                    <span className="absolute -top-3 left-7 rounded-full px-3 py-1 text-[11px] font-bold text-slate-950"
                      style={{ background: `linear-gradient(135deg,${T},${P})` }}>
                      Most popular
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-white mb-1">{tier.name}</h3>
                  <p className="text-slate-400 text-sm mb-5 min-h-[40px]">{tier.tagline}</p>
                  <div className="mb-6">
                    <div className="text-3xl font-black text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {tier.price}
                    </div>
                    <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mt-1">{tier.unit}</div>
                  </div>
                  <ul className="flex-1 space-y-3 mb-7">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: T }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate("#contact")}
                    className={`w-full rounded-xl py-3 text-sm font-bold transition-colors ${
                      tier.highlight ? "text-slate-950" : "text-white border border-white/15 hover:bg-white/5"
                    }`}
                    style={tier.highlight ? { background: `linear-gradient(135deg,${T},${P})` } : {}}>
                    {tier.cta}
                  </motion.button>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="text-center text-slate-500 text-sm mt-10 max-w-2xl mx-auto">
              Prices shown are for Kenya-based delivery and standard project scope. Hosting is free on our standard setup; a paid managed-hosting/maintenance retainer is available separately. Get in touch for an exact quote on your project.
            </p>
          </Reveal>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─── FAQ page ─────────────────────────────────────────────────────────────────
function FAQPage({ onNavigate }) {
  const [open, setOpen] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <Nav onNavigate={onNavigate} route="#faq" />
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: T }}>FAQ</span>
              <h1 className="text-4xl font-bold tracking-tight text-white mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Questions we get a lot</h1>
              <p className="text-slate-400">Can't find what you're looking for? Email us at{" "}
                <a href="mailto:contact@lcn254.site" className="underline" style={{ color: T }}>contact@lcn254.site</a>
              </p>
            </div>
          </Reveal>
          <div>
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="border-b border-white/5">
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
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─── Privacy page ─────────────────────────────────────────────────────────────
function PrivacyPage({ onNavigate }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const sections = [
    { t:"1. Who We Are",           b:`LCN254 is a web design and development agency based in Nairobi, Kenya. Our website is lcn254.site — reach us at contact@lcn254.site.` },
    { t:"2. Information We Collect",b:`We collect your name, email, phone, and business type through our contact form. Invoice Generator inputs are processed to generate your document and not stored after your session.` },
    { t:"3. How We Use Your Information",b:`We use contact form submissions to respond to inquiries and quote requests only. We do not sell your data to any third party.` },
    { t:"4. Payments",             b:`Payments are processed by Stripe, M-Pesa (Safaricom Daraja), and PayPal. We do not store card details or M-Pesa PINs.` },
    { t:"5. Cookies & Analytics",  b:`We do not use tracking cookies or analytics platforms that identify individual users.` },
    { t:"6. Data Storage & Security",b:`Contact form submissions go to contact@lcn254.site via Zoho Mail. Invoice generation is processed through a Cloudflare Worker and not logged or retained.` },
    { t:"7. Third-Party Services", b:`We use Google Fonts (CDN) and Framer Motion (bundled). The Invoice Generator uses the Anthropic Claude API — prompts are sent securely and not shared with Anthropic alongside personal identifiers.` },
    { t:"8. Your Rights (Kenya Data Protection Act 2019)",b:`You have the right to access, correct, or request deletion of personal data. Email contact@lcn254.site with subject "Data Request" — we respond within 14 days.` },
    { t:"9. Children's Privacy",   b:`Our services are not directed at children under 18.` },
    { t:"10. Contact",             b:`Questions about this policy? Email contact@lcn254.site or write to: LCN254, Nairobi, Kenya.` },
  ];
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <Nav onNavigate={onNavigate} route="#privacy" />
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
      <Footer onNavigate={onNavigate} />
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
        transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
        className="relative flex flex-col items-center text-center px-6">
        <img src={`${import.meta.env.BASE_URL}lcn254-logo.jpeg`} alt="LCN254"
          width="80" height="80" className="rounded-2xl object-cover mb-6 shadow-2xl" style={{ width:80,height:80 }} />
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3"
          style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
          Welcome to{" "}
          <span className="bg-gradient-to-r from-[#1AA3B0] to-[#F0409A] bg-clip-text text-transparent">LCN254</span>
        </h1>
        <p className="text-slate-400 max-w-xs">Human beings are storytellers. Let's tell yours — personal or professional.</p>
        <div className="mt-10 w-48 h-0.5 bg-slate-800 rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg,${T},${P})` }}
            initial={{ width:"0%" }} animate={{ width:"100%" }} transition={{ duration:1.7, ease:"linear" }} />
        </div>
        <p className="mt-4 font-mono text-xs text-slate-600 uppercase tracking-widest">dial +254 · locally built</p>
      </motion.div>
    </motion.div>
  );
}

// ─── Home page ────────────────────────────────────────────────────────────────
function HomePage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <Nav onNavigate={onNavigate} route="#home" />
      <CinematicHero onNavigate={onNavigate} />
      <ValueStrip onNavigate={onNavigate} />
      <TemplateTeaserStrip onNavigate={onNavigate} />
      <PricingTeaserStrip onNavigate={onNavigate} />
      <HowItWorks />
      <div className="px-6 lg:px-12 py-4">
        <div className="mx-auto max-w-6xl">
          <AdUnit slot="homeBanner" />
        </div>
      </div>
      <BlogTeaserStrip onNavigate={onNavigate} />
      <InvoiceBanner onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─── Root router ──────────────────────────────────────────────────────────────
export default function LCN254Portfolio() {
  const [route, setRoute] = useState(
    typeof window !== "undefined" ? window.location.hash || "#home" : "#home"
  );
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("lcn254-welcomed");
  });

  const navigate = useCallback((hash) => {
    window.location.hash = hash;
    setRoute(hash);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fn = () => {
      const h = window.location.hash || "#home";
      setRoute(h);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);

  const handleSplashDone = useCallback(() => {
    sessionStorage.setItem("lcn254-welcomed", "1");
    setShowSplash(false);
  }, []);

  const handleDeploy = useCallback((bt) => {
    setSelectedBusiness(bt);
    navigate("#contact");
  }, [navigate]);

  const renderPage = () => {
    if (route.startsWith("#blog/")) {
      const slug = route.replace("#blog/", "");
      return <BlogArticlePage key={route} slug={slug} onNavigate={navigate} />;
    }
    switch (route) {
      case "#blog":      return <BlogIndexPage   key="blog"      onNavigate={navigate} />;
      case "#templates": return <TemplatesPage   key="templates" onNavigate={navigate} onDeploy={handleDeploy} />;
      case "#pricing":   return <PricingPage     key="pricing"   onNavigate={navigate} />;
      case "#contact":   return <ContactPage     key="contact"   onNavigate={navigate} prefilledBusiness={selectedBusiness} />;
      case "#about":     return <AboutPage       key="about"     onNavigate={navigate} />;
      case "#faq":       return <FAQPage         key="faq"       onNavigate={navigate} />;
      case "#privacy":   return <PrivacyPage     key="privacy"   onNavigate={navigate} />;
      case "#invoice":   return <InvoiceGenerator  key="invoice" onNavigate={navigate} />;
      default:           return <HomePage        key="home"      onNavigate={navigate} />;
    }
  };

  return (
    <>
      {showSplash && <WelcomeSplash onDone={handleSplashDone} />}
      <div style={{ opacity: showSplash ? 0 : 1, transition: "opacity 0.4s ease" }}>
        <AnimatePresence mode="wait">
          <PageWrap id={route}>
            {renderPage()}
          </PageWrap>
        </AnimatePresence>
      </div>
    </>
  );
}
