import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms of Use' }

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Terms of Use</h1>
      <div className="prose max-w-none text-gray-600 space-y-4">
        <p>By accessing and using the SINAR Institute website, you accept and agree to be bound by the following terms.</p>
        <h2 className="text-xl font-bold text-slate-900">Content</h2>
        <p>All content on this website is produced by SINAR Institute for informational purposes. Research findings, statistics, and targets presented on this site are clearly labelled with their verification status (Estimated, Planned, Target, Achieved, or Verified). Do not treat unverified targets as confirmed achievements.</p>
        <h2 className="text-xl font-bold text-slate-900">Intellectual Property</h2>
        <p>All content on this site, including text, images, and data, is the property of SINAR Institute unless otherwise attributed. You may share and cite content with appropriate attribution.</p>
        <h2 className="text-xl font-bold text-slate-900">Limitation of Liability</h2>
        <p>SINAR Institute makes no warranties regarding the completeness or accuracy of information on this site. We are not liable for any actions taken based on information provided here.</p>
        <h2 className="text-xl font-bold text-slate-900">Contact</h2>
        <p>For any queries regarding these terms, contact us at <a href="mailto:partnerships@sinarinstitute.com" className="text-teal-700">partnerships@sinarinstitute.com</a>.</p>
        <p className="text-sm text-gray-400">Last updated: 2026</p>
      </div>
    </div>
  )
}
