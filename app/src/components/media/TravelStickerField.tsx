import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

type StickerSpec = {
  id: string;
  top: string;
  left?: string;
  right?: string;
  size: string;
  rotate: string;
  motif: "plane" | "pin" | "suitcase" | "compass" | "mountain" | "ticket" | "camera";
  palette: "navy" | "royal" | "mint" | "sky" | "sand";
};

const stickers: readonly StickerSpec[] = [
  {
    id: "plane-tl",
    top: "6%",
    left: "1.5%",
    size: "4.5rem",
    rotate: "-16deg",
    motif: "plane",
    palette: "sky",
  },
  {
    id: "pin-tr",
    top: "10%",
    right: "2%",
    size: "4rem",
    rotate: "14deg",
    motif: "pin",
    palette: "mint",
  },
  {
    id: "suitcase-ml",
    top: "40%",
    left: "0.5%",
    size: "4.25rem",
    rotate: "-10deg",
    motif: "suitcase",
    palette: "navy",
  },
  {
    id: "compass-mr",
    top: "36%",
    right: "1%",
    size: "4.75rem",
    rotate: "18deg",
    motif: "compass",
    palette: "royal",
  },
  {
    id: "mountain-bl",
    top: "70%",
    left: "3%",
    size: "5rem",
    rotate: "-8deg",
    motif: "mountain",
    palette: "sand",
  },
  {
    id: "ticket-br",
    top: "66%",
    right: "2.5%",
    size: "4.5rem",
    rotate: "12deg",
    motif: "ticket",
    palette: "mint",
  },
  {
    id: "camera-tm",
    top: "4%",
    left: "46%",
    size: "3.75rem",
    rotate: "-12deg",
    motif: "camera",
    palette: "royal",
  },
  {
    id: "plane-bm",
    top: "86%",
    left: "40%",
    size: "4rem",
    rotate: "20deg",
    motif: "plane",
    palette: "sky",
  },
] as const;

/** Soft brand-tinted stamp plates — lively without rainbow clutter. */
const paletteClass: Record<StickerSpec["palette"], string> = {
  navy: "text-navy border-navy/40 bg-[#dbe4f5]",
  royal: "text-royal border-royal/40 bg-[#e4e6fb]",
  mint: "text-navy border-[#6fa832]/50 bg-[#e8f5d4]",
  sky: "text-royal border-[#4a7ec8]/45 bg-[#d9ebfb]",
  sand: "text-navy border-[#c4a574]/45 bg-[#f5ebd8]",
};

function Motif({ kind }: { kind: StickerSpec["motif"] }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (kind) {
    case "plane":
      return (
        <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
          <path {...common} d="M6 28 L42 16 L34 30 L28 44 L22 30 L6 28 Z M22 30 L34 30" />
        </svg>
      );
    case "pin":
      return (
        <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
          <path
            {...common}
            d="M24 6 C16 6 10 12.5 10 20.5 C10 30 24 42 24 42 C24 42 38 30 38 20.5 C38 12.5 32 6 24 6 Z"
          />
          <circle {...common} cx="24" cy="20" r="4.5" />
        </svg>
      );
    case "suitcase":
      return (
        <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
          <rect {...common} x="8" y="16" width="32" height="24" rx="3" />
          <path {...common} d="M18 16 V12 C18 9.8 19.8 8 22 8 H26 C28.2 8 30 9.8 30 12 V16" />
          <path {...common} d="M8 26 H40" />
        </svg>
      );
    case "compass":
      return (
        <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
          <circle {...common} cx="24" cy="24" r="16" />
          <path {...common} d="M24 10 V14 M24 34 V38 M10 24 H14 M34 24 H38" />
          <path {...common} d="M20 28 L28 16 L24 24 L16 28 Z" />
        </svg>
      );
    case "mountain":
      return (
        <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
          <path {...common} d="M4 36 L18 14 L26 26 L32 18 L44 36 Z" />
          <path {...common} d="M16 18 L20 14 L24 20" />
        </svg>
      );
    case "ticket":
      return (
        <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
          <path
            {...common}
            d="M8 16 H32 C32 16 36 16 36 20 C36 24 40 24 40 28 C40 32 36 32 36 36 H8 C8 36 12 32 12 28 C12 24 8 24 8 20 C8 16 8 16 8 16 Z"
          />
          <path {...common} d="M20 18 V34" strokeDasharray="2 3" />
        </svg>
      );
    case "camera":
      return (
        <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
          <rect {...common} x="6" y="14" width="36" height="24" rx="4" />
          <path {...common} d="M16 14 L18 10 H30 L32 14" />
          <circle {...common} cx="24" cy="26" r="7" />
        </svg>
      );
  }
}

export type TravelStickerFieldProps = ClassNameProps & {
  /** Fewer motifs for compact sections. */
  density?: "default" | "sparse";
};

/**
 * Colourful travel-motif sticker field for light homepage sections.
 * Soft brand-tinted plates — decorative only, never competes with CTAs.
 */
export function TravelStickerField({ density = "default", className }: TravelStickerFieldProps) {
  const items = density === "sparse" ? stickers.filter((_, index) => index % 2 === 0) : stickers;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div className="absolute -top-10 -right-8 size-72 rounded-full bg-[radial-gradient(circle,rgb(145_196_77_/_0.14),transparent_70%)]" />
      <div className="absolute -bottom-14 -left-10 size-80 rounded-full bg-[radial-gradient(circle,rgb(46_49_144_/_0.12),transparent_70%)]" />
      <div className="absolute top-1/3 left-1/2 size-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(74_126_200_/_0.08),transparent_70%)]" />
      {items.map((sticker, index) => (
        <span
          key={sticker.id}
          className={cn(
            "absolute inline-flex opacity-70 md:opacity-80",
            index % 2 === 1 && "hidden sm:inline-flex",
          )}
          style={{
            top: sticker.top,
            left: sticker.left,
            right: sticker.right,
            width: sticker.size,
            height: sticker.size,
            transform: `rotate(${sticker.rotate})`,
          }}
        >
          <span
            className={cn(
              "inline-flex size-full items-center justify-center rounded-xl border-2 border-dashed p-2 shadow-[0_8px_18px_rgb(9_35_92_/_0.12)]",
              paletteClass[sticker.palette],
            )}
          >
            <Motif kind={sticker.motif} />
          </span>
        </span>
      ))}
    </div>
  );
}
