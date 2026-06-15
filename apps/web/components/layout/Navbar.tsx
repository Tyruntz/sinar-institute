'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/insights', label: 'Insights' },
  { href: '/research', label: 'Research' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all border-b ${
        scrolled ? 'bg-white/95 backdrop-blur-sm border-gray-200 shadow-sm' : 'bg-white/95 backdrop-blur-sm border-gray-100'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl tracking-tight text-slate-900">
          SINAR Institute
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                pathname === link.href
                  ? 'text-teal-700 font-semibold'
                  : 'text-gray-600 hover:text-teal-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#contact"
            className="bg-slate-900 text-white px-5 py-2.5 rounded-md hover:bg-slate-800 transition text-sm font-medium"
          >
            Get in Touch
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-600 focus:outline-none p-1"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium py-1 ${
                pathname === link.href ? 'text-teal-700' : 'text-gray-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#contact"
            className="bg-slate-900 text-white text-center px-5 py-2.5 rounded-md text-sm font-medium"
          >
            Get in Touch
          </a>
        </div>
      )}
    </header>
  )
}
