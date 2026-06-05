/**
 * Site-wide CRT atmosphere: scanlines + vignette, layered above content but
 * below interactive chrome. Non-interactive (pointer-events: none).
 */
export function Atmosphere() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(0,0,0,.045) 0 1px, transparent 1px 3px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 50%, transparent 62%, var(--y2k-bg-deep) 100%)",
        }}
      />
    </>
  );
}
