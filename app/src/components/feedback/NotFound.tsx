import { PrimaryCTA, SecondaryCTA } from "@/components/cta/cta-shared";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type NotFoundProps = ClassNameProps & {
  /** Override default recovery hrefs if routes differ. */
  homeHref?: string;
  domesticHref?: string;
  internationalHref?: string;
};

/**
 * 404 — Document 06 §8.
 * Centred recovery content; Header/Footer come from the root layout.
 */
export function NotFound({
  homeHref = "/",
  domesticHref = "/domestic",
  internationalHref = "/international",
  className,
}: NotFoundProps) {
  return (
    <div
      className={cn(
        "px-container py-section mx-auto flex max-w-prose flex-col items-center gap-6 text-center",
        className,
      )}
    >
      <p className="text-caption text-muted font-medium tracking-wide uppercase">404</p>
      <h1 className="text-h2 text-foreground font-bold">Page not found</h1>
      <p className="text-body-lg text-copy">
        We couldn&apos;t find that page. You can return home or browse our tours.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <PrimaryCTA href={homeHref}>Return to Homepage</PrimaryCTA>
        <SecondaryCTA href={domesticHref}>Domestic Tours</SecondaryCTA>
        <SecondaryCTA href={internationalHref}>International Tours</SecondaryCTA>
      </div>
    </div>
  );
}
