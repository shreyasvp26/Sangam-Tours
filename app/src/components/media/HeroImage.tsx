import Image from "next/image";

import { cn } from "@/lib/cn";
import type { ClassNameProps } from "@/types";

export type HeroImageProps = ClassNameProps & {
  src: string;
  alt: string;
  priority?: boolean;
  /**
   * Optional short video. Never autoplays — visitor must start playback
   * (aligned with Document 06 §9 Video Card / bandwidth guidance).
   * `src` is used as the poster frame.
   */
  videoSrc?: string;
};

/**
 * Hero Image — Document 06 §9.
 * Primary visual for Homepage and Package Detail heroes. Real photography only.
 */
export function HeroImage({ src, alt, priority = false, videoSrc, className }: HeroImageProps) {
  if (videoSrc) {
    return (
      <div
        className={cn(
          "bg-section relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]",
          className,
        )}
      >
        <video
          className="size-full object-cover"
          poster={src}
          controls
          playsInline
          preload="metadata"
          aria-label={alt}
        >
          <source src={videoSrc} />
        </video>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-section relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={priority ? 85 : 75}
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}
