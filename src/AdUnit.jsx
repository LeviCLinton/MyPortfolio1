import { useEffect, useRef } from "react";

export const CA_PUB_ID = "ca-pub-2255420330589307";

export const AD_SLOTS = {
  blogBanner:      "1177133644",
  blogSidebar:     "2107071931",
  homeBanner:      "8971225151",
  templatesBanner: "6345061816",
};

export default function AdUnit({ slot = "blogBanner", format = "auto", className = "" }) {
  const adRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    if (!adRef.current) return;
    try {
      pushed.current = true;
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn("AdSense not ready:", e.message);
    }
  }, []);

  const slotId = AD_SLOTS[slot];

  if (!slotId || slotId === "XXXXXXXXXX") {
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
