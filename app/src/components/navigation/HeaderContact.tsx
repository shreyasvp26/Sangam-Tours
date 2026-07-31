import { CallButton, WhatsAppButton } from "@/components/cta";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

type HeaderContactProps = ClassNameProps;

/**
 * Always-visible phone and WhatsApp controls for the Header.
 * Composes Document 06 Call Button / WhatsApp Button icon forms.
 */
export function HeaderContact({ className }: HeaderContactProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <CallButton appearance="icon" onDark />
      <WhatsAppButton appearance="icon" onDark />
    </div>
  );
}
