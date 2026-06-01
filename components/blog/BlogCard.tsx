import Image from "next/image";
import Link from "next/link";
import type { BlogPostWithRelations } from "@/lib/blog";
import { getMediaUrl, getRelationDoc } from "@/lib/blog";
import type { Author, Category, Media } from "@/payload-types";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function BlogCard({ post }: { post: BlogPostWithRelations }) {
  const author = getRelationDoc<Author>(post.author);
  const category = getRelationDoc<Category>(post.category);
  const image = getRelationDoc<Media>(post.mainImage);
  const imageUrl = getMediaUrl(image, "card");

  return (
    <article className="group grid overflow-hidden rounded-lg border border-hickory/15 bg-parchment-grain shadow-[0_18px_45px_rgba(43,30,22,0.08)] md:grid-cols-[minmax(240px,0.9fr)_1.1fr]">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-hickory/10 md:aspect-auto"
        aria-label={`Read ${post.title}`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={image?.alt ?? post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 100vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center font-display text-xl text-hickory/55">
            Big Bold BBQ
          </div>
        )}
      </Link>

      <div className="flex min-h-[280px] flex-col p-6 sm:p-8">
        {category ? (
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-firebrick">
            {category.name}
          </p>
        ) : null}

        <h2 className="font-display text-3xl leading-tight text-hickory">
          <Link href={`/blog/${post.slug}`} className="hover:text-firebrick">
            {post.title}
          </Link>
        </h2>

        <p className="mt-4 line-clamp-4 text-base text-hickory/75">
          {post.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-8 text-sm font-semibold text-hickory/70">
          <span>{author?.name ?? "Big Bold BBQ"}</span>
          <span aria-hidden="true">/</span>
          <time dateTime={post.publishedAt}>
            {dateFormatter.format(new Date(post.publishedAt))}
          </time>
        </div>
      </div>
    </article>
  );
}
