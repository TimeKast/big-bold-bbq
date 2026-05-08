import { z } from "zod";

export const quoteSchema = z.object({
  // Step 1
  fullName: z.string().min(2, "Please share your full name."),
  phone: z.string().regex(/^\+?[\d\s\-()]{10,}$/, "Looks like a partial phone number."),
  email: z.email("Looks like a partial email."),
  // Step 2
  eventType: z.enum(["corporate", "wedding", "private-party", "other"]),
  eventDate: z.string().min(4, "When is your event?"),
  guestCount: z.coerce.number().min(10, "We start at ~10 guests.").max(2000),
  // Step 3
  eventLocation: z.string().min(2, "City or venue helps us plan."),
  cateringStyle: z.enum(["drop-off", "buffet", "on-site"]),
  // Step 4
  preferredMeats: z.string().optional(),
  preferredSides: z.string().optional(),
  specialRequests: z.string().max(1000).optional(),
  // Honeypot
  website: z.string().max(0).optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const STEPS = [
  {
    id: "basics",
    title: "Tell us about you",
    fields: ["fullName", "phone", "email"] as const,
  },
  {
    id: "event",
    title: "Event details",
    fields: ["eventType", "eventDate", "guestCount"] as const,
  },
  {
    id: "location",
    title: "Location and setup",
    fields: ["eventLocation", "cateringStyle"] as const,
  },
  {
    id: "menu",
    title: "Menu preferences",
    fields: ["preferredMeats", "preferredSides", "specialRequests"] as const,
  },
] as const;

export type StepId = (typeof STEPS)[number]["id"];
