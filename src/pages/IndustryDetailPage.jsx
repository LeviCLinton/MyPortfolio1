import React, { useEffect } from "react";
import SEOHead from "../components/SEOHead.jsx";
import { Reveal, Kicker, H1, H2, PrimaryLink, Icon, FAQBlock, FinalCTA, RelatedLinks, T } from "../components/PhaseFourUI.jsx";
import { getIndustry, INDUSTRIES } from "../data/industriesData.js";
import { getService } from "../data/servicesData.js";
import { getWorkItem } from "../data/workData.js";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import NotFoundPage from "./NotFoundPage.jsx";

export default function IndustryDetailPage({ slug }) {
  const industry = getIndustry(slug);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!industry) return <NotFoundPage />;

  const relatedServiceItems = (industry.relatedServices || []).map(getService).filter(Boolean);
  const relatedWorkItems = (industry.relatedWork || []).map(getWorkItem).filter(Boolean);

  const relatedLinks = [
    ...relatedServiceItems.map((s) => ({ href: `/services/${s.slug}`, label: s.name })),
    ...relatedWorkItems.map((w) => ({ href: `/work/${w.slug}`, label: `Case study: ${w.name}` })),
    { href: "/contact", label: "Get in touch" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <SEOHead title={industry.metaTitle.replace(" | LCN254", "")} description={industry.metaDescription} path={`/industries/${industry.slug}`} />
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-4xl">

          <Reveal>
            <div className="mb-14">
              <Kicker>Industries / {industry.name}</Kicker>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(26,163,176,0.15)" }}>
                <Icon name={industry.icon} className="h-6 w-6" style={{ color: T }} />
              </div>
              <H1>{industry.hero.headline}</H1>
              <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-2xl">{industry.hero.sub}</p>
              <PrimaryLink href="/contact">{industry.cta}</PrimaryLink>
            </div>
          </Reveal>

          <Reveal><section className="mb-14">
            <H2>The Problem</H2>
            <p className="text-slate-400 leading-relaxed max-w-2xl">{industry.problem}</p>
          </section></Reveal>

          <Reveal><section className="mb-14">
            <H2>How We Help</H2>
            <ul className="space-y-3">
              {industry.howWeHelp.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-slate-300">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: T }} />{h}
                </li>
              ))}
            </ul>
          </section></Reveal>

          <Reveal><section className="mb-14">
            <H2>Features</H2>
            <div className="flex flex-wrap gap-2">
              {industry.features.map((f) => (
                <span key={f} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">{f}</span>
              ))}
            </div>
          </section></Reveal>

          <Reveal><section className="mb-14">
            <H2>Example Website Structure</H2>
            <div className="flex flex-wrap items-center gap-2">
              {industry.exampleStructure.map((page, i) => (
                <React.Fragment key={page}>
                  <span className="rounded-lg border border-white/10 bg-slate-900/60 px-3.5 py-2 text-sm text-slate-300 font-mono">{page}</span>
                  {i < industry.exampleStructure.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-slate-600" />}
                </React.Fragment>
              ))}
            </div>
          </section></Reveal>

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

          <Reveal><section className="mb-14">
            <FAQBlock items={industry.faqs} title="FAQ" />
          </section></Reveal>

          <Reveal><section className="mb-14">
            <RelatedLinks links={relatedLinks} />
          </section></Reveal>

          <FinalCTA
            headline={`Ready to build your ${industry.name.toLowerCase()} website?`}
            primaryHref="/contact"
            primaryLabel={industry.cta}
          />

          <Reveal>
            <div className="mt-14 pt-8 border-t border-white/5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Other Industries</p>
              <div className="flex flex-wrap gap-3">
                {INDUSTRIES.filter((i) => i.slug !== industry.slug).map((i) => (
                  <a key={i.slug} href={`/industries/${i.slug}`}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
                    {i.name}
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
