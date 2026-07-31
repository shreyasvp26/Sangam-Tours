import type { Metadata } from "next";

import { Footer, Header } from "@/components/navigation";
import { JsonLdScript } from "@/components/seo";
import { getSiteBaseUrl, siteConfig } from "@/config/site";
import { fontLogo, fontSans } from "@/lib/fonts";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteBaseUrl()),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Group tours with a dedicated Tour Manager — transparent pricing and care since 1979.",
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontLogo.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <JsonLdScript data={[organizationJsonLd(), websiteJsonLd()]} />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
