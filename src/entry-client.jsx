import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const rootEl = document.getElementById("root");

// If the HTML was pre-rendered at build time (it has content already),
// hydrate it instead of wiping and re-rendering from an empty div —
// this avoids a flash of blank page and is what makes the pre-render
// actually pay off for load speed, not just for crawlers.
if (rootEl.innerHTML.trim()) {
  ReactDOM.hydrateRoot(
    rootEl,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
