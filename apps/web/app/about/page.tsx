import type { Metadata } from 'next'
import { getTeam, getPartners } from '@/lib/queries'
import {
  OurStory, GuidingPrinciple, VisionMission,
  CoreValues, Leadership, InstitutionalRelationships, GetInvolved
} from '@/components/about/index'
import ContactSection from '@/components/layout/ContactSection'
export const revalidate = 60

export const metadata: Metadata = {
  title: 'About SINAR',
  description: 'Strategic Initiative for Nurturing Action and Research — translating evidence into community impact.',
  openGraph: {
    title: 'About SINAR | SINAR Institute',
    description: 'Strategic Initiative for Nurturing Action and Research — translating evidence into community impact.',
    url: 'https://sinarinstitute.com/about',
  },
}

export default async function AboutPage() {
  const [team, partners] = await Promise.all([getTeam(), getPartners()])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SINAR Institute',
    alternateName: 'Strategic Initiative for Nurturing Action and Research',
    description: 'Independent Research Institute for Coastal Health and Community Development',
    url: 'https://sinarinstitute.com',
    email: 'partnerships@sinarinstitute.com',
    foundingDate: '2026',
    areaServed: 'Indonesia',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-soft-sand border-b border-gray-100 py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">About SINAR</h1>
          <p className="text-gray-600 text-lg">Strategic Initiative for Nurturing Action and Research — translating evidence into community impact.</p>
        </div>
      </section>

      <OurStory />
      <GuidingPrinciple />
      <VisionMission />
      <CoreValues />
      <Leadership team={team} />
      <InstitutionalRelationships partners={partners} />
      <GetInvolved />
      <ContactSection />
    </>
  )
}
