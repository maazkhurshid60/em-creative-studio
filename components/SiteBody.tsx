"use client";

import Script from "next/script";
import { SITE_BODY_HTML } from "./siteMarkup";

/**
 * The original page was a hand-tuned static HTML/CSS/vanilla-JS build (custom
 * cursor-free scroll reveals, physics-y "liquid" blobs, a dual-layer Lottie
 * crown mark docked into the headline, etc.). The markup is rendered as-is so
 * every selector the CSS and behaviour scripts depend on still resolves, and
 * the three original scripts run unmodified, in the order they ran before.
 */
export default function SiteBody() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: SITE_BODY_HTML }} />
      {/* lottie.min.js loads beforeInteractive from the root layout so
          window.lottie is guaranteed to exist by the time this runs. */}
      <Script src="/scripts/main.js" strategy="afterInteractive" />
      <Script src="/scripts/crown.js" strategy="afterInteractive" />
      <Script src="/scripts/fluid.js" strategy="afterInteractive" />
      <Script src="/scripts/grid.js" strategy="afterInteractive" />
    </>
  );
}
