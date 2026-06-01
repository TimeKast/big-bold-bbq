import type { CollectionConfig } from "payload";
import { canCreateFirstUserOrAuthenticated, isAuthenticated } from "./access.ts";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "CMS",
  },
  access: {
    create: canCreateFirstUserOrAuthenticated,
    read: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [],
};
