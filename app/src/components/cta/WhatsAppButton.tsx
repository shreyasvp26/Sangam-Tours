import { PrimaryCTA, type ButtonCTAProps } from "@/components/cta/cta-shared";
import { CTA_LABELS } from "@/components/cta/labels";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { digitsOnly } from "@/lib/string";
import type { ClassNameProps } from "@/types";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.86 11.86 0 0 0 5.76 1.47h.01c6.55 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44ZM12.07 21.15h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.74.98 1-3.64-.24-.37a9.8 9.8 0 0 1-1.5-5.24c0-5.42 4.41-9.83 9.84-9.83a9.8 9.8 0 0 1 9.83 9.84c0 5.42-4.41 9.84-9.82 9.84Zm5.4-7.37c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

/** Build a wa.me URL with optional prefilled message (Document 06 WhatsApp Button). */
export function buildWhatsAppHref(phoneDigits: string, message?: string) {
  const base = `https://wa.me/${digitsOnly(phoneDigits)}`;
  if (!message) {
    return base;
  }
  return `${base}?text=${encodeURIComponent(message)}`;
}

type WhatsAppButtonProps = ClassNameProps &
  Omit<ButtonCTAProps, "children" | "href" | "external"> & {
    /** Full wa.me URL override. */
    href?: string;
    /** Prefill chat text (e.g. package reference). Ignored when `href` is set. */
    message?: string;
    appearance?: "labelled" | "icon";
    onDark?: boolean;
  };

/**
 * WhatsApp Button — Document 06 §4.
 * Label fixed as "WhatsApp Us". Equal visual weight with Book Now / Call Now in clusters.
 */
export function WhatsAppButton({
  href,
  message,
  appearance = "labelled",
  onDark = false,
  className,
  ...props
}: WhatsAppButtonProps) {
  const resolvedHref =
    href ??
    (message
      ? buildWhatsAppHref(siteConfig.primaryPhone.label, message)
      : siteConfig.primaryPhone.whatsappHref);

  if (appearance === "icon") {
    return (
      <a
        href={resolvedHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${CTA_LABELS.whatsappUs} (opens in a new tab)`}
        className={cn(
          "size-touch ease-standard inline-flex items-center justify-center rounded-sm transition-colors duration-[var(--sangam-duration-fast)]",
          onDark
            ? "text-on-dark hover:bg-white/10 focus-visible:shadow-[var(--sangam-focus-ring-on-dark)]"
            : "text-navy hover:bg-neutral-100 focus-visible:shadow-[var(--sangam-focus-ring)]",
          className,
        )}
      >
        <WhatsAppGlyph className="size-5" />
      </a>
    );
  }

  return (
    <PrimaryCTA href={resolvedHref} external className={className} {...props}>
      {CTA_LABELS.whatsappUs}
    </PrimaryCTA>
  );
}
