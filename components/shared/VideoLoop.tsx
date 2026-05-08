"use client";

import { useEffect, useRef } from "react";
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
  /**
   * Disguise the loop cut by fading to a solid color near the boundary of the loop
   * (last N ms of each cycle + first N ms of the next). Set 0 to disable.
   * Default 500ms, color charcoal (matches site dark surfaces).
   */
  loopFadeMs?: number;
  loopFadeColor?: string;
};

/**
 * Auto-playing background video loop with two stitched-in fixes:
 *
 * 1) `useVideoMobileResume` — restarts the decoder on iOS Safari + Android Chrome
 *    when the tab regains visibility (otherwise the video stays frozen).
 * 2) Loop-boundary fade — the HTML5 `loop` attribute jumps `currentTime` from
 *    duration → 0 instantly, which produces a visible cut at the seam. We detect
 *    the boundary window via requestAnimationFrame and pulse a same-color overlay
 *    so the seam dissolves rather than snaps. Disabled under reduced-motion.
 *
 * For scroll-scrubbed video (different pattern, scroll drives currentTime), use the
 * ScrubbedVideo component from the scroll-scrubbed-video skill instead.
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
  loopFadeMs = 500,
  loopFadeColor = "var(--color-charcoal)",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  useVideoMobileResume(videoRef);

  useEffect(() => {
    if (posterOnly || loopFadeMs <= 0) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const video = videoRef.current;
    const overlay = overlayRef.current;
    if (!video || !overlay) return;

    const fadeS = loopFadeMs / 1000;
    let raf = 0;

    const tick = () => {
      const dur = video.duration;
      if (dur > 0) {
        const remaining = dur - video.currentTime;
        const elapsed = video.currentTime;
        let opacity = 0;
        if (remaining < fadeS) {
          // tail end of loop — fade up
          opacity = 1 - remaining / fadeS;
        } else if (elapsed < fadeS) {
          // start of next loop — fade down
          opacity = 1 - elapsed / fadeS;
        }
        // soften the curve so the seam is even less perceptible
        overlay.style.opacity = String(Math.pow(opacity, 1.3));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loopFadeMs, posterOnly]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!posterOnly && (
        <video
          ref={videoRef}
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

      {!posterOnly && loopFadeMs > 0 && (
        <div
          ref={overlayRef}
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: loopFadeColor, opacity: 0, willChange: "opacity" }}
        />
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
