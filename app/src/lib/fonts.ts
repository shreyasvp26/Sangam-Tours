import { Bebas_Neue, Poppins } from "next/font/google";

/**
 * Primary website typeface (Document 05 §5.1).
 * Weights limited to Regular (400), Medium (500), Bold (700).
 */
export const fontSans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

/**
 * Logo / wordmark only (Document 05 §5.1).
 * Do not use for website body, headings, or UI text.
 */
export const fontLogo = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});
