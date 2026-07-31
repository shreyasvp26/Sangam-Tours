import { SecondaryCTA, type ButtonCTAProps } from "@/components/cta/cta-shared";
import { CTA_LABELS } from "@/components/cta/labels";

type ViewPackageButtonProps = Omit<ButtonCTAProps, "children" | "href" | "external"> & {
  /** Package Detail URL — Document 03 §9 `/packages/{slug}`. */
  href: string;
};

/**
 * View Package Button — Document 06 §4.
 * Sole CTA on Package Cards; never paired with Book Now / WhatsApp Us / Call Now on the card.
 */
export function ViewPackageButton({ href, ...props }: ViewPackageButtonProps) {
  return (
    <SecondaryCTA href={href} {...props}>
      {CTA_LABELS.viewPackage}
    </SecondaryCTA>
  );
}
