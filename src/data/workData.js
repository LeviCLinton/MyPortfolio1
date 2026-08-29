// Portfolio / case study data.
// All current entries are CONCEPT PROJECTS built from LCN254's own demo
// templates (public/demos/*.html) — none are real, commissioned client work.
// isConcept:true is checked by the UI to render the "CONCEPT PROJECT" label
// and must never be removed or hidden for these entries.
//
// When real client projects are added, set isConcept:false and add genuine,
// verifiable details only — no invented results, metrics or testimonials.
// The structure below (overview/challenge/approach/solution/features/tech/
// outcome) is the same shape for both concept and real projects, so adding
// real work later requires no rebuild.

export const WORK = [
  {
    slug: "restaurant-concept",
    isConcept: true,
    name: "Ember & Co. — Restaurant Website",
    industry: "Restaurants / Hospitality",
    projectType: "Business Website",
    filterTags: ["business-websites", "restaurants"],
    shortDesc:
      "A concept restaurant website built to explore menu presentation, reservations, and WhatsApp contact for a wood-fired grill concept.",
    keyFeature: "Digital menu with WhatsApp reservations",
    demoPath: "demos/restaurant.html",
    heroGradient: "linear-gradient(135deg,#b24c2a20,#6b7a4f15)",
    overview:
      "Ember & Co. is a concept project imagining a wood-fired grill restaurant in Nairobi. It was built to demonstrate how a restaurant's menu, atmosphere and booking flow can work together on one page.",
    challenge:
      "The brief (self-directed, for demonstration purposes): show how a restaurant with a distinct identity — a single wood fire, a short wine list — can present its menu and personality without needing a heavy CMS or third-party booking platform.",
    approach:
      "Structured around how a diner actually decides where to eat: menu first, atmosphere second, and a fast way to reserve a table. Typography and colour were chosen to suggest warmth and craft rather than a generic restaurant template.",
    solution:
      "A single-page layout with a tabbed menu (starters, mains, drinks), a dedicated 'room' section conveying atmosphere, and a reservation form designed for mobile completion in under a minute.",
    keyFeatures: ["Tabbed digital menu", "Reservation form", "Mobile-first layout", "Custom typography system"],
    technology: ["HTML/CSS", "Vanilla JavaScript for menu tabs"],
    outcome:
      "Outcome: a fully designed, responsive concept site demonstrating menu UX and reservation flow patterns used across LCN254's restaurant projects. No live business or measured results are associated with this concept.",
  },
  {
    slug: "hotel-concept",
    isConcept: true,
    name: "Hotel Marlow — Boutique Stay Website",
    industry: "Hotels / Boutique Stays",
    projectType: "Business Website",
    filterTags: ["business-websites", "hotels", "hospitality"],
    shortDesc:
      "A concept boutique hotel website exploring room showcases, a virtual tour prompt, and a direct availability enquiry form.",
    keyFeature: "Room showcase with direct booking enquiry",
    demoPath: "demos/boutique-hotel.html",
    heroGradient: "linear-gradient(135deg,#b98b7620,#33473e15)",
    overview:
      "Hotel Marlow is a concept nine-room boutique hotel built to demonstrate how a small, personal property can present rooms and encourage direct bookings instead of relying solely on OTAs.",
    challenge:
      "Show how a boutique property with a handful of rooms can feel considered and premium online, and give a guest a reason to enquire directly rather than default to a booking platform.",
    approach:
      "Focused the homepage on a single strong image and a clear promise ('a house, not a hotel'), then let individual room cards carry the detail — numbered rooms with pricing shown plainly.",
    solution:
      "A warm, editorial layout with numbered room cards, a dedicated availability-check form, and a prompt toward a virtual tour to build confidence before enquiry.",
    keyFeatures: ["Room showcase cards", "Availability enquiry form", "Editorial visual style", "Virtual tour prompt"],
    technology: ["HTML/CSS", "Responsive grid layout"],
    outcome:
      "Outcome: a complete concept design demonstrating room presentation and direct-booking enquiry patterns. No live property or measured results are associated with this concept.",
  },
  {
    slug: "salon-concept",
    isConcept: true,
    name: "The Gentry Room — Grooming & Spa Website",
    industry: "Salons & Barbers",
    projectType: "Business Website",
    filterTags: ["business-websites", "salons"],
    shortDesc:
      "A concept barbershop and spa website with a clear services and pricing board, staff introductions, and a direct booking CTA.",
    keyFeature: "Services & pricing board with staff profiles",
    demoPath: "demos/spa-barbershop.html",
    heroGradient: "linear-gradient(135deg,#c9a22720,#16261f15)",
    overview:
      "The Gentry Room is a concept grooming and spa business built to test a confident, editorial style for a barbershop that also offers spa treatments.",
    challenge:
      "Present two distinct offerings — traditional barbering and spa treatments — on one site without either feeling like an afterthought, and give a first-time client enough information to book with confidence.",
    approach:
      "Split services and pricing into two clearly labelled columns, then introduced staff by specialty so a client could pick a barber based on what they actually do, not just a name.",
    solution:
      "A dark, brass-accented design with a two-column pricing board, individual staff cards, and a single persistent 'Book a Slot' call to action.",
    keyFeatures: ["Two-column services & pricing", "Staff specialty cards", "Consistent booking CTA"],
    technology: ["HTML/CSS"],
    outcome:
      "Outcome: a complete concept design demonstrating services/pricing presentation and staff-led booking patterns for grooming businesses. No live business or measured results are associated with this concept.",
  },
  {
    slug: "ecommerce-concept",
    isConcept: true,
    name: "Kindred Supply Co. — E-commerce Website",
    industry: "Retail / E-commerce",
    projectType: "E-commerce",
    filterTags: ["ecommerce"],
    shortDesc:
      "A concept e-commerce storefront for a small-batch goods brand, exploring product browsing, cart visibility, and a persistent checkout bar.",
    keyFeature: "Persistent cart bar with mobile-first product grid",
    demoPath: "demos/ecommerce.html",
    heroGradient: "linear-gradient(135deg,#ff3b5c20,#c6f13520)",
    overview:
      "Kindred Supply Co. is a concept retail brand selling bags and everyday-carry goods, used to demonstrate a fast, mobile-first shopping experience.",
    challenge:
      "Demonstrate how a small retail catalogue can feel confident and browsable on mobile, with the cart always visible so nothing feels lost mid-shop.",
    approach:
      "Prioritised a bold, high-contrast visual identity and a sticky cart summary so a shopper always knows what's in their basket without opening a separate page.",
    solution:
      "A filterable product grid, individual product cards with quick-add, and a persistent bottom cart bar summarising items and total at all times.",
    keyFeatures: ["Filterable product grid", "Quick-add to cart", "Persistent cart summary bar", "Payment method badges (M-Pesa, card, PayPal)"],
    technology: ["HTML/CSS", "Vanilla JavaScript for filtering"],
    outcome:
      "Outcome: a complete concept design demonstrating mobile-first product browsing and cart UX. Payment badges shown are illustrative of what LCN254 can integrate — no live store or transactions are associated with this concept.",
  },
  {
    slug: "professional-services-concept",
    isConcept: true,
    name: "Meridian Health Partners — Clinic Website",
    industry: "Healthcare",
    projectType: "Business Website",
    filterTags: ["business-websites", "healthcare", "professional-services"],
    shortDesc:
      "A concept multi-department clinic website exploring department directories, a booking flow explainer, and a patient portal preview.",
    keyFeature: "Department directory with 3-step booking explainer",
    demoPath: "demos/clinic.html",
    heroGradient: "linear-gradient(135deg,#2f5d5020,#e8846b15)",
    overview:
      "Meridian Health Partners is a concept multi-department clinic used to demonstrate how a healthcare provider can present several departments clearly and explain a booking process without overwhelming a visitor.",
    challenge:
      "Make a clinic with multiple departments (general practice, pediatrics, dental, diagnostics and more) easy to navigate, and explain how booking works in plain steps rather than assuming visitors already know.",
    approach:
      "Organised departments into a clean grid, then added a simple three-step 'how booking works' section, and a patient-portal preview to suggest what happens after booking.",
    solution:
      "A department directory grid, a numbered how-it-works section, and a mocked patient-portal card showing upcoming appointments and results — illustrative only, not a functioning portal.",
    keyFeatures: ["Department directory", "3-step booking explainer", "Patient portal preview (illustrative)", "Emergency contact callout"],
    technology: ["HTML/CSS"],
    outcome:
      "Outcome: a complete concept design demonstrating department navigation and booking-process communication for healthcare and professional-service sites. No live clinic, patients, or measured results are associated with this concept. No clinical claims are made or implied.",
  },
];

export const getWorkItem = (slug) => WORK.find((w) => w.slug === slug);

export const WORK_FILTERS = [
  { id: "all", label: "All" },
  { id: "business-websites", label: "Business Websites" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "hospitality", label: "Hospitality" },
  { id: "restaurants", label: "Restaurants" },
  { id: "professional-services", label: "Professional Services" },
  { id: "healthcare", label: "Healthcare" },
  { id: "hotels", label: "Hotels" },
  { id: "salons", label: "Salons" },
];
