"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// WebGL only loads on the client, and only after we know it's wanted.
const Scene = dynamic(() => import("./Scene").then((m) => m.Scene), {
  ssr: false,
});

/** Feature flag — flip to false to ship without the 3D layer. */
const ENABLE_3D = true;

/**
 * Mounts the persistent 3D canvas *behind* all content. Only on wide screens
 * with motion allowed — mobile, reduced-motion, and no-JS get nothing (the
 * site is fully usable without it; 3D is never load-bearing).
 */
export function Background3D() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!ENABLE_3D) return;
    const mq = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setShow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!show) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Scene />
    </div>
  );
}
