import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// isSsrBuild is provided by Vite 5+'s config function form. We only want
// manual vendor chunking for the client bundle — the SSR bundle is a
// single Node module used only at build time by prerender.js, then
// discarded, so splitting it buys nothing.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: {
              // Framer Motion and Lucide are used across nearly every page,
              // so they don't disappear from any single route's payload —
              // but splitting them into their own chunk means the browser
              // caches them separately from app code. App code changes far
              // more often than these libraries do, so this chunk stays
              // cached across deploys instead of being re-downloaded every
              // time a page's copy or data changes.
              vendor: ["framer-motion", "lucide-react"],
            },
          },
        },
  },
}));
