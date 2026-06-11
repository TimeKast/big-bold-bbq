import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { lexicalEditor, UploadFeature } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Authors } from "./collections/Authors.ts";
import { BlogPosts } from "./collections/BlogPosts.ts";
import { Categories } from "./collections/Categories.ts";
import { GoogleReviews } from "./collections/GoogleReviews.ts";
import { Media } from "./collections/Media.ts";
import { MenuCategories } from "./collections/MenuCategories.ts";
import { MenuItems } from "./collections/MenuItems.ts";
import { Tags } from "./collections/Tags.ts";
import { Users } from "./collections/Users.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

function getEmailAddress(value: string | undefined, fallback: string) {
  if (!value) {
    return fallback;
  }

  const match = value.match(/<([^<>]+)>/);
  return (match?.[1] ?? value).trim();
}

function getPostgresConnectionString() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    return connectionString;
  }

  try {
    const url = new URL(connectionString);
    const sslMode = url.searchParams.get("sslmode");

    if (sslMode === "prefer" || sslMode === "require" || sslMode === "verify-ca") {
      url.searchParams.set("sslmode", "verify-full");
      return url.toString();
    }
  } catch {
    return connectionString;
  }

  return connectionString;
}

const resendApiKey = process.env.RESEND_API_KEY;

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    Authors,
    Categories,
    Tags,
    BlogPosts,
    GoogleReviews,
    MenuCategories,
    MenuItems,
  ],
  db: postgresAdapter({
    pool: {
      connectionString: getPostgresConnectionString(),
    },
  }),
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      UploadFeature({
        collections: {
          media: {
            fields: [
              {
                name: "fit",
                type: "select",
                defaultValue: "contain",
                options: [
                  {
                    label: "Fit inside container (no crop)",
                    value: "contain",
                  },
                  {
                    label: "Fill container (crop edges)",
                    value: "cover",
                  },
                ],
                admin: {
                  description:
                    "Use contain for charts/tables/infographics; cover for photo-style crops.",
                },
              },
              {
                name: "aspectRatio",
                type: "select",
                defaultValue: "auto",
                options: [
                  {
                    label: "Natural image shape",
                    value: "auto",
                  },
                  {
                    label: "16:9 landscape",
                    value: "16:9",
                  },
                  {
                    label: "4:3 standard",
                    value: "4:3",
                  },
                  {
                    label: "1:1 square",
                    value: "1:1",
                  },
                ],
                admin: {
                  description:
                    "Optional frame shape. Leave natural for screenshots, pricing tables, and infographics.",
                },
              },
              {
                name: "displayWidth",
                type: "select",
                defaultValue: "content",
                options: [
                  {
                    label: "Content width",
                    value: "content",
                  },
                  {
                    label: "Wide feature",
                    value: "wide",
                  },
                  {
                    label: "Full article width",
                    value: "full",
                  },
                ],
                admin: {
                  description:
                    "How wide this image should render inside the blog article.",
                },
              },
            ],
          },
        },
        enabledCollections: ["media"],
      }),
    ],
  }),
  email: resendApiKey
    ? resendAdapter({
        apiKey: resendApiKey,
        defaultFromAddress: getEmailAddress(process.env.QUOTE_FROM_EMAIL, "chef@bigboldbbq.com"),
        defaultFromName: "Chef Dee's Big Bold BBQ",
      })
    : undefined,
  graphQL: {
    disable: true,
  },
  plugins: [
    vercelBlobStorage({
      alwaysInsertFields: true,
      clientUploads: true,
      collections: {
        media: {
          prefix: "media",
        },
      },
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  secret:
    process.env.PAYLOAD_SECRET ??
    "development-only-payload-secret-change-before-production",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
