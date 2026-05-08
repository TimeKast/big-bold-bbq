"use client";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { Phone } from "lucide-react";

type Props = {
  source: "header" | "footer" | "sticky" | "hero" | "cta-band" | "service-area";
  variant?: "primary" | "ghost" | "inline";
  showIcon?: boolean;
  className?: string;
  label?: string;
};

/**
 * Tracked phone link. Source param feeds GA4 attribution once analytics is wired.
 * For now, captures the click intent in console; will hook to gtag('event','phone_click') later.
 */
export function PhoneLink({
  source,
  variant = "inline",
  showIcon = true,
  className,
  label,
}: Props) {
  const handleClick = () => {
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-expect-error gtag added at runtime
      window.gtag("event", "phone_click", { source });
    }
  };

  const base = "inline-flex items-center gap-2 transition-colors duration-150";
  const variants = {
    primary:
      "bg-firebrick text-parchment px-6 py-3 rounded-md font-semibold hover:bg-charcoal hover:shadow-lg",
    ghost:
      "border-2 border-parchment text-parchment px-6 py-3 rounded-md font-semibold hover:border-warmgold hover:text-warmgold",
    inline:
      "text-firebrick hover:text-warmgold underline-offset-4 hover:underline font-semibold",
  };

  return (
    <a
      href={site.phone.href}
      onClick={handleClick}
      className={cn(base, variants[variant], className)}
      aria-label={`Call ${site.name} at ${site.phone.display}`}
      data-source={source}
    >
      {showIcon && <Phone className="size-[1em]" aria-hidden />}
      <span>{label ?? site.phone.display}</span>
    </a>
  );
}
