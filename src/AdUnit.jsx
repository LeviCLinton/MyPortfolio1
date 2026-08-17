import { useEffect, useRef } from "react";

/**
 * AdUnit — Google AdSense display ad component
 * Replace CA_PUB_ID with your real publisher ID (ca-pub-XXXXXXXXXXXXXXXXX)
 * Replace each AD_SLOT_ID with the slot IDs from your AdSense dashboard
 *
 * ADS_ENABLED: while the site is pending AdSense review (or any time you
 * want ads off), set this to false. AdUnit renders nothing — no empty box,
 * no placeholder text — and every <AdUnit /> call site elsewhere in the app
 * needs no changes. Flip back to true once the account is approved and
 * live ads are actually serving.
 */
const ADS_ENABLED = false;

export const CA_PUB_ID = "ca-pub-2255420330589307";

// Ad slot IDs — created in AdSense dashboard → Ads → By ad unit
export const AD_SLOTS = {
  blogBanner:      "1177133644",
  blogSidebar:     "2107071931",
  homeBanner:      "8971225151",
  templatesBanner: "6345061816",
};

/**
 * <AdUnit slot="blogBanner" />
 * <AdUnit slot="blogSidebar" format="rectangle" />
 */
export default function AdUnit({ slot = "blogBanner", format = "auto", className = "" }) {
  const adRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADS_ENABLED) return;
    if (pushed.current) return;
    if (!adRef.current) return;

    // Only push once per mount — AdSense throws if you push the same unit twice
    try {
      pushed.current = true;
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // AdSense not loaded yet (e.g. ad blocker or script not ready) — fail silently
      console.warn("AdSense not ready:", e.message);
    }
  }, []);

  if (!ADS_ENABLED) return null;

  const slotId = AD_SLOTS[slot];

  if (!slotId || slotId === "XXXXXXXXXX") {
    // Show a placeholder until real slot IDs are added
    return (
      <div className={`flex items-center justify-center rounded-xl border border-dashed border-white/10 text-slate-600 text-xs font-mono ${className}`}
        style={{ minHeight: 90 }}>
        Ad unit · {slot} · add slot ID to AdUnit.jsx
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={CA_PUB_ID}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
