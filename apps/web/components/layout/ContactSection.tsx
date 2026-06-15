'use client'

import { useState } from 'react'

const enquiryTypes = [
  'Research Collaboration',
  'Community Baseline Study',
  'Research Capacity Building',
  'Workshop or Training',
  'Evidence and Publication Support',
  'Policy Collaboration',
  'Community Partnership',
  'General Enquiry',
]

interface ContactSectionProps {
  defaultEnquiryType?: string
}

export default function ContactSection({ defaultEnquiryType }: ContactSectionProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    organisation: '',
    enquiryType: defaultEnquiryType ?? '',
    message: '',
    newsletter: false,
    honeypot: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (form.honeypot) return // spam trap
    if (!form.name || !form.email || !form.message) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', organisation: '', enquiryType: '', message: '', newsletter: false, honeypot: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="bg-soft-sand py-20 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8 max-w-2xl">
        <div className="mb-10">
          <span className="text-teal-700 font-medium text-sm tracking-wide uppercase">Contact</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-3">Start a conversation with SINAR Institute</h2>
          <p className="text-gray-600">
            Contact us regarding research collaboration, institutional partnership, community initiatives, training, scientific communication, or evidence translation.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-teal-50 border border-teal-200 text-teal-800 rounded-xl p-8 text-center">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Message received</h3>
            <p className="text-sm">Thank you for contacting SINAR Institute. Your message has been received, and our team will respond as soon as possible.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Honeypot — hidden from real users */}
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
              aria-hidden="true"
            />

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="organisation" className="block text-sm font-medium text-slate-700 mb-1.5">
                Organisation or Institution
              </label>
              <input
                id="organisation"
                name="organisation"
                type="text"
                value={form.organisation}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Optional"
              />
            </div>

            <div>
              <label htmlFor="enquiryType" className="block text-sm font-medium text-slate-700 mb-1.5">
                Type of Enquiry
              </label>
              <select
                id="enquiryType"
                name="enquiryType"
                value={form.enquiryType}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
              >
                <option value="">Select type...</option>
                {enquiryTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-y"
                placeholder="Tell us about your inquiry..."
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                id="newsletter"
                name="newsletter"
                type="checkbox"
                checked={form.newsletter}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="newsletter" className="text-sm text-gray-600">
                I would like to receive occasional research updates from SINAR Institute.
              </label>
            </div>

            <p className="text-xs text-gray-400">
              By submitting this form, you consent to SINAR Institute processing your contact details to respond to your enquiry. We only retain information necessary for this purpose.
            </p>

            {status === 'error' && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                We could not send your message. Please try again or contact us directly by email at{' '}
                <a href="mailto:partnerships@sinarinstitute.com" className="underline">partnerships@sinarinstitute.com</a>.
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === 'loading'}
              className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
