// Central data source for /industries and every /industries/:slug page.

export const INDUSTRIES = [
  {
    slug: "restaurants",
    name: "Restaurants",
    shortDesc: "Online menus, reservations, location, WhatsApp and ordering.",
    icon: "UtensilsCrossed",
    color: "cyan",
    metaTitle: "Restaurant Website Design | LCN254",
    metaDescription:
      "Restaurant websites with menu presentation, location, reservations and WhatsApp ordering — built to make people want to visit. ",
    hero: {
      headline: "A Restaurant Website That Makes People Want to Visit",
      sub: "Your menu, your location, and a way to reach you — presented clearly enough that someone decides to come in, not just scroll past.",
    },
    problem:
      "Most diners decide where to eat before they arrive — checking the menu, the vibe, and how to get there or book a table. A Facebook page with a phone number in the bio doesn't answer any of that quickly.",
    howWeHelp: [
      "A menu that's easy to browse on a phone, not a photographed PDF",
      "Location and opening hours front and centre",
      "WhatsApp for reservations and quick questions",
      "A gallery that sets the mood before someone walks in",
      "Social proof and social links",
    ],
    features: ["Digital menu", "Location & hours", "WhatsApp reservations", "Photo gallery", "Mobile ordering (where scoped)", "Social integration"],
    exampleStructure: ["Home", "Menu", "About", "Gallery", "Reservations", "Contact"],
    relatedWork: ["restaurant-concept"],
    relatedServices: ["business-websites", "landing-pages"],
    cta: "BUILD MY RESTAURANT WEBSITE",
    faqs: [
      { q: "Can customers order food directly on the site?", a: "Yes, where that's part of the scope — otherwise WhatsApp ordering is often the simpler, faster starting point." },
      { q: "Can you take our existing menu and put it online?", a: "Yes — we'll turn your current menu into a clean, browsable digital version." },
    ],
  },
  {
    slug: "hotels",
    name: "Hotels & Boutique Stays",
    shortDesc: "Rooms, amenities, galleries, booking enquiries and location.",
    icon: "BedDouble",
    color: "teal",
    metaTitle: "Hotel & Boutique Stay Website Design | LCN254",
    metaDescription:
      "Hotel websites that showcase rooms, amenities and location, and turn browsers into direct booking enquiries.",
    hero: {
      headline: "A Hotel Website Guests Actually Want to Book Direct From",
      sub: "Rooms, amenities and location presented clearly enough that a guest books with you directly, instead of paying a booking platform's commission to find you.",
    },
    problem:
      "Relying entirely on third-party booking platforms means paying commission on every guest and having no direct relationship with them at all.",
    howWeHelp: [
      "Room listings with clear photos and details",
      "Amenities and experiences laid out clearly",
      "A gallery that does the selling before they arrive",
      "Direct booking enquiry flow",
      "Location and getting-here information",
    ],
    features: ["Room showcase", "Amenities list", "Photo gallery", "Booking enquiry form", "Location & directions", "Offers section"],
    exampleStructure: ["Home", "Rooms", "Amenities", "Gallery", "Offers", "Book / Enquire", "Contact"],
    relatedWork: ["hotel-concept"],
    relatedServices: ["business-websites"],
    cta: "BUILD MY HOTEL WEBSITE",
    faqs: [
      { q: "Can we take bookings and payment on the site?", a: "Direct booking enquiries are standard; live availability and payment can be added as a custom project depending on your existing booking system." },
      { q: "Can you integrate with our existing property management system?", a: "Possibly — this is scoped as a custom project once we know which system you use." },
    ],
  },
  {
    slug: "salons",
    name: "Salons & Barbers",
    shortDesc: "Services, pricing, bookings, gallery, WhatsApp and location.",
    icon: "Scissors",
    color: "pink",
    metaTitle: "Salon & Barbershop Website Design | LCN254",
    metaDescription:
      "Salon and barbershop websites with services, pricing, booking and gallery — built to fill chairs, not just look nice.",
    hero: {
      headline: "A Salon Website That Fills Chairs",
      sub: "Services, pricing, and a simple way to book — so a new client can decide and act in one visit to your site.",
    },
    problem:
      "Clients want to know what you offer and what it costs before they message you. Without that laid out clearly, plenty simply move on to the next result.",
    howWeHelp: [
      "Clear services and pricing menu",
      "Simple booking flow or WhatsApp booking",
      "A gallery showing your actual work",
      "Team profiles so clients can pick a stylist or barber",
      "Location and hours",
    ],
    features: ["Services & pricing", "Booking / WhatsApp", "Gallery", "Team profiles", "Location & hours"],
    exampleStructure: ["Home", "Services", "Gallery", "Team", "Book", "Contact"],
    relatedWork: ["salon-concept"],
    relatedServices: ["business-websites"],
    cta: "BUILD MY SALON WEBSITE",
    faqs: [
      { q: "Can clients book a specific stylist?", a: "Yes, where a booking system is part of the scope — otherwise WhatsApp booking with a stylist preference works well as a simpler start." },
      { q: "Can we show before/after photos?", a: "Yes — a gallery built for exactly that is a standard part of this build." },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    shortDesc: "Property listings, enquiries, agent profiles and lead generation.",
    icon: "Home",
    color: "indigo",
    metaTitle: "Real Estate Website Design | LCN254",
    metaDescription:
      "Real estate websites with property listings, search, agent profiles and enquiry forms built for lead generation.",
    hero: {
      headline: "A Real Estate Website Built to Generate Enquiries",
      sub: "Listings that are easy to browse and filter, with a clear path from 'interested' to 'enquired' on every property.",
    },
    problem:
      "A property scattered across social posts is easy to lose. Buyers and renters want to browse, compare, and filter — not scroll through a feed.",
    howWeHelp: [
      "Property listings with photos and details",
      "Search and filtering by type, location, or price",
      "Individual property pages built for enquiry",
      "Agent profiles for credibility",
      "WhatsApp and enquiry-form contact options",
    ],
    features: ["Property listings", "Search & filters", "Agent profiles", "Enquiry forms", "WhatsApp contact", "Location mapping"],
    exampleStructure: ["Home", "Listings", "Property Detail", "Agents", "About", "Contact"],
    relatedWork: [],
    relatedServices: ["business-websites", "custom-web-solutions"],
    cta: "BUILD MY REAL ESTATE WEBSITE",
    faqs: [
      { q: "Can we manage listings ourselves without a developer?", a: "Yes — a listings management setup can be scoped so you can add and update properties directly." },
      { q: "Can the site integrate with a listings feed we already use?", a: "Possibly — this depends on the feed/API and is scoped as a custom project." },
    ],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    shortDesc: "Websites for consultants, agencies, lawyers, accountants and other service businesses.",
    icon: "Award",
    color: "indigo",
    metaTitle: "Professional Services Website Design | LCN254",
    metaDescription:
      "Websites for consultants, agencies, lawyers, accountants and other professional service businesses — built for credibility and enquiries.",
    hero: {
      headline: "A Website That Makes a Professional Case for You",
      sub: "Consultants, agencies, and service businesses are hired on trust. Your website is often the first — and sometimes only — chance to build it.",
    },
    problem:
      "Professional buyers research before they call. Without a site that lays out what you do, who you've done it for, and how to reach you, you're invisible during that research phase.",
    howWeHelp: [
      "Clear service descriptions, not vague mission statements",
      "Case studies or work examples where available",
      "Team and credibility pages",
      "Genuine testimonials only, where you have them",
      "A straightforward path to contact or enquiry",
    ],
    features: ["Service pages", "Case studies", "Team profiles", "Testimonials (only if genuine)", "Contact / lead forms"],
    exampleStructure: ["Home", "Services", "Work / Case Studies", "About / Team", "Contact"],
    relatedWork: ["professional-services-concept"],
    relatedServices: ["business-websites", "website-redesign"],
    cta: "BUILD MY BUSINESS WEBSITE",
    faqs: [
      { q: "We don't have client testimonials yet — is that a problem?", a: "No — we won't fabricate them. We'll focus the site on what you offer and how you work until you have real ones to add." },
      { q: "Can you help present our past projects as case studies?", a: "Yes, using real project details you provide — we won't invent outcomes or numbers." },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    shortDesc: "Professional healthcare websites with services, contact information, location and appointment enquiries.",
    icon: "Stethoscope",
    color: "teal",
    metaTitle: "Healthcare & Clinic Website Design | LCN254",
    metaDescription:
      "Professional websites for clinics and healthcare providers, with services, departments, location and appointment enquiries.",
    hero: {
      headline: "A Clear, Professional Website for Your Practice",
      sub: "Services, departments, and a simple way for patients to reach you — presented plainly and professionally.",
    },
    problem:
      "Patients want to know what services you offer, where you are, and how to book — quickly, and without confusion. Overly promotional or unclear sites erode trust rather than build it.",
    howWeHelp: [
      "Clear listing of services and departments",
      "Practitioner information, where appropriate to share",
      "Location, hours, and directions",
      "Appointment enquiry forms",
      "Straightforward, factual content — no clinical claims we can't stand behind",
    ],
    features: ["Services & departments", "Practitioner info", "Location & hours", "Appointment enquiries", "FAQ section"],
    exampleStructure: ["Home", "Services", "Departments", "About", "Contact / Book"],
    relatedWork: ["healthcare-concept"],
    relatedServices: ["business-websites"],
    cta: "BUILD MY HEALTHCARE WEBSITE",
    faqs: [
      { q: "Can patients book appointments online?", a: "Appointment enquiry forms are standard; live scheduling can be added as a custom project depending on your existing systems." },
      { q: "Will the site make medical claims on our behalf?", a: "No — we present your services factually and avoid clinical claims. Any specific medical claims are your responsibility to review and approve." },
    ],
  },
];

export const getIndustry = (slug) => INDUSTRIES.find((i) => i.slug === slug);
