import { Reveal } from "@/components/scroll/Reveal";
import { Window } from "@/components/y2k";

const LINKS: { label: string; href: string; primary?: boolean }[] = [
  { label: "email me", href: "mailto:kareem.mohamed.ayman@gmail.com", primary: true },
  { label: "linkedin", href: "https://www.linkedin.com/in/kareem-mohamed-ayman/" },
  { label: "github", href: "https://github.com/kareemayman" },
  { label: "résumé.pdf", href: "/resume.pdf" },
];

/** CONTACT — a dial-up / send-message terminal. */
export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-24 sm:py-32">
      <span
        aria-hidden
        className="font-display pointer-events-none absolute left-[9%] top-[22%] hidden -rotate-12 text-5xl text-y2k-sky [text-shadow:3px_3px_0_var(--y2k-ink)] lg:block"
      >
        ✦
      </span>
      <span
        aria-hidden
        className="font-display pointer-events-none absolute right-[10%] bottom-[20%] hidden rotate-12 text-4xl text-y2k-pink-hot [text-shadow:3px_3px_0_var(--y2k-ink)] lg:block"
      >
        ❤
      </span>

      <div className="mx-auto max-w-2xl">
        <Reveal>
          <Window title="contact.exe" role="region" tilt={0.4}>
            <p className="font-body text-y2k-ink">
              Want to build something, or just say hi? The dial-up&rsquo;s
              connected.
            </p>
            <p className="font-chrome mt-4 text-sm text-y2k-ink">
              <span className="text-y2k-ink/50">&gt;&nbsp;</span>
              kareem.mohamed.ayman@gmail.com
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {LINKS.map((l) => {
                const external = l.href.startsWith("http") || l.href.endsWith(".pdf");
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    className={`y2k-btn ${l.primary ? "y2k-btn--primary" : ""}`.trim()}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {l.label}
                  </a>
                );
              })}
            </div>
          </Window>
        </Reveal>
      </div>
    </section>
  );
}
