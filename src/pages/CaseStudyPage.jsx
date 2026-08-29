import React, { useEffect } from "react";
import SEOHead from "../components/SEOHead.jsx";
import { Reveal, Kicker, H1, H2, FinalCTA, RelatedLinks, T } from "../components/PhaseFourUI.jsx";
import { getWorkItem, WORK } from "../data/workData.js";
import { PlayCircle } from "lucide-react";
import NotFoundPage from "./NotFoundPage.jsx";

export default function CaseStudyPage({ slug }) {
  const item = getWorkItem(slug);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!item) return <NotFoundPage />;

  const more = WORK.filter((w) => w.slug !== item.slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <SEOHead
        title={`${item.name} — Case Study`}
        description={item.shortDesc}
        path={`/work/${item.slug}`}
      />
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-3xl">

          {/* HERO */}
          <Reveal>
            <div className="mb-4">
              <Kicker>{item.projectType} · {item.industry}</Kicker>
            </div>
          </Reveal>

          {item.isConcept && (
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider px-3 py-1.5">
                Concept Project — not a commissioned client
              </div>
            </Reveal>
          )}

          <Reveal>
            <H1>{item.name}</H1>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl overflow-hidden border border-white/10 mb-4" style={{ background: item.heroGradient, minHeight: 220 }} />
          </Reveal>

          {item.demoPath && (
            <Reveal>
              <a href={`/${item.demoPath}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold mb-14" style={{ color: T }}>
                <PlayCircle className="h-4 w-4" /> View Live Demo
              </a>
            </Reveal>
          )}

          <Reveal><section className="mb-12">
            <H2>Project Overview</H2>
            <p className="text-slate-400 leading-relaxed">{item.overview}</p>
          </section></Reveal>

          <Reveal><section className="mb-12">
            <H2>The Challenge</H2>
            <p className="text-slate-400 leading-relaxed">{item.challenge}</p>
          </section></Reveal>

          <Reveal><section className="mb-12">
            <H2>The Approach</H2>
            <p className="text-slate-400 leading-relaxed">{item.approach}</p>
          </section></Reveal>

          <Reveal><section className="mb-12">
            <H2>The Solution</H2>
            <p className="text-slate-400 leading-relaxed">{item.solution}</p>
          </section></Reveal>

          <Reveal><section className="mb-12">
            <H2>Key Features</H2>
            <div className="flex flex-wrap gap-2">
              {item.keyFeatures.map((f) => (
                <span key={f} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-slate-300">{f}</span>
              ))}
            </div>
          </section></Reveal>

          <Reveal><section className="mb-12">
            <H2>Technology</H2>
            <div className="flex flex-wrap gap-2">
              {item.technology.map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm font-mono text-slate-400">{t}</span>
              ))}
            </div>
          </section></Reveal>

          <Reveal><section className="mb-12">
            <H2>{item.isConcept ? "Outcome" : "Result"}</H2>
            <p className="text-slate-400 leading-relaxed">{item.outcome}</p>
          </section></Reveal>

          <Reveal><section className="mb-12">
            <RelatedLinks links={[
              { href: "/services/business-websites", label: "Business Websites service" },
              { href: "/industries", label: "Browse industries" },
              { href: "/work", label: "All work" },
            ]} />
          </section></Reveal>

          <FinalCTA headline="Want a website like this for your business?" />

          <Reveal>
            <div className="mt-14 pt-8 border-t border-white/5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">More Work</p>
              <div className="space-y-4">
                {more.map((w) => (
                  <a key={w.slug} href={`/work/${w.slug}`}
                    className="group flex items-center gap-4 rounded-xl border border-white/5 bg-slate-900/40 p-4 hover:border-white/10 transition-colors">
                    <div className="h-12 w-12 rounded-xl flex-shrink-0" style={{ background: w.heroGradient }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-white group-hover:text-[#3FC1CB] transition-colors truncate">{w.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{w.industry}</p>
                    </div>
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
