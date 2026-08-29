import React, { useEffect } from "react";
import SEOHead from "../components/SEOHead.jsx";
import { Reveal, Kicker, H1, FinalCTA, T } from "../components/PhaseFourUI.jsx";

const STEPS = [
  { n: "01", t: "Discover", d: "We learn about your business, your customers, and what the website actually needs to do." },
  { n: "02", t: "Strategize", d: "We map out structure, content priorities, and the conversion path before any design starts." },
  { n: "03", t: "Design", d: "A custom visual direction built around your brand — not a recycled template." },
  { n: "04", t: "Build", d: "Development on a fast, mobile-first foundation, with the integrations your project needs." },
  { n: "05", t: "Test", d: "Cross-device, cross-browser testing, plus a check of every form, link and integration." },
  { n: "06", t: "Launch", d: "Deployment to production, domain and hosting set up, and a final walkthrough with you." },
  { n: "07", t: "Grow", d: "Ongoing support, maintenance, and improvements once the site is live." },
];

export default function ProcessPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <SEOHead title="Our Process" description="How LCN254 takes a website from discovery to launch and ongoing growth, in seven clear steps." path="/process" />
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="mb-16 max-w-2xl">
              <Kicker>Process</Kicker>
              <H1>How We Take a Website From Idea to Launch.</H1>
              <p className="text-slate-400 text-lg leading-relaxed">Every project — regardless of size — follows the same seven-step process, so you always know what happens next.</p>
            </div>
          </Reveal>

          <div className="relative mb-20">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-8">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.05}>
                  <div className="flex gap-6 items-start relative">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 relative z-10 bg-slate-900 border border-white/10" style={{ color: T }}>
                      {s.n}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg mb-1.5">{s.t}</h3>
                      <p className="text-slate-400 leading-relaxed max-w-xl">{s.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <FinalCTA headline="Ready to start step one?" copy="Tell us about your business and we'll take it from there." />
        </div>
      </div>
    </div>
  );
}
