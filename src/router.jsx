import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

/**
 * Minimal path-based router.
 *
 * Replaces the previous hash router (#templates, #contact, ...) with real
 * History API routes (/services, /work/project-slug, ...) so that:
 *   - GitHub Pages serves a real static HTML file per route (see prerender.js)
 *   - Every internal link is a genuine <a href="/services"> anchor, crawlable
 *     without JS
 *   - Client-side navigation still feels instant (we intercept same-origin
 *     clicks, pushState, and re-render — no full reload)
 *
 * Route matching supports static segments and one dynamic segment per path,
 * e.g. "/work/:slug" or "/services/:slug" or "/industries/:slug".
 */

const RouterContext = createContext(null);

function normalize(path) {
  if (!path) return "/";
  // strip trailing slash (except root), strip query/hash
  let p = path.split("?")[0].split("#")[0];
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

function matchRoute(pathname, pattern) {
  const pathParts = normalize(pathname).split("/").filter(Boolean);
  const patternParts = pattern.split("/").filter(Boolean);
  if (pathParts.length !== patternParts.length) return null;
  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    const pp = patternParts[i];
    if (pp.startsWith(":")) {
      params[pp.slice(1)] = decodeURIComponent(pathParts[i]);
    } else if (pp !== pathParts[i]) {
      return null;
    }
  }
  return params;
}

export function RouterProvider({ children, initialPath }) {
  const [pathname, setPathname] = useState(() =>
    initialPath
      ? normalize(initialPath)
      : typeof window !== "undefined"
      ? normalize(window.location.pathname)
      : "/"
  );

  const navigate = useCallback((to, opts = {}) => {
    const target = normalize(to);
    if (typeof window !== "undefined") {
      if (opts.replace) {
        window.history.replaceState({}, "", target);
      } else {
        window.history.pushState({}, "", target);
      }
    }
    setPathname(target);
    if (!opts.preserveScroll) window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onPop = () => setPathname(normalize(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Global click interception: any same-origin <a href="/..."> click becomes
  // a client-side navigation instead of a full page reload. Links that are
  // external, open in a new tab, use modifier keys, or explicitly opt out
  // with data-native are left alone.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = e.target.closest?.("a[href]");
      if (!anchor) return;
      if (anchor.hasAttribute("data-native")) return;
      if (anchor.target && anchor.target !== "" && anchor.target !== "_self") return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("//") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (!href.startsWith("/")) return;
      e.preventDefault();
      navigate(href);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used within RouterProvider");
  return ctx;
}

/** Given the current pathname and a list of {pattern, component} routes,
 *  return the matched component + params, or null. */
export function resolveRoute(pathname, routes) {
  for (const r of routes) {
    const params = matchRoute(pathname, r.pattern);
    if (params) return { ...r, params };
  }
  return null;
}
