import type { CollectionConfig } from "payload";
import { isAuthenticated, isPublishedOrAuthenticated } from "./access.ts";
import { createSlugHook } from "./hooks/formatSlug.ts";

const setInitialPublishedDate: NonNullable<CollectionConfig["hooks"]>["beforeValidate"] = [
  ({ data, operation }) => {
    if (operation === "create" && data && !data.publishedAt) {
      return {
        ...data,
        publishedAt: new Date().toISOString(),
      };
    }

    return data;
  },
];

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  admin: {
    defaultColumns: ["title", "category", "author", "publishedAt", "_status"],
    group: "Blog",
    useAsTitle: "title",
  },
  access: {
    create: isAuthenticated,
    read: isPublishedOrAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
    beforeValidate: setInitialPublishedDate,
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
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
              name: "description",
              type: "textarea",
              required: true,
              maxLength: 280,
              admin: {
                description: "Short summary shown on the blog index and search results.",
              },
            },
            {
              name: "content",
              type: "richText",
              required: true,
            },
          ],
        },
        {
          label: "Publishing",
          fields: [
            {
              name: "author",
              type: "relationship",
              relationTo: "authors",
              required: true,
            },
            {
              name: "publishedAt",
              type: "date",
              required: true,
              index: true,
              admin: {
                date: {
                  pickerAppearance: "dayAndTime",
                },
                position: "sidebar",
              },
            },
            {
              name: "category",
              type: "relationship",
              relationTo: "categories",
              required: true,
              index: true,
            },
            {
              name: "tags",
              type: "relationship",
              relationTo: "tags",
              hasMany: true,
              index: true,
            },
            {
              name: "mainImage",
              type: "upload",
              relationTo: "media",
              required: true,
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "seo",
              type: "group",
              fields: [
                {
                  name: "title",
                  type: "text",
                  maxLength: 70,
                },
                {
                  name: "description",
                  type: "textarea",
                  maxLength: 160,
                },
                {
                  name: "alternativeHeadline",
                  type: "text",
                  maxLength: 110,
                  admin: {
                    description: "Optional BlogPosting alternativeHeadline for answer engines/search.",
                  },
                },
                {
                  name: "tags",
                  type: "array",
                  labels: {
                    singular: "SEO tag",
                    plural: "SEO tags",
                  },
                  fields: [
                    {
                      name: "tag",
                      type: "text",
                      required: true,
                    },
                  ],
                },
                {
                  name: "articleSections",
                  type: "array",
                  labels: {
                    singular: "Article section",
                    plural: "Article sections",
                  },
                  admin: {
                    description: "Optional articleSection values. Falls back to category and tags.",
                  },
                  fields: [
                    {
                      name: "section",
                      type: "text",
                      required: true,
                    },
                  ],
                },
                {
                  name: "aboutTopics",
                  type: "array",
                  labels: {
                    singular: "About topic",
                    plural: "About topics",
                  },
                  admin: {
                    description: "Optional Thing names for BlogPosting.about. The BBQ catering service is included automatically.",
                  },
                  fields: [
                    {
                      name: "topic",
                      type: "text",
                      required: true,
                    },
                  ],
                },
                {
                  name: "mentions",
                  type: "array",
                  labels: {
                    singular: "Mention",
                    plural: "Mentions",
                  },
                  admin: {
                    description: "Optional menu items/topics actually mentioned in the article.",
                  },
                  fields: [
                    {
                      name: "name",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "schemaType",
                      type: "select",
                      defaultValue: "Thing",
                      options: ["Thing", "MenuItem"],
                      required: true,
                    },
                  ],
                },
                {
                  name: "faqs",
                  type: "array",
                  labels: {
                    singular: "FAQ",
                    plural: "FAQs",
                  },
                  admin: {
                    description: "Optional per-article Q&A. If populated, the page displays it and emits FAQPage JSON-LD.",
                  },
                  fields: [
                    {
                      name: "question",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "answer",
                      type: "textarea",
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
