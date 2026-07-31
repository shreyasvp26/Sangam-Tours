/**
 * Canonical company / contact facts for chrome (Header, Footer).
 * Source: Website requirements.pdf + Document 01 (Nagpur address, Since 1979).
 * Akola address pending confirmation — never fabricate (Document 01 §17 rule 12).
 */

import { getAppEnv } from "@/config/env";

export const siteConfig = {
  name: "Sangam Tours",
  foundingYear: 1979,
  sinceLabel: "Since 1979",
  domain: "www.sangamtours.com",
  email: "info@sangamtours.com",
  phones: [
    { label: "+91 8983365332", href: "tel:+918983365332" },
    { label: "+91 8856998734", href: "tel:+918856998734" },
  ],
  /** Primary number used for header Call and WhatsApp until a dedicated WA number is documented. */
  primaryPhone: {
    label: "+91 8983365332",
    telHref: "tel:+918983365332",
    whatsappHref: "https://wa.me/918983365332",
  },
  businessHours: {
    days: "Monday – Saturday",
    time: "10:00 AM – 7:00 PM",
  },
  offices: {
    nagpur: {
      name: "Nagpur Office",
      addressLines: [
        "Shop No. 4, Yashodhara Apartment",
        "Chhoti Dhantoli",
        "Opp. Yashwant Stadium",
        "Nagpur – 440012",
      ],
      status: "confirmed" as const,
    },
    akola: {
      name: "Akola Office",
      addressLines: ["Address to be confirmed"],
      status: "pending" as const,
    },
  },
} as const;

/**
 * Absolute site origin for canonicals, sitemap, and Open Graph (Document 08 §4.15).
 * Override with NEXT_PUBLIC_SITE_URL (validated in `@/config/env`).
 */
export function getSiteBaseUrl(): string {
  const { siteUrl } = getAppEnv();
  if (siteUrl) {
    return siteUrl;
  }
  return `https://${siteConfig.domain}`;
}
