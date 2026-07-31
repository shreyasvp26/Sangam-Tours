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

export function formatPriceDisplay(amount: number, qualifiers?: string): string {
  const base = formatInrAmount(amount);
  if (!qualifiers?.trim()) {
    return base;
  }
  return `${base} ${qualifiers.trim()}`;
}
