import type { Where } from "payload";
import type { Author, BlogPost, Category, Media, Tag } from "@/payload-types";
import { getPayloadClient } from "@/lib/payload";

type BlogFilters = {
  category?: string;
  q?: string;
  tag?: string;
};

export type BlogPostWithRelations = BlogPost & {
  author?: Author | number | string;
  category?: Category | number | string;
  mainImage?: Media | number | string;
  tags?: (Tag | number | string)[] | null;
};

export function getRelationDoc<T extends { id: number | string }>(
  value: T | number | string | null | undefined,
): T | null {
  if (typeof value === "object" && value !== null && "id" in value) {
    return value;
  }

  return null;
}

export function getMediaUrl(media: Media | null | undefined) {
  if (!media) {
    return null;
  }

  // Vercel Blob uploads in this project use random suffixes for the stored object.
  // Payload's generated image-size URLs can point at the non-suffixed filenames,
  // which 404s in production. Prefer the canonical media URL because it points at
  // the actual stored blob for both existing and newly uploaded blog images.
  return media.url ?? null;
}

export function normalizeBlogFilters(filters: BlogFilters) {
  return {
    q: filters.q?.trim() || undefined,
    category: filters.category?.trim() || undefined,
    tag: filters.tag?.trim() || undefined,
  };
}

export async function getBlogIndexData(filters: BlogFilters) {
  const payload = await getPayloadClient();
  const normalizedFilters = normalizeBlogFilters(filters);

  const [categoriesResult, tagsResult] = await Promise.all([
    payload.find({
      collection: "categories",
      limit: 100,
      overrideAccess: false,
      pagination: false,
      sort: "name",
    }),
    payload.find({
      collection: "tags",
      limit: 100,
      overrideAccess: false,
      pagination: false,
      sort: "name",
    }),
  ]);

  const and: Where[] = [];

  if (normalizedFilters.q) {
    and.push({
      or: [
        {
          title: {
            like: normalizedFilters.q,
          },
        },
        {
          description: {
            like: normalizedFilters.q,
          },
        },
        {
          "category.name": {
            like: normalizedFilters.q,
          },
        },
        {
          "tags.name": {
            like: normalizedFilters.q,
          },
        },
      ],
    });
  }

  if (normalizedFilters.category) {
    and.push({
      "category.slug": {
        equals: normalizedFilters.category,
      },
    });
  }

  if (normalizedFilters.tag) {
    and.push({
      "tags.slug": {
        equals: normalizedFilters.tag,
      },
    });
  }

  const postsResult = await payload.find({
    collection: "blog-posts",
    depth: 2,
    limit: 24,
    overrideAccess: false,
    where: and.length ? { and } : {},
    sort: "-publishedAt",
  });

  return {
    categories: categoriesResult.docs,
    filters: normalizedFilters,
    posts: postsResult.docs as BlogPostWithRelations[],
    tags: tagsResult.docs,
  };
}

export async function getBlogPostBySlug(slug: string) {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "blog-posts",
    depth: 2,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return (result.docs[0] as BlogPostWithRelations | undefined) ?? null;
}
