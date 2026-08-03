import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT for GitHub Pages (project sites):
// If this repo will live at https://<username>.github.io/<repo-name>/,
// set base to "/<repo-name>/" (with leading and trailing slashes).
// If you're deploying to a *user/org* page repo named <username>.github.io,
// or to a custom domain, leave base as "/".
export default defineConfig({
  plugins: [react()],
  base: "/",
});
