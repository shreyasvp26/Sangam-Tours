import type { ContactOffice } from "@/domain";
import type { DropdownOption } from "@/components/forms/Dropdown";
import { contactPageCopy } from "@/content/contact";
import { siteConfig } from "@/config/site";
import { getPublicCatalog } from "@/services/public-catalog";

export type ContactChannel = {
  channel: "call" | "whatsapp" | "email";
  detail: string;
  href: string;
};

export type ContactPageData = {
  copy: typeof contactPageCopy;
  channels: ContactChannel[];
  offices: ContactOffice[];
  packageOptions: DropdownOption[];
};

function officesFromSiteConfig(): ContactOffice[] {
  return [
    {
      id: "office-nagpur",
      officeName: siteConfig.offices.nagpur.name,
      addressLines: [...siteConfig.offices.nagpur.addressLines],
      addressStatus: siteConfig.offices.nagpur.status,
      phoneNumbers: siteConfig.phones.map((phone) => phone.label),
      email: siteConfig.email,
      businessHours: { ...siteConfig.businessHours },
      googleMapsUrl: siteConfig.offices.nagpur.googleMapsEmbedUrl,
    },
    {
      id: "office-akola",
      officeName: siteConfig.offices.akola.name,
      addressLines: [...siteConfig.offices.akola.addressLines],
      addressStatus: siteConfig.offices.akola.status,
      phoneNumbers: siteConfig.phones.map((phone) => phone.label),
      email: siteConfig.email,
      businessHours: { ...siteConfig.businessHours },
      googleMapsUrl: siteConfig.offices.akola.googleMapsEmbedUrl,
    },
  ];
}

/**
 * Assemble Contact page data — Document 04 §10 / 08 §4.10 / 09 Contact.
 * Prefers catalog offices; falls back to confirmed siteConfig facts (never invents addresses).
 */
export async function getContactPageData(): Promise<ContactPageData> {
  const catalog = getPublicCatalog();

  const [officesResult, packagesResult] = await Promise.all([
    catalog.contact.listOffices(),
    catalog.packages.listPublished({}, { pageSize: 50 }),
  ]);

  const offices =
    officesResult.ok && officesResult.data.length > 0
      ? officesResult.data
      : officesFromSiteConfig();

  const packageOptions: DropdownOption[] = packagesResult.ok
    ? packagesResult.data.items.map((pkg) => ({ value: pkg.id, label: pkg.name }))
    : [];

  return {
    copy: contactPageCopy,
    channels: [
      {
        channel: "call",
        detail: siteConfig.primaryPhone.label,
        href: siteConfig.primaryPhone.telHref,
      },
      {
        channel: "whatsapp",
        detail: siteConfig.primaryPhone.label,
        href: siteConfig.primaryPhone.whatsappHref,
      },
      {
        channel: "email",
        detail: siteConfig.email,
        href: `mailto:${siteConfig.email}`,
      },
    ],
    offices,
    packageOptions,
  };
}
