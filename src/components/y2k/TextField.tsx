import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  id?: string;
  /** Visually hide the label (still read by assistive tech). */
  hideLabel?: boolean;
  className?: string;
};

type TextFieldProps =
  | (BaseProps & { multiline?: false } & InputHTMLAttributes<HTMLInputElement>)
  | (BaseProps & { multiline: true } & TextareaHTMLAttributes<HTMLTextAreaElement>);

const slug = (s: string) =>
  "fld-" +
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Sunken (bevel-in) Y2K text field with an always-present, on-brand label. */
export function TextField(props: TextFieldProps) {
  const { label, id, hideLabel = false, className = "", multiline, ...rest } = props;
  const fieldId = id ?? slug(label);

  return (
    <div>
      <label
        htmlFor={fieldId}
        className={`y2k-label ${hideLabel ? "sr-only" : ""}`.trim()}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={fieldId}
          className={`y2k-field y2k-scroll ${className}`.trim()}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={fieldId}
          className={`y2k-field ${className}`.trim()}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
}
