import { ScrollLink } from "@/components/scroll/ScrollLink";

/** SHUTDOWN — the "powering off" footer; restart scrolls back to the top. */
export function ShutdownFooter() {
  return (
    <footer className="border-t-2 border-y2k-ink bg-y2k-bg-deep/40 px-6 pt-16 pb-28 text-center">
      <div className="mx-auto max-w-5xl">
        <p className="font-display text-2xl text-y2k-ink">shutting down&hellip;</p>
        <p className="font-body mt-2 text-sm text-y2k-ink/80">
          built with Next.js, GSAP &amp; Lenis.
        </p>
        <p className="font-body text-sm text-y2k-ink/80">
          vibecoded by me &mdash; code-reviewed though, relax.
        </p>
        <ScrollLink
          to="#top"
          className="y2k-btn y2k-btn--mint mt-6 inline-flex"
          aria-label="Restart — back to top"
        >
          ⟳ restart
        </ScrollLink>
        <p className="font-chrome mt-8 text-xs text-y2k-ink/60">
          &copy; 2026 Kareem Ayman &middot; KAREEM.OS v0.1
        </p>
      </div>
    </footer>
  );
}
