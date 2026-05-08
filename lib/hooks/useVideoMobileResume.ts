"use client";

import { useEffect, type RefObject } from "react";

/**
 * Mandatory pattern for any HTML5 <video autoPlay loop muted playsInline> background.
 *
 * Mobile browsers (iOS Safari, Android Chrome) pause background videos when the
 * tab loses visibility (app switch, screen lock, tab switcher) and often DO NOT
 * auto-resume on return — the video sits frozen on the last frame. iOS additionally
 * enters a "paused === false but decoder frozen" state where plain play() does nothing.
 *
 * This hook wires:
 * - visibilitychange listener that retries play() up to 3 times with backoff
 * - watchdog that detects decoder-frozen state by sampling currentTime, and force-reloads
 *   + replays from where we were if frozen
 *
 * Source: ~/.claude/skills/html5-video-mobile-resume/SKILL.md
 */
export function useVideoMobileResume(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const video = videoRef.current;
    if (!video) return;

    let timers: number[] = [];
    let wasHidden = document.hidden;

    function tryPlay(attempt = 0) {
      if (!video || document.hidden || !video.paused) return;
      video.muted = true;
      video.play().catch(() => {
        if (attempt < 3) {
          timers.push(
            window.setTimeout(() => tryPlay(attempt + 1), 200 * (attempt + 1))
          );
        }
      });
    }

    function watchdog() {
      if (!video || document.hidden) return;
      const startCt = video.currentTime;
      timers.push(
        window.setTimeout(() => {
          if (!video || document.hidden) return;
          const stuck =
            video.paused ||
            (Math.abs(video.currentTime - startCt) < 0.01 && !video.ended);
          if (stuck) {
            const resumeAt = video.currentTime;
            try {
              video.load();
              video.currentTime = resumeAt;
            } catch {
              // ignore
            }
            video.muted = true;
            video.play().catch(() => {});
          }
        }, 800)
      );
    }

    function onVisibilityChange() {
      if (!video) return;
      const isHidden = document.hidden;
      if (!wasHidden || isHidden) {
        wasHidden = isHidden;
        return;
      }
      wasHidden = isHidden;
      if (video.paused && !video.ended) tryPlay();
      watchdog();
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      timers.forEach(window.clearTimeout);
    };
  }, [videoRef]);
}
