import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely (handles conflicts). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatPhone(e164: string): string {
  // +17025550100 -> (702) 555-0100
  const m = e164.match(/^\+1(\d{3})(\d{3})(\d{4})$/);
  if (!m) return e164;
  return `(${m[1]}) ${m[2]}-${m[3]}`;
}
