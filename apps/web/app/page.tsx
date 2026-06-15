import type { Metadata } from 'next'
import { getLatestInsights, getActiveProjects, getPartners, getSiteSettings } from '@/lib/queries'
import {
  Hero, ApproachSection, FeaturedResearch,
  WhyCoastal, LatestInsights, PartnerStrip, PartnershipCTA
} from '@/components/home/index'
import ContactSection from '@/components/layout/ContactSection'

export const metadata: Metadata = {
  title: 'SINAR Institute | Real-World Evidence for Coastal Communities',
  description: 'Independent Research Institute for Coastal Health and Community Development. We advance coastal health through population, clinical, and translational research.',
  openGraph: {
    title: 'SINAR Institute',
    description: 'Real-World Evidence for Coastal Communities',
    url: 'https://sinarinstitute.com',
  },
}

export default async function HomePage() {
  const [insights, projects, partners, siteSettings] = await Promise.all([
    getLatestInsights(),
    getActiveProjects(),
    getPartners(),
    getSiteSettings(),
  ])

  const featuredProject = projects[0] ?? null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SINAR Institute',
    description: 'Independent Research Institute for Coastal Health and Community Development',
    url: 'https://sinarinstitute.com',
    email: 'partnerships@sinarinstitute.com',
    sameAs: ['https://instagram.com/sinarinstitute'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero heroImage={siteSettings?.heroImage} />
      <ApproachSection />
      <FeaturedResearch project={featuredProject} />
      <WhyCoastal />
      <LatestInsights insights={insights} />
      <PartnerStrip partners={partners} />
      <PartnershipCTA />
      <ContactSection />
    </>
  )
}
