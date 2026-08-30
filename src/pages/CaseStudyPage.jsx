import React, { useEffect } from "react";
import SEOHead from "../components/SEOHead.jsx";
import { Reveal, Kicker, H1, H2, FinalCTA, RelatedLinks, BrowserFrame, PhoneFrame, T } from "../components/PhaseFourUI.jsx";
import { getWorkItem, getAdjacentWork } from "../data/workData.js";
import { PlayCircle, ArrowRight } from "lucide-react";
import NotFoundPage from "./NotFoundPage.jsx";

function MetaRow({ label, value }) {
  return (
    <div className="py-3 border-b border-white/5 flex justify-between gap-4">
      <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</span>
      <span className="text-sm text-white text-right">{value}</span>
    </div>
  );
}

function NextProjectCard({ item, label }) {
  return (
    <a href={`/work/${item.slug}`} className="group block rounded-2xl border border-white/10 overflow-hidden hover:border-white/25 transition-colors">
      <div className="relative h-40 sm:h-56 overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]" style={{ background: item.heroGradient }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <span className="font-mono text-[11px] uppercase tracking-widest text-white/60 mb-1">{label}</span>
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {item.title || item.name}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
          </h3>
        </div>
      </div>
    </a>
  );
}

export default function CaseStudyPage({ slug }) {
  const item = getWorkItem(slug);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!item) return <NotFoundPage />;

  const { prev, next } = getAdjacentWork(slug);

  const relatedIndustrySlug = {
    "Restaurants": "restaurants", "Hospitality": "hotels", "Real Estate": "real-estate",
    "Professional Services": "professional-services", "E-commerce": null, "Landing Pages": null, "Other": null,
  }[item.category];

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <SEOHead
        title={`${item.title || item.name} — Case Study`}
        description={item.shortDesc}
        path={`/work/${item.slug}`}
      />
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-4xl">

          {/* ── 1. CASE STUDY HERO ── */}
          <Reveal>
            <Kicker>{item.projectType}</Kicker>
          </Reveal>
          <Reveal>
            <H1>{item.title || item.name}</H1>
          </Reveal>
          <Reveal>
            <p className="text-slate-400 text-lg max-w-2xl mb-5 leading-relaxed">{item.shortDesc}</p>
          </Reveal>
          {item.isConcept && (
            <Reveal>
              <div className="mb-10 inline-flex items-center gap-2 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider px-3 py-1.5">
                Concept Project — not a commissioned client
              </div>
            </Reveal>
          )}

          <Reveal>
            <div className="mb-4">
              <BrowserFrame src={item.demoPath} title={`${item.title || item.name} — desktop preview`} height={520} />
            </div>
          </Reveal>
          {item.demoPath && (
            <Reveal>
              <a href={`/${item.demoPath}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold mb-16" style={{ color: T }}>
                <PlayCircle className="h-4 w-4" /> Open Live Demo in a New Tab
              </a>
            </Reveal>
          )}

          {/* ── 2. PROJECT OVERVIEW ── */}
          <Reveal><section className="mb-16">
            <H2>Project Overview</H2>
            <p className="text-slate-400 leading-relaxed mb-8">{item.overview}</p>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 sm:p-8">
              <MetaRow label="Project" value={item.title || item.name} />
              <MetaRow label="Client / Status" value={item.client} />
              <MetaRow label="Industry" value={item.industry} />
              <MetaRow label="Services" value={item.services.join(", ")} />
              <MetaRow label="Year" value={item.year} />
              <div className="pt-3 flex justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Status</span>
                <span className="text-sm font-semibold" style={{ color: T }}>{item.type}</span>
              </div>
            </div>
          </section></Reveal>

          {/* ── 3. THE CHALLENGE ── */}
          <Reveal><section className="mb-16">
            <H2>The Challenge</H2>
            <p className="text-slate-400 leading-relaxed">{item.challenge}</p>
          </section></Reveal>

          {/* ── 4. STRATEGY ── */}
          <Reveal><section className="mb-16">
            <H2>Strategy</H2>
            <p className="text-slate-400 leading-relaxed mb-6">{item.strategy.intro}</p>
            <div className="space-y-5 mb-6">
              {item.strategy.objectives.map((o) => (
                <div key={o.n} className="flex gap-5">
                  <span className="font-mono text-sm shrink-0" style={{ color: T }}>{o.n}</span>
                  <div>
                    <p className="font-semibold text-white mb-1">{o.label}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{o.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-slate-400 leading-relaxed">{item.strategy.closing}</p>
          </section></Reveal>

          {/* ── 5. DESIGN APPROACH ── */}
          <Reveal><section className="mb-16">
            <H2>Design Approach</H2>
            <p className="text-slate-400 leading-relaxed">{item.designApproach}</p>
          </section></Reveal>

          {/* ── 6. FEATURES ── */}
          <Reveal><section className="mb-16">
            <H2>Features</H2>
            <div className="flex flex-wrap gap-2">
              {item.keyFeatures.map((f) => (
                <span key={f} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-slate-300">{f}</span>
              ))}
            </div>
          </section></Reveal>

          {/* ── 7. TECHNOLOGY ── */}
          <Reveal><section className="mb-16">
            <H2>Technology</H2>
            <div className="flex flex-wrap gap-2">
              {item.technology.map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm font-mono text-slate-400">{t}</span>
              ))}
            </div>
          </section></Reveal>

          {/* ── 8. VISUAL SHOWCASE — real, live device mockups ── */}
          <Reveal><section className="mb-16">
            <H2>Visual Showcase</H2>
            <p className="text-slate-400 leading-relaxed mb-8">
              The frames below load the actual concept build — not a static screenshot — so the responsive behaviour shown is genuine.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Desktop Experience</p>
                <BrowserFrame src={item.demoPath} title={`${item.title || item.name} — desktop`} height={420} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3 text-center lg:text-left">Mobile Experience</p>
                <PhoneFrame src={item.demoPath} title={`${item.title || item.name} — mobile`} height={420} />
              </div>
            </div>
          </section></Reveal>

          {/* ── 9. RESULTS ── */}
          <Reveal><section className="mb-16">
            <H2>{item.isConcept ? "Project Outcome" : "Results"}</H2>
            <p className="text-slate-400 leading-relaxed">{item.outcome}</p>
          </section></Reveal>

          {/* ── 11. FINAL PROJECT SUMMARY ── */}
          <Reveal><section className="mb-16">
            <H2>The Outcome</H2>
            <p className="text-slate-400 leading-relaxed">{item.summary}</p>
          </section></Reveal>

          <Reveal><section className="mb-16">
            <RelatedLinks links={[
              ...(relatedIndustrySlug ? [{ href: `/industries/${relatedIndustrySlug}`, label: `${item.category} industry page` }] : []),
              { href: "/services", label: "Browse services" },
              { href: "/work", label: "All work" },
            ]} />
          </section></Reveal>

          {/* ── 13. FINAL CTA ── */}
          <FinalCTA
            headline="Have a project in mind?"
            copy="Let's build a digital experience that works as hard as your business does."
            primaryLabel="START A PROJECT"
            secondaryLabel="VIEW ALL WORK"
          />

          {/* ── 12. NEXT / PREVIOUS PROJECT ── */}
          <Reveal>
            <div className="mt-16 pt-10 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {prev && <NextProjectCard item={prev} label="← Previous Project" />}
              {next && <NextProjectCard item={next} label="Next Project →" />}
            </div>
          </Reveal>

        </div>
      </div>
    </main>
  );
}
