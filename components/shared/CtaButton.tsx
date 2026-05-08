import Link from "next/link";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  "inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-200 focus-visible:outline-2 focus-visible:outline-warmgold focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-firebrick text-parchment hover:bg-charcoal hover:scale-[1.02] hover:shadow-lg shadow-firebrick/30",
        secondary:
          "border-2 border-hickory text-hickory hover:border-firebrick hover:text-firebrick",
        ghost:
          "border-2 border-parchment text-parchment hover:border-warmgold hover:text-warmgold",
        warmgold:
          "bg-warmgold text-charcoal hover:bg-firebrick hover:text-parchment",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        xl: "px-10 py-5 text-xl",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type Props = VariantProps<typeof button> & {
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  ariaLabel?: string;
};

export function CtaButton({
  href,
  external,
  children,
  variant,
  size,
  className,
  type,
  onClick,
  ariaLabel,
}: Props) {
  const cls = cn(button({ variant, size }), className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={cls}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      className={cls}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
