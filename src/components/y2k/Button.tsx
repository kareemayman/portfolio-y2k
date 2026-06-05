import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "default" | "primary" | "mint";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

const VARIANT: Record<Variant, string> = {
  default: "",
  primary: "y2k-btn--primary",
  mint: "y2k-btn--mint",
};

/** Beveled Y2K button — lifts on hover, presses in on active. */
export function Button({
  variant = "default",
  className = "",
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`y2k-btn ${VARIANT[variant]} ${className}`.replace(/\s+/g, " ").trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
