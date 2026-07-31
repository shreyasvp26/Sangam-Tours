import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type QuickFactsProps = ClassNameProps & {
  duration: string;
  /** Destinations covered — short list or comma-separated display string. */
  destinationsCovered: string;
  groupType: string;
  departureCity: string;
};

const FACTS = [
  { key: "duration", label: "Duration" },
  { key: "destinationsCovered", label: "Destinations" },
  { key: "groupType", label: "Group type" },
  { key: "departureCity", label: "Departure city" },
] as const;

/**
 * Quick Facts — Document 06 §7.
 * Structured strip/grid only — never prose. Package Detail, below Price.
 */
export function QuickFacts({
  duration,
  destinationsCovered,
  groupType,
  departureCity,
  className,
}: QuickFactsProps) {
  const values = { duration, destinationsCovered, groupType, departureCity };

  return (
    <dl
      className={cn(
        "bg-section-tint grid grid-cols-2 gap-4 rounded-lg p-4 md:grid-cols-4 md:gap-6",
        className,
      )}
    >
      {FACTS.map(({ key, label }) => (
        <div key={key} className="flex min-w-0 flex-col gap-1">
          <dt className="text-caption text-muted font-medium tracking-wide uppercase">{label}</dt>
          <dd className="text-body text-foreground font-medium">{values[key]}</dd>
        </div>
      ))}
    </dl>
  );
}
