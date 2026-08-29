import { useEffect } from "react";

const SITE = "https://lcn254.site";
const DEFAULT_TITLE = "LCN254 — Deployment-Ready Websites for Local Businesses";
const DEFAULT_DESC =
  "LCN254 designs and builds modern, high-performance websites that help businesses establish credibility and generate customers online.";

function setMeta(name, content, attr = "name") {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Sets document title, meta description, canonical URL and Open Graph tags
 * for the current route. Falls back to sensible site-wide defaults so a page
 * that forgets to pass props doesn't ship with blank metadata.
 */
export default function SEOHead({ title, description, path = "/" }) {
  useEffect(() => {
    const finalTitle = title ? `${title} | LCN254` : DEFAULT_TITLE;
    const finalDesc = description || DEFAULT_DESC;
    const url = `${SITE}${path === "/" ? "" : path}`;

    document.title = finalTitle;
    setMeta("description", finalDesc);
    setCanonical(url);

    setMeta("og:type", "website", "property");
    setMeta("og:url", url, "property");
    setMeta("og:title", finalTitle, "property");
    setMeta("og:description", finalDesc, "property");
    setMeta("og:image", `${SITE}/lcn254-logo-share.jpeg`, "property");

    setMeta("twitter:card", "summary");
    setMeta("twitter:title", finalTitle);
    setMeta("twitter:description", finalDesc);
    setMeta("twitter:image", `${SITE}/lcn254-logo-share.jpeg`);

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title, description, path]);

  return null;
}
