import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  children: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  children,
  lead,
  align = "left",
  tone = "dark",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-4xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-sm uppercase tracking-[0.2em] font-semibold mb-4",
            tone === "dark" ? "text-firebrick" : "text-warmgold"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-balance",
          tone === "dark" ? "text-hickory" : "text-parchment"
        )}
      >
        {children}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-6 text-lg sm:text-xl text-pretty max-w-3xl",
            align === "center" && "mx-auto",
            tone === "dark" ? "text-hickory/85" : "text-parchment/85"
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
