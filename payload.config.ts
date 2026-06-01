import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
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
  editor: lexicalEditor({}),
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
      addRandomSuffix: true,
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
