import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type StatisticItem = {
  /** Large numeral or figure (factual only — Document 06 §7). */
  value: string;
  label: string;
};

export type StatisticsBlockProps = ClassNameProps & {
  items: StatisticItem[];
};

/**
 * Statistics Block — Document 06 §7.
 * Factual achievement figures only; never invent or estimate at the call site.
 */
export function StatisticsBlock({ items, className }: StatisticsBlockProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <dl className={cn("grid grid-cols-2 gap-6 sm:grid-cols-3 md:gap-8", className)}>
      {items.map((item) => (
        <div key={`${item.value}-${item.label}`} className="flex flex-col gap-1 text-center">
          <dt className="text-caption text-muted order-2 font-medium">{item.label}</dt>
          <dd className="text-h2 text-foreground order-1 font-bold tracking-tight">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
