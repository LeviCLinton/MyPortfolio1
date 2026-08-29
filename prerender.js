// Runs after `vite build` (client) and `vite build --ssr` (server).
//
// For EVERY real route in the site, this renders <App url="..."/> to a
// static HTML string, injects it into a copy of dist/index.html with that
// route's own <title>, meta description, canonical URL and Open Graph tags,
// and writes it to dist/<route>/index.html.
//
// Why per-route directories: GitHub Pages has no server-side rewrites. If we
// only ever ship one dist/index.html, a direct visit or browser refresh on
// e.g. /services/ecommerce would 404. Writing a real index.html into
// dist/services/ecommerce/ makes that URL resolve exactly like a
// traditional static site, with zero routing tricks required.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "dist");
const ssrDir = path.resolve(__dirname, "dist-ssr");
const SITE = "https://lcn254.site";

// ─── Data-driven route lists (plain JS, safe to import directly in Node) ───
const { SERVICES } = await import(path.join(__dirname, "src/data/servicesData.js"));
const { INDUSTRIES } = await import(path.join(__dirname, "src/data/industriesData.js"));
const { WORK } = await import(path.join(__dirname, "src/data/workData.js"));

// Blog lives in a .jsx file (not importable directly from plain Node), so
// its route list is declared here. Keep in sync with src/Blog.jsx slugs.
const BLOG_ARTICLES = [
  { slug: "ai-for-everyone-zuckerberg", title: "Zuckerberg: AI & Personal Superintelligence for Everyone", description: "Mark Zuckerberg argues superintelligence should be distributed to all, not concentrated among a few." },
  { slug: "why-your-business-needs-a-website-2026", title: "Why Your Kenyan Business Needs a Website in 2026", description: "Facebook pages and WhatsApp are not websites. Here's why every serious Kenyan business needs its own domain." },
  { slug: "mpesa-website-integration-guide", title: "M-Pesa Website Integration Guide 2026", description: "Everything a Kenyan business owner needs to know about adding M-Pesa payments to their website." },
  { slug: "web-architecture-mistakes-costing-revenue", title: "5 Web Architecture Mistakes Killing Your Conversions", description: "Slow load times, poor mobile UX, and broken funnels are silently draining revenue." },
];

/** Every concrete, crawlable URL on the site, with SEO metadata. */
function buildRoutes() {
  const routes = [
    { path: "/", title: "LCN254 — Modern Websites That Grow Your Business", description: "LCN254 designs and builds modern, high-performance websites that help businesses establish credibility and generate customers online.", priority: "1.0" },
    { path: "/services", title: "Web Design & Development Services | LCN254", description: "Business websites, e-commerce, landing pages, redesigns and maintenance — modern web solutions built around your business.", priority: "0.9" },
    { path: "/work", title: "Our Work — Website Design & Development Portfolio | LCN254", description: "Explore website and digital experience concepts designed and built by LCN254.", priority: "0.8" },
    { path: "/industries", title: "Websites by Industry | LCN254", description: "LCN254 designs websites around how your industry actually works.", priority: "0.8" },
    { path: "/pricing", title: "Pricing | LCN254", description: "Transparent website package and care plan pricing from LCN254.", priority: "0.7" },
    { path: "/process", title: "Our Process | LCN254", description: "How LCN254 takes a website from discovery to launch and ongoing growth, in seven clear steps.", priority: "0.6" },
    { path: "/about", title: "About LCN254", description: "LCN254 is a Nairobi-based web agency building fast, functional websites for businesses of every size, in Kenya and internationally.", priority: "0.6" },
    { path: "/contact", title: "Contact LCN254", description: "Tell LCN254 about your business, get a quote or ask a question, we usually reply within a few hours.", priority: "0.7" },
    { path: "/faq", title: "Frequently Asked Questions | LCN254", description: "Common questions about working with LCN254, timelines, pricing, hosting, and payments.", priority: "0.5" },
    { path: "/privacy", title: "Privacy Policy | LCN254", description: "LCN254's privacy policy covering data collection, use, and your rights.", priority: "0.3" },
    { path: "/blog", title: "Blog | LCN254", description: "Practical articles on how websites help businesses scale and how to stay ahead in a fast-moving digital world.", priority: "0.6" },
  ];

  for (const s of SERVICES) {
    routes.push({ path: `/services/${s.slug}`, title: s.metaTitle, description: s.metaDescription, priority: "0.8" });
  }
  for (const ind of INDUSTRIES) {
    routes.push({ path: `/industries/${ind.slug}`, title: ind.metaTitle, description: ind.metaDescription, priority: "0.7" });
  }
  for (const w of WORK) {
    routes.push({ path: `/work/${w.slug}`, title: `${w.name} — Case Study | LCN254`, description: w.shortDesc, priority: "0.6" });
  }
  for (const a of BLOG_ARTICLES) {
    routes.push({ path: `/blog/${a.slug}`, title: `${a.title} | LCN254 Blog`, description: a.description, priority: "0.5" });
  }

  return routes;
}

function injectSEO(html, { path: routePath, title, description }) {
  const url = `${SITE}${routePath === "/" ? "" : routePath}`;

  let out = html;
  out = out.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/>/,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );
  out = out.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/>/,
    `<link rel="canonical" href="${url}" />`
  );
  out = out.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${url}" />`);
  out = out.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  out = out.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  out = out.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  out = out.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);

  return out;
}

function escapeHtml(str = "") {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function writeRouteFile(routePath, html) {
  if (routePath === "/") {
    fs.writeFileSync(path.join(distDir, "index.html"), html);
    return;
  }
  const dir = path.join(distDir, routePath.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

function buildSitemap(routes) {
  const urls = routes
    .map(
      (r) => `<url>
<loc>${SITE}${r.path === "/" ? "/" : r.path}</loc>
<changefreq>weekly</changefreq>
<priority>${r.priority}</priority>
</url>`
    )
    .join("\n");
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function main() {
  const { render } = await import(path.join(ssrDir, "entry-server.js"));

  const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");
  const routes = buildRoutes();

  for (const route of routes) {
    const appHtml = render(route.path);
    const injected = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    const withSEO = injectSEO(injected, route);
    writeRouteFile(route.path, withSEO);
  }

  // 404.html: GitHub Pages serves this for any path with no matching file.
  // Every real route above already has its own generated index.html, so
  // this only catches genuine typos/broken links.
  const notFoundHtml = injectSEO(
    template.replace('<div id="root"></div>', `<div id="root">${render("/__not_found__")}</div>`),
    { path: "/404", title: "Page Not Found | LCN254", description: "The page you're looking for doesn't exist." }
  );
  fs.writeFileSync(path.join(distDir, "404.html"), notFoundHtml);

  fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), buildSitemap(routes));
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), buildSitemap(routes));

  fs.rmSync(ssrDir, { recursive: true, force: true });

  console.log(`✓ Pre-rendered ${routes.length} routes + 404.html, and wrote sitemap.xml`);
}

main().catch((err) => {
  console.error("Pre-render failed:", err);
  process.exit(1);
});
