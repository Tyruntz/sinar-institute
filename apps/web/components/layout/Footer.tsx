import Link from 'next/link'

const exploreLinks = [
  { href: '/', label: 'Home' },
  { href: '/insights', label: 'Insights' },
  { href: '/research', label: 'Research' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 */}
          <div>
            <div className="font-bold text-xl mb-3">SINAR Institute</div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Real-World Evidence for Coastal Communities
            </p>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              Translating Evidence into Community Impact
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <div className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4">Explore</div>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 text-sm hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <div className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4">Get in Touch</div>
            <a
              href="mailto:partnerships@sinarinstitute.com"
              className="text-slate-400 text-sm hover:text-white transition break-all"
            >
              partnerships@sinarinstitute.com
            </a>
            <p className="text-slate-500 text-sm mt-2">Indonesia</p>
          </div>

          {/* Col 4 */}
          <div>
            <div className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4">Connect</div>
            <ul className="space-y-2">
              {[
                { label: 'Instagram', href: 'https://instagram.com/sinarinstitute' },
                { label: 'LinkedIn', href: '#' },
                { label: 'X (Twitter)', href: '#' },
              ].map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-slate-400 text-sm hover:text-white transition">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} SINAR Institute. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition">Privacy Policy</Link>
            <Link href="/research-ethics" className="hover:text-slate-300 transition">Research Ethics</Link>
            <Link href="/terms" className="hover:text-slate-300 transition">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
