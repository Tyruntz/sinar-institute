import type { Metadata } from 'next'
import { ServiceCards, HowWeWork, ServicesCTA } from '@/components/services/index'
import ContactSection from '@/components/layout/ContactSection'

export const metadata: Metadata = {
  title: 'Services & Collaboration',
  description: 'Research support, capacity building, and evidence partnerships for coastal and community health.',
  openGraph: {
    title: 'Services & Collaboration | SINAR Institute',
    description: 'Research support, capacity building, and evidence partnerships for coastal and community health.',
    url: 'https://sinarinstitute.com/services',
  },
}

export default function ServicesPage() {
  return (
    <>
      <section className="bg-soft-sand border-b border-gray-100 py-12">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Services & Collaboration</h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Research support, capacity building, and evidence partnerships for coastal and community health.
          </p>
        </div>
      </section>

      <ServiceCards />
      <HowWeWork />
      {/* Case Studies section intentionally omitted until verified case studies exist */}
      <ServicesCTA />
      <ContactSection />
    </>
  )
}
