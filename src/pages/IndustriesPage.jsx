import React, { useEffect } from "react";
import SEOHead from "../components/SEOHead.jsx";
import { Reveal, Kicker, H1, H2, SummaryCard, FinalCTA } from "../components/PhaseFourUI.jsx";
import { INDUSTRIES } from "../data/industriesData.js";

export default function IndustriesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <SEOHead
        title="Websites by Industry"
        description="LCN254 designs websites around how your industry actually works — restaurants, hotels, salons, real estate, professional services and healthcare."
        path="/industries"
      />
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-6xl">

          <Reveal>
            <div className="mb-16 max-w-2xl">
              <Kicker>Industries</Kicker>
              <H1>Websites Built Around Your Industry.</H1>
              <p className="text-slate-400 text-lg leading-relaxed">
                Different businesses have different customers, challenges and goals. We design websites around the way your industry actually works.
              </p>
            </div>
          </Reveal>

          <Reveal><H2 className="sr-only">Industries We Work With</H2></Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.slug} delay={i * 0.05}>
                <SummaryCard
                  href={`/industries/${ind.slug}`}
                  icon={ind.icon}
                  color={ind.color}
                  title={ind.name}
                  desc={ind.shortDesc}
                  cta={`Explore ${ind.name}`}
                  bullets={ind.features}
                />
              </Reveal>
            ))}
          </div>

          <FinalCTA
            headline="Don't see your industry listed?"
            copy="We build for businesses outside these categories too — tell us what you do."
          />
        </div>
      </div>
    </main>
  );
}
