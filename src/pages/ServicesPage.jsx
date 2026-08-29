import React, { useEffect } from "react";
import SEOHead from "../components/SEOHead.jsx";
import { Reveal, Kicker, H1, H2, PrimaryLink, SecondaryLink, SummaryCard, ProcessStrip, FAQBlock, FinalCTA, T, P } from "../components/PhaseFourUI.jsx";
import { SERVICES } from "../data/servicesData.js";

const WHY = [
  { t: "Business-first", d: "We start with your goals, not just the design." },
  { t: "Modern", d: "Clean and contemporary digital experiences." },
  { t: "Mobile-first", d: "Built for the devices your customers actually use." },
  { t: "Conversion-focused", d: "Designed to turn attention into action." },
  { t: "Transparent", d: "Clear scope, pricing and communication." },
  { t: "Long-term", d: "Support doesn't have to end when the website launches." },
];

const FAQS = [
  { q: "What type of website should my business get?", a: "It depends on what you need visitors to do — a business website builds credibility and takes enquiries, e-commerce sells products directly, and a landing page drives one specific action for a campaign. Tell us your goal and we'll recommend the right fit." },
  { q: "How much does a website cost?", a: "Business websites start from KES 15,000, landing pages from KES 10,000, redesigns from KES 20,000, and e-commerce from KES 75,000. Final pricing depends on scope, pages, content and integrations." },
  { q: "How long does development take?", a: "Most business websites launch within 3–5 business days once content and branding are confirmed. Larger e-commerce or custom projects take longer and are scoped individually." },
  { q: "Do you provide hosting?", a: "Yes, most sites we build are deployed to fast, reliable hosting we manage. Details are covered during onboarding." },
  { q: "Can you integrate M-Pesa?", a: "Yes, where it's part of the agreed scope for an e-commerce or booking project — implemented and tested before launch." },
  { q: "Can you redesign my existing website?", a: "Yes — see our Website Redesign service for how we approach an existing site rather than starting from scratch." },
  { q: "Do you provide website maintenance?", a: "Yes, ongoing maintenance plans start from KES 3,000/month and cover updates, content changes, and monitoring." },
  { q: "Can you build an online store?", a: "Yes — our E-commerce service covers product catalogues, cart, checkout and payment integration." },
  { q: "Do I need to provide website content?", a: "You can provide your own content, or we can help organise and tighten it. Full copywriting from scratch can be scoped separately." },
];

export default function ServicesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <SEOHead
        title="Web Design & Development Services"
        description="Business websites, e-commerce, landing pages, redesigns, custom web solutions and maintenance — built to help your business grow online."
        path="/services"
      />
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-6xl">

          {/* HERO */}
          <Reveal>
            <div className="mb-16 max-w-2xl">
              <Kicker>Services</Kicker>
              <H1>Web Solutions Built Around Your Business.</H1>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                From professional business websites to e-commerce experiences and landing pages, we design and build digital experiences that help businesses attract customers and grow online.
              </p>
              <div className="flex gap-4 flex-wrap">
                <PrimaryLink href="/contact">START YOUR PROJECT</PrimaryLink>
                <SecondaryLink href="/work">VIEW OUR WORK</SecondaryLink>
              </div>
            </div>
          </Reveal>

          {/* SERVICE GRID */}
          <Reveal><H2 className="sr-only">Our Services</H2></Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <SummaryCard
                  href={`/services/${s.slug}`}
                  icon={s.icon}
                  color={s.color}
                  title={s.name}
                  desc={s.shortDesc}
                  cta={s.cardCta}
                  bullets={s.included}
                />
              </Reveal>
            ))}
          </div>

          {/* WHY LCN254 */}
          <Reveal>
            <div className="mb-20">
              <H2>Why Work With LCN254</H2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                {WHY.map((w) => (
                  <div key={w.t} className="rounded-2xl border border-white/5 bg-slate-900/40 p-6">
                    <h3 className="font-semibold text-white mb-2">{w.t}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{w.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* PROCESS */}
          <Reveal>
            <div className="mb-20">
              <H2>How We Work</H2>
              <p className="text-slate-400 mb-8 max-w-xl">Every project — regardless of size — follows the same seven-step process.</p>
              <ProcessStrip />
            </div>
          </Reveal>

          {/* FAQ */}
          <Reveal>
            <div className="mb-20 max-w-3xl">
              <FAQBlock items={FAQS} title="Services FAQ" />
            </div>
          </Reveal>

          {/* FINAL CTA */}
          <FinalCTA
            headline="Not sure which service you need?"
            copy="Tell us about your business and we'll recommend the right approach."
            primaryHref="/contact"
            primaryLabel="TALK TO LCN254"
          />
        </div>
      </div>
    </main>
  );
}
