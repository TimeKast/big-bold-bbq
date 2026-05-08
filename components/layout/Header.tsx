"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { PhoneLink } from "@/components/shared/PhoneLink";
import { CtaButton } from "@/components/shared/CtaButton";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-charcoal/95 backdrop-blur-md py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <Link
            href="/"
            className={cn(
              "font-display text-xl sm:text-2xl font-black uppercase tracking-tight transition-colors",
              scrolled ? "text-parchment" : "text-hickory"
            )}
            aria-label={site.name}
          >
            <span className="text-firebrick">Big Bold</span>
            <span className={scrolled ? "text-parchment" : "text-hickory"}> BBQ</span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-8"
          >
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-medium text-sm uppercase tracking-wider transition-colors hover:text-warmgold",
                  scrolled ? "text-parchment" : "text-hickory"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <PhoneLink
              source="header"
              variant={scrolled ? "ghost" : "inline"}
              showIcon={true}
            />
            <CtaButton
              href="/request-a-quote"
              variant="primary"
              size="sm"
            >
              Get a Quote
            </CtaButton>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className={cn(
              "lg:hidden p-2 rounded-md transition-colors",
              scrolled
                ? "text-parchment hover:bg-parchment/10"
                : "text-hickory hover:bg-hickory/10"
            )}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="size-6" aria-hidden />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[55] bg-charcoal text-parchment transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-4 py-5">
          <span className="font-display text-2xl font-black uppercase">
            <span className="text-firebrick">Big Bold</span> BBQ
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-2 rounded-md hover:bg-parchment/10"
            aria-label="Close menu"
          >
            <X className="size-6" aria-hidden />
          </button>
        </div>
        <nav
          aria-label="Mobile primary"
          className="px-6 py-8 flex flex-col gap-6"
        >
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl font-bold hover:text-warmgold transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-6 mt-auto pb-12 flex flex-col gap-3">
          <PhoneLink source="header" variant="ghost" />
          <CtaButton href="/request-a-quote" variant="warmgold" size="lg">
            Get a Quote
          </CtaButton>
        </div>
      </div>
    </>
  );
}
