import type { ButtonHTMLAttributes, ReactNode } from "react";

type DesktopIconProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Emoji/text glyph for now; swap for a pixel-art <img> later. */
  glyph: ReactNode;
  label: string;
};

/** A labelled desktop/folder icon. Button text (label) is its accessible name. */
export function DesktopIcon({
  glyph,
  label,
  className = "",
  ...rest
}: DesktopIconProps) {
  return (
    <button type="button" className={`y2k-icon ${className}`.trim()} {...rest}>
      <span className="y2k-icon__glyph" aria-hidden>
        {glyph}
      </span>
      <span className="y2k-icon__label">{label}</span>
    </button>
  );
}
