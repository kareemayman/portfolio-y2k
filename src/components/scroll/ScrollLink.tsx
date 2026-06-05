"use client";

import { useLenis } from "lenis/react";

type ScrollLinkProps = {
  /** Target hash, e.g. "#about", or "#top" for the very top. */
  to: string;
  children: React.ReactNode;
  className?: string;
  offset?: number;
  "aria-label"?: string;
};

/** In-page anchor that scrolls smoothly via Lenis (falls back to the href). */
export function ScrollLink({
  to,
  children,
  className,
  offset = -8,
  ...rest
}: ScrollLinkProps) {
  const lenis = useLenis();
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        if (to === "#top" || to === "#") {
          lenis?.scrollTo(0);
          return;
        }
        const el = document.querySelector(to);
        if (el) lenis?.scrollTo(el as HTMLElement, { offset });
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
