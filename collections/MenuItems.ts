import type { CollectionConfig } from "payload";
import { isAuthenticated } from "./access.ts";
import { createSlugHook } from "./hooks/formatSlug.ts";

export const MenuItems: CollectionConfig = {
  slug: "menu-items",
  admin: {
    defaultColumns: ["name", "category", "isVisible", "showOnHome", "sortOrder"],
    group: "Menu",
    useAsTitle: "name",
  },
  access: {
    create: isAuthenticated,
    read: () => true,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
              index: true,
            },
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              index: true,
              admin: {
                position: "sidebar",
              },
              hooks: {
                beforeValidate: [createSlugHook("name")],
              },
            },
            {
              name: "category",
              type: "relationship",
              relationTo: "menu-categories",
              required: true,
              index: true,
            },
            {
              name: "description",
              type: "textarea",
              required: true,
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              admin: {
                description: "Shown on the menu page and on the homepage when this item is featured.",
              },
            },
            {
              name: "tag",
              type: "text",
              admin: {
                description: "Short label, for example: Award-Winning, King of Meats, 3-2-1 Style.",
              },
            },
            {
              name: "note",
              type: "text",
            },
            {
              name: "variants",
              type: "array",
              labels: {
                singular: "Variant",
                plural: "Variants",
              },
              fields: [
                {
                  name: "name",
                  type: "text",
                  required: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: "Display",
          fields: [
            {
              name: "isVisible",
              type: "checkbox",
              defaultValue: true,
              label: "Show on site",
            },
            {
              name: "showOnHome",
              type: "checkbox",
              defaultValue: false,
              label: "Feature on homepage menu preview",
            },
            {
              name: "homeSummary",
              type: "text",
              maxLength: 110,
              admin: {
                description: "Short text for the homepage preview. Falls back to the main description.",
              },
            },
            {
              name: "sortOrder",
              type: "number",
              defaultValue: 0,
              admin: {
                description: "Lower numbers appear first within the category.",
                step: 1,
              },
            },
          ],
        },
      ],
    },
  ],
};
