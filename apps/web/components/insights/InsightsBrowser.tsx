'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Insight } from '@/lib/types'
import { EmptyState } from '@/components/ui/index'

const CATEGORIES = ['All', 'Field Updates', 'Community Voices', 'Methodology', 'Policy Insights', 'Team Reflections']
const PAGE_SIZE = 6

interface InsightsBrowserProps {
  insights: Insight[]
}

export function InsightsBrowser({ insights }: InsightsBrowserProps) {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return insights.filter((a) => {
      const matchCat = category === 'All' || a.category === category
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt?.toLowerCase().includes(q) ||
        a.category?.toLowerCase().includes(q) ||
        a.tags?.some((t) => t.toLowerCase().includes(q))
      return matchCat && matchSearch
    })
  }, [insights, category, search])

  const visible = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < filtered.length

  const handleCategory = (cat: string) => {
    setCategory(cat)
    setPage(1)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <>
      {/* Filter bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition ${category === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input
              type="search"
              placeholder="Search insights..."
              value={search}
              onChange={handleSearch}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 md:w-64"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        {visible.length === 0 ? (
          <EmptyState
            title="No insights matched your search"
            description="Try another keyword or category."
          />
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              {visible.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
            {hasMore && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="border border-slate-300 text-slate-700 px-8 py-3 rounded-md font-medium hover:bg-slate-50 transition"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export function ArticleCard({ article }: { article: Insight }) {
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <Link href={`/insights/${article.slug.current}`} className="group flex flex-col rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition duration-300">
      <div className="h-52 bg-gray-100 relative overflow-hidden">
        {article.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span className="text-xs font-medium text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full self-start mb-3">
          {article.category}
        </span>
        <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2 group-hover:text-teal-700 transition line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">{article.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
          {article.author && <span>{article.author}</span>}
          {date && <span>· {date}</span>}
          {article.readingTime && <span>· {article.readingTime} min read</span>}
        </div>
      </div>
    </Link>
  )
}
