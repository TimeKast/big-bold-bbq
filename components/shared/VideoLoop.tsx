"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  /**
   * Decorative inside an interactive parent (e.g. a <Link> tile). When true, the
   * <video> is aria-hidden with no label — the parent provides the accessible name.
   */
  decorative?: boolean;
  /**
   * Pause playback while off-screen (IntersectionObserver). Saves decode/battery
   * when several loops live on one page (e.g. the menu). Default false (hero/CTA
   * should always play).
   */
  playWhenVisible?: boolean;
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
  decorative = false,
  playWhenVisible = false,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // Tracks viewport intersection so the mobile-resume hook doesn't override a
  // deliberate off-screen pause from playWhenVisible.
  const onScreenRef = useRef(true);
  const shouldResume = useCallback(() => onScreenRef.current, []);
  useVideoMobileResume(videoRef, shouldResume);

  useEffect(() => {
    if (posterOnly) return;

    const video = videoRef.current;
    if (!video) return;

    // Re-assert the autoplay contract in the DOM. Some mobile browsers and
    // React hydration paths are stricter about properties than JSX attributes.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.controls = false;

    const play = () => {
      if (onScreenRef.current) {
        video.play().catch(() => {});
      }
    };
    const markPlaying = () => setIsPlaying(true);
    const markStopped = () => setIsPlaying(false);

    video.addEventListener("playing", markPlaying);
    video.addEventListener("pause", markStopped);
    video.addEventListener("emptied", markStopped);

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      play();
    } else {
      video.addEventListener("loadeddata", play, { once: true });
      video.addEventListener("canplay", play, { once: true });
    }

    return () => {
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
      video.removeEventListener("playing", markPlaying);
      video.removeEventListener("pause", markStopped);
      video.removeEventListener("emptied", markStopped);
    };
  }, [posterOnly, src, srcMobile]);

  // Pause when scrolled off-screen (perf for multi-video pages like /menu).
  useEffect(() => {
    if (!playWhenVisible || posterOnly) return;
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          onScreenRef.current = e.isIntersecting;
          if (e.isIntersecting) video.play().catch(() => {});
          else video.pause();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(video);
    return () => {
      io.disconnect();
      onScreenRef.current = true;
    };
  }, [playWhenVisible, posterOnly]);

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
      // Skip computation while paused/off-screen — currentTime is frozen so the
      // overlay opacity wouldn't change anyway (saves cycles on multi-loop pages).
      if (video.paused) {
        raf = requestAnimationFrame(tick);
        return;
      }
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
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700",
            visible ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}

      {!posterOnly && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
          aria-label={decorative ? undefined : ariaLabel}
          aria-hidden={decorative || undefined}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
            visible && isPlaying ? "opacity-100" : "opacity-0",
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
