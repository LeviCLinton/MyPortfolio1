// Runs after `vite build` (client) and `vite build --ssr` (server).
//
// This site is a client-side React SPA, but GitHub Pages is pure static
// hosting — there's no server to rewrite "/pricing" to the app shell on
// request. So instead of hash routes (/#pricing) or a single index.html
// with client-side-only routing (which crawlers and social-preview bots
// can't reliably see), we generate a REAL static HTML file per route at
// build time: dist/pricing/index.html, dist/about/index.html, etc.
//
// Each file contains the fully server-rendered content for that specific
// page AND that page's own <title>/meta description/canonical/OG tags --
// so every route is genuinely crawlable and shareable on its own, with no
// JavaScript required to see real content. Once the JS bundle loads, React
// hydrates in place and takes over client-side navigation via pushState.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "dist");
const ssrDir = path.resolve(__dirname, "dist-ssr");
const SITE = "https://lcn254.site";
const OG_IMAGE = `${SITE}/lcn254-logo-share.jpeg`;

// — Static route metadata --------------------------------------------------
const STATIC_ROUTES = [
  {
    path: "/",
    title: "LCN254 — Professional Web Design Agency | Websites for Businesses Worldwide",
    description: "LCN254 designs and builds modern, high-performance websites that help businesses establish credibility and generate customers online — ready to deploy in days, for clients in Kenya and worldwide.",
  },
  {
    path: "/templates",
    title: "Templates & Industry Suites | LCN254",
    description: "Browse LCN254's industry-specific website templates — restaurants, clinics, hotels, logistics, e-commerce and more — with live, interactive demos.",
  },
  {
    path: "/pricing",
    title: "Pricing | LCN254",
    description: "Transparent USD pricing for LCN254 websites — Starter, Business and Premium packages, add-ons, and ongoing Website Care Plans.",
  },
  {
    path: "/about",
    title: "About LCN254 | Professional Web Design Agency",
    description: "LCN254 is a professional web design agency founded in Nairobi, now designing and building websites for clients in Kenya and around the world.",
  },
  {
    path: "/contact",
    title: "Contact LCN254 | Start Your Project",
    description: "Get in touch with LCN254 to start your website project. Tell us what you're building and we'll reply within a few hours.",
  },
  {
    path: "/faq",
    title: "Frequently Asked Questions | LCN254",
    description: "Answers to common questions about LCN254's process, pricing, hosting, timelines, and post-launch support.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | LCN254",
    description: "LCN254's privacy policy — how we collect, use, and protect information submitted through our website.",
  },
  {
    path: "/terms",
    title: "Terms of Service | LCN254",
    description: "LCN254's terms of service governing website design and development engagements.",
  },
  {
    path: "/blog",
    title: "Blog | LCN254",
    description: "Practical articles on web performance, business growth, and technology, from the LCN254 team.",
  },
];

// — Helpers: robust content-attribute replacement, format-agnostic --------
function escapeAttr(str) {
  return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function replaceTag(html, openTag, closeTag, newInner) {
  const start = html.indexOf(openTag);
  if (start === -1) return html;
  const end = html.indexOf(closeTag, start);
  if (end === -1) return html;
  return html.slice(0, start + openTag.length) + newInner + html.slice(end);
}

function replaceAttrValue(html, identifier, attr, newValue) {
  const idx = html.indexOf(identifier);
  if (idx === -1) return html;
  const attrToken = `${attr}="`;
  const attrIdx = html.indexOf(attrToken, idx);
  if (attrIdx === -1) return html;
  const valueStart = attrIdx + attrToken.length;
  const valueEnd = html.indexOf('"', valueStart);
  if (valueEnd === -1) return html;
  return html.slice(0, valueStart) + escapeAttr(newValue) + html.slice(valueEnd);
}

function applyMeta(html, route) {
  const routePath = route.path;
  const title = route.title;
  const description = route.description;
  const url = routePath === "/" ? `${SITE}/` : `${SITE}${routePath}`;
  let out = html;
  out = replaceTag(out, "<title>", "</title>", title);
  out = replaceAttrValue(out, 'name="description"', "content", description);
  out = replaceAttrValue(out, 'rel="canonical"', "href", url);
  out = replaceAttrValue(out, 'property="og:url"', "content", url);
  out = replaceAttrValue(out, 'property="og:title"', "content", title);
  out = replaceAttrValue(out, 'property="og:description"', "content", description);
  out = replaceAttrValue(out, 'property="og:image"', "content", OG_IMAGE);
  out = replaceAttrValue(out, 'name="twitter:title"', "content", title);
  out = replaceAttrValue(out, 'name="twitter:description"', "content", description);
  out = replaceAttrValue(out, 'name="twitter:image"', "content", OG_IMAGE);
  return out;
}

function writeRoute(template, render, route) {
  const appHtml = render(route.path);
  const withRoot = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  const finalHtml = applyMeta(withRoot, route);

  const outDir = route.path === "/" ? distDir : path.join(distDir, route.path.replace(/^\//, ""));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), finalHtml);
}

async function main() {
  const mod = await import(path.join(ssrDir, "entry-server.js"));
  const render = mod.render;
  const ARTICLES = mod.ARTICLES;

  // Pristine template, read once — every route renders from this same
  // starting point so per-route replacements never stack on each other.
  const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

  const blogRoutes = (ARTICLES || []).map((a) => ({
    path: `/blog/${a.slug}`,
    title: a.metaTitle || `${a.title} | LCN254 Blog`,
    description: a.metaDescription || a.excerpt,
  }));

  const allRoutes = STATIC_ROUTES.concat(blogRoutes);

  for (const route of allRoutes) {
    writeRoute(template, render, route);
  }

  // GitHub Pages 404 fallback: any genuinely unmatched path (typo, removed
  // page, old external link) falls through to this file. It renders the
  // app's own NotFoundPage — hydration then reads the real (still wrong)
  // URL from the browser and renders the same 404 state client-side, so
  // there's no redirect flash or mismatch.
  writeRoute(template, render, {
    path: "/__lcn254_404__",
    title: "Page Not Found | LCN254",
    description: "The page you're looking for doesn't exist or may have moved.",
  });
  fs.renameSync(path.join(distDir, "__lcn254_404__", "index.html"), path.join(distDir, "404.html"));
  fs.rmSync(path.join(distDir, "__lcn254_404__"), { recursive: true, force: true });

  // Regenerate the sitemap from the exact same route list used to build the
  // pages above, so it can never drift out of sync with what's deployed.
  const sitemapUrls = allRoutes.map(r => (r.path === "/" ? `${SITE}/` : `${SITE}${r.path}`));
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls
    .map(u => `<url><loc>${u}</loc><changefreq>weekly</changefreq><priority>${u === `${SITE}/` ? "1.0" : "0.7"}</priority></url>`)
    .join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml);

  // dist-ssr is a build artifact only needed to generate the strings above --
  // don't ship it to GitHub Pages.
  fs.rmSync(ssrDir, { recursive: true, force: true });

  console.log(`Pre-rendered ${allRoutes.length} route(s) + 404.html as static HTML`);
}

main().catch((err) => {
  console.error("Pre-render failed:", err);
  process.exit(1);
});
