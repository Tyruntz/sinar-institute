import type { Metadata } from 'next'
import { getLatestInsights, getActiveProjects, getPartners, getSiteSettings } from '@/lib/queries'
import Hero from '@/components/home/Hero'
import {
  ApproachSection, FeaturedResearch,
  WhyCoastal, LatestInsights, PartnerStrip, PartnershipCTA
} from '@/components/home/index'
import ContactSection from '@/components/layout/ContactSection'

export const metadata: Metadata = {
  title: 'SINAR Institute | Real-World Evidence for Coastal Communities',
  description: 'Independent Research Institute for Coastal Health and Community Development.',
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

  return (
    <>
      <Hero heroImages={siteSettings?.heroImages ?? []} />
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