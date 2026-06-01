import type { FieldHook } from "payload";

export function formatSlug(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || undefined;
}

export function createSlugHook(sourceField: string): FieldHook {
  return ({ value, siblingData, data }) => {
    const currentSlug = formatSlug(value);

    if (currentSlug) {
      return currentSlug;
    }

    return formatSlug(siblingData?.[sourceField] ?? data?.[sourceField]) ?? value;
  };
}
