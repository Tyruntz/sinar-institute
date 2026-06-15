import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Research Ethics Statement' }

export default function ResearchEthicsPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Research Ethics Statement</h1>
      <div className="prose max-w-none text-gray-600 space-y-4">
        <p>SINAR Institute is committed to conducting research that is ethical, transparent, and respectful of the communities we work with.</p>
        <h2 className="text-xl font-bold text-slate-900">Core Principles</h2>
        <p>All research conducted by or affiliated with SINAR Institute adheres to the following principles: informed consent, confidentiality, safety, fairness, and accountability at every stage of the research process.</p>
        <h2 className="text-xl font-bold text-slate-900">Participant Rights</h2>
        <p>Research participants have the right to be informed about the purpose and nature of research, to participate voluntarily, to withdraw at any time without consequence, and to have their data handled with care and confidentiality.</p>
        <h2 className="text-xl font-bold text-slate-900">Data Governance</h2>
        <p>We do not publish identifiable participant data, sensitive household information, exact participant locations, or unapproved preliminary results. All data governance decisions are made in accordance with ethical review requirements and community expectations.</p>
        <h2 className="text-xl font-bold text-slate-900">Community Partnership</h2>
        <p>We believe research should not be extractive. Data should not leave a community without returning knowledge, clarity, or practical value. Communities are engaged as partners throughout the research process.</p>
        <p className="text-sm text-gray-400">Last updated: 2026</p>
      </div>
    </div>
  )
}
