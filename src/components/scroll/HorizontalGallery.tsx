"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Pins the gallery and scrubs its track horizontally as you scroll vertically.
 * Only activates on wide screens with motion allowed (via matchMedia) — on
 * mobile / reduced-motion / no-JS it stays a normal vertical column, so the
 * content is never trapped off-screen.
 *
 * Children should each be wrapped in an element with className="hgal__card".
 */
export function HorizontalGallery({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;

      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          root.dataset.active = "true";
          const distance = () =>
            Math.max(0, track.scrollWidth - window.innerWidth);

          const tween = gsap.to(track, { x: () => -distance(), ease: "none" });
          const st = ScrollTrigger.create({
            trigger: root,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            animation: tween,
          });
          // Layout just changed to a row; recompute trigger positions.
          ScrollTrigger.refresh();

          return () => {
            st.kill();
            tween.kill();
            gsap.set(track, { clearProps: "transform" });
            delete root.dataset.active;
          };
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="hgal">
      <div ref={trackRef} className="hgal__track">
        {children}
      </div>
    </div>
  );
}
