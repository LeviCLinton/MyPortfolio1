import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Calendar, User, Tag } from "lucide-react";
import AdUnit from "./AdUnit.jsx";
import SEOHead from "./components/SEOHead.jsx";

const T = "#1AA3B0";
const P = "#F0409A";

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

export const ARTICLES = [
  {
    slug: "ai-for-everyone-zuckerberg",
    title: "The Future Is for Everyone: A Summary of Zuckerberg's Vision for Personal Superintelligence",
    metaTitle: "Zuckerberg: AI & Personal Superintelligence for Everyone",
    metaDescription: "Mark Zuckerberg argues superintelligence should be distributed to all, not concentrated among a few. Here's what that means for businesses in Kenya and beyond.",
    category: "AI & Technology",
    tag: "Artificial Intelligence",
    author: "LCN254 Editorial",
    date: "August 10, 2026",
    readTime: "8 min read",
    excerpt: "Mark Zuckerberg's essay argues that superintelligence should be a personal tool for everyone, not centralised in the hands of governments or a few corporations. Here's what it means for businesses in Kenya and the developing world.",
    heroGradient: "linear-gradient(135deg, #1AA3B015, #F0409A10)",
    featured: true,
    content: [
      { type: "intro", text: "On August 10, 2026, Meta CEO Mark Zuckerberg published a sweeping philosophical essay titled The Future Is for Everyone, laying out his vision for how superintelligence should be developed and distributed. For businesses in Kenya, across Africa, and in emerging markets globally, the implications are significant." },
      { type: "h2", text: "The Central Argument: Distribute, Don't Centralise" },
      { type: "p", text: "Zuckerberg's core thesis is straightforward: the greatest risk of superintelligence is not that it becomes too powerful, but that its power concentrates in too few hands." },
      { type: "p", text: "His proposed solution is a balance of power, the same principle that underpins democracy and free markets. If everyone has access to superintelligent tools, no single actor can dominate." },
      { type: "h2", text: "What This Means for Businesses in Kenya and Africa" },
      { type: "list", items: [
        "**A restaurant owner in Kilimani** will be able to access AI marketing, inventory management, and customer analytics that previously only large hotel chains could afford.",
        "**A freelance developer in Lagos** will have AI that can produce in an afternoon what once required a team of ten.",
        "**A clinic in Kisumu** will have diagnostic tools informed by the latest global medical research.",
        "**An e-commerce seller in Nairobi** will have access to AI-powered logistics, pricing, and customer service that rivals large platforms.",
      ]},
      { type: "h2", text: "What LCN254 Thinks" },
      { type: "p", text: "At LCN254, we build websites for businesses that can't afford to look small. A wider distribution of capable AI tools expands who can afford to compete online — a small hotel with better marketing, booking, and customer service is no longer a small hotel in the way that phrase used to mean." },
      { type: "p", text: "The businesses that build a real digital foundation now will have a head start as these tools become more capable. That's part of why we build what we build." },
    ],
    relatedTopics: ["AI for Business", "Digital Transformation in Africa", "Future of Work", "Small Business Technology"],
  },
  {
    slug: "why-your-business-needs-a-website-2026",
    title: "Why Every Kenyan Business Needs a Website in 2026, Not a Facebook Page",
    metaTitle: "Why Your Kenyan Business Needs a Website in 2026",
    metaDescription: "Facebook pages and WhatsApp are not websites. Here's why every serious Kenyan business needs its own domain, and what it costs to do it properly.",
    category: "Business Growth",
    tag: "Digital Presence",
    author: "LCN254 Editorial",
    date: "August 5, 2026",
    readTime: "5 min read",
    excerpt: "More than 70% of Kenyan consumers search online before making a purchase decision. If your business isn't findable on Google, you're invisible to that majority, no matter how many Facebook followers you have.",
    heroGradient: "linear-gradient(135deg, #6366f115, #1AA3B010)",
    featured: false,
    content: [
      { type: "intro", text: "A Facebook page is rented space. A WhatsApp Business profile is a messaging tool. A website is the only digital asset your business actually owns, and in 2026, the difference matters more than ever." },
      { type: "h2", text: "The Search Problem" },
      { type: "p", text: "When someone searches for a business near them, Google returns websites, not Facebook pages. If your business doesn't have a website with proper SEO, you don't exist to those searches." },
      { type: "h2", text: "What a Proper Website Does That Social Media Can't" },
      { type: "list", items: [
        "**Takes bookings automatically**, so you're not chasing customers on WhatsApp to confirm times",
        "**Accepts payments where scoped**, so revenue can come in while you sleep",
        "**Ranks on Google**, so customers find you when they're actively looking",
        "**Builds credibility**, since a professional website signals permanence and seriousness",
        "**Collects customer data** — email lists, booking history, purchase patterns, all yours",
      ]},
    ],
    relatedTopics: ["SEO for Small Business", "Digital Marketing Kenya"],
  },
  {
    slug: "mpesa-website-integration-guide",
    title: "M-Pesa Website Integration in 2026: What Business Owners Need to Know",
    metaTitle: "M-Pesa Website Integration Guide 2026",
    metaDescription: "Everything a Kenyan business owner needs to know about adding M-Pesa payments to their website.",
    category: "Payments & Tech",
    tag: "M-Pesa",
    author: "LCN254 Editorial",
    date: "July 28, 2026",
    readTime: "6 min read",
    excerpt: "M-Pesa is how Kenya pays. If your website doesn't accept it, you're losing the majority of potential online transactions. Here's how integration works, what it costs, and what to expect.",
    heroGradient: "linear-gradient(135deg, #22c55e15, #1AA3B010)",
    featured: false,
    content: [
      { type: "intro", text: "Kenya is one of the most advanced mobile money markets in the world. If your website can't accept M-Pesa, you're asking customers to use a payment method that isn't their default." },
      { type: "h2", text: "How M-Pesa Website Integration Works" },
      { type: "p", text: "Safaricom's Daraja API allows websites to trigger an STK Push, a payment prompt on the customer's phone. The customer enters their PIN, the payment is confirmed, and your website receives confirmation in seconds." },
      { type: "h2", text: "What You Need to Get Started" },
      { type: "list", items: [
        "A registered Safaricom PayBill or Till number",
        "A Daraja API developer account",
        "A website with a backend that can handle webhooks",
      ]},
      { type: "p", text: "Where M-Pesa is part of the agreed scope of an LCN254 e-commerce or booking project, we implement and test it before launch. It's never assumed by default." },
    ],
    relatedTopics: ["Payment Integration", "E-commerce Kenya"],
  },
  {
    slug: "web-architecture-mistakes-costing-revenue",
    title: "Why Your Website Isn't Converting: 5 Invisible Web Architecture Mistakes Costing You Revenue",
    metaTitle: "5 Web Architecture Mistakes Killing Your Conversions",
    metaDescription: "Slow load times, poor mobile UX, and broken funnels are silently draining revenue. Fix these 5 invisible architecture mistakes before your competitors do.",
    category: "Business Growth",
    tag: "Web Performance",
    author: "LCN254 Editorial",
    date: "August 12, 2026",
    readTime: "9 min read",
    excerpt: "A 1-second delay in page load time reduces conversions by 7%. Most business owners never find the real culprit, because it's buried in their site's architecture, not their marketing copy.",
    heroGradient: "linear-gradient(135deg, #6366f115, #F0409A10)",
    featured: false,
    content: [
      { type: "intro", text: "A 1-second delay in page load time reduces conversions by 7%. Yet most business owners respond to poor conversion rates by rewriting headlines or buying more ad traffic, while the actual problem sits untouched inside their site's architecture." },
      { type: "h2", text: "Mistake #1: Slow Server Response Time" },
      { type: "p", text: "Time to First Byte should be under 200ms. Serving your site from the edge, a global network of servers, can cut this by 60 to 80 percent without touching any code." },
      { type: "h2", text: "Mistake #2: Oversized Images" },
      { type: "list", items: [
        "**Use the right format** — WebP delivers similar quality at a smaller file size",
        "**Serve the right size** — a 400px-wide thumbnail should be 400px wide on disk",
        "**Lazy-load below-the-fold images**",
      ]},
      { type: "h2", text: "Mistake #3: Desktop-First Mobile Experience" },
      { type: "p", text: "In Kenya and most of Sub-Saharan Africa, mobile accounts for 70 to 85 percent of web traffic. A site designed desktop-first typically fails on touch targets, text size, and form usability on mobile." },
      { type: "h2", text: "Mistake #4: An Invisible Hole in the Conversion Funnel" },
      { type: "p", text: "Most businesses can tell when someone doesn't buy, but not at which step they stopped, or why. Checkout forms that don't save progress, missing local payment methods, and unhelpful error messages are common culprits." },
      { type: "h2", text: "Mistake #5: Render-Blocking JavaScript" },
      { type: "p", text: "Code that must fully download and execute before the page can display anything leaves visitors staring at a blank screen. Deferring scripts and pre-rendering pages fixes this at the architecture level." },
      { type: "h2", text: "The Bottom Line" },
      { type: "p", text: "Every website LCN254 builds is pre-rendered for fast initial load, mobile-first by default, and image-optimised, because a site that loads fast and works on a phone is the baseline, not a premium feature." },
    ],
    relatedTopics: ["Core Web Vitals", "Mobile UX", "Conversion Rate Optimisation"],
  },
];

const CAT_COLORS = {
  "AI & Technology": { bg: "#1AA3B015", text: T, border: "#1AA3B040" },
  "Business Growth":  { bg: "#F0409A15", text: P, border: "#F0409A40" },
  "Payments & Tech":  { bg: "#22c55e15", text: "#22c55e", border: "#22c55e40" },
};

function CategoryBadge({ category }) {
  const c = CAT_COLORS[category] || CAT_COLORS["AI & Technology"];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
      style={{ background: c.bg, color: c.text, border: "1px solid " + c.border }}>
      <Tag className="h-3 w-3" />{category}
    </span>
  );
}

export function BlogIndexPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const featured = ARTICLES.find((a) => a.featured);
  const rest = ARTICLES.filter((a) => !a.featured);

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <SEOHead title="Blog" description="Practical articles on how websites help businesses scale, what's happening in AI, and how to stay ahead in a fast-moving digital world." path="/blog" />

      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full opacity-20 blur-[80px]" style={{ background: T }} />
        <div className="absolute right-0 top-1/2 h-80 w-80 rounded-full opacity-15 blur-[80px]" style={{ background: P }} />
      </div>

      <div className="relative z-10 pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-5xl">

          <Reveal>
            <div className="mb-14">
              <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: T }}>LCN254 Blog</span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Tech, business, and{" "}
                <span className="bg-gradient-to-r from-[#1AA3B0] to-[#F0409A] bg-clip-text text-transparent">what's coming next.</span>
              </h1>
              <p className="text-slate-400 max-w-xl text-lg">
                Practical articles on how websites help businesses scale, what's happening in AI, and how to stay ahead in a fast-moving digital world.
              </p>
            </div>
          </Reveal>

          {featured && (
            <Reveal>
              <a href={"/blog/" + featured.slug}
                className="group block w-full text-left mb-12 rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors"
                style={{ background: featured.heroGradient }}>
                <div className="p-8 sm:p-10">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="rounded-full px-2.5 py-0.5 text-xs font-bold" style={{ background: T + "30", color: T }}>Featured</span>
                    <CategoryBadge category={featured.category} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-[#3FC1CB] transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {featured.title}
                  </h2>
                  <p className="text-slate-400 max-w-2xl mb-6 leading-relaxed">{featured.excerpt}</p>
                  <div className="flex items-center gap-5 text-xs text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{featured.author}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{featured.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
                    <span className="ml-auto flex items-center gap-1.5 font-semibold" style={{ color: T }}>
                      Read article <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          )}

          <Reveal>
            <AdUnit slot="blogBanner" className="mb-12" />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rest.map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.07}>
                <motion.a whileHover={{ y: -3 }} href={"/blog/" + article.slug}
                  className="group block w-full text-left rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md overflow-hidden hover:border-white/20 transition-colors">
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
                </motion.a>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 text-center rounded-2xl border border-white/5 bg-slate-900/40 p-8">
              <h2 className="font-bold text-white text-xl mb-2">Ready to get your business online?</h2>
              <p className="text-slate-400 text-sm mb-6">Browse our services or get in touch for a custom quote.</p>
              <div className="flex justify-center gap-4 flex-wrap">
                <motion.a whileHover={{ scale: 1.02 }} href="/services"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-slate-950"
                  style={{ background: "linear-gradient(135deg,#1AA3B0,#F0409A)" }}>
                  Browse Services <ArrowRight className="h-4 w-4" />
                </motion.a>
                <motion.a whileHover={{ scale: 1.02 }} href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                  Get a Free Quote
                </motion.a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

export function BlogArticlePage({ slug }) {
  const article = ARTICLES.find((a) => a.slug === slug);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!article) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <SEOHead title="Article Not Found" description="This article could not be found." path="/blog" />
        <div className="text-center">
          <p className="text-slate-400 mb-4">Article not found.</p>
          <a href="/blog" className="text-[#3FC1CB] underline">Back to blog</a>
        </div>
      </main>
    );
  }

  const renderBlock = (block, i) => {
    switch (block.type) {
      case "intro":
        return <p key={i} className="text-xl text-slate-300 leading-relaxed font-light border-l-2 pl-6 mb-8" style={{ borderColor: T }}>{block.text}</p>;
      case "h2":
        return <h2 key={i} className="text-2xl font-bold text-white mt-12 mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{block.text}</h2>;
      case "p":
        return <p key={i} className="text-slate-400 leading-relaxed mb-5">{block.text}</p>;
      case "list":
        return (
          <ul key={i} className="mb-6 space-y-3">
            {block.items.map((item, j) => {
              const parts = item.split("**");
              return (
                <li key={j} className="flex gap-3 text-slate-400 leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: T }} />
                  <span>{parts.map((part, k) => (k % 2 === 1 ? <strong key={k} className="text-white font-semibold">{part}</strong> : part))}</span>
                </li>
              );
            })}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <SEOHead title={article.metaTitle} description={article.metaDescription} path={"/blog/" + article.slug} />

      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full opacity-15 blur-[90px]" style={{ background: T }} />
      </div>

      <div className="relative z-10 pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-3xl">

          <Reveal>
            <a href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-10 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </a>
          </Reveal>

          <Reveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 flex-wrap mb-5">
                <CategoryBadge category={article.category} />
                <span className="text-xs text-slate-500">{article.tag}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {article.title}
              </h1>
              <div className="flex items-center gap-5 text-sm text-slate-500 flex-wrap pb-8 border-b border-white/5">
                <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{article.author}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{article.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{article.readTime}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="prose-content">
              {article.content.map((block, i) => (
                <React.Fragment key={i}>
                  {renderBlock(block, i)}
                  {i === 2 && <AdUnit key="mid-ad" slot="blogBanner" className="my-8" />}
                </React.Fragment>
              ))}
            </article>
          </Reveal>

          <Reveal>
            <div className="mt-12 pt-8 border-t border-white/5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Related Topics</p>
              <div className="flex flex-wrap gap-2">
                {article.relatedTopics.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-400">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <AdUnit slot="blogBanner" className="mt-10" />
          </Reveal>

          <Reveal>
            <div className="mt-12 rounded-2xl border border-white/5 p-7 text-center" style={{ background: "linear-gradient(135deg,#1AA3B010,#F0409A08)" }}>
              <p className="font-bold text-white mb-2">Need a website for your business?</p>
              <p className="text-slate-400 text-sm mb-5">LCN254 builds fast, functional websites for businesses of every size, live in days.</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <motion.a whileHover={{ scale: 1.02 }} href="/services"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-slate-950"
                  style={{ background: "linear-gradient(135deg,#1AA3B0,#F0409A)" }}>
                  Browse Services <ArrowRight className="h-4 w-4" />
                </motion.a>
                <motion.a whileHover={{ scale: 1.02 }} href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white">
                  Get a Free Quote
                </motion.a>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">More Articles</p>
              <div className="space-y-4">
                {ARTICLES.filter((a) => a.slug !== slug).slice(0, 2).map((a) => (
                  <motion.a key={a.slug} whileHover={{ x: 4 }} href={"/blog/" + a.slug}
                    className="group w-full text-left flex items-center gap-4 rounded-xl border border-white/5 bg-slate-900/40 p-4 hover:border-white/10 transition-colors">
                    <div className="h-12 w-12 rounded-xl flex-shrink-0" style={{ background: a.heroGradient }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-white group-hover:text-[#3FC1CB] transition-colors truncate">{a.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{a.date} · {a.readTime}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-[#3FC1CB] transition-colors flex-shrink-0" />
                  </motion.a>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </main>
  );
}
