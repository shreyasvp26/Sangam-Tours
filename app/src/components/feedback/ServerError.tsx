import { WhatsAppButton } from "@/components/cta/WhatsAppButton";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type ServerErrorProps = ClassNameProps & {
  /** Optional retry control (e.g. Next.js error `reset`). */
  onRetry?: () => void;
  whatsappMessage?: string;
};

/**
 * 500 — Document 06 §8.
 * Calm temporary-failure message; WhatsApp Us as working fallback.
 * Header/Footer come from the root layout.
 */
export function ServerError({
  onRetry,
  whatsappMessage = "Hi Sangam Tours, I ran into a problem on the website and could use some help.",
  className,
}: ServerErrorProps) {
  return (
    <div
      className={cn(
        "px-container py-section mx-auto flex max-w-prose flex-col items-center gap-6 text-center",
        className,
      )}
    >
      <p className="text-caption text-muted font-medium tracking-wide uppercase">Temporary issue</p>
      <h1 className="text-h2 text-foreground font-bold">Something went wrong</h1>
      <p className="text-body-lg text-copy">
        We&apos;re having a temporary problem on our side. Please try again in a moment, or reach us
        on WhatsApp — we&apos;re happy to help.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="border-navy text-navy hover:bg-navy hover:text-on-dark min-h-touch text-body ease-standard inline-flex items-center justify-center rounded-sm border bg-transparent px-5 font-medium transition-colors duration-[var(--sangam-duration-fast)] focus-visible:shadow-[var(--sangam-focus-ring)] focus-visible:outline-none"
          >
            Try again
          </button>
        ) : null}
        <WhatsAppButton message={whatsappMessage} />
      </div>
    </div>
  );
}
