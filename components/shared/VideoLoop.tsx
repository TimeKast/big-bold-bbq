"use client";

import { useRef } from "react";
import { useVideoMobileResume } from "@/lib/hooks/useVideoMobileResume";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  srcMobile?: string;
  poster: string;
  className?: string;
  videoClassName?: string;
  ariaLabel: string;
  /** When true, video plays full opacity. Use false for ambient-overlay use cases. */
  visible?: boolean;
  /** Render only poster image, no video — for reduced-motion or perf-constrained pages. */
  posterOnly?: boolean;
};

/**
 * Auto-playing background video loop with mobile-resume bug fix.
 * Always: muted, loop, playsInline. Poster used as LCP candidate.
 *
 * For scroll-scrubbed video (different pattern), use ScrubbedVideo from
 * the scroll-scrubbed-video skill instead.
 */
export function VideoLoop({
  src,
  srcMobile,
  poster,
  className,
  videoClassName,
  ariaLabel,
  visible = true,
  posterOnly = false,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  useVideoMobileResume(ref);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!posterOnly && (
        <video
          ref={ref}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={ariaLabel}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
            visible ? "opacity-100" : "opacity-0",
            videoClassName
          )}
        >
          {srcMobile && <source src={srcMobile} type="video/mp4" media="(max-width: 768px)" />}
          <source src={src} type="video/mp4" />
        </video>
      )}
      {/* Poster fallback shown when JS disabled / reduced motion / posterOnly */}
      {posterOnly && (
        <div
          aria-label={ariaLabel}
          role="img"
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}
    </div>
  );
}
