"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  threshold?: number;
};

/**
 * IntersectionObserver-based reveal: opacity 0->1 + translateY + blur.
 * Respects prefers-reduced-motion (visible immediately).
 * Plan §2 motion design system.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  threshold = 0.15,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={cn(shown ? "reveal-show" : "reveal-init", className)}
    >
      {children}
    </Tag>
  );
}
