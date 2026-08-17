import articles from "@/data/knowledge/articles.json";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

const allArticles = articles as any[];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const article = allArticles.find((a) => a.slug === slug);

  if (!article) {
    return {};
  }

  const canonical =
    `https://www.trustivasetu.com/resources/${article.slug}`;

  return {
    title: article.title,
    description: article.summary,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: canonical,
      title: article.title,
      description: article.summary,
      siteName: "Trustiva Setu",
      locale: "en_IN",
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
    },
  };
}

export async function generateStaticParams() {
  return allArticles.map((article) => ({
    slug: article.slug,
  }));
}

function getRelatedArticles(article: any) {
  const samePrimaryTag = allArticles.filter(
    (item) =>
      item.slug !== article.slug &&
      item.primaryTag &&
      item.primaryTag === article.primaryTag
  );

  const sameCategory = allArticles.filter(
    (item) =>
      item.slug !== article.slug &&
      item.category &&
      item.category === article.category &&
      !samePrimaryTag.some((related) => related.slug === item.slug)
  );

  return [...samePrimaryTag, ...sameCategory].slice(0, 6);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = allArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article);

  const canonical =
    `https://www.trustivasetu.com/resources/${article.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    dateModified: article.fetchedAt || article.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    publisher: {
      "@type": "Organization",
      name: "Trustiva Setu",
      url: "https://www.trustivasetu.com",
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Trustiva Setu",
      url: "https://www.trustivasetu.com",
    },
    about: article.category,
    keywords: [
      article.primaryTag,
      ...(article.tags || []),
    ].filter(Boolean),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.trustivasetu.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Knowledge Center",
        item: "https://www.trustivasetu.com/resources",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonical,
      },
    ],
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <nav
        aria-label="Breadcrumb"
        className="mb-8 text-sm text-gray-400"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link
              href="/"
              className="hover:text-lime-300 transition-colors"
            >
              Home
            </Link>
          </li>

          <li aria-hidden="true">/</li>

          <li>
            <Link
              href="/resources"
              className="hover:text-lime-300 transition-colors"
            >
              Knowledge Center
            </Link>
          </li>

          <li aria-hidden="true">/</li>

          <li className="text-gray-300">
            {article.category}
          </li>
        </ol>
      </nav>

      <article>
        <header className="mb-8">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-lime-300 mb-3">
            {article.primaryTag || article.category}
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
            <span>
              <strong className="text-gray-300">Source:</strong>{" "}
              {article.source}
            </span>

            <span>
              <strong className="text-gray-300">Category:</strong>{" "}
              {article.category}
            </span>

            <span>
              <strong className="text-gray-300">Published:</strong>{" "}
              {new Date(article.publishedAt).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </span>
          </div>
        </header>

        <section
          aria-labelledby="article-summary"
          className="rounded-3xl border border-lime-300/20 bg-white/5 p-6 sm:p-8 mb-8"
        >
          <h2
            id="article-summary"
            className="text-xl font-bold text-lime-300 mb-4"
          >
            Summary
          </h2>

          <p className="text-gray-200 leading-8 text-lg">
            {article.summary}
          </p>
        </section>

        {article.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {article.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <section className="border-t border-white/10 pt-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Official Source
          </h2>

          <p className="text-gray-400 leading-7 mb-5">
            This resource references the original publication provided
            by the source listed above.
          </p>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-lime-300 px-5 py-3 font-semibold text-black hover:bg-lime-200 transition-colors"
          >
            Read Official Source →
          </a>
        </section>

        {relatedArticles.length > 0 && (
          <section
            aria-labelledby="related-articles"
            className="border-t border-white/10 pt-10"
          >
            <h2
              id="related-articles"
              className="text-2xl font-bold text-white mb-6"
            >
              Related Resources
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/resources/${related.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-lime-300/40 hover:bg-white/10 transition-all"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-lime-300 mb-2">
                    {related.primaryTag || related.category}
                  </p>

                  <h3 className="font-semibold text-white leading-6 group-hover:text-lime-300 transition-colors">
                    {related.title}
                  </h3>

                  <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                    {related.summary}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
