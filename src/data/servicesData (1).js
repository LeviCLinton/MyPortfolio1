// Central data source for /services and every /services/:slug page.
// Each entry drives both the overview card and the full detail page —
// change copy once, here, and it's consistent everywhere.

export const SERVICES = [
  {
    slug: "business-websites",
    name: "Business Websites",
    shortDesc: "For businesses that need a professional online presence.",
    icon: "Globe",
    color: "teal",
    cardCta: "EXPLORE BUSINESS WEBSITES",
    heroCta: "START MY WEBSITE",
    metaTitle: "Business Website Design & Development | LCN254",
    metaDescription:
      "Custom, mobile-first business websites with contact forms, WhatsApp, maps and basic SEO — built to turn visitors into enquiries. From KES 15,000.",
    hero: {
      headline: "Professional Websites for Growing Businesses",
      sub: "We design and build modern business websites that establish credibility, make it easier for customers to find you, and turn visitors into enquiries.",
    },
    whoFor: ["Small businesses", "Professional services", "Startups", "Local businesses", "Entrepreneurs", "Growing companies"],
    problem:
      "Most small business websites are either outdated brochures nobody updates, or a Facebook page standing in for a real site. Neither one works when a customer searches for you, needs to reach you, or is deciding whether to trust you.",
    approach:
      "We start with what your customers need to do on your site — find you, understand what you offer, and get in touch — then design and build around that, not the other way round.",
    included: [
      "Custom design (not a generic theme)",
      "Responsive development for phone, tablet and desktop",
      "Up to an agreed number of pages",
      "Contact forms that go straight to your inbox",
      "WhatsApp click-to-chat integration",
      "Google Maps embed for your location",
      "Social media links",
      "Basic on-page SEO (titles, descriptions, structured headings)",
      "Analytics so you can see who's visiting",
      "Performance optimization for fast load on mobile data",
    ],
    features: [
      { t: "Custom design", d: "Built around your brand, not a recycled template." },
      { t: "Mobile-first", d: "Designed for the phone screen first, desktop second." },
      { t: "Fast by default", d: "Optimized images and code so pages load quickly on 4G." },
      { t: "Easy to find", d: "Structured for Google from day one." },
    ],
    startingPrice: "From KES 15,000",
    priceNote: "Final pricing depends on scope, functionality, content and integrations.",
    relatedWork: [],
    relatedIndustries: ["professional-services", "restaurants"],
    faqs: [
      { q: "How many pages do I get?", a: "Most business websites launch with 4–6 pages (Home, About, Services, Gallery, Contact, etc.). We scope the exact page count with you before starting." },
      { q: "Do you write the content for me?", a: "We can work with content you provide, or help you organise and tighten it. Full copywriting from scratch is scoped separately." },
      { q: "Can I update the site myself later?", a: "Yes — we can hand over a version you can edit, or handle updates for you through a maintenance plan." },
    ],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    shortDesc: "For businesses that want to sell products online.",
    icon: "ShoppingBag",
    color: "pink",
    cardCta: "EXPLORE E-COMMERCE",
    heroCta: "START MY ONLINE STORE",
    metaTitle: "E-commerce Website Development | LCN254",
    metaDescription:
      "Online stores with product catalogues, cart, checkout and payment integration, built mobile-first for real buying behaviour. From KES 75,000.",
    hero: {
      headline: "Sell Online With an E-commerce Website Built for Your Business",
      sub: "A store that's easy to browse, quick to check out on, and built around how your customers actually shop and pay.",
    },
    whoFor: ["Retailers", "Product-based businesses", "Boutiques", "Wholesalers moving online", "Brands outgrowing social-media-only selling"],
    problem:
      "Selling through Instagram DMs and WhatsApp works until it doesn't — orders get lost, stock isn't tracked, and every sale needs a human to manually process it. A proper store fixes that without losing the personal touch.",
    approach:
      "We map out product discovery, the cart, checkout and order flow before writing a line of code, so the buying experience holds up under real traffic — not just in a demo.",
    included: [
      "Product catalogue with categories",
      "Shopping cart",
      "Checkout flow",
      "Payment integration (see note below)",
      "Order management",
      "Product search and filtering",
      "Mobile-optimized browsing and checkout",
      "Analytics on traffic and sales funnel",
    ],
    features: [
      { t: "Built for mobile checkout", d: "Most online shopping in Kenya happens on a phone — checkout is designed for that first." },
      { t: "Payment integration", d: "M-Pesa and card payment integration where technically supported and confirmed for your project — we don't promise a provider we haven't implemented and tested." },
      { t: "Order visibility", d: "See and manage incoming orders without digging through chat threads." },
      { t: "Room to grow", d: "Catalogue structure that scales as you add products." },
    ],
    startingPrice: "From KES 75,000+",
    priceNote: "Scope, number of products, and payment integrations affect the final quote.",
    relatedWork: [],
    relatedIndustries: ["restaurants", "salons"],
    faqs: [
      { q: "Can you integrate M-Pesa?", a: "Yes, where it's part of the agreed scope — we implement and test it before launch rather than promising it by default on every project." },
      { q: "Do I need a lot of products to start?", a: "No. Stores launch with any catalogue size; the architecture is built to scale as you add more." },
      { q: "Who handles the payment provider account?", a: "You hold the merchant/provider account (M-Pesa, Stripe, etc.) — we handle the technical integration into your site." },
    ],
  },
  {
    slug: "landing-pages",
    name: "Landing Pages",
    shortDesc: "For campaigns, advertising, and lead generation.",
    icon: "Zap",
    color: "amber",
    cardCta: "EXPLORE LANDING PAGES",
    heroCta: "BUILD MY LANDING PAGE",
    metaTitle: "High-Converting Landing Page Design | LCN254",
    metaDescription:
      "Single-purpose landing pages for campaigns, ads and product launches — built around one goal and one clear call to action. From KES 10,000.",
    hero: {
      headline: "Landing Pages Designed to Turn Visitors Into Customers",
      sub: "One page, one goal. Built for a specific campaign, offer or launch — and optimized so the only thing left to do is click.",
    },
    whoFor: ["Marketing campaigns", "Paid advertising", "Lead generation", "Product launches", "Service offers", "Events"],
    problem:
      "Sending ad traffic to a general homepage wastes budget — visitors land somewhere that isn't answering the exact question the ad raised, and most leave without acting.",
    approach:
      "Every landing page is built around a single conversion goal, with everything on the page working toward that one action.",
    included: [
      "Strong, specific headline matched to the campaign",
      "Clear value proposition",
      "Social proof section (where genuine proof exists)",
      "Benefit-led content, not just feature lists",
      "Objection handling",
      "One clear, repeated call to action",
      "Mobile optimization",
      "Fast load time for ad traffic",
    ],
    features: [
      { t: "Single focus", d: "No competing navigation or distractions pulling attention away from the goal." },
      { t: "Built for ad traffic", d: "Fast load and message-match with your campaign creative." },
      { t: "Form or booking-ready", d: "Wired to capture the lead the moment they're convinced." },
    ],
    startingPrice: "From KES 10,000",
    priceNote: "Price depends on page length, copy needs, and any tracking/pixel setup.",
    relatedWork: [],
    relatedIndustries: [],
    faqs: [
      { q: "Can you write the copy too?", a: "Yes, copywriting can be included in the scope — tell us the offer and audience and we'll draft it with you." },
      { q: "Can you set up ad tracking pixels?", a: "Yes — Meta Pixel, Google Ads tag and similar can be added as part of the build." },
      { q: "How fast can this launch?", a: "Landing pages are typically the fastest turnaround of any service we offer, often within days." },
    ],
  },
  {
    slug: "website-redesign",
    name: "Website Redesign",
    shortDesc: "For businesses with outdated or underperforming websites.",
    icon: "TrendingUp",
    color: "indigo",
    cardCta: "REDESIGN MY WEBSITE",
    heroCta: "REDESIGN MY WEBSITE",
    metaTitle: "Website Redesign Services | LCN254",
    metaDescription:
      "Rebuild an outdated, slow or hard-to-navigate website into a fast, mobile-first site that actually converts. From KES 20,000.",
    hero: {
      headline: "Your Website Has One Job: Help Your Business Move Forward",
      sub: "If your current site is working against you — slow, hard to navigate, or embarrassing on a phone — a redesign fixes the foundation, not just the paint.",
    },
    whoFor: ["Businesses with an outdated site", "Sites that don't work properly on mobile", "Anyone rebranding", "Sites with weak enquiry volume"],
    problem:
      "A website built five or more years ago is often the single biggest drag on how credible a business looks online — regardless of how good the business actually is.",
    approach:
      "We audit what's actually wrong first — is it the design, the navigation, the speed, or the messaging? — then rebuild with a clear strategy instead of a like-for-like reskin.",
    included: [
      "Full audit of the existing site",
      "New information architecture where needed",
      "Modern, mobile-first design",
      "Faster page load",
      "Clearer navigation",
      "Refreshed content structure and calls to action",
    ],
    features: [
      { t: "Audit first", d: "We diagnose what's actually costing you visitors before redesigning anything." },
      { t: "Keep what works", d: "Content and branding that's working stays — we don't rebuild for the sake of it." },
      { t: "Migration handled", d: "Domain and content migration planned to avoid downtime or lost SEO." },
    ],
    beforeAfterNote:
      "Where we don't yet have real before/after client examples publicly shareable, we use clearly labelled concept examples to illustrate the kind of transformation involved.",
    startingPrice: "From KES 20,000",
    priceNote: "Depends on the size of the existing site and how much is being rebuilt versus refreshed.",
    relatedWork: [],
    relatedIndustries: ["healthcare"],
    faqs: [
      { q: "Will I lose my Google rankings?", a: "We plan the migration (redirects, URL structure, metadata) specifically to protect existing SEO where possible." },
      { q: "Do you need my current site's files?", a: "Access to your current hosting/CMS helps, but isn't required — we can rebuild from what's publicly visible if needed." },
      { q: "Can you keep my existing branding?", a: "Yes — redesign doesn't have to mean rebranding. We can refresh the site while keeping your identity intact." },
    ],
  },
  {
    slug: "custom-web-solutions",
    name: "Custom Web Solutions",
    shortDesc: "For projects that need more than a standard website.",
    icon: "Sparkles",
    color: "cyan",
    cardCta: "DISCUSS A CUSTOM PROJECT",
    heroCta: "DISCUSS A CUSTOM PROJECT",
    metaTitle: "Custom Web Development | LCN254",
    metaDescription:
      "Booking systems, client portals, dashboards and API integrations — custom web projects scoped individually around what your business actually needs.",
    hero: {
      headline: "When a Standard Website Isn't Enough",
      sub: "Booking systems, client portals, dashboards, and integrations with tools you already use — scoped around your business, not a template.",
    },
    whoFor: ["Businesses needing booking or scheduling tools", "Teams needing a client portal", "Businesses integrating with existing software", "Anyone with a workflow a standard site can't cover"],
    problem:
      "Some businesses run on a process a standard site genuinely can't support — manual scheduling, spreadsheets doing the job of a dashboard, or a client experience stuck in email threads.",
    approach:
      "Custom projects start with a scoping conversation, not a build. We're upfront when something is a multi-week project rather than a website feature, and we don't oversell what a small team can deliver on a realistic timeline.",
    included: [
      "Discovery and scoping session",
      "Custom dashboards",
      "Booking/scheduling systems",
      "Client portals",
      "Third-party API integrations",
      "Internal business tools",
    ],
    features: [
      { t: "Scoped, not templated", d: "Every custom project starts with defining exactly what it needs to do." },
      { t: "Honest about scale", d: "We're clear about what's realistic for the timeline and budget before starting." },
      { t: "Built to integrate", d: "Designed to work with tools you already use rather than replacing everything." },
    ],
    startingPrice: "Quoted after scoping",
    priceNote: "Custom projects vary too widely to quote from a fixed starting price — we scope first, then quote.",
    relatedWork: ["debt-tracker", "tableflow"],
    relatedIndustries: ["real-estate", "healthcare"],
    faqs: [
      { q: "What counts as 'custom'?", a: "Anything beyond a content website — booking logic, user accounts, dashboards, or connecting to another system." },
      { q: "How long does a custom project take?", a: "It depends entirely on scope — we give a realistic timeline once requirements are defined, not before." },
      { q: "Can this replace enterprise software we're already paying for?", a: "Sometimes, for a specific workflow — but we won't promise to replace mature enterprise software with a small custom build. We'll tell you honestly if that's not a good fit." },
    ],
  },
  {
    slug: "website-maintenance",
    name: "Website Maintenance",
    shortDesc: "For businesses that need ongoing support after launch.",
    icon: "Shield",
    color: "teal",
    cardCta: "EXPLORE MAINTENANCE",
    heroCta: "GET WEBSITE SUPPORT",
    metaTitle: "Website Maintenance & Support Plans | LCN254",
    metaDescription:
      "Ongoing updates, monitoring, content changes and security checks so your website stays fast and current after launch. From KES 3,000/month.",
    hero: {
      headline: "Keep Your Website Fast, Secure and Up to Date",
      sub: "A website isn't finished at launch. Maintenance plans keep it running, current, and free of the small problems that quietly pile up.",
    },
    whoFor: ["Businesses without in-house technical staff", "Anyone who wants content updated regularly", "Sites that need ongoing monitoring", "Owners who'd rather not touch the code themselves"],
    problem:
      "Websites left untouched after launch quietly go stale — outdated hours, broken forms nobody notices, slow pages nobody's checked in months.",
    approach:
      "We treat maintenance as ongoing care, not a one-off fee — regular checks catch problems before a customer does.",
    included: [
      "Software and plugin updates where applicable",
      "Content changes (text, images, prices, hours)",
      "Bug fixes",
      "Performance checks",
      "Security monitoring",
      "Backups, where technically supported by the hosting setup",
      "Small ongoing improvements",
    ],
    features: [
      { t: "Predictable", d: "A monthly plan instead of surprise invoices for small fixes." },
      { t: "Proactive", d: "We check for problems rather than waiting for you to report them." },
      { t: "Clear boundaries", d: "We define upfront what's covered by the plan and what counts as new development work." },
    ],
    startingPrice: "From KES 3,000/month",
    priceNote: "Plans scale with how much ongoing change and monitoring your site needs.",
    relatedWork: [],
    relatedIndustries: [],
    faqs: [
      { q: "What's not covered by a maintenance plan?", a: "New pages, new features, or a redesign are treated as separate development work and quoted individually." },
      { q: "Can I cancel anytime?", a: "Yes, maintenance plans are ongoing arrangements, not locked-in contracts." },
      { q: "Do you host the site too?", a: "In most cases yes — see our hosting details on the Pricing page, or ask during onboarding." },
    ],
  },
];

export const getService = (slug) => SERVICES.find((s) => s.slug === slug);
