// Portfolio / case study data.
//
// Direction as of this file's last rewrite: LCN254's portfolio now shows
// only REAL websites and web apps — no self-initiated concept projects.
// isConcept:false on every current entry reflects that; the field is kept
// (rather than removed) so the UI's existing "Concept Project" labeling
// logic still works correctly if a concept is ever intentionally added
// back in the future — it simply won't render anything extra while every
// entry is real.
//
// Field names `name`, `slug`, `shortDesc`, `heroGradient`, `industry` are
// also read directly by ServiceDetailPage.jsx and IndustryDetailPage.jsx for
// their compact "related work" previews — keep those stable if this file is
// extended further.
//
// `demoPath` may be a root-relative path served from this site (e.g.
// "demos/x.html") or a full external URL for a project hosted elsewhere
// (e.g. a live product on GitHub Pages) — BrowserFrame/PhoneFrame and the
// "visit live site" link both handle either form automatically.

export const WORK = [
  {
    slug: "debt-tracker",
    isConcept: false,
    featured: true,
    name: "DebtTracker — Personal Debt & Receivable Tracker",
    title: "DebtTracker",
    category: "Web Apps",
    industry: "Personal Finance / Productivity",
    projectType: "Web Application (PWA)",
    type: "Product",
    client: "LCN254 (self-built product)",
    year: "2026",
    services: ["Product Design", "UX/UI Design", "Frontend Engineering"],
    filterTags: ["web-apps"],
    shortDesc:
      "An offline-first web app for tracking personal debts and receivables — built to work fully without a server, keeping financial data private.",
    keyFeature: "Fully offline personal finance tracking",
    demoPath: "https://leviclinton.github.io/DebtTracker/",
    schemaType: "SoftwareApplication",
    applicationCategory: "FinanceApplication",
    isFree: true,
    heroGradient: "linear-gradient(135deg,#b8935a25,#8a6b3f18)",
    accentColor: "#b8935a",
    headingFont: "'Inter', sans-serif",
    googleFontHref: "https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&display=swap",
    overview:
      "DebtTracker is a live, publicly available web app for keeping track of two things people usually track in scattered notes apps and spreadsheets: money they owe, and money owed to them. It's built offline-first — the app works fully without an internet connection, and is installable as a Progressive Web App on a phone or desktop.",
    challenge:
      "Most personal finance and debt-tracking tools ask for an account, sync sensitive financial data to a remote server, and assume constant connectivity. For something as personal as who owes you money and what you still owe, that's a meaningful trust and privacy ask — and it doesn't hold up well on an unreliable connection either. The goal was a tool that works the same with no signal as it does with full signal, and never needs to send financial data anywhere to function.",
    strategy: {
      intro: "The product was built around a small number of firm constraints rather than a long feature list:",
      objectives: [
        { n: "01", label: "Offline by default, not as a fallback", detail: "The app is fully usable with no network connection — offline isn't a degraded mode here, it's the baseline." },
        { n: "02", label: "Track both directions of debt", detail: "Money owed to others and money owed to the user live in the same place, rather than needing two separate tools or a spreadsheet with manual sign-flipping." },
        { n: "03", label: "Keep data local", detail: "Financial records stay on-device rather than being synced to a third-party server by default." },
      ],
      closing: "The app is also installable as a Progressive Web App, so it can be added to a home screen and opened like a native app without an app-store install.",
    },
    designApproach:
      "The interface uses a calm, warm off-white palette rather than the cold blues typical of finance apps — the intent is something that feels closer to a personal notebook than a banking dashboard, since the app is for personal, informal debts rather than institutional accounts.",
    keyFeatures: ["Tracks money owed to others and money owed to the user", "Fully offline — no internet connection required to use it", "Installable as a Progressive Web App", "Financial data kept local to the device"],
    technology: ["Progressive Web App (PWA)", "Offline-first client-side architecture"],
    outcome:
      "DebtTracker is live and publicly available today. No usage, adoption, or user-count metrics are published here, since none are being tracked or disclosed — this section states plainly what's verifiable rather than estimating a number.",
    summary:
      "DebtTracker demonstrates LCN254 building a real, working product end to end — not just a marketing site — with a deliberate stance on privacy and offline reliability baked into the architecture from the start, not added later.",
  },
  {
    slug: "tableflow",
    isConcept: false,
    featured: false,
    name: "TABLEFLOW — Restaurant Operations Platform",
    title: "TABLEFLOW",
    category: "Restaurants",
    industry: "Restaurant / Hospitality Technology",
    projectType: "Web Application (Restaurant Platform)",
    type: "Product",
    client: "LCN254 (self-built product)",
    year: "2026",
    services: ["Product Design", "UX/UI Design", "Frontend Engineering"],
    filterTags: ["restaurants", "web-apps"],
    schemaType: "SoftwareApplication",
    applicationCategory: "BusinessApplication",
    shortDesc:
      "A restaurant operations platform connecting orders, tables, payments, customers, and insights in one system, instead of five disconnected tools.",
    keyFeature: "Orders, tables, payments, customers and insights in one platform",
    demoPath: "https://leviclinton.github.io/restaurant",
    heroGradient: "linear-gradient(135deg,#d4924025,#14120d40)",
    accentColor: "#d49240",
    headingFont: "'Space Grotesk', sans-serif",
    googleFontHref: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap",
    overview:
      "TABLEFLOW is a live restaurant operations platform built to bring the day-to-day systems a restaurant runs on — taking orders, managing tables, handling payments, keeping customer records, and reviewing performance — into one connected place, rather than five separate tools that don't talk to each other.",
    challenge:
      "Restaurants commonly end up running on a patchwork of separate systems: one for taking orders, another for table management, a different one for payments, a spreadsheet or notebook for customer history, and no single place to actually see how the business is performing. Each disconnected tool is a place data can get lost or duplicated, and staff have to context-switch between systems during service instead of focusing on guests.",
    strategy: {
      intro: "The platform is organized around the five areas a restaurant operator actually needs visibility into, connected rather than siloed:",
      objectives: [
        { n: "01", label: "Orders and tables together", detail: "Order-taking and table status live in the same system, rather than a POS that doesn't know which table is occupied." },
        { n: "02", label: "Payments in the same flow", detail: "Payment handling is part of the same platform as the order, not a bolt-on step in a separate app." },
        { n: "03", label: "Customers and insights, not just transactions", detail: "Customer history and performance insights are built in, so the platform is useful after service ends, not just during it." },
      ],
      closing: "The goal throughout was reducing the number of separate systems a restaurant operator has to keep in sync, not adding another one on top.",
    },
    designApproach:
      "The interface uses a dark, low-glare theme suited to being glanced at repeatedly during a service rush, rather than a bright dashboard aesthetic designed for a quiet back office.",
    keyFeatures: ["Order management", "Table management", "Payment handling", "Customer records", "Performance insights"],
    technology: ["Web application"],
    outcome:
      "TABLEFLOW is live and publicly available today. No usage, adoption, or revenue metrics are published here, since none are being tracked or disclosed for this platform.",
    summary:
      "TABLEFLOW demonstrates LCN254 building toward the harder end of \"web development\": not just a marketing site, but an operational platform meant to be used continuously, under real time pressure, by restaurant staff.",
  },
];

export const getWorkItem = (slug) => WORK.find((w) => w.slug === slug);

export const getAdjacentWork = (slug) => {
  const idx = WORK.findIndex((w) => w.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  if (WORK.length < 2) return { prev: null, next: null };
  const prev = WORK[(idx - 1 + WORK.length) % WORK.length];
  const next = WORK[(idx + 1) % WORK.length];
  return { prev, next };
};

// Categories for portfolio filtering. Kept broad (covering verticals LCN254
// builds for) even though only "Web Apps" currently has an entry — real
// client work in these categories can be added here as it happens, without
// needing to touch WorkPage.jsx.
export const WORK_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "Web Apps", label: "Web Apps" },
  { id: "Restaurants", label: "Restaurants" },
  { id: "Hospitality", label: "Hospitality" },
  { id: "E-commerce", label: "E-commerce" },
  { id: "Professional Services", label: "Professional Services" },
  { id: "Real Estate", label: "Real Estate" },
  { id: "Landing Pages", label: "Landing Pages" },
  { id: "Other", label: "Other" },
];

export const WORK_FILTERS = WORK_CATEGORIES;
