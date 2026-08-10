/**
 * Display helpers for price — formatting only; never invents amounts.
 * Currency context is INR today (Document 08 §10).
 */

export function formatInrAmount(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

const DEFAULT_PRICE_QUALIFIER = "+ GST";

export function formatPriceDisplay(amount: number, qualifiers?: string): string {
  const base = formatInrAmount(amount);
  const suffix = qualifiers?.trim() || DEFAULT_PRICE_QUALIFIER;
  return `${base} ${suffix}`;
}
