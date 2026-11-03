import React, { useEffect } from "react";
import SEOHead from "../components/SEOHead.jsx";
import { Reveal, T } from "../components/PhaseFourUI.jsx";

/**
 * Privacy Policy and Terms of Service.
 *
 * Content is data (arrays of sections) rendered by one shared layout, so the
 * two pages stay visually identical and are easy to edit. Each body item is
 * either a paragraph string or { list: [...] } for bullets.
 *
 * LAST_UPDATED is a fixed string on purpose: computing it from `new Date()`
 * would stamp every build with the build date and misstate when the legal
 * text last actually changed. Update it by hand when the text changes.
 */
const LAST_UPDATED = "2 November 2026";
const EMAIL = "contact@lcn254.site";

const link = { color: T };

// ─────────────────────────────────────────────────────────────────────────────
// Shared layout
// ─────────────────────────────────────────────────────────────────────────────
function LegalLayout({ title, intro, sections, otherHref, otherLabel }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="mb-10">
              <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: T }}>Legal</span>
              <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h1>
              <p className="text-slate-500 text-sm mb-5">Last updated: {LAST_UPDATED}</p>
              <p className="text-slate-400 leading-relaxed">{intro}</p>
            </div>
          </Reveal>

          <nav aria-label={`${title} contents`} className="mb-12 rounded-2xl border border-white/10 bg-slate-900/40 p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-3">Contents</p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} data-native className="text-slate-400 hover:text-white transition-colors">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-10">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="text-lg font-semibold text-white mb-3">{i + 1}. {s.title}</h2>
                <div className="space-y-3">
                  {s.body.map((b, j) =>
                    typeof b === "string" ? (
                      <p key={j} className="text-slate-400 leading-relaxed text-sm">{b}</p>
                    ) : (
                      <ul key={j} className="space-y-2">
                        {b.list.map((li, k) => (
                          <li key={k} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: T }} />
                            <span>{li}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-sm">
            <a href={otherHref} className="font-semibold" style={link}>{otherLabel} →</a>
            <a href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact us</a>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Privacy Policy
// ─────────────────────────────────────────────────────────────────────────────
const PRIVACY_SECTIONS = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: [
      `LCN254 is a web design and development agency based in Nairobi, Kenya. We are the data controller for personal data collected through lcn254.site and through the project enquiry form on our Contact page.`,
      `For anything to do with your personal data, contact us at ${EMAIL}, or write to LCN254, Nairobi, Kenya.`,
    ],
  },
  {
    id: "legal-framework",
    title: "Kenyan data protection law and the ODPC",
    body: [
      `We handle personal data in line with the Data Protection Act, 2019 of Kenya and the regulations made under it, including the Data Protection (General) Regulations, 2021. The Act is enforced by the Office of the Data Protection Commissioner (ODPC), whose website is odpc.go.ke.`,
      `The Act sets out principles that we follow: personal data must be processed lawfully, fairly and transparently; collected for a specified purpose and not used in ways that are incompatible with it; limited to what is necessary; kept accurate; kept no longer than needed; kept secure; and not transferred outside Kenya without appropriate safeguards.`,
    ],
  },
  {
    id: "data-we-collect",
    title: "What personal data we collect",
    body: [
      `When you submit the project enquiry form we collect:`,
      { list: [
        `Contact details: your name, email address, phone number (optional), organisation (optional) and preferred way to be contacted.`,
        `Project details: the service you are interested in, a description of your project, goals, expected size, any existing website address, and technical requirements such as integrations, domain and hosting status, and content readiness.`,
        `Commercial details: your budget range, timeline and any deadline you give us.`,
        `Your consent record: that you ticked the consent box when submitting the form.`,
      ] },
      `If you contact us by email, WhatsApp or phone, we receive whatever you choose to send us, plus the details those services show us (such as your number or email address).`,
      `Like any website, the services that deliver this site (see section 6) may process technical data such as your IP address, browser type and the pages requested, in their ordinary server and network logs.`,
      `We do not ask for sensitive personal data, ID or passport numbers, or card or M-Pesa details. Please do not include them in the form or in messages to us.`,
    ],
  },
  {
    id: "why-we-use-it",
    title: "Why we use your data, and our lawful basis",
    body: [
      { list: [
        `To respond to your enquiry and prepare a proposal or quote. Lawful basis: your consent (given when you submit the form), and taking steps at your request before entering into a contract.`,
        `To deliver a project once you have engaged us, including invoicing and support. Lawful basis: performance of our contract with you.`,
        `To keep the records the law requires, such as tax and accounting records. Lawful basis: compliance with a legal obligation.`,
        `To protect the site and our systems from abuse, such as spam form submissions. Lawful basis: our legitimate interest in keeping the service secure.`,
      ] },
      `We use enquiry details only for the purposes above. We do not sell your personal data, and we do not use it for marketing unless you ask us to.`,
    ],
  },
  {
    id: "how-the-form-works",
    title: "How the project enquiry form works",
    body: [
      `When you submit the form, your answers are sent over an encrypted (HTTPS) connection to a Cloudflare Worker that we operate. The Worker checks the submission and forwards it as an email, through the email delivery service Resend, to the LCN254 inbox hosted with Zoho Mail. We do not keep a separate database of form submissions on the website.`,
      `The submission therefore exists as an email in our inbox, and is handled under the retention rules in section 8.`,
    ],
  },
  {
    id: "service-providers",
    title: "Who we share data with",
    body: [
      `We share personal data only with the service providers needed to run the site and handle your enquiry. They act on our instructions or under their own published terms:`,
      { list: [
        `Cloudflare: DNS, content delivery and the Worker that relays the enquiry form.`,
        `Resend: delivery of the enquiry email.`,
        `Zoho Mail: our email inbox, where enquiries are received and stored.`,
        `GitHub: hosting of the static website files (the form data does not pass through GitHub).`,
        `Google: web fonts loaded from Google Fonts, and the Google AdSense script described in section 7.`,
      ] },
      `We may also disclose personal data where the law requires it, for example to a court, regulator or law-enforcement authority acting within their powers.`,
    ],
  },
  {
    id: "cookies",
    title: "Cookies and third-party scripts",
    body: [
      `We do not run our own analytics or advertising trackers, and we do not set cookies of our own to track you.`,
      `Our pages do load the Google AdSense script associated with our publisher account. We do not currently show advertisements, but Google may still set cookies or process device and usage information when its script loads, under Google's own policies. Loading Google Fonts also sends your IP address to Google. You can limit cookies in your browser settings or with a content blocker, and the site will continue to work.`,
    ],
  },
  {
    id: "retention",
    title: "How long we keep your data",
    body: [
      { list: [
        `Enquiries that do not become a project: deleted within 24 months of our last contact with you.`,
        `Project records (proposals, agreements, correspondence and invoices): kept for as long as needed to deliver and support the project and to meet the record-keeping periods required by Kenyan law, then deleted.`,
      ] },
      `You can ask us to delete your data earlier, as explained in section 10.`,
    ],
  },
  {
    id: "transfers",
    title: "Transfers outside Kenya",
    body: [
      `Some of the providers in section 6 process data on servers outside Kenya, including in the European Union and the United States. The Act allows this where appropriate safeguards are in place or with your consent. We choose providers that publish data-protection commitments, and by ticking the consent box on the form you agree to your enquiry being processed by them in this way. If you do not agree, please contact us by another channel.`,
    ],
  },
  {
    id: "security",
    title: "Security",
    body: [
      `Form submissions are encrypted in transit using HTTPS. Access to the inbox where enquiries arrive is limited to LCN254. No method of transmission or storage is completely secure, so we cannot guarantee absolute security, but we take reasonable steps to protect personal data against loss, misuse and unauthorised access.`,
      `If a personal data breach occurs that is likely to put your rights and freedoms at risk, we will notify the ODPC within 72 hours of becoming aware of it where feasible, and tell affected individuals without unreasonable delay, as the Act requires.`,
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: [
      `Under section 26 of the Data Protection Act, 2019 you have the right to:`,
      { list: [
        `be informed of how your personal data is used (this policy);`,
        `access the personal data we hold about you;`,
        `object to the processing of your personal data;`,
        `have inaccurate or misleading data corrected; and`,
        `have your personal data deleted, where there is no good reason for us to keep it.`,
      ] },
      `You may also withdraw your consent at any time. Withdrawing does not affect processing that took place before you withdrew.`,
      `To use any of these rights, email ${EMAIL} with the subject "Data Request". We may need to confirm your identity first. We aim to respond within 14 days, and in any case within the time limits set by the Act and its regulations.`,
    ],
  },
  {
    id: "complaints",
    title: "Complaints",
    body: [
      `If you have a concern, please contact us first at ${EMAIL} so we can put it right. You also have the right to lodge a complaint with the Office of the Data Protection Commissioner (ODPC) at odpc.go.ke.`,
    ],
  },
  {
    id: "children",
    title: "Children",
    body: [
      `Our services are directed at businesses and organisations, not at children, and we do not knowingly collect personal data from anyone under 18. If you believe a child has sent us personal data, contact us and we will delete it.`,
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: [
      `We may update this policy from time to time. The "Last updated" date at the top shows when it last changed. If we make a significant change to how we use personal data, we will say so on this page.`,
    ],
  },
];

export function PrivacyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="How LCN254 collects, uses and protects personal data under Kenya's Data Protection Act, 2019, and how to exercise your rights or contact the ODPC."
        path="/privacy"
      />
      <LegalLayout
        title="Privacy Policy"
        intro="This policy explains what personal data LCN254 collects through this website and our project enquiry form, why we collect it, who we share it with, how long we keep it, and the rights you have under Kenya's Data Protection Act, 2019."
        sections={PRIVACY_SECTIONS}
        otherHref="/terms"
        otherLabel="Read the Terms of Service"
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Terms of Service
// ─────────────────────────────────────────────────────────────────────────────
const TERMS_SECTIONS = [
  {
    id: "agreement",
    title: "About these terms",
    body: [
      `These terms apply to your use of lcn254.site and to the project enquiry form on it. LCN254 is a web design and development agency based in Nairobi, Kenya ("LCN254", "we", "us").`,
      `If we agree to build or maintain a website for you, that work is governed by a written proposal or agreement. These terms apply alongside it, and where the two conflict, the written proposal or agreement prevails.`,
    ],
  },
  {
    id: "using-the-site",
    title: "Using this website",
    body: [
      `You may use this site for lawful purposes only. You must not interfere with its operation, attempt to gain unauthorised access to it or to our systems, or submit false, abusive or malicious content through the enquiry form.`,
      `The information on this site, including package prices, timelines and descriptions of services, is a general guide and is not a binding offer. Package prices are shown in US dollars. A binding price is the one stated in a written proposal.`,
      `We work to keep the site accurate and available, but we do not promise that it will always be free of errors or interruptions.`,
    ],
  },
  {
    id: "enquiries",
    title: "Project enquiries",
    body: [
      `Submitting the enquiry form asks us to consider your project. It does not create a contract, and it does not oblige either of us to proceed. After reviewing your answers we will reply with questions or a proposal.`,
      `Please make sure the information you give us is accurate and that you are entitled to give it. How we use it is explained in our Privacy Policy.`,
    ],
  },
  {
    id: "proposals",
    title: "Proposals, scope and timelines",
    body: [
      `A project starts when you accept a written proposal and any deposit or first payment it requires. The proposal sets out the scope, deliverables, price, payment schedule and estimated timeline.`,
      { list: [
        `Work outside the agreed scope is quoted separately. It may change the price and the timeline.`,
        `Timelines depend on you supplying content, approvals and feedback promptly. Delays on your side move the schedule.`,
        `Package pricing shown on the site is in US dollars. Where you are invoiced in Kenyan shillings, the amount is converted at the prevailing rate stated in the invoice.`,
      ] },
    ],
  },
  {
    id: "your-responsibilities",
    title: "Your responsibilities",
    body: [
      { list: [
        `Provide the text, images, logos and other material needed for the project, and confirm you have the right to use it. You are responsible for any claim that material you supply infringes someone else's rights.`,
        `Give timely feedback and approvals at each stage.`,
        `Keep your own accounts, domain registrations and passwords secure, and tell us promptly if you suspect they have been compromised.`,
        `Comply with the laws that apply to your business and your website, including your own obligations under the Data Protection Act, 2019 where your site collects personal data from visitors.`,
      ] },
    ],
  },
  {
    id: "ip",
    title: "Ownership and intellectual property",
    body: [
      `Once we have handed over the finished website and the agreed fees have been paid in full, the website and its code made for you belong to you, unless your proposal says otherwise.`,
      `Open-source libraries, fonts, stock assets and other third-party components remain under their own licences, which continue to apply. Our general tools, know-how and any reusable code that is not specific to your project remain ours.`,
      `Unless you tell us in writing that you do not want this, we may describe the project and show screenshots of the finished site in our portfolio, without disclosing confidential information.`,
    ],
  },
  {
    id: "third-parties",
    title: "Third-party services",
    body: [
      `Projects often connect to services we do not control, such as M-Pesa (Safaricom), card processors, PayPal, domain registrars, and hosting and email providers. Those services have their own terms, fees and availability, and we are not responsible for changes or outages on their side. Their charges are separate from our fees unless the proposal says otherwise.`,
    ],
  },
  {
    id: "hosting-maintenance",
    title: "Hosting and maintenance",
    body: [
      `Where we agree to host or maintain your site, the services included, the fees and the support terms are those in the proposal or care-plan description. Either of us may end an ongoing hosting or maintenance arrangement by giving the notice stated in the proposal, or if none is stated, 30 days' written notice.`,
    ],
  },
  {
    id: "data-protection",
    title: "Confidentiality and personal data",
    body: [
      `We keep the non-public information you share with us about your business confidential and use it only to do the work.`,
      `We handle personal data as described in our Privacy Policy. Where a project involves us processing personal data on your behalf, for example customer bookings or orders on a site we build for you, we will do so only on your instructions and with appropriate security, and the proposal or a separate data processing agreement will record this.`,
    ],
  },
  {
    id: "liability",
    title: "Warranties and limits of liability",
    body: [
      `We will carry out the work with reasonable skill and care. We do not guarantee particular results, such as search-engine rankings, traffic, enquiries or sales, because these depend on many factors outside our control.`,
      `To the fullest extent the law allows, LCN254 is not liable for indirect or consequential loss, or for loss of profit, revenue or data. Our total liability arising from a project is limited to the fees you have paid us for that project. Nothing in these terms limits liability that cannot lawfully be limited.`,
    ],
  },
  {
    id: "termination",
    title: "Ending a project",
    body: [
      `Either of us may end a project by written notice if the other materially breaches the agreement and does not put it right within a reasonable time after being asked to. If a project ends early, you pay for the work done up to that point, and we hand over the work completed and paid for.`,
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: [
      `We may update these terms from time to time. The "Last updated" date at the top shows the current version. A change does not alter the terms of a project agreement already in place.`,
    ],
  },
  {
    id: "law",
    title: "Governing law and disputes",
    body: [
      `These terms are governed by the laws of Kenya. If a dispute arises, we will first try to resolve it in good faith by talking to each other. If that fails, the courts of Kenya have jurisdiction.`,
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      `Questions about these terms: ${EMAIL}, or LCN254, Nairobi, Kenya.`,
    ],
  },
];

export function TermsPage() {
  return (
    <>
      <SEOHead
        title="Terms of Service"
        description="The terms that apply to using lcn254.site, submitting a project enquiry, and working with LCN254: scope, payment, ownership, liability and governing law."
        path="/terms"
      />
      <LegalLayout
        title="Terms of Service"
        intro="These terms cover how you may use this website, what happens when you send us a project enquiry, and the basic terms that apply when LCN254 builds or maintains a website for you."
        sections={TERMS_SECTIONS}
        otherHref="/privacy"
        otherLabel="Read the Privacy Policy"
      />
    </>
  );
}
