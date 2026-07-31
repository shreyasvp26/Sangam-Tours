import { Mail, Phone } from "lucide-react";
import type { ReactNode } from "react";

import {
  cardInteractiveClass,
  cardPaddingClass,
  cardSurfaceClass,
} from "@/components/cards/card-shared";
import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type ContactCardChannel = "call" | "whatsapp" | "email";

export type ContactCardProps = ClassNameProps & {
  channel: ContactCardChannel;
  /** Visible contact detail (phone number or email) — never hidden behind another tap. */
  detail: string;
  /** Action URL: tel:, wa.me, or mailto:. */
  href: string;
  /** Override default channel label (Call / WhatsApp / Email). */
  label?: string;
};

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.86 11.86 0 0 0 5.76 1.47h.01c6.55 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44ZM12.07 21.15h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.74.98 1-3.64-.24-.37a9.8 9.8 0 0 1-1.5-5.24c0-5.42 4.41-9.83 9.84-9.83a9.8 9.8 0 0 1 9.83 9.84c0 5.42-4.41 9.84-9.82 9.84Zm5.4-7.37c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

const CHANNEL_META: Record<
  ContactCardChannel,
  { label: string; icon: ReactNode; external?: boolean }
> = {
  call: { label: "Call", icon: <Phone className="size-5" strokeWidth={1.75} /> },
  whatsapp: {
    label: "WhatsApp",
    icon: <WhatsAppGlyph className="size-5" />,
    external: true,
  },
  email: { label: "Email", icon: <Mail className="size-5" strokeWidth={1.75} /> },
};

/**
 * Contact Card — Document 06 §5.
 * Equal visual weight for Call / WhatsApp / Email variants.
 * Distinct from CTA Cluster lead emphasis (Document 06 §4).
 */
export function ContactCard({ channel, detail, href, label, className }: ContactCardProps) {
  const meta = CHANNEL_META[channel];
  const channelLabel = label ?? meta.label;

  return (
    <a
      href={href}
      className={cn(
        "flex flex-col gap-3",
        cardSurfaceClass,
        cardPaddingClass,
        cardInteractiveClass,
        className,
      )}
      {...(meta.external ? { target: "_blank", rel: "noopener noreferrer" } : undefined)}
    >
      <span
        className="bg-section-tint text-navy inline-flex size-11 items-center justify-center rounded-sm"
        aria-hidden="true"
      >
        {meta.icon}
      </span>
      <span className="text-h4 text-foreground font-semibold">{channelLabel}</span>
      <span className="text-body text-copy">{detail}</span>
      {meta.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
