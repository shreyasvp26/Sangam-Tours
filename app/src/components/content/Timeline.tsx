import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type TimelineMilestone = {
  year: string;
  description: string;
};

export type TimelineProps = ClassNameProps & {
  milestones: TimelineMilestone[];
};

/**
 * Timeline — Document 06 §7.
 * Horizontal on desktop, vertical on mobile. About page only.
 */
export function Timeline({ milestones, className }: TimelineProps) {
  if (milestones.length === 0) {
    return null;
  }

  return (
    <ol className={cn("flex flex-col gap-0 md:flex-row md:gap-0", className)}>
      {milestones.map((milestone, index) => {
        const isLast = index === milestones.length - 1;

        return (
          <li
            key={`${milestone.year}-${index}`}
            className={cn(
              "relative flex gap-4 md:flex-1 md:flex-col md:gap-3 md:px-2",
              !isLast && "pb-8 md:pb-0",
            )}
          >
            {/* Vertical rail (mobile) / horizontal rail (desktop) */}
            <div className="flex flex-col items-center md:w-full md:flex-row md:items-center">
              <span
                className="bg-accent border-navy relative z-10 size-3 shrink-0 rounded-full border-2"
                aria-hidden="true"
              />
              {!isLast ? (
                <span
                  className="w-px flex-1 bg-neutral-200 md:h-px md:w-full md:flex-none"
                  aria-hidden="true"
                />
              ) : null}
            </div>
            <div className="min-w-0 pb-1 md:pb-0">
              <p className="text-h4 text-foreground font-bold">{milestone.year}</p>
              <p className="text-body text-copy mt-1">{milestone.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
