// Runs after `vite build` (client) and `vite build --ssr` (server).
// Renders <App /> to a static HTML string and injects it into dist/index.html,
// so search engines and the very first paint get real content — no blank
// <div id="root"></div> waiting on JS to load and execute.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "dist");
const ssrDir = path.resolve(__dirname, "dist-ssr");

async function main() {
  const { render } = await import(
    path.join(ssrDir, "entry-server.js")
  );

  const appHtml = render();

  const indexPath = path.join(distDir, "index.html");
  const html = fs.readFileSync(indexPath, "utf-8");

  const injected = html.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  fs.writeFileSync(indexPath, injected);

  // dist-ssr is a build artifact only needed to generate the string above —
  // don't ship it to GitHub Pages.
  fs.rmSync(ssrDir, { recursive: true, force: true });

  console.log("✓ Pre-rendered index.html with static HTML content");
}

main().catch((err) => {
  console.error("Pre-render failed:", err);
  process.exit(1);
});
