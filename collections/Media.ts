import type { CollectionConfig } from "payload";
import { isAuthenticated } from "./access.ts";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Content",
    useAsTitle: "alt",
  },
  access: {
    create: isAuthenticated,
    read: () => true,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  upload: {
    staticDir: "media",
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
    focalPoint: true,
    crop: true,
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 900,
        height: 600,
        position: "centre",
      },
      {
        name: "hero",
        width: 1600,
        height: 900,
        position: "centre",
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};
