import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
// Shared background glow — reused behind hero, gallery, and contact so the
// three sections read as one continuous canvas rather than stacked blocks.
// ---------------------------------------------------------------------------
function AmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#1AA3B0]/20 blur-[100px]" />
      <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-indigo-500/15 blur-[110px]" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#F0409A]/10 blur-[100px]" />
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
          lcn254 builds ready-to-deploy, industry-specific websites for restaurants,
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
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
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
            <button
              type="button"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              <PlayCircle className="h-4 w-4" />
              Live Demo
            </button>
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

        <motion.div layout className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((t, i) => (
              <TemplateCard key={t.id} template={t} index={i} onDeploy={onDeploy} />
            ))}
          </AnimatePresence>
        </motion.div>

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
    <footer className="border-t border-white/5 bg-slate-950 px-6 py-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} lcn254. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#gallery" className="transition-colors hover:text-white">
            Templates
          </a>
          <a href="#contact" className="transition-colors hover:text-white">
            Contact
          </a>
          <a href="#" className="transition-colors hover:text-white">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// PAGE
// ---------------------------------------------------------------------------
export default function LCN254Portfolio() {
  const [selectedBusiness, setSelectedBusiness] = useState("");

  // Called by a card's "Deploy This" button: pre-fills the contact form's
  // business-type field, then scrolls the visitor straight to it.
  const handleDeploy = (businessType) => {
    setSelectedBusiness(businessType);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white antialiased">
      <Nav />
      <Hero />
      <Gallery onDeploy={handleDeploy} />
      <Contact prefilledBusiness={selectedBusiness} />
      <Footer />
    </div>
  );
}
