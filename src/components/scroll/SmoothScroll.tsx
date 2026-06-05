"use client";

import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useScrollStore } from "@/lib/store";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Bridges Lenis → ScrollTrigger + the zustand store.
 * Lives inside <ReactLenis> so useLenis() has context.
 */
function LenisBridge() {
  const setProgress = useScrollStore((s) => s.setProgress);
  useLenis((lenis) => {
    ScrollTrigger.update();
    setProgress(lenis.progress ?? 0);
  });
  return null;
}

/**
 * Root smooth-scroll provider. Drives Lenis from GSAP's ticker (the classic
 * wiring) so Lenis and ScrollTrigger share one rAF loop.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      // GSAP ticker time is in seconds; Lenis expects milliseconds.
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}
