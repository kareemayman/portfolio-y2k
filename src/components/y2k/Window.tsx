import type { ReactNode } from "react";

type WindowProps = {
  title: string;
  children: ReactNode;
  /** Explicit id for the title (used by aria-labelledby). Defaults to a slug of `title`. */
  id?: string;
  /** Renders the inactive (muted) title-bar treatment. */
  inactive?: boolean;
  /** Show the minimize/maximize/close controls. */
  controls?: boolean;
  /** Sticker tilt in degrees. Keep small (±1.5); reset to 0 on hover/focus contexts. */
  tilt?: number;
  /** A window with live focus management is a dialog; static content windows are regions. */
  role?: "dialog" | "region";
  className?: string;
  bodyClassName?: string;
};

const slug = (s: string) =>
  "win-" +
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * A Y2K program window: gradient title bar + (optional) controls + body.
 * Controls are presentational here; the window manager wires their behavior
 * in a later phase.
 */
export function Window({
  title,
  children,
  id,
  inactive = false,
  controls = true,
  tilt = -0.6,
  role = "dialog",
  className = "",
  bodyClassName = "",
}: WindowProps) {
  const titleId = id ?? slug(title);
  return (
    <section
      className={`y2k-window ${className}`.trim()}
      role={role}
      aria-labelledby={titleId}
      data-inactive={inactive || undefined}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <header className="y2k-titlebar">
        <h2 id={titleId} className="y2k-titlebar__title">
          {title}
        </h2>
        {controls && (
          <div className="y2k-titlebar__controls">
            <button type="button" aria-label="Minimize" className="y2k-ctrl">
              _
            </button>
            <button type="button" aria-label="Maximize" className="y2k-ctrl">
              ▢
            </button>
            <button
              type="button"
              aria-label="Close"
              className="y2k-ctrl y2k-ctrl--close"
            >
              ×
            </button>
          </div>
        )}
      </header>
      <div className={`y2k-window__body ${bodyClassName}`.trim()}>{children}</div>
    </section>
  );
}
