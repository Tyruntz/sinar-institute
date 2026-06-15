import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
      <div className="prose max-w-none text-gray-600 space-y-4">
        <p>SINAR Institute is committed to protecting your privacy. This policy explains how we collect and use personal information.</p>
        <h2 className="text-xl font-bold text-slate-900">Information We Collect</h2>
        <p>When you submit the contact form, we collect your name, email address, organisation name, and message. This information is used solely to respond to your enquiry.</p>
        <h2 className="text-xl font-bold text-slate-900">How We Use Your Information</h2>
        <p>We use contact information to respond to enquiries and, if you have consented, to send occasional research updates. We do not sell or share your personal information with third parties.</p>
        <h2 className="text-xl font-bold text-slate-900">Data Retention</h2>
        <p>We retain contact information only as long as necessary to fulfil the purpose for which it was collected.</p>
        <h2 className="text-xl font-bold text-slate-900">Contact</h2>
        <p>For privacy-related queries, contact us at <a href="mailto:partnerships@sinarinstitute.com" className="text-teal-700">partnerships@sinarinstitute.com</a>.</p>
        <p className="text-sm text-gray-400">Last updated: 2026</p>
      </div>
    </div>
  )
}
