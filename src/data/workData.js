// Portfolio / case study data — Phase 5.
//
// All entries below are CONCEPT PROJECTS: self-initiated demonstrations
// built by LCN254, not commissioned client work. isConcept:true drives the
// "Concept Project" labels throughout the UI and must never be removed or
// hidden for these entries. client is always "Self-Initiated Concept" and
// outcome/result text never claims measured business results, because none
// exist for concept work.
//
// Field names `name`, `slug`, `shortDesc`, `heroGradient`, `industry` are
// also read directly by ServiceDetailPage.jsx and IndustryDetailPage.jsx for
// their compact "related work" previews — keep those stable if this file is
// extended further.
//
// When a real, commissioned client project is added: set isConcept:false,
// client to the real (consented) business name, and only include genuine,
// verifiable details — no invented metrics, testimonials, or results.

export const WORK = [
  {
    slug: "ember",
    isConcept: true,
    featured: true,
    name: "Ember — Restaurant Website Experience",
    title: "Ember",
    category: "Restaurants",
    industry: "Restaurant / Hospitality",
    projectType: "Restaurant Website",
    type: "Concept Project",
    client: "Self-Initiated Concept",
    year: "2026",
    services: ["UX/UI Design", "Web Design", "Web Development", "Conversion Strategy"],
    filterTags: ["business-websites", "restaurants"],
    shortDesc:
      "A premium restaurant website concept designed around atmosphere, menu discovery, reservations, and mobile-first ordering.",
    keyFeature: "Digital menu with WhatsApp reservations",
    demoPath: "demos/restaurant.html",
    heroGradient: "linear-gradient(135deg,#b24c2a25,#6b7a4f18)",
    overview:
      "Ember imagines a wood-fired grill restaurant built around a single open kitchen and a short, considered wine list. The concept was built to show how a restaurant's menu, atmosphere and booking flow can work together on one page, rather than being split across a website, a PDF menu, and a third-party booking widget.",
    challenge:
      "Modern diners often decide where to eat from their phone, in a few seconds, often mid-scroll. Many restaurant websites fail to communicate atmosphere, menu quality, and availability quickly enough to hold that attention — or bury the one action that actually matters: booking a table. For this concept, the goal was to design a page that establishes identity almost instantly, while keeping the menu and reservation form immediately reachable.",
    strategy: {
      intro: "The experience was structured around three sequential objectives, in the order a diner actually moves through them:",
      objectives: [
        { n: "01", label: "Discover the brand", detail: "A single strong visual and a confident, specific headline — communicating personality before any menu detail." },
        { n: "02", label: "Explore the menu", detail: "A tabbed menu (starters, mains, drinks) that lets a visitor browse by category without leaving the page or downloading a PDF." },
        { n: "03", label: "Take action", detail: "A reservation form designed to be completed on a phone in under a minute, always one scroll away." },
      ],
      closing: "Practical information — hours, location, contact — stays easy to find throughout, but never competes with the primary path toward booking a table.",
    },
    designApproach:
      "The visual direction leans into warm, low light and craft rather than a generic 'restaurant template' look: a dark ember-toned palette, an editorial serif paired with a clean sans-serif for menu items, and generous spacing so the menu never feels cramped. Motion is kept restrained — a few scroll-reveals, nothing that competes with the food.",
    keyFeatures: ["Tabbed digital menu", "Reservation form", "Mobile-first layout", "Custom typography system", "WhatsApp contact link"],
    technology: ["HTML/CSS", "Vanilla JavaScript for menu tabs"],
    outcome:
      "Performance metrics were not collected because this was a self-initiated concept project — no live business, bookings, or traffic are associated with Ember.",
    summary:
      "Ember demonstrates how a restaurant brand can combine strong visual storytelling with practical digital functionality — bringing brand presentation, menu discovery, and reservations into one cohesive, mobile-first experience.",
  },
  {
    slug: "luma-stay",
    isConcept: true,
    featured: false,
    name: "Luma Stay — Boutique Hotel Website",
    title: "Luma Stay",
    category: "Hospitality",
    industry: "Hotels / Boutique Stays",
    projectType: "Hospitality Website",
    type: "Concept Project",
    client: "Self-Initiated Concept",
    year: "2026",
    services: ["UX/UI Design", "Web Design", "Web Development"],
    filterTags: ["business-websites", "hotels", "hospitality"],
    shortDesc:
      "A luxury boutique hotel concept exploring room showcases, destination storytelling, and a direct booking-enquiry flow.",
    keyFeature: "Room showcase with direct booking enquiry",
    demoPath: "demos/boutique-hotel.html",
    heroGradient: "linear-gradient(135deg,#b98b7625,#33473e18)",
    overview:
      "Luma Stay is a concept nine-room boutique hotel, built to demonstrate how a small, personal property can present its rooms and encourage guests to book directly rather than defaulting to an OTA that takes a commission on every stay.",
    challenge:
      "A boutique property with a handful of rooms has to feel considered and premium online — the opposite of a listing squeezed onto a booking-platform template — while still giving a guest enough confidence to enquire directly instead of clicking through to a familiar OTA.",
    strategy: {
      intro: "The site was structured around building trust before asking for a decision:",
      objectives: [
        { n: "01", label: "Set the tone", detail: "One strong image and a specific, understated promise — 'a house, not a hotel' — rather than generic luxury-hotel language." },
        { n: "02", label: "Let rooms carry the detail", detail: "Individually numbered room cards with plain pricing, so a guest can compare without hunting for information." },
        { n: "03", label: "Make direct enquiry easy", detail: "A dedicated availability form as the one clear next step, positioned right after the rooms." },
      ],
      closing: "A virtual-tour prompt sits alongside the rooms to build additional confidence before a guest commits to enquiring.",
    },
    designApproach:
      "An editorial, warm-neutral palette with a serif display face for room names, generous photography space, and numbered room 'plaques' that borrow a hospitality-industry visual cue guests already recognise. The layout favours a handful of well-composed sections over a long scroll of marketing copy.",
    keyFeatures: ["Room showcase cards", "Availability enquiry form", "Editorial visual style", "Virtual tour prompt"],
    technology: ["HTML/CSS", "Responsive grid layout"],
    outcome:
      "Performance metrics were not collected because this was a self-initiated concept project — no live property, bookings, or guests are associated with Luma Stay.",
    summary:
      "Luma Stay demonstrates a direct-booking pattern for small hospitality brands: let the rooms do the selling, and make the one action that matters — enquiring — impossible to miss.",
  },
  {
    slug: "nova-living",
    isConcept: true,
    featured: false,
    name: "Nova Living — Property Platform",
    title: "Nova Living",
    category: "Real Estate",
    industry: "Real Estate",
    projectType: "Property Platform",
    type: "Concept Project",
    client: "Self-Initiated Concept",
    year: "2026",
    services: ["UX/UI Design", "Web Design", "Web Development"],
    filterTags: ["real-estate"],
    shortDesc:
      "A modern real-estate concept exploring property search, filtering, listing detail, and enquiry generation.",
    keyFeature: "Search and filter with instant listing previews",
    demoPath: "demos/nova-living.html",
    heroGradient: "linear-gradient(135deg,#8ba88825,#c98a5a18)",
    overview:
      "Nova Living is a concept property platform built to explore how a real-estate brand can help a buyer narrow down a search quickly — by location, type and budget — without wading through listings that don't fit.",
    challenge:
      "Property searches usually involve a small number of hard constraints (area, budget, bedrooms) but most real-estate sites bury the search behind a generic hero banner and a single 'browse listings' link. The concept needed to put search and filtering front and centre, and make each listing card carry enough information to filter mentally at a glance.",
    strategy: {
      intro: "The homepage was designed around getting to relevant listings in as few steps as possible:",
      objectives: [
        { n: "01", label: "Search first", detail: "A structured search card — location, property type, budget — placed directly in the hero, not hidden behind a nav link." },
        { n: "02", label: "Scan-friendly listings", detail: "Consistent card layout showing price, bed/bath count, and size, so listings can be compared without opening each one." },
        { n: "03", label: "Low-friction enquiry", detail: "A 'list a property' path for agents alongside a clear enquiry route for buyers." },
      ],
      closing: "The structure is intentionally simple to extend — the same card and search pattern scales from a handful of listings to a large catalogue.",
    },
    designApproach:
      "A calm, moss-and-clay palette avoids the generic 'corporate blue' real-estate look, paired with a warm serif for headings. Listing cards keep photography-sized image areas with price shown as an overlay badge, echoing patterns from property-listing apps buyers already know how to read.",
    keyFeatures: ["Location/type/budget search", "Listing grid with key stats", "Consistent card pattern for scale", "Agent enquiry path"],
    technology: ["HTML/CSS"],
    outcome:
      "Performance metrics were not collected because this was a self-initiated concept project — no live agency, listings, or buyers are associated with Nova Living.",
    summary:
      "Nova Living demonstrates a search-first pattern for real-estate platforms: put the filters a buyer actually needs in the hero, and keep listing cards consistent enough to compare at a glance.",
  },
  {
    slug: "kora-market",
    isConcept: true,
    featured: false,
    name: "Kora Market — E-commerce Website",
    title: "Kora Market",
    category: "E-commerce",
    industry: "Retail / E-commerce",
    projectType: "E-commerce Website",
    type: "Concept Project",
    client: "Self-Initiated Concept",
    year: "2026",
    services: ["UX/UI Design", "Web Design", "Web Development", "Conversion Strategy"],
    filterTags: ["ecommerce"],
    shortDesc:
      "A modern lifestyle e-commerce concept exploring product discovery, a persistent cart, and mobile-first checkout.",
    keyFeature: "Persistent cart bar with mobile-first product grid",
    demoPath: "demos/ecommerce.html",
    heroGradient: "linear-gradient(135deg,#ff3b5c25,#c6f13525)",
    overview:
      "Kora Market is a concept retail brand selling everyday-carry goods, used to demonstrate a fast, mobile-first shopping experience where the cart is always visible and nothing feels lost mid-shop.",
    challenge:
      "Small retail catalogues often get squeezed into templates built for much larger stores, which makes them feel sparse rather than curated. The concept needed to feel confident and browsable on mobile specifically, since that's where most shopping in this category actually happens, with the cart always in view so a shopper never has to wonder what's in their basket.",
    strategy: {
      intro: "The shopping flow was designed around three moments that most commonly lose a shopper:",
      objectives: [
        { n: "01", label: "Browse without friction", detail: "A filterable product grid that works with one thumb, no dropdown menus required." },
        { n: "02", label: "Add without leaving", detail: "Quick-add on each product card, so browsing momentum isn't broken by a full page reload." },
        { n: "03", label: "Never lose the cart", detail: "A persistent bottom cart bar showing item count and running total at all times." },
      ],
      closing: "Payment method badges are shown to signal what a real build could support — they are illustrative only in this concept, not live integrations.",
    },
    designApproach:
      "A bold, high-contrast identity (near-black, coral, lime) gives a small catalogue visual confidence rather than looking sparse. Product cards use a consistent aspect ratio so the grid stays tidy at any screen width, and the marquee banner at the top borrows a pattern from fast-moving retail sites to signal 'this is a live, active store.'",
    keyFeatures: ["Filterable product grid", "Quick-add to cart", "Persistent cart summary bar", "Payment method badges (illustrative)"],
    technology: ["HTML/CSS", "Vanilla JavaScript for filtering"],
    outcome:
      "Performance metrics were not collected because this was a self-initiated concept project — no live store, transactions, or customers are associated with Kora Market. Payment badges shown are illustrative of what LCN254 can integrate on a real build, not evidence of a live integration here.",
    summary:
      "Kora Market demonstrates a mobile-first commerce pattern built for smaller catalogues: keep browsing fast, keep the cart visible, and never make a shopper feel like they've lost their place.",
  },
  {
    slug: "atlas-consulting",
    isConcept: true,
    featured: false,
    name: "Atlas Consulting — Advisory Firm Website",
    title: "Atlas Consulting",
    category: "Professional Services",
    industry: "Professional Services / Consulting",
    projectType: "Professional Services Website",
    type: "Concept Project",
    client: "Self-Initiated Concept",
    year: "2026",
    services: ["UX/UI Design", "Web Design", "Web Development"],
    filterTags: ["business-websites", "professional-services"],
    shortDesc:
      "A premium consulting-firm concept built around credibility, clearly scoped services, and a direct lead-generation path.",
    keyFeature: "Structured services grid with a single, consistent CTA",
    demoPath: "demos/atlas-consulting.html",
    heroGradient: "linear-gradient(135deg,#1e2a4a25,#a9852f18)",
    overview:
      "Atlas Consulting is a concept advisory firm built to show how a professional-services brand can establish credibility and present its services clearly, without leaning on the stock-photo handshake cliché that dominates the category.",
    challenge:
      "Professional-services buyers are evaluating trust as much as capability, often before ever speaking to anyone. Many consulting sites either over-explain with dense paragraphs or under-explain with vague buzzwords, leaving a visitor unsure what the firm actually does or how to start a conversation.",
    strategy: {
      intro: "The site was structured to answer three questions a prospective client asks, in order:",
      objectives: [
        { n: "01", label: "What do you actually do?", detail: "Three named, numbered service areas instead of a vague capabilities list." },
        { n: "02", label: "Why should I trust you?", detail: "Plain-stated credentials (years of experience, practice areas) rather than manufactured statistics." },
        { n: "03", label: "How do I start?", detail: "One consistent 'Book a Consultation' call to action repeated at natural decision points, not scattered everywhere." },
      ],
      closing: "The tone throughout favours plain, direct language over consulting-industry jargon.",
    },
    designApproach:
      "A restrained navy-and-gold palette on a warm off-white background reads as established rather than flashy, paired with a classic serif for headings to suggest permanence. The services section uses a simple numbered grid rather than icon cards, keeping attention on the words themselves.",
    keyFeatures: ["Numbered services grid", "Credentials strip", "Single consistent CTA pattern", "Consultation booking prompt"],
    technology: ["HTML/CSS"],
    outcome:
      "Performance metrics were not collected because this was a self-initiated concept project — no live firm, clients, or engagements are associated with Atlas Consulting.",
    summary:
      "Atlas Consulting demonstrates how a professional-services brand can build credibility through clarity and restraint rather than stock imagery — and keep a single, repeated path toward starting a conversation.",
  },
  {
    slug: "pulse",
    isConcept: true,
    featured: false,
    name: "Pulse — SaaS Product Landing Page",
    title: "Pulse",
    category: "Landing Pages",
    industry: "SaaS / Product Marketing",
    projectType: "Landing Page",
    type: "Concept Project",
    client: "Self-Initiated Concept",
    year: "2026",
    services: ["UX/UI Design", "Web Design", "Conversion Strategy"],
    filterTags: ["landing-pages"],
    shortDesc:
      "A high-converting SaaS landing page concept built around a clear value proposition, feature proof, and simple pricing.",
    keyFeature: "Single-scroll structure from hero to pricing to CTA",
    demoPath: "demos/pulse.html",
    heroGradient: "linear-gradient(135deg,#7c5cff25,#38e0c018)",
    overview:
      "Pulse is a concept team-analytics product, used to demonstrate a landing-page structure built specifically for conversion: a clear headline, a short proof section, feature highlights, and pricing, all in a single scroll with no dead ends.",
    challenge:
      "Product landing pages often try to say too much at once — every feature, every audience, every use case — which dilutes the one decision the page actually needs to drive: starting a trial. The concept needed a structure disciplined enough to hold a single message from hero to CTA.",
    strategy: {
      intro: "The page follows a deliberately short, linear path:",
      objectives: [
        { n: "01", label: "State the value proposition once, clearly", detail: "A single headline naming the specific outcome ('team analytics that finally make sense'), not a list of features." },
        { n: "02", label: "Prove it briefly", detail: "A compact feature section with three concrete capabilities, not an exhaustive list." },
        { n: "03", label: "Remove pricing friction", detail: "Two simple plans shown directly on the page, no 'contact sales' wall before a visitor can even see a number." },
      ],
      closing: "The primary 'Start Free Trial' CTA repeats at the top and beside pricing — the same two moments, deliberately, rather than being sprinkled throughout.",
    },
    designApproach:
      "A dark, high-contrast interface with a violet-to-mint gradient accent signals 'modern SaaS product' without relying on illustration. Section spacing is generous specifically so the page reads as short and confident rather than dense, which matters more for a landing page than for a typical marketing site.",
    keyFeatures: ["Single-scroll conversion structure", "Feature highlight grid", "Two-tier pricing display", "Repeated primary CTA at two key moments"],
    technology: ["HTML/CSS"],
    outcome:
      "Performance metrics were not collected because this was a self-initiated concept project — no live product, trial signups, or paying customers are associated with Pulse.",
    summary:
      "Pulse demonstrates a disciplined, single-message landing-page structure: state the value proposition once, prove it briefly, and remove every unnecessary step between a visitor and starting a trial.",
  },
];

export const getWorkItem = (slug) => WORK.find((w) => w.slug === slug);

export const getAdjacentWork = (slug) => {
  const idx = WORK.findIndex((w) => w.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  const prev = WORK[(idx - 1 + WORK.length) % WORK.length];
  const next = WORK[(idx + 1) % WORK.length];
  return { prev, next };
};

// Categories exactly as specified for Phase 5 filtering/navigation.
export const WORK_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "Restaurants", label: "Restaurants" },
  { id: "Hospitality", label: "Hospitality" },
  { id: "E-commerce", label: "E-commerce" },
  { id: "Professional Services", label: "Professional Services" },
  { id: "Real Estate", label: "Real Estate" },
  { id: "Landing Pages", label: "Landing Pages" },
  { id: "Other", label: "Other" },
];

// Kept for backward compatibility with any code still filtering by tag
// rather than by category (none currently does, after the Phase 5 rewrite).
export const WORK_FILTERS = WORK_CATEGORIES;
