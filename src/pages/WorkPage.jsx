import React, { useEffect, useMemo, useState } from "react";
import SEOHead from "../components/SEOHead.jsx";
import { Reveal, Kicker, H1, H2, WorkCard, FinalCTA } from "../components/PhaseFourUI.jsx";
import { WORK, WORK_FILTERS } from "../data/workData.js";

export default function WorkPage() {
  const [active, setActive] = useState("all");
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const visible = useMemo(
    () => (active === "all" ? WORK : WORK.filter((w) => w.filterTags.includes(active))),
    [active]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <SEOHead
        title="Our Work — Website Design & Development Portfolio"
        description="Explore website and digital experience concepts designed and built by LCN254, across restaurants, hotels, salons, e-commerce and more."
        path="/work"
      />
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-6xl">

          <Reveal>
            <div className="mb-6 max-w-2xl">
              <Kicker>Our Work</Kicker>
              <H1>Work That Speaks for Itself.</H1>
              <p className="text-slate-400 text-lg leading-relaxed">
                Explore websites and digital experiences designed and built by LCN254.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="mb-4 rounded-xl border border-amber-400/25 bg-amber-400/5 px-5 py-3 max-w-2xl">
              <p className="text-amber-200/80 text-sm">
                The projects below are marked <strong className="text-amber-300">Concept Project</strong> where they are self-directed demonstrations rather than commissioned client work. We're upfront about which is which — always.
              </p>
            </div>
          </Reveal>

          {/* Filters — these only change which real <a href> cards render;
              every project remains reachable at its own crawlable URL regardless
              of filter state, and links are never JS-only buttons. */}
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-10 mt-8">
              {WORK_FILTERS.map((f) => (
                <button key={f.id} onClick={() => setActive(f.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
                    active === f.id ? "bg-white text-slate-950 border-white" : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}>
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal><H2 className="sr-only">Featured Work</H2></Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {visible.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.05}>
                <WorkCard item={item} />
              </Reveal>
            ))}
          </div>

          <FinalCTA
            headline="Want a website like one of these for your business?"
            copy="Every project starts with a conversation about what you actually need."
          />
        </div>
      </div>
    </main>
  );
}
