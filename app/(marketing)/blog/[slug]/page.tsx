import type { Metadata } from "next";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { RichTextContent } from "@/components/blog/RichTextContent";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getBlogPostBySlug, getMediaUrl, getRelationDoc } from "@/lib/blog";
import { site } from "@/lib/site";
import type { Author, Category, Media, Tag } from "@/payload-types";

export const dynamic = "force-dynamic";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function getSeoTags(post: Awaited<ReturnType<typeof getBlogPostBySlug>>) {
  return (
    post?.seo?.tags
      ?.map((item) => item.tag)
      .filter((item): item is string => Boolean(item)) ?? []
  );
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog post not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const image = getRelationDoc<Media>(post.mainImage);
  const imageUrl = getMediaUrl(image, "hero") ?? "/og-default.jpg";
  const title = post.seo?.title || `${post.title} — Big Bold BBQ Blog`;
  const description = post.seo?.description || post.description;

  return {
    title,
    description,
    keywords: getSeoTags(post),
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      images: [
        {
          url: imageUrl,
          width: image?.width ?? 1200,
          height: image?.height ?? 630,
          alt: image?.alt ?? post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const author = getRelationDoc<Author>(post.author);
  const category = getRelationDoc<Category>(post.category);
  const image = getRelationDoc<Media>(post.mainImage);
  const imageUrl = getMediaUrl(image, "hero");
  const tags = (post.tags ?? [])
    .map((item) => getRelationDoc<Tag>(item))
    .filter((item): item is Tag => Boolean(item));
  const absoluteUrl = `${site.url}/blog/${post.slug}`;
  const absoluteImageUrl = imageUrl?.startsWith("http")
    ? imageUrl
    : imageUrl
      ? `${site.url}${imageUrl}`
      : `${site.url}/og-default.jpg`;

  return (
    <article className="bg-parchment text-hickory pt-36 pb-24 md:pt-44 md:pb-32 min-h-screen">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Blog", url: `${site.url}/blog` },
            { name: post.title, url: absoluteUrl },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            image: absoluteImageUrl,
            author: {
              "@type": "Person",
              name: author?.name ?? site.name,
            },
            publisher: {
              "@id": `${site.url}/#organization`,
            },
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            mainEntityOfPage: absoluteUrl,
          },
        ]}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-firebrick transition hover:text-hickory"
        >
          <ArrowLeft aria-hidden="true" size={18} />
          Blog
        </Link>

        <header className="mt-10">
          {category ? (
            <Link
              href={`/blog?category=${category.slug}`}
              className="text-xs font-bold uppercase tracking-[0.16em] text-firebrick hover:text-hickory"
            >
              {category.name}
            </Link>
          ) : null}

          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.98] text-hickory sm:text-6xl md:text-7xl">
            {post.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-hickory/75 md:text-xl">
            {post.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-hickory/70">
            <span>{author?.name ?? "Big Bold BBQ"}</span>
            <span aria-hidden="true">/</span>
            <time dateTime={post.publishedAt}>
              {dateFormatter.format(new Date(post.publishedAt))}
            </time>
          </div>
        </header>

        <div className="mt-10 overflow-hidden rounded-lg border border-hickory/15 bg-hickory/10">
          <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={image?.alt ?? post.title}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 960px, 100vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center font-display text-3xl text-hickory/55">
                Big Bold BBQ
              </div>
            )}
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <RichTextContent data={post.content as SerializedEditorState} />

          {tags.length ? (
            <footer className="mt-12 border-t border-hickory/15 pt-8">
              <div className="flex flex-wrap gap-2">
                {tags.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog?tag=${item.slug}`}
                    className="rounded-full border border-hickory/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-hickory/60 transition hover:border-warmgold hover:text-hickory"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </footer>
          ) : null}
        </div>
      </div>
    </article>
  );
}
