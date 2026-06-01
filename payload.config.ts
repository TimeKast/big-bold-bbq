import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Authors } from "./collections/Authors.ts";
import { BlogPosts } from "./collections/BlogPosts.ts";
import { Categories } from "./collections/Categories.ts";
import { Media } from "./collections/Media.ts";
import { Tags } from "./collections/Tags.ts";
import { Users } from "./collections/Users.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Authors, Categories, Tags, BlogPosts],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  editor: lexicalEditor({}),
  graphQL: {
    disable: true,
  },
  secret:
    process.env.PAYLOAD_SECRET ??
    "development-only-payload-secret-change-before-production",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
