import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { PassThrough } from "node:stream";
import App from "./App.jsx";

/**
 * Renders a route to a complete HTML string for prerendering.
 *
 * App.jsx lazy-loads its page-level components (see the `lazy(() =>
 * import(...))` calls there) so the browser only fetches the JS for the
 * section a visitor is actually viewing. renderToString can't wait for
 * those lazy imports to resolve — it would just emit the <Suspense>
 * fallback, which is exactly what we must NOT ship to crawlers or bake
 * into a static file.
 *
 * renderToPipeableStream's onAllReady callback fires only once every
 * Suspense boundary (including our lazy route chunks) has resolved, so by
 * the time we read the piped output here, the HTML already contains full,
 * final content — identical to what renderToString would have produced if
 * code splitting weren't involved at all.
 */
export function render(url = "/") {
  return new Promise((resolve, reject) => {
    let html = "";
    const collector = new PassThrough();
    collector.on("data", (chunk) => { html += chunk; });
    collector.on("end", () => resolve(html));
    collector.on("error", reject);

    const { pipe } = renderToPipeableStream(
      <React.StrictMode>
        <App url={url} />
      </React.StrictMode>,
      {
        onAllReady() {
          pipe(collector);
        },
        onError(err) {
          reject(err);
        },
      }
    );

    // Safety net: a route should never take this long to resolve. Fail
    // loudly during the build rather than hang CI indefinitely.
    setTimeout(() => reject(new Error(`Prerender timed out for route: ${url}`)), 20000);
  });
}
