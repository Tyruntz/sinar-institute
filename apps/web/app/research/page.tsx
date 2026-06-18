import type { Metadata } from 'next'
import { getActiveProjects, getPublications } from '@/lib/queries'
import { ResearchTabs } from '@/components/research/ResearchTabs'
import ContactSection from '@/components/layout/ContactSection'
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Research Portfolio',
  description: 'Our research projects, publications, and evidence outputs — advancing coastal health through rigorous field science.',
  openGraph: {
    title: 'Research Portfolio | SINAR Institute',
    description: 'Our research projects, publications, and evidence outputs.',
    url: 'https://sinarinstitute.com/research',
  },
}

export default async function ResearchPage() {
  const [activeProjects, publications] = await Promise.all([
    getActiveProjects(),
    getPublications(),
  ])

  return (
    <>
      {/* Hero */}
      <section className="bg-soft-sand border-b border-gray-100 py-12">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Research Portfolio</h1>
          <p className="text-gray-600 text-lg max-w-2xl">Our research projects, publications, and evidence outputs.</p>
        </div>
      </section>

      <ResearchTabs activeProjects={activeProjects} publications={publications} />
      <ContactSection />
    </>
  )
}
