import type { CollectionConfig } from "payload";
import { isAuthenticated } from "./access.ts";

export const GoogleReviews: CollectionConfig = {
  slug: "google-reviews",
  admin: {
    defaultColumns: ["author", "rating", "reviewDate", "isFeatured", "sortOrder"],
    group: "Reviews",
    useAsTitle: "author",
  },
  access: {
    create: isAuthenticated,
    read: () => true,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: "author",
      type: "text",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      required: true,
      defaultValue: 5,
      min: 1,
      max: 5,
      admin: {
        description: "Use the exact Google rating. Five-star reviews are preferred for the homepage.",
        step: 1,
      },
    },
    {
      name: "reviewText",
      type: "textarea",
      required: true,
      admin: {
        description: "Paste the Google review text verbatim.",
      },
    },
    {
      name: "reviewDate",
      type: "date",
      required: true,
      index: true,
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "eventType",
      type: "text",
      admin: {
        description: "Optional context shown under the name, for example: Wedding / 180 guests.",
      },
    },
    {
      name: "googleUrl",
      type: "text",
      admin: {
        description: "Optional link to the Google review or Business Profile.",
      },
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: true,
      label: "Show on site",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Lower numbers appear first. Reviews with the same order use newest date first.",
        position: "sidebar",
        step: 1,
      },
    },
  ],
};
