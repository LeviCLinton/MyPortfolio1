import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

// Re-exported so prerender.js (a plain Node script, outside Vite) can
// enumerate blog slugs without re-implementing the article list.
export { ARTICLES } from "./Blog.jsx";

export function render(path = "/") {
  return renderToString(
    <React.StrictMode>
      <App initialPath={path} />
    </React.StrictMode>
  );
}
