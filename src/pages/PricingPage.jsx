import React, { useEffect } from "react";
import SEOHead from "../components/SEOHead.jsx";
import { Reveal, Kicker, H1, H2, FAQBlock, FinalCTA, T, P } from "../components/PhaseFourUI.jsx";
import { CheckCircle2 } from "lucide-react";

const PACKAGES = [
  { name: "Starter", price: "$350", desc: "A focused starting website for a new or small business.", features: ["Up to 3 pages", "Mobile-responsive design", "Contact form", "WhatsApp link", "Basic SEO setup"] },
  { name: "Business", price: "$750", desc: "The most popular package — a full business website.", popular: true, features: ["Up to 6 pages", "Custom design", "Contact form + Maps", "WhatsApp integration", "Basic SEO + analytics", "Social integration"] },
  { name: "Premium", price: "$1,500+", desc: "For larger sites, e-commerce, or custom functionality.", features: ["Unlimited pages (scoped)", "E-commerce or booking logic", "Custom integrations", "Advanced SEO setup", "Priority support during build"] },
];

const CARE_PLANS = [
  { name: "Basic", price: "$15/mo", features: ["Uptime monitoring", "Minor content edits", "Security checks"] },
  { name: "Business", price: "$100/mo", popular: true, features: ["Everything in Basic", "Monthly content updates", "Performance checks", "Priority response time"] },
  { name: "Growth", price: "$350/mo", features: ["Everything in Business", "Ongoing improvements", "Monthly reporting", "Strategy check-ins"] },
];

const FAQS = [
  { q: "Are these prices in USD?", a: "Yes — package pricing is listed in USD for international clarity. Kenyan clients can be invoiced in KES at the prevailing rate." },
  { q: "What affects the final price?", a: "Number of pages, custom functionality (bookings, e-commerce, integrations), and how much content and design work is needed." },
  { q: "Do care plans replace one-off maintenance work?", a: "Care plans cover ongoing monitoring and small changes. Larger new features are quoted separately even with an active plan." },
];

function PackageCard({ pkg }) {
  return (
    <div className={`rounded-2xl border p-7 relative ${pkg.popular ? "border-[#1AA3B0]/50 bg-slate-900/60" : "border-white/10 bg-slate-900/40"}`}>
      {pkg.popular && (
        <span className="absolute -top-3 left-7 rounded-full px-3 py-1 text-xs font-bold text-slate-950" style={{ background: `linear-gradient(135deg,${T},${P})` }}>
          Most Popular
        </span>
      )}
      <h3 className="text-lg font-bold text-white mb-1">{pkg.name}</h3>
      <p className="text-3xl font-black text-white mb-3">{pkg.price}</p>
      <p className="text-slate-400 text-sm mb-5">{pkg.desc}</p>
      <ul className="space-y-2.5 mb-6">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
            <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: T }} />{f}
          </li>
        ))}
      </ul>
      <a href="/contact" className="block text-center rounded-xl py-3 text-sm font-bold text-slate-950" style={{ background: `linear-gradient(135deg,${T},${P})` }}>
        Get Started
      </a>
    </div>
  );
}

export default function PricingPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <SEOHead title="Pricing" description="Transparent website packages and ongoing care plans from LCN254 — no surprise invoices." path="/pricing" />
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-6xl">

          <Reveal>
            <div className="mb-14 max-w-2xl">
              <Kicker>Pricing</Kicker>
              <H1>Clear Packages. No Surprises.</H1>
              <p className="text-slate-400 text-lg leading-relaxed">
                Straightforward pricing for website packages and ongoing care — see individual service pages for detailed, scope-specific starting prices.
              </p>
            </div>
          </Reveal>

          <Reveal><H2 className="sr-only">Website Packages</H2></Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
            {PACKAGES.map((pkg) => <PackageCard key={pkg.name} pkg={pkg} />)}
          </div>

          <Reveal>
            <div className="mb-8">
              <H2>Website Care Plans</H2>
              <p className="text-slate-400 max-w-xl">Ongoing support after launch — updates, monitoring, and small improvements.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
            {CARE_PLANS.map((pkg) => <PackageCard key={pkg.name} pkg={pkg} />)}
          </div>

          <Reveal>
            <div className="mb-20 max-w-3xl">
              <FAQBlock items={FAQS} title="Pricing FAQ" />
            </div>
          </Reveal>

          <FinalCTA headline="Not sure which package fits?" copy="Tell us about your business and we'll recommend the right starting point." />
        </div>
      </div>
    </main>
  );
}
