"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Sticky bottom bar — primary mobile lead-gen surface.
 * Visible from 5% scroll. Hides on scroll-down, reveals on scroll-up.
 * Hidden on /request-a-quote (the form itself is the CTA).
 */
export function StickyCallBar({ hidden = false }: { hidden?: boolean }) {
  const [visible, setVisible] = useState(false);
  const [showing, setShowing] = useState(true);

  useEffect(() => {
    if (hidden) return;
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      setVisible(y > docHeight * 0.05);
      // Show on scroll up, hide on scroll down (but always show in first 200px)
      if (y < 200) setShowing(true);
      else if (y > lastScrollY + 5) setShowing(false);
      else if (y < lastScrollY - 5) setShowing(true);
      lastScrollY = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hidden]);

  if (hidden) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 lg:hidden safe-pb transition-transform duration-300",
        visible && showing ? "translate-y-0" : "translate-y-full"
      )}
      role="region"
      aria-label="Quick contact"
    >
      <div className="grid grid-cols-2 gap-px bg-charcoal">
        <a
          href={site.phone.href}
          className="flex items-center justify-center gap-2 bg-firebrick text-parchment py-4 font-semibold transition-colors hover:bg-charcoal hover:text-warmgold"
          data-source="sticky"
        >
          <Phone className="size-5" aria-hidden />
          <span>Call Now</span>
        </a>
        <Link
          href="/request-a-quote"
          className="flex items-center justify-center bg-charcoal text-parchment py-4 font-semibold border-l border-warmgold/40 hover:text-warmgold transition-colors"
        >
          Get a Quote
        </Link>
      </div>
    </div>
  );
}
