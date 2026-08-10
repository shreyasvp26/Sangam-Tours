import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/layout";
import { Logo } from "@/components/media";
import { footerLinkColumns } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

const columnTitleClass = cn(
  "text-caption mb-3 font-medium tracking-wide text-on-dark/70 uppercase",
);

const navLinkClass = cn(
  "text-body text-on-dark/70 ease-standard inline-flex items-center py-0.5 leading-snug",
  "transition-colors duration-[var(--sangam-duration-fast)]",
  "hover:text-on-dark",
  "focus-visible:shadow-[var(--sangam-focus-ring-on-dark)] focus-visible:outline-none",
);

const contactLinkClass = cn(
  "ease-standard inline-flex items-center gap-2.5 py-0.5 leading-snug text-on-dark",
  "transition-colors duration-[var(--sangam-duration-fast)] hover:text-accent",
  "focus-visible:shadow-[var(--sangam-focus-ring-on-dark)] focus-visible:outline-none",
);

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.86 11.86 0 0 0 5.76 1.47h.01c6.55 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44ZM12.07 21.15h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.74.98 1-3.64-.24-.37a9.8 9.8 0 0 1-1.5-5.24c0-5.42 4.41-9.83 9.84-9.83a9.8 9.8 0 0 1 9.83 9.84c0 5.42-4.41 9.84-9.82 9.84Zm5.4-7.37c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

function ContactIcon({ children }: { children: ReactNode }) {
  return (
    <span
      className="text-on-dark/55 inline-flex size-5 shrink-0 items-center justify-center"
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

/**
 * Site Footer — Document 06 Footer + Document 03 §4.3.
 * Four fixed groups: Explore, Company, Legal (row 1), Reach Us (row 2).
 * Reach Us: channels left, office address + hours right.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-on-dark">
      <Container className="pt-8 pb-7 md:pt-10 md:pb-8">
        {/* Row 1 — Explore, Company, Legal across full width */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
          {footerLinkColumns.map((column) => (
            <nav key={column.title} aria-labelledby={`footer-${column.title.toLowerCase()}`}>
              <h2 id={`footer-${column.title.toLowerCase()}`} className={columnTitleClass}>
                {column.title}
              </h2>
              <ul className="flex flex-col gap-0.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={navLinkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Row 2 — Reach Us; office aligns with Legal column */}
        <div className="mt-8 md:mt-10" aria-labelledby="footer-reach-us">
          <h2 id="footer-reach-us" className={columnTitleClass}>
            Reach Us
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:items-start">
            <ul className="flex flex-col gap-0.5">
              {siteConfig.phones.map((phone) => (
                <li key={phone.href}>
                  <Link
                    href={phone.href}
                    className={cn(contactLinkClass, "text-body font-medium")}
                  >
                    <ContactIcon>
                      <Phone className="size-4" strokeWidth={1.75} />
                    </ContactIcon>
                    {phone.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={siteConfig.primaryPhone.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(contactLinkClass, "text-body font-medium")}
                >
                  <ContactIcon>
                    <WhatsAppGlyph className="size-4" />
                  </ContactIcon>
                  WhatsApp Us
                  <span className="sr-only"> (opens in a new tab)</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className={cn(contactLinkClass, "text-body")}
                >
                  <ContactIcon>
                    <Mail className="size-4" strokeWidth={1.75} />
                  </ContactIcon>
                  {siteConfig.email}
                </Link>
              </li>
            </ul>

            <div className="hidden lg:block" aria-hidden="true" />

            <div>
              <address className="text-body text-on-dark/65 block not-italic leading-snug">
                <span className="text-on-dark/85 font-medium">{siteConfig.offices.nagpur.name}</span>
                {siteConfig.offices.nagpur.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between md:mt-10">
          <Logo href="/" variant="full" onDark compact />
          <p className="text-caption text-on-dark/65">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
