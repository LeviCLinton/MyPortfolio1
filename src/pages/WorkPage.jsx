import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SEOHead from "../components/SEOHead.jsx";
import { Reveal, Kicker, H1, H2, ProjectCard, FinalCTA, T } from "../components/PhaseFourUI.jsx";
import { WORK, WORK_CATEGORIES } from "../data/workData.js";

function FeaturedProject({ item }) {
  return (
    <a href={`/work/${item.slug}`} className="group block mb-14 rounded-3xl border border-white/10 overflow-hidden hover:border-white/25 transition-colors">
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]" style={{ background: item.heroGradient }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12">
          {item.isConcept && (
            <span className="mb-4 w-fit rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5">
              Concept Project
            </span>
          )}
          <p className="font-mono text-xs uppercase tracking-widest text-white/60 mb-3">{item.category} · {item.projectType}</p>
          <h2 className="text-4xl sm:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {item.title || item.name}
          </h2>
          <p className="text-slate-300 max-w-xl text-base sm:text-lg leading-relaxed mb-6">{item.shortDesc}</p>
          <span className="inline-flex items-center gap-2 text-sm font-bold text-white w-fit">
            VIEW CASE STUDY <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
          </span>
        </div>
      </div>
    </a>
  );
}

export default function WorkPage() {
  const [active, setActive] = useState("all");
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const featured = useMemo(() => WORK.find((w) => w.featured) || WORK[0], []);
  const rest = useMemo(() => WORK.filter((w) => w.slug !== featured.slug), [featured]);

  const visible = useMemo(
    () => (active === "all" ? rest : rest.filter((w) => w.category === active)),
    [active, rest]
  );

  // Only show the featured project banner when "All" is selected, or when
  // it belongs to the active category — otherwise filtering to e.g.
  // "Real Estate" would still show an unrelated featured restaurant project.
  const showFeatured = active === "all" || featured.category === active;

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <SEOHead
        title="Our Work — Portfolio & Case Studies"
        description="Selected websites and digital experiences designed and built by LCN254 — across restaurants, hospitality, e-commerce, real estate, professional services, and landing pages."
        path="/work"
      />
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-6xl">

          {/* HERO */}
          <Reveal>
            <div className="mb-8 max-w-2xl">
              <Kicker>Selected Work</Kicker>
              <H1>We build digital experiences that move businesses forward.</H1>
              <p className="text-slate-400 text-lg leading-relaxed">
                Explore selected websites and digital experiences designed to solve real business problems and create stronger digital brands.
              </p>
            </div>
          </Reveal>

          {WORK.some((w) => w.isConcept) && (
            <Reveal>
              <div className="mb-10 rounded-xl border border-amber-400/25 bg-amber-400/5 px-5 py-3 max-w-2xl">
                <p className="text-amber-200/80 text-sm">
                  Projects marked <strong className="text-amber-300">Concept Project</strong> are self-directed demonstrations, not commissioned client work. We're upfront about which is which, always — no fabricated clients, results, or testimonials.
                </p>
              </div>
            </Reveal>
          )}

          {/* CATEGORY FILTER — real state change, no full reload; every
              project remains reachable at its own crawlable URL regardless
              of filter state. */}
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-14" role="tablist" aria-label="Filter portfolio by category">
              {WORK_CATEGORIES.map((c) => (
                <button key={c.id} role="tab" aria-selected={active === c.id} onClick={() => setActive(c.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
                    active === c.id ? "bg-white text-slate-950 border-white" : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}>
                  {c.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* FEATURED PROJECT */}
          <AnimatePresence mode="wait">
            {showFeatured && (
              <motion.div key="featured" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <Reveal><H2 className="sr-only">Featured Project</H2></Reveal>
                <FeaturedProject item={featured} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* PROJECT GRID — asymmetric rhythm: every 3rd card (0-indexed: 1)
              spans two columns on desktop so the grid doesn't feel like a
              uniform CMS listing. */}
          <Reveal><H2 className="sr-only">All Projects</H2></Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
            <AnimatePresence mode="popLayout">
              {visible.map((item, i) => (
                <motion.div key={item.slug} layout
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}>
                  <ProjectCard item={item} large={i % 3 === 1} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {visible.length === 0 && (
            <Reveal>
              <p className="text-slate-500 text-sm mb-16">No projects in this category yet — check back soon, or browse another category above.</p>
            </Reveal>
          )}

          <FinalCTA
            headline="Have a project in mind?"
            copy="Let's build a digital experience that works as hard as your business does."
            primaryLabel="START A PROJECT"
            secondaryLabel="VIEW ALL WORK"
          />
        </div>
      </div>
    </main>
  );
}
