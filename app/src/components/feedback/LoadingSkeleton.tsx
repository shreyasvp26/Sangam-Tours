import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type LoadingSkeletonVariant = "package" | "gallery" | "testimonial" | "block";

export type LoadingSkeletonProps = ClassNameProps & {
  /**
   * Structural shape matching eventual content (Document 06 §8).
   * package — image + two text lines (Package Card / grid).
   * gallery — image tile.
   * testimonial — quote + attribution lines.
   * block — generic rectangular placeholder.
   */
  variant?: LoadingSkeletonVariant;
  /** Repeat count for grid/list placeholders. */
  count?: number;
  /** Accessible loading label. */
  label?: string;
};

const pulse = "animate-pulse bg-neutral-200 motion-reduce:animate-none";

function PackageSkeleton({ className }: ClassNameProps) {
  return (
    <div
      className={cn("bg-surface overflow-hidden rounded-lg border border-neutral-200", className)}
    >
      <div className={cn("aspect-[4/3] w-full", pulse)} />
      <div className="flex flex-col gap-3 p-5">
        <div className={cn("h-5 w-3/4 rounded-sm", pulse)} />
        <div className={cn("h-4 w-1/2 rounded-sm", pulse)} />
        <div className={cn("h-4 w-2/3 rounded-sm", pulse)} />
      </div>
    </div>
  );
}

function GallerySkeleton({ className }: ClassNameProps) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-neutral-200", className)}>
      <div className={cn("aspect-[4/3] w-full", pulse)} />
    </div>
  );
}

function TestimonialSkeleton({ className }: ClassNameProps) {
  return (
    <div
      className={cn(
        "bg-surface flex flex-col gap-4 rounded-lg border border-neutral-200 p-5",
        className,
      )}
    >
      <div className={cn("h-4 w-full rounded-sm", pulse)} />
      <div className={cn("h-4 w-5/6 rounded-sm", pulse)} />
      <div className={cn("h-4 w-2/3 rounded-sm", pulse)} />
      <div className={cn("mt-2 h-4 w-1/3 rounded-sm", pulse)} />
    </div>
  );
}

function BlockSkeleton({ className }: ClassNameProps) {
  return <div className={cn("h-24 w-full rounded-lg", pulse, className)} />;
}

/**
 * Loading Skeleton — Document 06 §8.
 * Structural placeholders for Package Grid, Gallery, and Testimonials.
 */
export function LoadingSkeleton({
  variant = "block",
  count = 1,
  label = "Loading content",
  className,
}: LoadingSkeletonProps) {
  const items = Array.from({ length: Math.max(1, count) }, (_, index) => index);

  const renderOne = (key: number) => {
    switch (variant) {
      case "package":
        return <PackageSkeleton key={key} />;
      case "gallery":
        return <GallerySkeleton key={key} />;
      case "testimonial":
        return <TestimonialSkeleton key={key} />;
      default:
        return <BlockSkeleton key={key} />;
    }
  };

  return (
    <div
      className={cn(
        count > 1 && (variant === "package" || variant === "gallery" || variant === "testimonial")
          ? "gap-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : undefined,
        className,
      )}
      role="status"
      aria-busy="true"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      {items.map(renderOne)}
    </div>
  );
}
