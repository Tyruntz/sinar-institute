import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// @ts-ignore: CSS import handled by Next.js
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://sinarinstitute.com'),
  title: {
    default: 'SINAR Institute',
    template: '%s | SINAR Institute',
  },
  description: 'Independent Research Institute for Coastal Health and Community Development. Real-World Evidence for Coastal Communities.',
  openGraph: {
    type: 'website',
    locale: 'en_ID',
    siteName: 'SINAR Institute',
    url: 'https://sinarinstitute.com',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} text-gray-800 antialiased`}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
