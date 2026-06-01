import type { Metadata } from "next";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CtaButton } from "@/components/shared/CtaButton";
import { getBlogIndexData } from "@/lib/blog";

export const metadata: Metadata = {
  title: "BBQ Catering Tips & Stories — Big Bold BBQ Blog",
  description:
    "BBQ catering tips, event planning advice, and Southern, Creole, and Cajun food insights from Big Bold BBQ in Las Vegas.",
  alternates: { canonical: "/blog" },
};

export const dynamic = "force-dynamic";

type BlogPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getFirstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function blogHref(filters: { category?: string; q?: string; tag?: string }) {
  const params = new URLSearchParams();

  if (filters.q) {
    params.set("q", filters.q);
  }

  if (filters.category) {
    params.set("category", filters.category);
  }

  if (filters.tag) {
    params.set("tag", filters.tag);
  }

  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const q = getFirstParam(params.q);
  const category = getFirstParam(params.category);
  const tag = getFirstParam(params.tag);
  const { categories, filters, posts, tags } = await getBlogIndexData({
    category,
    q,
    tag,
  });
  const hasActiveFilters = Boolean(filters.q || filters.category || filters.tag);

  return (
    <section className="bg-parchment text-hickory pt-40 pb-24 md:pt-48 md:pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            lead="Real BBQ knowledge from a real pitmaster. Catering tips, Southern cooking traditions, event planning, and the bold flavors that make every event unforgettable."
          >
            BBQ catering tips,
            <br />
            ideas, and Southern flavor insights.
          </SectionHeading>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 border-y border-hickory/15 py-6">
            <form action="/blog" className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="blog-search" className="sr-only">
                Search blog posts
              </label>
              <input
                id="blog-search"
                type="search"
                name="q"
                defaultValue={filters.q}
                placeholder="Search BBQ tips, event ideas, recipes..."
                className="min-h-12 flex-1 rounded-md border border-hickory/20 bg-parchment px-4 text-base text-hickory shadow-inner outline-none placeholder:text-hickory/45 focus:border-firebrick"
              />
              {filters.category ? (
                <input type="hidden" name="category" value={filters.category} />
              ) : null}
              {filters.tag ? <input type="hidden" name="tag" value={filters.tag} /> : null}
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-firebrick px-5 text-sm font-bold uppercase tracking-[0.12em] text-parchment transition hover:bg-hickory"
              >
                <Search aria-hidden="true" size={18} />
                Search
              </button>
              {hasActiveFilters ? (
                <Link
                  href="/blog"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-hickory/20 px-4 text-sm font-bold uppercase tracking-[0.12em] text-hickory transition hover:border-firebrick hover:text-firebrick"
                >
                  <X aria-hidden="true" size={18} />
                  Clear
                </Link>
              ) : null}
            </form>

            {categories.length ? (
              <nav aria-label="Blog categories" className="mt-6 flex flex-wrap gap-2">
                <Link
                  href={blogHref({ q: filters.q, tag: filters.tag })}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    filters.category
                      ? "border-hickory/15 text-hickory/70 hover:border-firebrick hover:text-firebrick"
                      : "border-firebrick bg-firebrick text-parchment"
                  }`}
                >
                  All categories
                </Link>
                {categories.map((item) => (
                  <Link
                    key={item.id}
                    href={blogHref({
                      category: item.slug,
                      q: filters.q,
                      tag: filters.tag,
                    })}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      filters.category === item.slug
                        ? "border-firebrick bg-firebrick text-parchment"
                        : "border-hickory/15 text-hickory/70 hover:border-firebrick hover:text-firebrick"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            ) : null}

            {tags.length ? (
              <nav aria-label="Blog tags" className="mt-4 flex flex-wrap gap-2">
                {tags.map((item) => (
                  <Link
                    key={item.id}
                    href={blogHref({
                      category: filters.category,
                      q: filters.q,
                      tag: filters.tag === item.slug ? undefined : item.slug,
                    })}
                    className={`rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] transition ${
                      filters.tag === item.slug
                        ? "border-warmgold bg-warmgold text-hickory"
                        : "border-hickory/15 text-hickory/60 hover:border-warmgold hover:text-hickory"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8">
          {posts.map((post, index) => (
            <Reveal key={post.id} delay={index * 80}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>

        {!posts.length ? (
          <Reveal delay={160}>
            <div className="mt-16 max-w-2xl rounded-lg border border-hickory/15 bg-parchment-grain p-8 sm:p-12 text-center">
              <p className="font-display text-2xl md:text-3xl text-hickory mb-3">
                {hasActiveFilters ? "No posts matched that search." : "Posts coming soon."}
              </p>
              <p className="text-hickory/75 text-base mb-6">
                {hasActiveFilters
                  ? "Try a different search, category, or tag to browse the BBQ journal."
                  : "We are prepping our first round of stories: recipes, behind-the-pit looks, and event planning tips from real Vegas catering jobs."}
              </p>
              {hasActiveFilters ? (
                <CtaButton href="/blog" variant="primary" size="md">
                  View all posts
                </CtaButton>
              ) : (
                <CtaButton href="/contact" variant="primary" size="md">
                  Get on the list
                </CtaButton>
              )}
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
