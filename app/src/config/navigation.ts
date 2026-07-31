/**
 * Fixed navigation structure — Document 03 §4.1–§4.3, Document 08 §4.13–§4.14.
 * Structural configuration only; not CMS-editable content.
 */

export type NavItem = {
  label: string;
  href: string;
};

/** Primary header navigation — exactly six items, fixed order. */
export const primaryNav: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Domestic Tours", href: "/domestic" },
  { label: "International Tours", href: "/international" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Drawer-only items — Document 03 §4.1 / §4.5. */
export const drawerOnlyNav: readonly NavItem[] = [
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
];

/** Full mobile drawer set: primary six + Testimonials + FAQ. */
export const mobileDrawerNav: readonly NavItem[] = [...primaryNav, ...drawerOnlyNav];

export type FooterLinkColumn = {
  title: "Explore" | "Company" | "Legal";
  links: readonly NavItem[];
};

export const footerLinkColumns: readonly FooterLinkColumn[] = [
  {
    title: "Explore",
    links: [
      { label: "Domestic Tours", href: "/domestic" },
      { label: "International Tours", href: "/international" },
      { label: "Gallery", href: "/gallery" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Cancellation & Refund Policy", href: "/cancellation-and-refund-policy" },
    ],
  },
];
