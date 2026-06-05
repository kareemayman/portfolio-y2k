"use client";

import { useState } from "react";

type ScreenshotProps = {
  /** Path under /public, e.g. "/screens/tseppas.png". */
  src: string;
  alt: string;
  /** Host shown in the faux address bar, e.g. "tseppas.com". */
  host: string;
  /** "phone" renders a narrow portrait screen for mobile-app shots. */
  variant?: "desktop" | "phone";
};

/**
 * A retro "monitor screen" that shows a live-site screenshot inside a sunken
 * bevel, with a faux address bar on top. If the image isn't there yet it falls
 * back to a halftone placeholder (so the layout never breaks while assets land).
 */
export function Screenshot({ src, alt, host, variant = "desktop" }: ScreenshotProps) {
  const [ok, setOk] = useState(true);
  return (
    <div className={`y2k-screen${variant === "phone" ? " y2k-screen--phone" : ""}`}>
      <div className="y2k-screen__bar">
        <span className="y2k-screen__dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="y2k-screen__url">{host}</span>
      </div>
      <div className="y2k-screen__view">
        {ok ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setOk(false)}
          />
        ) : (
          <div className="y2k-screen__placeholder" aria-hidden>
            <span className="font-display text-lg">{host}</span>
            <span className="font-chrome text-[11px] opacity-70">
              screenshot loading&hellip;
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
