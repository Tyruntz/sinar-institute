import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { getInsightBySlug, getInsightSlugs, getRelatedInsights } from '@/lib/queries'
import { ArticleCard } from '@/components/insights/InsightsBrowser'
import ContactSection from '@/components/layout/ContactSection'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await getInsightSlugs()
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getInsightBySlug(params.slug)
  if (!article) return { title: 'Not Found' }

  return {
    title: article.seoTitle ?? article.title,
    description: article.metaDescription ?? article.excerpt,
    openGraph: {
      title: article.seoTitle ?? article.title,
      description: article.metaDescription ?? article.excerpt,
      url: `https://sinarinstitute.com/insights/${params.slug}`,
      type: 'article',
      ...(article.featuredImage && { images: [{ url: (article.featuredImage as any).url ?? article.featuredImage }] }),
    },
  }
}

export default async function InsightArticlePage({ params }: Props) {
  const article = await getInsightBySlug(params.slug)
  if (!article) notFound()

  const related = await getRelatedInsights(article.category, params.slug)

  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: (article.author as any)?.name ?? 'SINAR Institute',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SINAR Institute',
      url: 'https://sinarinstitute.com',
    },
    ...((article.featuredImage as any)?.url && { image: (article.featuredImage as any).url }),
  }

  const imgData = article.featuredImage as any

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        {/* Back */}
        <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-teal-700 hover:text-teal-900 mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Insights
        </Link>

        {/* Category */}
        <span className="text-xs font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-full">{article.category}</span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 mb-4 leading-tight">{article.title}</h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-100">
          {(article.author as any)?.name && <span>{(article.author as any).name}</span>}
          {publishedDate && <span>· {publishedDate}</span>}
          {article.readingTime && <span>· {article.readingTime} min read</span>}
        </div>

        {/* Featured image */}
        {imgData?.url && (
          <div className="mb-10 rounded-xl overflow-hidden relative h-72 md:h-96">
            <Image
              src={imgData.url}
              alt={imgData.alt ?? article.title}
              fill
              className="object-cover"
              priority
            />
            {imgData.credit && (
              <p className="absolute bottom-2 right-3 text-xs text-white/70 bg-black/30 px-2 py-0.5 rounded">
                {imgData.credit}
              </p>
            )}
          </div>
        )}

        {/* Body */}
        {article.body && (
          <div className="prose max-w-none">
            <PortableText value={article.body} />
          </div>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        )}
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 py-16">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Related Insights</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((a) => <ArticleCard key={a._id} article={a} />)}
            </div>
          </div>
        </section>
      )}

      <ContactSection />
    </>
  )
}
