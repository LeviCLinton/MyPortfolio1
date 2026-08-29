import React, { useEffect } from "react";
import SEOHead from "../components/SEOHead.jsx";
import { Reveal, Kicker, H1, H2, PrimaryLink, Icon, FAQBlock, FinalCTA, RelatedLinks, ProcessStrip, T } from "../components/PhaseFourUI.jsx";
import { getService, SERVICES } from "../data/servicesData.js";
import { getWorkItem } from "../data/workData.js";
import { getIndustry } from "../data/industriesData.js";
import { CheckCircle2 } from "lucide-react";
import NotFoundPage from "./NotFoundPage.jsx";

export default function ServiceDetailPage({ slug }) {
  const service = getService(slug);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!service) return <NotFoundPage />;

  const relatedWorkItems = (service.relatedWork || []).map(getWorkItem).filter(Boolean);
  const relatedIndustryItems = (service.relatedIndustries || []).map(getIndustry).filter(Boolean);

  const relatedLinks = [
    ...relatedIndustryItems.map((ind) => ({ href: `/industries/${ind.slug}`, label: `For ${ind.name}` })),
    ...relatedWorkItems.map((w) => ({ href: `/work/${w.slug}`, label: `Case study: ${w.name}` })),
    { href: "/pricing", label: "See full pricing" },
    { href: "/contact", label: "Get in touch" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <SEOHead title={service.metaTitle.replace(" | LCN254", "")} description={service.metaDescription} path={`/services/${service.slug}`} />
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-4xl">

          {/* HERO */}
          <Reveal>
            <div className="mb-14">
              <Kicker>Services / {service.name}</Kicker>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(26,163,176,0.15)" }}>
                <Icon name={service.icon} className="h-6 w-6" style={{ color: T }} />
              </div>
              <H1>{service.hero.headline}</H1>
              <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-2xl">{service.hero.sub}</p>
              <PrimaryLink href="/contact">{service.heroCta}</PrimaryLink>
            </div>
          </Reveal>

          {/* WHO IT'S FOR */}
          <Reveal><section className="mb-14">
            <H2>Who It's For</H2>
            <div className="flex flex-wrap gap-2">
              {service.whoFor.map((w) => (
                <span key={w} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">{w}</span>
              ))}
            </div>
          </section></Reveal>

          {/* THE PROBLEM */}
          <Reveal><section className="mb-14">
            <H2>The Problem</H2>
            <p className="text-slate-400 leading-relaxed max-w-2xl">{service.problem}</p>
          </section></Reveal>

          {/* OUR APPROACH */}
          <Reveal><section className="mb-14">
            <H2>Our Approach</H2>
            <p className="text-slate-400 leading-relaxed max-w-2xl">{service.approach}</p>
            {service.beforeAfterNote && (
              <p className="text-slate-500 text-sm mt-4 italic max-w-2xl">{service.beforeAfterNote}</p>
            )}
          </section></Reveal>

          {/* WHAT'S INCLUDED */}
          <Reveal><section className="mb-14">
            <H2>What's Included</H2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-slate-300 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: T }} />{item}
                </li>
              ))}
            </ul>
          </section></Reveal>

          {/* KEY FEATURES */}
          <Reveal><section className="mb-14">
            <H2>Key Features</H2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features.map((f) => (
                <div key={f.t} className="rounded-2xl border border-white/5 bg-slate-900/40 p-5">
                  <h3 className="font-semibold text-white mb-1.5">{f.t}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.d}</p>
                </div>
              ))}
            </div>
          </section></Reveal>

          {/* PROCESS */}
          <Reveal><section className="mb-14">
            <H2>Process</H2>
            <ProcessStrip />
          </section></Reveal>

          {/* PRICING */}
          <Reveal><section className="mb-14">
            <div className="rounded-2xl border border-white/10 p-8" style={{ background: "linear-gradient(135deg,rgba(26,163,176,0.1),rgba(240,64,154,0.08))" }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Starting Price</p>
              <p className="text-3xl font-black text-white mb-3">{service.startingPrice}</p>
              <p className="text-slate-400 text-sm">{service.priceNote}</p>
            </div>
          </section></Reveal>

          {/* RELATED WORK */}
          {relatedWorkItems.length > 0 && (
            <Reveal><section className="mb-14">
              <H2>Related Work</H2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedWorkItems.map((w) => (
                  <a key={w.slug} href={`/work/${w.slug}`}
                    className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 hover:border-white/20 transition-colors block">
                    {w.isConcept && (
                      <span className="inline-block mb-2 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                        Concept Project
                      </span>
                    )}
                    <h3 className="font-semibold text-white mb-1">{w.name}</h3>
                    <p className="text-slate-400 text-sm">{w.shortDesc}</p>
                  </a>
                ))}
              </div>
            </section></Reveal>
          )}

          {/* FAQ */}
          <Reveal><section className="mb-14">
            <FAQBlock items={service.faqs} title="FAQ" />
          </section></Reveal>

          {/* RELATED LINKS */}
          <Reveal><section className="mb-14">
            <RelatedLinks links={relatedLinks} />
          </section></Reveal>

          {/* FINAL CTA */}
          <FinalCTA
            headline={`Ready to talk about ${service.name.toLowerCase()}?`}
            copy="Tell us about your business and timeline — we'll follow up with next steps."
            primaryHref="/contact"
            primaryLabel={service.heroCta}
          />

          {/* Explore other services */}
          <Reveal>
            <div className="mt-14 pt-8 border-t border-white/5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Other Services</p>
              <div className="flex flex-wrap gap-3">
                {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
                  <a key={s.slug} href={`/services/${s.slug}`}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
