import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, organisation, enquiryType, message, newsletter, honeypot } = body

    // Spam trap
    if (honeypot) {
      return NextResponse.json({ ok: true })
    }

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const emailBody = `
New enquiry from SINAR Institute website

Name: ${name}
Email: ${email}
Organisation: ${organisation || 'Not provided'}
Type of Enquiry: ${enquiryType || 'Not specified'}
Newsletter consent: ${newsletter ? 'Yes' : 'No'}

Message:
${message}

---
Sent via sinarinstitute.com contact form
    `.trim()

    await resend.emails.send({
      from: 'SINAR Institute Website <onboarding@resend.dev>',
      to: ['partnerships@sinarinstitute.com'],
      replyTo: email,
      subject: `[${enquiryType || 'General Enquiry'}] Message from ${name}`,
      text: emailBody,
    })

    // Auto-reply
    await resend.emails.send({
      from: 'SINAR Institute <noreply@sinarinstitute.com>',
      to: [email],
      subject: 'Thank you for contacting SINAR Institute',
      text: `Dear ${name},

Thank you for contacting SINAR Institute. Your message has been received, and our team will respond as soon as possible.

If you have any urgent questions, you can reach us directly at partnerships@sinarinstitute.com.

SINAR Institute
Real-World Evidence for Coastal Communities
https://sinarinstitute.com
      `.trim(),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
