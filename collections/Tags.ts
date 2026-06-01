import type { CollectionConfig } from "payload";
import { isAuthenticated } from "./access.ts";
import { createSlugHook } from "./hooks/formatSlug.ts";

export const Tags: CollectionConfig = {
  slug: "tags",
  admin: {
    defaultColumns: ["name", "slug", "updatedAt"],
    group: "Blog",
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
  ],
};
