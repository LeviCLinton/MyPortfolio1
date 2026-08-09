import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InvoiceGenerator from "./InvoiceGenerator.jsx";
import {
  Sparkles,
  UtensilsCrossed,
  Stethoscope,
  Scissors,
  BedDouble,
  Home,
  Truck,
  ChefHat,
  ShoppingBag,
  CheckCircle2,
  PlayCircle,
  Rocket,
  ArrowRight,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  Send,
  MapPin,
  Plus,
  ArrowLeft,
} from "lucide-react";

// ---------------------------------------------------------------------------
// lcn254 — Full Portfolio Page
// Hero + Interactive Showcase Grid + Contact, unified on one design system:
// deep slate canvas, ambient glow, glassmorphism throughout.
// Brand accent = teal → pink, lifted directly from the lcn254 logo's paint
// splash (see BRAND_GRADIENT below). Cyan/indigo/amber remain as secondary
// category colors so individual template cards stay visually distinct.
// ---------------------------------------------------------------------------

const FILTERS = [
  { id: "all", label: "All Suites" },
  { id: "hospitality", label: "Hospitality & Food" },
  { id: "health", label: "Health & Wellness" },
  { id: "services", label: "Services & Logistics" },
];

const GLOW = {
  cyan: {
    text: "text-cyan-300",
    ring: "group-hover:border-cyan-400/40",
    pill: "bg-cyan-500/10 text-cyan-300 border-cyan-400/30",
    glow: "bg-cyan-500/25",
    gradient: "from-cyan-400 to-cyan-600",
    check: "text-cyan-400",
  },
  indigo: {
    text: "text-indigo-300",
    ring: "group-hover:border-indigo-400/40",
    pill: "bg-indigo-500/10 text-indigo-300 border-indigo-400/30",
    glow: "bg-indigo-500/25",
    gradient: "from-indigo-400 to-indigo-600",
    check: "text-indigo-400",
  },
  amber: {
    text: "text-amber-300",
    ring: "group-hover:border-amber-400/40",
    pill: "bg-amber-500/10 text-amber-300 border-amber-400/30",
    glow: "bg-amber-500/25",
    gradient: "from-amber-400 to-amber-600",
    check: "text-amber-400",
  },
  teal: {
    text: "text-[#3FC1CB]",
    ring: "group-hover:border-[#3FC1CB]/40",
    pill: "bg-[#1AA3B0]/10 text-[#3FC1CB] border-[#1AA3B0]/30",
    glow: "bg-[#1AA3B0]/25",
    gradient: "from-[#1AA3B0] to-[#12707A]",
    check: "text-[#3FC1CB]",
  },
  pink: {
    text: "text-[#F778B6]",
    ring: "group-hover:border-[#F0409A]/40",
    pill: "bg-[#F0409A]/10 text-[#F778B6] border-[#F0409A]/30",
    glow: "bg-[#F0409A]/25",
    gradient: "from-[#F0409A] to-[#C21C6E]",
    check: "text-[#F778B6]",
  },
};

// Brand gradient — lifted directly from the logo's teal-to-pink paint splash.
// Used for the primary CTA, headline accent, active tab, and floating widget.
const BRAND_GRADIENT = "from-[#1AA3B0] to-[#F0409A]";

// Maps a gallery template to the matching <option> value in the contact
// form's "Business type" select, so "Deploy This" can pre-fill it.
const TEMPLATE_TO_BUSINESS_TYPE = {
  restaurants: "restaurant",
  clinics: "clinic",
  spas: "spa",
  hotels: "hotel",
  airbnb: "rental",
  logistics: "logistics",
  catering: "catering",
  ecommerce: "ecommerce",
};
const TEMPLATE_TO_DEMO_PATH = {
  restaurants: "demos/restaurant.html",
  clinics: "demos/clinic.html",
  spas: "demos/spa-barbershop.html",
  hotels: "demos/boutique-hotel.html",
  airbnb: "demos/vacation-rental.html",
  logistics: "demos/logistics.html",
  catering: "demos/private-chef.html",
  ecommerce: "demos/ecommerce.html",
};

const TEMPLATES = [
  {
    id: "restaurants",
    category: "hospitality",
    icon: UtensilsCrossed,
    color: "cyan",
    badge: "Restaurant Suite",
    name: "Restaurants & Cafés",
    description:
      "A digital dining room — guests browse the menu, reserve a table, and follow their order in real time.",
    features: ["Live Table Booking", "Digital Menu Builder", "Order Status Tracking"],
  },
  {
    id: "clinics",
    category: "health",
    icon: Stethoscope,
    color: "indigo",
    badge: "Clinical Suite",
    name: "Medical Clinics & Health Centers",
    description:
      "Patients self-schedule, browse departments, and arrive prepared — no receptionist bottleneck.",
    features: ["Appointment Scheduling", "Patient Portal Preview", "Department Directory"],
  },
  {
    id: "spas",
    category: "health",
    icon: Scissors,
    color: "pink",
    badge: "Spa & Grooming Suite",
    name: "Spas & Barbershops",
    description:
      "Clients choose a stylist, a slot, and a package with the price shown up front.",
    features: ["Staff Selection Calendar", "Priced Service Packages", "Instant Rebooking"],
  },
  {
    id: "hotels",
    category: "hospitality",
    icon: BedDouble,
    color: "cyan",
    badge: "Boutique Stay Suite",
    name: "Small Hotels & Boutique Stays",
    description:
      "Real-time room availability and a direct booking flow guests can complete before they even call.",
    features: ["Room Availability Engine", "Virtual Room Tour", "Direct Rate Booking"],
  },
  {
    id: "airbnb",
    category: "hospitality",
    icon: Home,
    color: "teal",
    badge: "Vacation Rental Suite",
    name: "Airbnbs & Vacation Rentals",
    description:
      "Your own booking engine, so a stay gets confirmed without a platform's commission.",
    features: ["Zero Fee Bookings", "Host Story & Bio", "Property Showcase Gallery"],
  },
  {
    id: "logistics",
    category: "services",
    icon: Truck,
    color: "indigo",
    badge: "Logistics Suite",
    name: "Delivery & Logistics Services",
    description:
      "Customers confirm coverage, get an instant quote, and track a package — no calls needed.",
    features: ["Service-Area Checker", "Instant Quote Calculator", "Live Package Tracking"],
  },
  {
    id: "catering",
    category: "hospitality",
    icon: ChefHat,
    color: "pink",
    badge: "Private Chef Suite",
    name: "Private Chefs & Catering",
    description:
      "Menus built with the client, events booked to a date, dietary needs captured — not lost in a chat thread.",
    features: ["Custom Menu Builder", "Event Inquiry Booking", "Dietary Preference Forms"],
  },
  {
    id: "ecommerce",
    category: "services",
    icon: ShoppingBag,
    color: "teal",
    badge: "Retail Suite",
    name: "E-commerce & Retail",
    description:
      "A fast, focused checkout that keeps working on a weak connection and settles the moment it's back.",
    features: ["Offline-First Cart", "Fast One-Page Checkout", "M-Pesa / Card Ready"],
  },
];

// ---------------------------------------------------------------------------
// INVOICE AD BANNER — shown between hero and gallery on the main page
// ---------------------------------------------------------------------------
function InvoiceAdBanner() {
  return (
    <div className="relative overflow-hidden border-y border-white/5 px-6 py-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0" style={{
        background: "linear-gradient(135deg, rgba(26,163,176,0.08) 0%, rgba(240,64,154,0.08) 100%)"
      }} />
      <div className="relative mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ background: "rgba(26,163,176,0.15)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3FC1CB" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm font-bold text-white">✦ AI Invoice Generator</span>
              <span className="rounded-full px-2 py-0.5 text-xs font-bold"
                style={{ background: "rgba(240,64,154,0.2)", color: "#F778B6" }}>NEW</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Generate professional invoices, quotes, receipts & 8 more financial documents with AI. Download as PDF for just $1.
            </p>
          </div>
        </div>
        <a
          href="#invoice"
          className="shrink-0 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-slate-950 transition-transform hover:scale-[1.03]"
          style={{ background: "linear-gradient(135deg, #1AA3B0, #F0409A)" }}
        >
          Try it now →
        </a>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared background glow — reused behind hero, gallery, and contact so the
// three sections read as one continuous canvas rather than stacked blocks.
// ---------------------------------------------------------------------------
function AmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#1AA3B0]/20 blur-[80px] will-change-auto" />
      <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-indigo-500/15 blur-[90px] will-change-auto" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#F0409A]/10 blur-[80px] will-change-auto" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// NAV
// ---------------------------------------------------------------------------
function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-12">
        <a href="#top" className="flex items-center gap-2.5">
          <img
            src={`${import.meta.env.BASE_URL}lcn254-logo.jpeg`}
            alt="lcn254 logo"
            width="36"
            height="36"
            fetchpriority="high"
            decoding="async"
            className="h-9 w-9 rounded-lg object-cover"
          />
          <span className="font-semibold tracking-tight text-white">
            lcn
            <span className="font-mono text-[#3FC1CB]">254</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
          <a href="#gallery" className="transition-colors hover:text-white">
            Templates
          </a>
          <a href="#about" className="transition-colors hover:text-white">
            About
          </a>
          <a href="#invoice" className="transition-colors hover:text-white font-medium" style={{ color: "#3FC1CB" }}>
            ✦ Invoice Generator
          </a>
          <a href="#contact" className="transition-colors hover:text-white">
            Contact
          </a>
        </nav>
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          Get a Quote
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// HERO
// ---------------------------------------------------------------------------
function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-white/5 px-6 pb-24 pt-24 lg:px-12"
    >
      <AmbientGlow />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0, transparent 38px, rgba(26,163,176,0.16) 38px, rgba(26,163,176,0.16) 40px)",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto flex max-w-4xl flex-col items-center pt-10 text-center"
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-1.5 backdrop-blur-xl">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3FC1CB] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3FC1CB]" />
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
            online now — building for Nairobi to Naivasha
          </span>
        </div>

        <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Websites that load fast,
          <br />
          <span className="bg-gradient-to-r from-[#3FC1CB] to-[#F778B6] bg-clip-text text-transparent">
            book faster
          </span>
          , and never sleep.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          LCN254 builds ready-to-deploy, industry-specific websites for restaurants,
          clinics, hotels, and local service brands — responsive, payment-ready, and
          live within days, not months.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#gallery"
            className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${BRAND_GRADIENT} px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-[#1AA3B0]/20 transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3FC1CB]`}
          >
            Explore Templates
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3FC1CB]"
          >
            Get a Custom Site
          </a>
        </div>

        <div className="mt-14 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-600">
          <span className="h-px w-8 bg-white/10" />
          dial +254 · locally built, globally fast
          <span className="h-px w-8 bg-white/10" />
        </div>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// GALLERY
// ---------------------------------------------------------------------------
function TemplateCard({ template, index, onDeploy }) {
  const Icon = template.icon;
  const c = GLOW[template.color];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.28, delay: index * 0.025, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <div
        className={`pointer-events-none absolute -inset-4 rounded-[2rem] ${c.glow} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
      />

      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 shadow-2xl shadow-black/40 backdrop-blur-xl transition-colors duration-300 ${c.ring}`}
      >
        <div className="relative h-44 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />
          <div
            className="absolute inset-0 opacity-20 transition-transform duration-500 ease-out group-hover:scale-110"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 20%, currentColor 0, transparent 45%), radial-gradient(circle at 80% 80%, currentColor 0, transparent 40%)",
            }}
          />
          <div className={`absolute inset-0 flex items-center justify-center ${c.text}`}>
            <Icon
              className="h-14 w-14 opacity-80 transition-transform duration-500 ease-out group-hover:scale-110"
              strokeWidth={1.25}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div
            className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium backdrop-blur-md ${c.pill}`}
          >
            <Icon className="h-3 w-3" />
            {template.badge}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-2 text-lg font-bold tracking-tight text-white">
            {template.name}
          </h3>
          <p className="mb-5 text-sm leading-relaxed text-slate-400">
            {template.description}
          </p>

          <ul className="mb-6 flex flex-col gap-2">
            {template.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className={`h-4 w-4 shrink-0 ${c.check}`} />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-5">
            <a
              href={`${import.meta.env.BASE_URL}${TEMPLATE_TO_DEMO_PATH[template.id]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              <PlayCircle className="h-4 w-4" />
              Live Demo
            </a>
        
            <button
              type="button"
              onClick={() => onDeploy(TEMPLATE_TO_BUSINESS_TYPE[template.id])}
              className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-black/30 transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${c.gradient}`}
            >
              <Rocket className="h-4 w-4" />
              Deploy This
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Gallery({ onDeploy }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const visible =
    activeFilter === "all"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === activeFilter);

  return (
    <section id="gallery" className="relative overflow-hidden px-6 py-24 lg:px-12">
      <AmbientGlow />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-1.5 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-[#3FC1CB]" />
            <span className="text-xs font-medium uppercase tracking-wider text-slate-300">
              Deployment-Ready Suites
            </span>
          </div>

          <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Pick a{" "}
            <span className="bg-gradient-to-r from-[#3FC1CB] to-[#F778B6] bg-clip-text text-transparent">
              suite
            </span>
            , not a starting point.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Every template below ships production-ready — booking flows, payment
            rails, and tracking UI already wired in. Preview it live, or deploy it
            today.
          </p>
        </div>

        <div className="mb-12 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full border border-white/10 bg-slate-900/60 p-1.5 backdrop-blur-xl">
            {FILTERS.map((f) => {
              const isActive = f.id === activeFilter;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3FC1CB]"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${BRAND_GRADIENT} shadow-lg shadow-[#1AA3B0]/20`}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {f.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((t, i) => (
              <TemplateCard key={t.id} template={t} index={i} onDeploy={onDeploy} />
            ))}
          </AnimatePresence>
        </div>

        {visible.length === 0 && (
          <p className="py-20 text-center text-sm text-slate-500">
            Nothing in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// CONTACT
// ---------------------------------------------------------------------------
function Contact({ prefilledBusiness }) {
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });
  const [sent, setSent] = useState(false);

  // "Deploy This" on a gallery card sets prefilledBusiness in the parent —
  // reflect that into the form whenever it changes.
  useEffect(() => {
    if (prefilledBusiness) {
      setForm((prev) => ({ ...prev, business: prefilledBusiness }));
    }
  }, [prefilledBusiness]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/5 px-6 py-24 lg:px-12">
      <AmbientGlow />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-1.5 backdrop-blur-xl">
            <MessageCircle className="h-3.5 w-3.5 text-[#3FC1CB]" />
            <span className="text-xs font-medium uppercase tracking-wider text-slate-300">
              Let's Talk
            </span>
          </div>
          <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Tell us about your{" "}
            <span className="bg-gradient-to-r from-[#3FC1CB] to-[#F778B6] bg-clip-text text-transparent">
              business
            </span>
            .
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Pick a template, request a custom build, or just ask a question — we
            usually reply within a few hours.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* form */}
          <div className="relative rounded-2xl border border-white/10 bg-slate-900/40 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8 lg:col-span-3">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1AA3B0]/10">
                  <CheckCircle2 className="h-6 w-6 text-[#3FC1CB]" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">Message sent</h3>
                <p className="max-w-sm text-sm text-slate-400">
                  Thanks, {form.name || "friend"} — we've got it. Expect a reply on{" "}
                  {form.email || "your email"} shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    Name
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Wanjiru"
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-[#1AA3B0]/50 focus:bg-white/10"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-slate-300">
                    Email
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@business.co.ke"
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-[#1AA3B0]/50 focus:bg-white/10"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-2 text-sm text-slate-300">
                  <span className="flex items-center gap-2">
                    Business type
                    {prefilledBusiness && (
                      <span className="text-xs font-normal text-[#3FC1CB]">
                        pre-filled from your selection
                      </span>
                    )}
                  </span>
                  <select
                    name="business"
                    value={form.business}
                    onChange={handleChange}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#1AA3B0]/50 focus:bg-white/10"
                  >
                    <option className="bg-slate-900" value="">
                      Select one
                    </option>
                    <option className="bg-slate-900" value="restaurant">
                      Restaurant / Café
                    </option>
                    <option className="bg-slate-900" value="clinic">
                      Clinic / Health Center
                    </option>
                    <option className="bg-slate-900" value="spa">
                      Spa / Barbershop
                    </option>
                    <option className="bg-slate-900" value="hotel">
                      Hotel / Boutique Stay
                    </option>
                    <option className="bg-slate-900" value="rental">
                      Airbnb / Vacation Rental
                    </option>
                    <option className="bg-slate-900" value="logistics">
                      Delivery / Logistics
                    </option>
                    <option className="bg-slate-900" value="catering">
                      Private Chef / Catering
                    </option>
                    <option className="bg-slate-900" value="ecommerce">
                      E-commerce / Retail
                    </option>
                    <option className="bg-slate-900" value="custom">
                      Something custom
                    </option>
                  </select>
                </label>

                <label className="flex flex-col gap-2 text-sm text-slate-300">
                  Message
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us what you're building and any deadlines we should know about."
                    className="resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-[#1AA3B0]/50 focus:bg-white/10"
                  />
                </label>

                <button
                  type="submit"
                  className={`mt-2 inline-flex items-center justify-center gap-2 self-start rounded-xl bg-gradient-to-r ${BRAND_GRADIENT} px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-[#1AA3B0]/20 transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3FC1CB]`}
                >
                  Send Message
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          {/* contact details */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl transition-colors hover:border-[#1AA3B0]/40"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1AA3B0]/10 text-[#3FC1CB]">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Chat on WhatsApp</p>
                <p className="text-xs text-slate-400">Fastest way to reach us — +254 700 000 000</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-[#3FC1CB]" />
            </a>

            <a
              href="mailto:contact@lcn254.site"
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl transition-colors hover:border-cyan-400/40"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Email</p>
                <p className="text-xs text-slate-400">contact@lcn254.site</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-cyan-300" />
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-300">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Call</p>
                <p className="text-xs text-slate-400">+254 700 000 000</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-300">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Response time</p>
                <p className="text-xs text-slate-400">Usually within 2–4 working hours</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1AA3B0]/10 text-[#3FC1CB]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Based in</p>
                <p className="text-xs text-slate-400">Nairobi, Kenya — working nationwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating WhatsApp widget */}
      <a
        href="https://wa.me/254700000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with lcn254 on WhatsApp"
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${BRAND_GRADIENT} text-slate-950 shadow-lg shadow-[#1AA3B0]/30 transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </section>
  );
}

// ---------------------------------------------------------------------------
// FOOTER
// ---------------------------------------------------------------------------
function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950 px-6 py-10 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Invoice ad strip */}
        <div className="mb-8 rounded-2xl border border-white/5 p-5"
          style={{ background: "linear-gradient(135deg, rgba(26,163,176,0.08), rgba(240,64,154,0.08))" }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-white mb-1">✦ Need a professional invoice or quote?</p>
              <p className="text-xs text-slate-400">Generate AI-powered financial documents in seconds. Invoices, receipts, POs & more — $1 per PDF.</p>
            </div>
            <a href="#invoice" className="shrink-0 text-sm font-bold px-5 py-2.5 rounded-xl text-slate-950 transition-transform hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #1AA3B0, #F0409A)" }}>
              Generate a Document →
            </a>
          </div>
        </div>
        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row border-t border-white/5 pt-6">
          <p>© {new Date().getFullYear()} LCN254. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#gallery" className="transition-colors hover:text-white">Templates</a>
            <a href="#about" className="transition-colors hover:text-white">About</a>
            <a href="#invoice" className="transition-colors hover:text-white" style={{ color: "#3FC1CB" }}>Invoice Generator</a>
            <a href="#contact" className="transition-colors hover:text-white">Contact</a>
            <a href="#faq" className="transition-colors hover:text-white">FAQ</a>
            <a href="#privacy" className="transition-colors hover:text-white">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// PAGE
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// WELCOME SPLASH — shown on first visit, fades out after 2.2s
// ---------------------------------------------------------------------------
function WelcomeSplash({ onDone }) {
  const [phase, setPhase] = useState("in"); // in | out

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"), 1800);
    const t2 = setTimeout(() => onDone(), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950"
      style={{
        transition: "opacity 0.6s ease",
        opacity: phase === "out" ? 0 : 1,
        pointerEvents: phase === "out" ? "none" : "all",
      }}
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#1AA3B0]/20 blur-[80px] will-change-auto" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#F0409A]/15 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center text-center px-6"
      >
        {/* Logo */}
        <img
          src={`${import.meta.env.BASE_URL}lcn254-logo.jpeg`}
          alt="lcn254"
          width="72"
          height="72"
          className="h-18 w-18 rounded-2xl object-cover mb-6 shadow-2xl"
          style={{ width: 72, height: 72 }}
        />

        <h1
          className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Welcome to{" "}
          <span className="bg-gradient-to-r from-[#1AA3B0] to-[#F0409A] bg-clip-text text-transparent">
            LCN254
          </span>
        </h1>

        <p className="text-slate-400 text-base max-w-xs">
          Deployment-ready websites for local businesses — built in Kenya, for Kenya.
        </p>

        {/* Animated loading bar */}
        <div className="mt-10 w-48 h-0.5 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #1AA3B0, #F0409A)" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.7, ease: "linear" }}
          />
        </div>

        <p className="mt-4 font-mono text-xs text-slate-600 uppercase tracking-widest">
          dial +254 · locally built
        </p>
      </motion.div>
    </div>
  );
}


// ---------------------------------------------------------------------------
// ABOUT PAGE
// ---------------------------------------------------------------------------
function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const values = [
    {
      icon: "⚡",
      title: "Speed is a feature",
      body: "We don't build bloated sites. Every page is optimised for fast load times because slow sites lose customers — especially on mobile networks.",
    },
    {
      icon: "📍",
      title: "Built for this market",
      body: "M-Pesa, local pricing, Kenyan business hours, Swahili — we understand how business works here and build for it.",
    },
    {
      icon: "🔒",
      title: "No lock-in",
      body: "You own everything we build. No proprietary CMS, no monthly platform fees, no hostages. Take the code anywhere.",
    },
    {
      icon: "🎯",
      title: "Honest scoping",
      body: "We quote what the work actually costs. No discovery upsells, no surprise invoices halfway through a project.",
    },
  ];

  const timeline = [
    { year: "2022", event: "Started building sites for Nairobi restaurants and small hotels — just freelance work, nothing formal." },
    { year: "2023", event: "Moved into a structured agency model after realising the same problems (no online presence, bad booking flows) kept appearing across industries." },
    { year: "2024", event: "Built the first version of our template library — eight industry-specific starting points that dramatically cut delivery time." },
    { year: "2025", event: "Launched the AI Invoice Generator — a tool for the same SME clients who needed professional documents without paying for an accountant." },
    { year: "2026", event: "LCN254 today — a focused agency doing one thing well: fast, reliable websites for local businesses across Kenya." },
  ];

  const stats = [
    { value: "48+", label: "Sites delivered" },
    { value: "8",   label: "Industry templates" },
    { value: "3",   label: "Days average launch" },
    { value: "KE",  label: "Kenya-based team" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <Nav />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-white/5 px-6 py-24 lg:px-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#1AA3B0]/15 blur-[90px]" />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[#F0409A]/10 blur-[90px]" />
        </div>
        <div className="relative mx-auto max-w-4xl">
          <a
            href="#top"
            onClick={e => { e.preventDefault(); window.location.hash = ""; }}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to site
          </a>
          <span className="font-mono text-xs uppercase tracking-widest text-[#1AA3B0] block mb-4">About LCN254</span>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            We build websites for{" "}
            <span className="bg-gradient-to-r from-[#1AA3B0] to-[#F0409A] bg-clip-text text-transparent">
              businesses that can't afford to look small.
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            LCN254 is a Nairobi-based web agency. We build fast, functional, industry-specific websites for restaurants, clinics, hotels, and local service businesses across Kenya — and we deliver them in days, not months.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-b border-white/5 px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div
                className="text-3xl sm:text-4xl font-bold mb-1 bg-gradient-to-r from-[#1AA3B0] to-[#F0409A] bg-clip-text text-transparent"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {s.value}
              </div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="border-b border-white/5 px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#1AA3B0] block mb-4">Our Story</span>
            <h2
              className="text-3xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              The name is the mission.
            </h2>
            <div className="space-y-5 text-slate-400 leading-relaxed">
              <p>
                <span className="text-white font-semibold">LCN254</span> — "LCN" for Local Commerce Network, "254" for Kenya's international dialling code. The name says exactly what we're here to do: help Kenyan businesses compete online.
              </p>
              <p>
                Most web agencies in Kenya are either too expensive for small businesses or too slow for anyone who needs to start earning. We built LCN254 to close that gap — real websites, real features, real timelines, at prices that make sense for a business that's still growing.
              </p>
              <p>
                We're a small team. That means you talk directly to the person building your site — no account managers, no handoffs, no telephone-game between you and the developer.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#1AA3B0] block mb-6">Timeline</span>
            <div className="relative">
              <div className="absolute left-3.5 top-0 bottom-0 w-px bg-white/10" />
              <div className="space-y-8 relative">
                {timeline.map((t, i) => (
                  <div key={t.year} className="flex gap-5 items-start">
                    <div className="relative shrink-0">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-slate-950 relative z-10"
                        style={{ background: i === timeline.length - 1 ? "linear-gradient(135deg,#1AA3B0,#F0409A)" : "#1e293b", color: i === timeline.length - 1 ? "#0f172a" : "#64748b", border: i === timeline.length - 1 ? "none" : "1px solid rgba(255,255,255,0.1)" }}
                      />
                    </div>
                    <div className="pb-2">
                      <div className="font-mono text-xs text-[#1AA3B0] mb-1">{t.year}</div>
                      <p className="text-slate-400 text-sm leading-relaxed">{t.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="border-b border-white/5 px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-widest text-[#1AA3B0] block mb-4">How We Work</span>
          <h2
            className="text-3xl font-bold tracking-tight mb-12"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            What we actually believe.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(v => (
              <div
                key={v.title}
                className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-xl"
              >
                <div className="text-2xl mb-4">{v.icon}</div>
                <h3 className="font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="border-b border-white/5 px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-widest text-[#1AA3B0] block mb-4">The Team</span>
          <h2
            className="text-3xl font-bold tracking-tight mb-12"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Small team, full ownership.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "Levi Clinton", role: "Founder & Lead Developer", bio: "Full-stack developer and designer. Builds everything from architecture to UI." },
              { name: "Design Partner", role: "UI/UX & Brand Identity", bio: "Handles visual identity, template design, and client-facing mockups." },
              { name: "You", role: "Client & Collaborator", bio: "Every project is a collaboration. The best sites come from clients who tell us what actually matters." },
            ].map((member, i) => (
              <div key={member.name} className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-xl">
                <div
                  className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-lg font-bold"
                  style={{ background: i === 2 ? "rgba(240,64,154,0.1)" : "rgba(26,163,176,0.1)", color: i === 2 ? "#F778B6" : "#3FC1CB" }}
                >
                  {member.name[0]}
                </div>
                <h3 className="font-semibold text-white mb-1">{member.name}</h3>
                <div className="font-mono text-xs text-[#1AA3B0] mb-3 uppercase tracking-wider">{member.role}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            className="text-3xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Ready to build something?
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Browse the templates, pick what fits, and get in touch. We'll give you a clear quote within 24 hours.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#top"
              onClick={e => { e.preventDefault(); window.location.hash = ""; setTimeout(() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" }), 50); }}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-slate-950 transition-transform hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg,#1AA3B0,#F0409A)" }}
            >
              Browse Templates
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#top"
              onClick={e => { e.preventDefault(); window.location.hash = ""; setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 50); }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ---------------------------------------------------------------------------
function PrivacyPolicy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Nav />
      <div className="max-w-3xl mx-auto px-6 py-20 lg:px-12">
        {/* Back */}
        <a href="#" onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-10 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </a>

        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[#1AA3B0] block mb-3">Legal</span>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-slate-400 text-sm">Last updated: {new Date().toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>

        <div className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-300 leading-relaxed">
          {[
            {
              title: "1. Who We Are",
              body: `LCN254 ("we", "us", "our") is a web design and development agency based in Nairobi, Kenya. We build and deploy websites for local businesses. Our website is lcn254.site and you can reach us at contact@lcn254.site.`
            },
            {
              title: "2. Information We Collect",
              body: `We collect information you voluntarily provide through our contact form: your name, email address, phone number, and business type. If you use our AI Invoice Generator, we process the document details you enter (business names, line items, amounts) solely to generate your document — we do not store this data after your session ends.`
            },
            {
              title: "3. How We Use Your Information",
              body: `We use your contact form submissions to respond to your inquiries and quote requests. We do not use your information for marketing without your consent, and we do not sell your data to any third party under any circumstances.`
            },
            {
              title: "4. Payments",
              body: `Payments for our Invoice Generator are processed by third-party providers (Stripe, M-Pesa via Safaricom Daraja, and PayPal). We do not store your card details or M-Pesa PIN. Each provider's own privacy policy governs how they handle your payment data. M-Pesa is operated by Safaricom PLC and subject to Kenyan data protection laws.`
            },
            {
              title: "5. Cookies & Analytics",
              body: `Our website does not use tracking cookies or analytics platforms that identify individual users. We may review aggregate traffic data (page views, referrer sources) via GitHub Pages' built-in reporting, which does not expose personal information.`
            },
            {
              title: "6. Data Storage & Security",
              body: `Contact form submissions are delivered to our email inbox (contact@lcn254.site via Zoho Mail) and are not stored in any third-party database. AI invoice generation requests are processed through a Cloudflare Worker and are not logged or retained. We apply reasonable technical measures to protect data in transit.`
            },
            {
              title: "7. Third-Party Services",
              body: `Our website uses Google Fonts (loaded from Google's CDN) and Framer Motion (bundled locally). The Invoice Generator uses the Anthropic Claude API to generate document text — prompts are sent securely to Anthropic's servers and are subject to Anthropic's privacy policy. We do not share personal identifiers with Anthropic.`
            },
            {
              title: "8. Your Rights (Kenya Data Protection Act 2019)",
              body: `Under the Kenya Data Protection Act 2019, you have the right to access, correct, or request deletion of any personal data we hold about you. To exercise these rights, email us at contact@lcn254.site with the subject line "Data Request". We will respond within 14 days.`
            },
            {
              title: "9. Children's Privacy",
              body: `Our services are not directed at children under the age of 18. We do not knowingly collect personal information from minors.`
            },
            {
              title: "10. Changes to This Policy",
              body: `We may update this policy from time to time. Material changes will be reflected in the "Last updated" date above. Continued use of the site after changes constitutes acceptance of the updated policy.`
            },
            {
              title: "11. Contact",
              body: `Questions about this policy? Email us at contact@lcn254.site or write to us at: LCN254, Nairobi, Kenya.`
            },
          ].map(({ title, body }) => (
            <div key={title}>
              <h2 className="text-lg font-semibold text-white mb-3">{title}</h2>
              <p className="text-slate-400">{body}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ---------------------------------------------------------------------------
// FAQ SECTION
// ---------------------------------------------------------------------------
const FAQS = [
  {
    q: "How long does it take to launch my website?",
    a: "Most template-based sites go live within 3–5 business days from the moment you confirm your content and branding. Custom builds are scoped individually — we'll give you a clear timeline during the discovery call."
  },
  {
    q: "Do I own the website after it's built?",
    a: "Yes. Once we hand it over, the site and all its code are yours. We can also manage hosting and updates for you on a monthly retainer if you prefer."
  },
  {
    q: "Can I accept M-Pesa payments through my site?",
    a: "Yes — all our e-commerce and booking templates are M-Pesa ready via the Safaricom Daraja API. We handle the integration as part of the build."
  },
  {
    q: "What if I need something that isn't in the gallery?",
    a: "Get in touch and describe what you need. We scope custom builds from scratch — same speed and quality standard, priced after a short discovery call."
  },
  {
    q: "Do you offer hosting?",
    a: "We deploy to fast, reliable infrastructure (GitHub Pages for static sites, Cloudflare Workers for server-side logic). Hosting is free for most sites. For more complex setups we'll recommend and configure the right platform."
  },
  {
    q: "What does the AI Invoice Generator cost?",
    a: "KES 130 (approx. $1) per document. You pay once and download your PDF — no subscription, no account required. Supports 11 document types including invoices, quotes, receipts, purchase orders, and more."
  },
  {
    q: "Can you update my site after launch?",
    a: "Yes. We offer ad-hoc updates (billed per session) and monthly maintenance retainers. Most small content changes (prices, hours, photos) can be quoted and delivered within 24 hours."
  },
  {
    q: "Is my site going to be mobile-friendly?",
    a: "Every site we build is fully responsive and tested on mobile — this is non-negotiable. Most of your customers will arrive on a phone, so mobile is always our primary design target."
  },
  {
    q: "How do I get started?",
    a: "Pick a template from the gallery and click 'Deploy This' — it'll pre-fill the contact form for that category. Or just drop us a message directly and we'll take it from there."
  },
];

function FAQItem({ faq, idx }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-semibold text-white group-hover:text-[#3FC1CB] transition-colors pr-4">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-slate-400"
        >
          <Plus className="h-3.5 w-3.5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-400 leading-relaxed max-w-2xl">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  return (
    <section className="relative px-6 py-20 lg:px-12 border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#1AA3B0]/8 blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-[#1AA3B0] block mb-3">FAQ</span>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Questions we get a lot
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Can't find what you're looking for? Message us at{" "}
            <a href="mailto:contact@lcn254.site" className="text-[#3FC1CB] hover:underline">
              contact@lcn254.site
            </a>
          </p>
        </div>
        <div>
          {FAQS.map((faq, idx) => <FAQItem key={idx} faq={faq} idx={idx} />)}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// PAGE
// ---------------------------------------------------------------------------
export default function LCN254Portfolio() {
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [route, setRoute] = useState(
    typeof window !== "undefined" ? window.location.hash : ""
  );
  // Show splash only on first visit per session
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") return false;
    const seen = sessionStorage.getItem("lcn254-welcomed");
    return !seen;
  });

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const handleSplashDone = useCallback(() => {
    sessionStorage.setItem("lcn254-welcomed", "1");
    setShowSplash(false);
  }, []);

  // Sub-pages
  if (route === "#invoice")  return <InvoiceGenerator />;
  if (route === "#privacy")  return <PrivacyPolicy />;
  if (route === "#about")    return <About />;
  if (route === "#faq") {
    return (
      <div className="min-h-screen bg-slate-950 font-sans text-white antialiased">
        <Nav />
        <FAQ />
        <Footer />
      </div>
    );
  }

  const handleDeploy = (businessType) => {
    setSelectedBusiness(businessType);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {showSplash && <WelcomeSplash onDone={handleSplashDone} />}
      <div
        className="min-h-screen bg-slate-950 font-sans text-white antialiased"
        style={{ opacity: showSplash ? 0 : 1, transition: "opacity 0.4s ease" }}
      >
        <Nav />
        <Hero />
        <InvoiceAdBanner />
        <Gallery onDeploy={handleDeploy} />
        <FAQ />
        <Contact prefilledBusiness={selectedBusiness} />
        <Footer />
      </div>
    </>
  );
}
