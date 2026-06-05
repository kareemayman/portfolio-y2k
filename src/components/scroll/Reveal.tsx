"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Travel distance in px. */
  y?: number;
  delay?: number;
  /** ScrollTrigger start. */
  start?: string;
};

/**
 * Scroll-reveal wrapper: fades + lifts its children into view once.
 * Reduced-motion users get the content immediately (no animation), via
 * gsap.matchMedia — so the page stays fully usable and never hides content.
 */
export function Reveal({
  children,
  className,
  y = 28,
  delay = 0,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          autoAlpha: 0,
          y,
          duration: 0.7,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: "play none none none",
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
