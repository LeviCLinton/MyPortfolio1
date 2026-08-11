import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Calendar, User, Tag } from "lucide-react";
import AdUnit from "./AdUnit.jsx";

const T = "#1AA3B0";
const P = "#F0409A";

// ─── Reveal helper ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.1 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

// ─── Article database ─────────────────────────────────────────────────────────
export const ARTICLES = [
  {
    slug: "ai-for-everyone-zuckerberg",
    title: "The Future Is for Everyone: A Summary of Zuckerberg's Vision for Personal Superintelligence",
    metaTitle: "Zuckerberg: AI & Personal Superintelligence for Everyone | LCN254 Blog",
    metaDescription: "Mark Zuckerberg argues superintelligence should be distributed to all, not concentrated among a few. Here's what that means for businesses in Kenya and beyond.",
    category: "AI & Technology",
    tag: "Artificial Intelligence",
    author: "LCN254 Editorial",
    date: "August 10, 2026",
    readTime: "8 min read",
    excerpt: "Mark Zuckerberg's essay argues that superintelligence should be a personal tool for everyone — not centralised in the hands of governments or a few corporations. Here's what it means for businesses in Kenya and the developing world.",
    heroGradient: `linear-gradient(135deg, ${T}15, ${P}10)`,
    featured: true,
    content: [
      {
        type: "intro",
        text: "On August 10, 2026, Meta CEO Mark Zuckerberg published a sweeping philosophical essay titled \"The Future Is for Everyone,\" laying out his vision for how superintelligence — AI that exceeds human capability — should be developed and distributed. The piece is a direct challenge to the doom-and-centralisation narrative that dominates AI discourse. For businesses in Kenya, across Africa, and in emerging markets globally, the implications are significant."
      },
      {
        type: "h2",
        text: "The Central Argument: Distribute, Don't Centralise"
      },
      {
        type: "p",
        text: "Zuckerberg's core thesis is straightforward: the greatest risk of superintelligence is not that it becomes too powerful, but that its power concentrates in too few hands. He argues that a world where only one government, one corporation, or one AI system holds superintelligence is inherently dangerous — not because of what the AI might do, but because of what humans with unchecked power historically do."
      },
      {
        type: "p",
        text: "His proposed solution is a balance of power — the same principle that underpins democracy and free markets. If everyone has access to superintelligent tools, then no single actor can dominate. Competing interests naturally check each other, and individuals retain the ability to shape their own futures."
      },
      {
        type: "h2",
        text: "Five Ways Superintelligence Will Change Everyday Life"
      },
      {
        type: "list",
        items: [
          "**Personal agents** — AI that works 24/7 on your behalf, managing health, finances, relationships, and learning. Not a chatbot; a genuinely capable representative.",
          "**Creation tools** — Zuckerberg's eight-year-old daughter coded an idea and produced videos in an evening that would previously have taken months. This kind of capability will be available to everyone.",
          "**Entrepreneurship** — Small teams and solo founders will be able to run businesses at the scale previously requiring hundreds of employees. The barrier to starting a business drops dramatically.",
          "**Personalised education** — A PhD-level tutor in every subject, with unlimited patience, available to anyone with internet access. The advantage wealthy families have in education narrows significantly.",
          "**Scientific discovery** — AI accelerating drug discovery, materials science, and research in every field — not just in the hands of top universities, but accessible to researchers everywhere."
        ]
      },
      {
        type: "h2",
        text: "What This Means for Businesses in Kenya and Africa"
      },
      {
        type: "p",
        text: "For small and medium businesses in Nairobi, Mombasa, Lagos, Accra, and across the continent, Zuckerberg's vision — if it materialises — is a genuine levelling of the playing field. Here's the practical translation:"
      },
      {
        type: "list",
        items: [
          "**A restaurant owner in Kilimani** will be able to access AI marketing, inventory management, and customer analytics that previously only large hotel chains could afford.",
          "**A freelance developer in Lagos** will have AI that can produce in an afternoon what once required a team of ten — allowing one-person studios to compete with established agencies.",
          "**A clinic in Kisumu** will have diagnostic tools informed by the latest global medical research, personalised to their patient population.",
          "**An e-commerce seller in Nairobi** will have access to AI-powered logistics, pricing, and customer service that rivals what the large platforms offer — without the platform taking a cut."
        ]
      },
      {
        type: "blockquote",
        text: "\"As everyone gains more powerful tools, each person will become more capable of shaping the future, not less.\" — Mark Zuckerberg"
      },
      {
        type: "h2",
        text: "The Job Question: Will AI Take Work Away?"
      },
      {
        type: "p",
        text: "Zuckerberg directly addresses the fear of job displacement. His argument is nuanced: automation and individual empowerment are not fixed in opposition. The question is which progresses faster. If AI primarily automates existing tasks, jobs disappear. If AI primarily expands what individuals can do, new jobs emerge faster than old ones vanish."
      },
      {
        type: "p",
        text: "He cites historical precedent: before industrialisation, 90% of people farmed. Technology freed that labour, and humanity did not become unemployed — it shifted to an enormous variety of new pursuits. He expects AI to follow the same pattern, while acknowledging the transition will be challenging and require people to adapt."
      },
      {
        type: "p",
        text: "For African economies — many of which have younger, more adaptable workforces — this transition may be less disruptive than in older economies with established industrial structures. The key is ensuring access to the tools."
      },
      {
        type: "h2",
        text: "The Risks Zuckerberg Takes Seriously"
      },
      {
        type: "p",
        text: "The essay is not uncritical boosterism. Zuckerberg outlines real risks he believes must be addressed:"
      },
      {
        type: "list",
        items: [
          "**Cybersecurity and bioterrorism** — AI that can help design drugs could also help bad actors. His proposed solution: defenders (governments, security teams) must always have greater access and resources than attackers.",
          "**Government tyranny** — Concentrated AI in government hands is as dangerous as concentration in corporate hands. Privacy-preserving personal agents are part of the answer.",
          "**Geopolitical imbalance** — If authoritarian states lead AI development, democratic values are at risk globally. He advocates for American open-source leadership as a counter.",
          "**Loss of human control** — The most speculative risk: AI that recursively improves itself beyond human direction. His proposed solution: ensure the majority of AI compute is directed by people, not AI itself."
        ]
      },
      {
        type: "h2",
        text: "Alignment Redefined: Not a Leash, but a Partnership"
      },
      {
        type: "p",
        text: "One of the most interesting sections reframes AI alignment — the technical challenge of making AI act in human interests. The conventional view treats alignment as a safety constraint: stop the AI from doing harmful things. Zuckerberg argues this framing leads to AI that enforces the values of whichever company built it, rather than the values of the person using it."
      },
      {
        type: "p",
        text: "He proposes alignment should mean the opposite: AI that genuinely represents the user's goals, not the platform's. This has immediate practical implications. An AI aligned to its company's values will refuse requests the company finds inconvenient. An AI aligned to the user's values will help them pursue their actual goals — whether that's growing a restaurant in Nairobi, writing a business plan, or learning a new skill."
      },
      {
        type: "h2",
        text: "What LCN254 Thinks"
      },
      {
        type: "p",
        text: "At LCN254, we're building websites for businesses that can't afford to look small. Zuckerberg's vision — if it lands — dramatically expands our customer base, because it dramatically expands who can afford to compete online. A small hotel in Naivasha with superintelligent marketing, booking, and customer service is no longer a small hotel in the way that phrase used to mean."
      },
      {
        type: "p",
        text: "The infrastructure for this future is being built now. The businesses that get online, establish their digital presence, and learn to use AI tools in 2026 will have a significant head start when those tools become dramatically more capable in 2027 and 2028. That's why we build what we build — fast, functional, payment-ready websites for businesses that need to be ready for what's coming."
      },
      {
        type: "h2",
        text: "The Bottom Line"
      },
      {
        type: "p",
        text: "Zuckerberg's essay is the most coherent public philosophy for AI development published by a major tech leader to date. It is also self-serving in parts — Meta benefits enormously if \"distribute AI widely\" becomes the dominant policy framework, since Meta's open-source models gain regulatory protection. Read it with that in mind."
      },
      {
        type: "p",
        text: "But the core argument — that concentrated superintelligence is dangerous regardless of who holds it, and that personal empowerment is both safer and more beneficial than centralised control — is worth taking seriously. For businesses everywhere, especially in markets historically left out of technological waves, the prospect of genuinely distributed superintelligence is not a threat. It is the biggest opportunity in a generation."
      }
    ],
    relatedTopics: ["AI for Business", "Digital Transformation in Africa", "Future of Work", "Small Business Technology"]
  },
  {
    slug: "why-your-business-needs-a-website-2026",
    title: "Why Every Kenyan Business Needs a Website in 2026 — Not a Facebook Page",
    metaTitle: "Why Your Kenyan Business Needs a Website in 2026 | LCN254 Blog",
    metaDescription: "Facebook pages and WhatsApp are not websites. Here's why every serious Kenyan business needs its own domain, and what it costs to do it properly.",
    category: "Business Growth",
    tag: "Digital Presence",
    author: "LCN254 Editorial",
    date: "August 5, 2026",
    readTime: "5 min read",
    excerpt: "More than 70% of Kenyan consumers search online before making a purchase decision. If your business isn't findable on Google, you're invisible to that majority — no matter how many Facebook followers you have.",
    heroGradient: `linear-gradient(135deg, #6366f115, ${T}10)`,
    featured: false,
    content: [
      {
        type: "intro",
        text: "A Facebook page is rented space. A WhatsApp Business profile is a messaging tool. A website is the only digital asset your business actually owns — and in 2026, the difference matters more than ever."
      },
      {
        type: "h2", text: "The Search Problem"
      },
      {
        type: "p",
        text: "When someone in Nairobi searches \"restaurants near me\" or \"best spa in Westlands\", Google returns websites — not Facebook pages. If your business doesn't have a website with proper SEO, you don't exist to those searches. You're betting your entire customer acquisition on word of mouth and social media algorithms you don't control."
      },
      {
        type: "h2", text: "Platform Risk Is Real"
      },
      {
        type: "p",
        text: "Facebook has changed its algorithm multiple times, each time reducing the organic reach of business pages. WhatsApp has had multiple outages in 2024 and 2025. Your Facebook page can be disabled without warning. Your website cannot be taken away from you."
      },
      {
        type: "h2", text: "What a Proper Website Does That Social Media Can't"
      },
      {
        type: "list",
        items: [
          "**Takes bookings automatically** — No more chasing customers on WhatsApp to confirm times",
          "**Accepts M-Pesa and card payments** — Revenue comes in while you sleep",
          "**Ranks on Google** — Customers find you when they're actively looking, not scrolling",
          "**Builds credibility** — A professional website signals permanence and seriousness",
          "**Collects customer data** — Email lists, booking history, purchase patterns — all yours"
        ]
      },
      {
        type: "p",
        text: "The businesses that dominate their category in 2028 are building their digital foundations now. The good news: it takes days, not months, and costs less than most people assume."
      }
    ],
    relatedTopics: ["SEO for Small Business", "M-Pesa Integration", "Digital Marketing Kenya"]
  },
  {
    slug: "mpesa-website-integration-guide",
    title: "M-Pesa Website Integration in 2026: What Business Owners Need to Know",
    metaTitle: "M-Pesa Website Integration Guide 2026 | LCN254 Blog",
    metaDescription: "Everything a Kenyan business owner needs to know about adding M-Pesa payments to their website — without a developer degree.",
    category: "Payments & Tech",
    tag: "M-Pesa",
    author: "LCN254 Editorial",
    date: "July 28, 2026",
    readTime: "6 min read",
    excerpt: "M-Pesa is how Kenya pays. If your website doesn't accept it, you're losing the majority of potential online transactions. Here's how integration works, what it costs, and what to expect.",
    heroGradient: `linear-gradient(135deg, #22c55e15, ${T}10)`,
    featured: false,
    content: [
      {
        type: "intro",
        text: "Kenya is one of the most advanced mobile money markets in the world. M-Pesa processes more transactions annually than many national banking systems. If your website can't accept M-Pesa, you're asking Kenyan customers to use a payment method that isn't their default — and most won't bother."
      },
      {
        type: "h2", text: "How M-Pesa Website Integration Works"
      },
      {
        type: "p",
        text: "Safaricom's Daraja API allows websites to trigger what's called an STK Push — a payment prompt that appears directly on the customer's phone. The customer enters their PIN, the payment is confirmed, and your website receives confirmation in seconds. The entire process takes under 30 seconds and requires no card, no bank account, and no app download."
      },
      {
        type: "h2", text: "What You Need to Get Started"
      },
      {
        type: "list",
        items: [
          "A registered Safaricom PayBill or Till number",
          "A Daraja API developer account (free at developer.safaricom.co.ke)",
          "A website with a backend that can handle webhooks",
          "KES 0 — there are no upfront integration fees"
        ]
      },
      {
        type: "h2", text: "Transaction Fees"
      },
      {
        type: "p",
        text: "Safaricom charges a transaction fee that varies by amount — typically between 0% and 1.5% depending on your agreement. For most small business volumes, this is significantly cheaper than card processing fees."
      },
      {
        type: "p",
        text: "At LCN254, we include M-Pesa integration in all our e-commerce and booking templates. It's not an add-on — it's the default, because it's how Kenya pays."
      }
    ],
    relatedTopics: ["Payment Integration", "E-commerce Kenya", "Safaricom Daraja"]
  }
];

// ─── Category colors ──────────────────────────────────────────────────────────
const CAT_COLORS = {
  "AI & Technology": { bg: `${T}15`, text: T, border: `${T}40` },
  "Business Growth":  { bg: `${P}15`, text: P, border: `${P}40` },
  "Payments & Tech":  { bg: "#22c55e15", text: "#22c55e", border: "#22c55e40" },
};

function CategoryBadge({ category }) {
  const c = CAT_COLORS[category] || CAT_COLORS["AI & Technology"];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
      <Tag className="h-3 w-3" />{category}
    </span>
  );
}

// ─── Blog Index ───────────────────────────────────────────────────────────────
export function BlogIndexPage({ onNavigate }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const featured = ARTICLES.find(a => a.featured);
  const rest = ARTICLES.filter(a => !a.featured);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">

      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full opacity-20 blur-[80px]"
          style={{ background: T }} />
        <div className="absolute right-0 top-1/2 h-80 w-80 rounded-full opacity-15 blur-[80px]"
          style={{ background: P }} />
      </div>

      <div className="relative z-10 pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-5xl">

          <Reveal>
            <div className="mb-14">
              <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: T }}>
                LCN254 Blog
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Tech, business, and{" "}
                <span className="bg-gradient-to-r from-[#1AA3B0] to-[#F0409A] bg-clip-text text-transparent">
                  what's coming next.
                </span>
              </h1>
              <p className="text-slate-400 max-w-xl text-lg">
                Practical articles on how websites help businesses scale, what's happening in AI, and how to stay ahead in a fast-moving digital world.
              </p>
            </div>
          </Reveal>

          {/* Featured article */}
          {featured && (
            <Reveal>
              <button onClick={() => onNavigate(`#blog/${featured.slug}`)}
                className="group w-full text-left mb-12 rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors"
                style={{ background: featured.heroGradient }}>
                <div className="p-8 sm:p-10">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                      style={{ background: `${T}30`, color: T }}>Featured</span>
                    <CategoryBadge category={featured.category} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-[#3FC1CB] transition-colors"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {featured.title}
                  </h2>
                  <p className="text-slate-400 max-w-2xl mb-6 leading-relaxed">{featured.excerpt}</p>
                  <div className="flex items-center gap-5 text-xs text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{featured.author}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{featured.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
                    <span className="ml-auto flex items-center gap-1.5 font-semibold"
                      style={{ color: T }}>
                      Read article <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          )}

          {/* Ad unit — between featured and grid */}
          <Reveal>
            <AdUnit slot="blogBanner" className="mb-12" />
          </Reveal>

          {/* Article grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rest.map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.07}>
                <motion.button whileHover={{ y: -3 }}
                  onClick={() => onNavigate(`#blog/${article.slug}`)}
                  className="group w-full text-left rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md overflow-hidden hover:border-white/20 transition-colors">
                  <div className="h-2 w-full" style={{ background: article.heroGradient }} />
                  <div className="p-6">
                    <CategoryBadge category={article.category} />
                    <h3 className="mt-4 mb-3 font-bold text-white group-hover:text-[#3FC1CB] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{article.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
                    </div>
                  </div>
                </motion.button>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <Reveal>
            <div className="mt-16 text-center rounded-2xl border border-white/5 bg-slate-900/40 p-8">
              <h2 className="font-bold text-white text-xl mb-2">Ready to get your business online?</h2>
              <p className="text-slate-400 text-sm mb-6">Browse our templates or get in touch for a custom quote.</p>
              <div className="flex justify-center gap-4 flex-wrap">
                <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNavigate("#templates")}
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-slate-950"
                  style={{ background: `linear-gradient(135deg,${T},${P})` }}>
                  Browse Templates <ArrowRight className="h-4 w-4" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNavigate("#contact")}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                  Get a Free Quote
                </motion.button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

// ─── Blog Article ─────────────────────────────────────────────────────────────
export function BlogArticlePage({ slug, onNavigate }) {
  const article = ARTICLES.find(a => a.slug === slug);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  // Update page title for SEO
  useEffect(() => {
    if (article) {
      document.title = article.metaTitle;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", article.metaDescription);
    }
    return () => {
      document.title = "LCN254 — Deployment-Ready Websites for Local Businesses";
    };
  }, [article]);

  if (!article) return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-slate-400 mb-4">Article not found.</p>
        <button onClick={() => onNavigate("#blog")} className="text-[#3FC1CB] underline">Back to blog</button>
      </div>
    </div>
  );

  const renderBlock = (block, i) => {
    switch (block.type) {
      case "intro":
        return (
          <p key={i} className="text-xl text-slate-300 leading-relaxed font-light border-l-2 pl-6 mb-8"
            style={{ borderColor: T }}>
            {block.text}
          </p>
        );
      case "h2":
        return (
          <h2 key={i} className="text-2xl font-bold text-white mt-12 mb-5"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {block.text}
          </h2>
        );
      case "p":
        return (
          <p key={i} className="text-slate-400 leading-relaxed mb-5">{block.text}</p>
        );
      case "list":
        return (
          <ul key={i} className="mb-6 space-y-3">
            {block.items.map((item, j) => {
              const parts = item.split("**");
              return (
                <li key={j} className="flex gap-3 text-slate-400 leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: T }} />
                  <span>
                    {parts.map((part, k) => k % 2 === 1
                      ? <strong key={k} className="text-white font-semibold">{part}</strong>
                      : part
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      case "blockquote":
        return (
          <blockquote key={i} className="my-8 rounded-xl p-6 italic text-slate-300 text-lg"
            style={{ background: `${T}10`, borderLeft: `3px solid ${T}` }}>
            {block.text}
          </blockquote>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">

      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full opacity-15 blur-[90px]"
          style={{ background: T }} />
      </div>

      <div className="relative z-10 pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-3xl">

          {/* Back */}
          <Reveal>
            <button onClick={() => onNavigate("#blog")}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-10 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </button>
          </Reveal>

          {/* Header */}
          <Reveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 flex-wrap mb-5">
                <CategoryBadge category={article.category} />
                <span className="text-xs text-slate-500">{article.tag}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {article.title}
              </h1>
              <div className="flex items-center gap-5 text-sm text-slate-500 flex-wrap pb-8 border-b border-white/5">
                <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{article.author}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{article.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{article.readTime}</span>
              </div>
            </div>
          </Reveal>

          {/* Article body */}
          <Reveal delay={0.1}>
            <article className="prose-content">
              {article.content.map((block, i) => (
                <>
                  {renderBlock(block, i)}
                  {/* Mid-article ad after block 3 */}
                  {i === 2 && (
                    <AdUnit key="mid-ad" slot="blogBanner" className="my-8" />
                  )}
                </>
              ))}
            </article>
          </Reveal>

          {/* Related topics */}
          <Reveal>
            <div className="mt-12 pt-8 border-t border-white/5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Related Topics</p>
              <div className="flex flex-wrap gap-2">
                {article.relatedTopics.map(t => (
                  <span key={t} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Ad unit before CTA */}
          <Reveal>
            <AdUnit slot="blogBanner" className="mt-10" />
          </Reveal>

          {/* CTA */}
          <Reveal>
            <div className="mt-12 rounded-2xl border border-white/5 p-7 text-center"
              style={{ background: `linear-gradient(135deg,${T}10,${P}08)` }}>
              <p className="font-bold text-white mb-2">Need a website for your business?</p>
              <p className="text-slate-400 text-sm mb-5">LCN254 builds fast, functional websites for businesses of every size — live in days.</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNavigate("#templates")}
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-slate-950"
                  style={{ background: `linear-gradient(135deg,${T},${P})` }}>
                  Browse Templates <ArrowRight className="h-4 w-4" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNavigate("#contact")}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white">
                  Get a Free Quote
                </motion.button>
              </div>
            </div>
          </Reveal>

          {/* Other articles */}
          <Reveal>
            <div className="mt-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">More Articles</p>
              <div className="space-y-4">
                {ARTICLES.filter(a => a.slug !== slug).slice(0, 2).map(a => (
                  <motion.button key={a.slug} whileHover={{ x: 4 }}
                    onClick={() => onNavigate(`#blog/${a.slug}`)}
                    className="group w-full text-left flex items-center gap-4 rounded-xl border border-white/5 bg-slate-900/40 p-4 hover:border-white/10 transition-colors">
                    <div className="h-12 w-12 rounded-xl flex-shrink-0"
                      style={{ background: a.heroGradient }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-white group-hover:text-[#3FC1CB] transition-colors truncate">{a.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{a.date} · {a.readTime}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-[#3FC1CB] transition-colors flex-shrink-0" />
                  </motion.button>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </div>
  );
}
