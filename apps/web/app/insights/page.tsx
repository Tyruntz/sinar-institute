import type { Metadata } from 'next'
import { getInsights } from '@/lib/queries'
import { InsightsBrowser } from '@/components/insights/InsightsBrowser'
import ContactSection from '@/components/layout/ContactSection'

export const metadata: Metadata = {
  title: 'Insights & Updates',
  description: 'Research progress, community perspectives, and evidence-based thinking from the field.',
  openGraph: {
    title: 'Insights & Updates | SINAR Institute',
    description: 'Research progress, community perspectives, and evidence-based thinking from the field.',
    url: 'https://sinarinstitute.com/insights',
  },
}

export default async function InsightsPage() {
  const insights = await getInsights()

  return (
    <>
      {/* Page hero */}
      <section className="bg-soft-sand border-b border-gray-100 py-12">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Insights & Updates</h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Research progress, community perspectives, and evidence-based thinking from the field.
          </p>
        </div>
      </section>

      <InsightsBrowser insights={insights} />
      <ContactSection />
    </>
  )
}
