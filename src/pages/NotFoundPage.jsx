import React from "react";
import SEOHead from "../components/SEOHead.jsx";
import { PrimaryLink, SecondaryLink } from "../components/PhaseFourUI.jsx";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <SEOHead title="Page Not Found" description="The page you're looking for doesn't exist." path="/404" />
      <div className="text-center max-w-md">
        <p className="font-mono text-sm mb-3" style={{ color: "#1AA3B0" }}>404</p>
        <h1 className="text-3xl font-bold text-white mb-4">Page not found</h1>
        <p className="text-slate-400 mb-8">The page you're looking for doesn't exist or may have moved.</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <PrimaryLink href="/">START YOUR PROJECT</PrimaryLink>
          <SecondaryLink href="/work">VIEW OUR WORK</SecondaryLink>
        </div>
      </div>
    </main>
  );
}
