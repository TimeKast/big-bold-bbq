import type { CollectionConfig } from "payload";
import { isAuthenticated } from "./access.ts";
import { createSlugHook } from "./hooks/formatSlug.ts";

export const MenuCategories: CollectionConfig = {
  slug: "menu-categories",
  admin: {
    defaultColumns: ["title", "slug", "sortOrder", "isVisible"],
    group: "Menu",
    useAsTitle: "title",
  },
  access: {
    create: isAuthenticated,
    read: () => true,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: "title",
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
        beforeValidate: [createSlugHook("title")],
      },
    },
    {
      name: "blurb",
      type: "textarea",
    },
    {
      name: "isVisible",
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
        description: "Lower numbers appear first.",
        position: "sidebar",
        step: 1,
      },
    },
  ],
};
