import type { Metadata } from "next";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { RichTextContent } from "@/components/blog/RichTextContent";
import { JsonLd, type SchemaObject } from "@/components/seo/JsonLd";
import { getBlogPostBySlug, getMediaUrl, getRelationDoc } from "@/lib/blog";
import { site } from "@/lib/site";
import type { Author, BlogPost, Category, Media, Tag } from "@/payload-types";

export const dynamic = "force-dynamic";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type BlogSeo = NonNullable<BlogPost["seo"]>;
type FaqItem = NonNullable<BlogSeo["faqs"]>[number];

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function compactStrings(values: (null | string | undefined)[]) {
  return Array.from(new Set(values.map((value) => value?.trim()).filter((value): value is string => Boolean(value))));
}

function getSeoTags(post: Awaited<ReturnType<typeof getBlogPostBySlug>>) {
  return compactStrings(post?.seo?.tags?.map((item) => item.tag) ?? []);
}

function getArticleSections(post: BlogPost, category: Category | null, tags: Tag[]) {
  const explicitSections = compactStrings(post.seo?.articleSections?.map((item) => item.section) ?? []);

  if (explicitSections.length) {
    return explicitSections;
  }

  return compactStrings([category?.name, ...tags.map((tag) => tag.name)]);
}

function getAboutEntities(post: BlogPost, category: Category | null, tags: Tag[]): SchemaObject[] {
  const topics = compactStrings(
    post.seo?.aboutTopics?.map((item) => item.topic) ?? [category?.name, ...tags.map((tag) => tag.name)],
  );

  return [
    { "@id": `${site.url}/#bbq-catering-service` },
    ...topics.map((name) => ({
      "@type": "Thing",
      name,
    })),
  ];
}

function getMentionEntities(post: BlogPost): SchemaObject[] {
  const mentions = post.seo?.mentions ?? [];

  return mentions.flatMap((mention): SchemaObject[] => {
    const name = mention.name?.trim();

    if (!name) {
      return [];
    }

    return [
      {
        "@type": mention.schemaType ?? "Thing",
        name,
      },
    ];
  });
}

function getFaqs(post: BlogPost): FaqItem[] {
  return (
    post.seo?.faqs?.filter((faq) => Boolean(faq.question?.trim()) && Boolean(faq.answer?.trim())) ?? []
  );
}

function collectText(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  if (Array.isArray(value)) {
    return value.flatMap(collectText);
  }

  const record = value as Record<string, unknown>;
  const ownText = typeof record.text === "string" ? [record.text] : [];
  const childText = Array.isArray(record.children) ? record.children.flatMap(collectText) : [];

  return [...ownText, ...childText];
}

function getWordCount(content: SerializedEditorState) {
  return collectText(content)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function getAbsoluteMediaUrl(url: null | string | undefined) {
  if (!url) {
    return `${site.url}/og-default.jpg`;
  }

  return url.startsWith("http") ? url : `${site.url}${url}`;
}

function getAuthorSchema(author: Author | null): SchemaObject {
  if (!author || /chef\s+dee/i.test(author.name)) {
    return { "@id": `${site.url}/#chef-dee` };
  }

  return {
    "@type": "Person",
    name: author.name,
  };
}

function buildBlogPostSchema({
  absoluteImageUrl,
  absoluteUrl,
  articleSections,
  author,
  category,
  description,
  faqs,
  image,
  mentions,
  post,
  tags,
  title,
  wordCount,
}: {
  absoluteImageUrl: string;
  absoluteUrl: string;
  articleSections: string[];
  author: Author | null;
  category: Category | null;
  description: string;
  faqs: FaqItem[];
  image: Media | null;
  mentions: SchemaObject[];
  post: BlogPost;
  tags: Tag[];
  title: string;
  wordCount: number;
}): SchemaObject {
  const webpageId = `${absoluteUrl}#webpage`;
  const primaryImageId = `${absoluteUrl}#primaryimage`;
  const blogPostingId = `${absoluteUrl}#blogposting`;
  const breadcrumbId = `${absoluteUrl}#breadcrumb`;
  const faqId = `${absoluteUrl}#faq`;
  const keywords = getSeoTags(post);
  const graph: SchemaObject[] = [
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: absoluteUrl,
      name: title,
      description,
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#bbq-catering-service` },
      primaryImageOfPage: { "@id": primaryImageId },
      breadcrumb: { "@id": breadcrumbId },
    },
    {
      "@type": "ImageObject",
      "@id": primaryImageId,
      url: absoluteImageUrl,
      width: image?.width ?? 1200,
      height: image?.height ?? 630,
      caption: image?.caption ?? image?.alt ?? title,
    },
    {
      "@type": "BlogPosting",
      "@id": blogPostingId,
      mainEntityOfPage: { "@id": webpageId },
      headline: post.title,
      alternativeHeadline: post.seo?.alternativeHeadline || undefined,
      description,
      image: { "@id": primaryImageId },
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: getAuthorSchema(author),
      publisher: { "@id": `${site.url}/#localbusiness` },
      articleSection: articleSections.length ? articleSections : undefined,
      keywords: keywords.length ? keywords : undefined,
      about: getAboutEntities(post, category, tags),
      mentions: mentions.length ? mentions : undefined,
      wordCount,
      inLanguage: site.locale,
      potentialAction: {
        "@type": "ReadAction",
        target: absoluteUrl,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${site.url}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${site.url}/blog/`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: absoluteUrl,
        },
      ],
    },
  ];

  if (faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": faqId,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
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
  const imageUrl = getMediaUrl(image) ?? "/og-default.jpg";
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
      modifiedTime: post.updatedAt,
      authors: ["Chef Dee"],
      section: getRelationDoc<Category>(post.category)?.name,
      tags: getSeoTags(post),
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
  const imageUrl = getMediaUrl(image);
  const tags = (post.tags ?? [])
    .map((item) => getRelationDoc<Tag>(item))
    .filter((item): item is Tag => Boolean(item));
  const absoluteUrl = `${site.url}/blog/${post.slug}`;
  const absoluteImageUrl = getAbsoluteMediaUrl(imageUrl);
  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.description;
  const faqs = getFaqs(post);
  const articleSections = getArticleSections(post, category, tags);
  const mentions = getMentionEntities(post);
  const wordCount = getWordCount(post.content as SerializedEditorState);
  const blogPostSchema = buildBlogPostSchema({
    absoluteImageUrl,
    absoluteUrl,
    articleSections,
    author,
    category,
    description,
    faqs,
    image,
    mentions,
    post,
    tags,
    title,
    wordCount,
  });

  return (
    <article className="bg-parchment text-hickory pt-36 pb-24 md:pt-44 md:pb-32 min-h-screen">
      <JsonLd schema={blogPostSchema} />

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

          {faqs.length ? (
            <section className="mt-12 rounded-lg border border-hickory/15 bg-white/45 p-6 shadow-sm sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-firebrick">
                FAQ
              </p>
              <h2 className="mt-3 font-display text-3xl text-hickory">
                Common questions
              </h2>
              <div className="mt-6 space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.id}>
                    <h3 className="font-display text-xl text-hickory">{faq.question}</h3>
                    <p className="mt-2 leading-7 text-hickory/75">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

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
