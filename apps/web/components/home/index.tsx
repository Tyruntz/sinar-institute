import Image from 'next/image'
import Link from 'next/link'
import type { Insight, ResearchProject, Partner } from '@/lib/types'
import { StatusBadge } from '@/components/ui/Badge'
import { SectionLabel, StatCard, EmptyState } from '@/components/ui/index'

// ─── Hero ────────────────────────────────────────────────────────────────────
interface HeroProps {
  heroImage?: { url: string; alt: string; credit?: string }
}

export function Hero({ heroImage }: HeroProps) {
  return (
    <section className="container mx-auto px-4 md:px-8 py-12 md:py-20 grid lg:grid-cols-2 gap-12 items-center">
      <div className="flex flex-col order-2 lg:order-1">
        <SectionLabel>Real-World Evidence for Coastal Communities</SectionLabel>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 mt-3 mb-6">
          Advancing coastal health through population, clinical, and translational research
        </h1>
        <div className="text-gray-600 text-lg space-y-4 mb-8">
          <p>
            We study health across interconnected population, clinical, environmental, geographic, and biological dimensions to understand how local conditions shape disease, access, vulnerability, and resilience.
          </p>
          <p>
            Our work translates field observations, clinical findings, and scientific analysis into community knowledge, policy insight, and responsible action.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <a href="#approach" className="bg-slate-900 text-white text-center px-6 py-3 rounded-md font-medium hover:bg-slate-800 transition">
            Learn About Our Approach
          </a>
          <Link href="/research" className="border border-slate-300 text-slate-700 text-center px-6 py-3 rounded-md font-medium hover:bg-slate-50 transition">
            Explore Our Research
          </Link>
        </div>
        <span className="text-sm text-gray-500 italic">Starting small. Designed for broader relevance.</span>
      </div>
      <div className="order-2 lg:order-2 w-full h-64 md:h-96 lg:h-full min-h-[400px] bg-gray-100 rounded-xl overflow-hidden relative">
        {heroImage?.url ? (
          <>
            <Image
              src={heroImage.url}
              alt={heroImage.alt ?? 'Torosiaje coastal community, Gorontalo, Indonesia'}
              fill
              className="object-cover"
              priority
            />
            {heroImage.credit && (
              <p className="absolute bottom-2 right-3 text-xs text-white/70 bg-black/30 px-2 py-0.5 rounded">
                {heroImage.credit}
              </p>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 text-sm text-center px-8">
            <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">Original photograph: Torosiaje field visit, 2026</span>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Approach ────────────────────────────────────────────────────────────────
const approachCards = [
  {
    title: 'Listen and Measure',
    body: 'We use structured, context-sensitive methods to understand local health conditions, risks, and priorities without beginning from assumptions.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    title: 'Return Evidence',
    body: 'Findings are translated into accessible community reports, visual summaries, scientific outputs, and actionable policy briefs.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Enable Action',
    body: 'We support communities, health professionals, and public institutions in identifying focused responses informed by evidence.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Build Capacity',
    body: 'We involve students, young researchers, health workers, and local partners in ethical research, data interpretation, and knowledge translation.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
]

export function ApproachSection() {
  return (
    <section id="approach" className="bg-white py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12 max-w-2xl">
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-4">
            Research should begin with listening and return as something useful
          </h2>
          <p className="text-gray-600 text-lg">
            Our approach connects careful field research with community interpretation, accessible reporting, and realistic pathways to action.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {approachCards.map((card) => (
            <div key={card.title} className="p-6 rounded-xl border border-gray-100 bg-white hover:shadow-lg transition duration-300 group">
              <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-100 transition">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Featured Research ────────────────────────────────────────────────────────
export function FeaturedResearch({ project }: { project: ResearchProject | null }) {
  if (!project) return null

  return (
    <section className="container mx-auto px-4 md:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionLabel>Featured Research</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-2">Our flagship coastal health baseline study</h2>
          <h3 className="text-xl font-semibold text-slate-700 mb-4">{project.title}</h3>
          <div className="mb-6">
            <StatusBadge status={`${project.status} — ${project.duration ?? ''}`} />
          </div>
          <div className="text-gray-600 space-y-4 mb-8 text-base leading-relaxed">
            {project.overview?.slice(0, 3).map((block: any, i: number) => (
              block._type === 'block' && (
                <p key={i}>{block.children?.map((c: any) => c.text).join('')}</p>
              )
            ))}
          </div>
          {project.targets?.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              {project.targets.slice(0, 4).map((t) => (
                <StatCard key={t.label} label={t.label} value={t.value} unit={t.unit} type={t.type} />
              ))}
            </div>
          )}
          <Link href="/research#active-projects" className="inline-flex items-center text-teal-700 font-semibold hover:text-teal-900 transition">
            Explore {project.acronym}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        <div className="w-full h-[500px] bg-slate-100 rounded-2xl border border-gray-200 overflow-hidden relative">
          {project.featuredImage ? (
            <Image src={project.featuredImage} alt={project.title} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
              <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span className="text-sm">Map / Data Visualisation</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Why Coastal ─────────────────────────────────────────────────────────────
export function WhyCoastal() {
  return (
    <section className="bg-teal-50 py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <SectionLabel>Why Coastal Health</SectionLabel>
        <h2 className="text-2xl font-bold text-slate-900 mt-2 mb-6">
          Coastal communities sustain systems far beyond the shoreline
        </h2>
        <div className="text-gray-600 space-y-4 leading-relaxed">
          <p>
            Coastal communities contribute to fisheries, food security, maritime livelihoods, cultural continuity, and climate resilience.
          </p>
          <p>
            Yet their health realities are often underrepresented in routine data systems. Distance, weather, transportation, environmental exposure, household income, and reliance on marine livelihoods can influence access to healthcare, medicines, nutrition, and social protection.
          </p>
          <p>These realities cannot always be understood through an urban lens.</p>
        </div>
        <blockquote className="mt-8 border-l-4 border-teal-600 pl-6 text-slate-700 font-semibold text-lg italic">
          "Torosiaje is our starting point, not our endpoint."
        </blockquote>
      </div>
    </section>
  )
}

// ─── Latest Insights ─────────────────────────────────────────────────────────
export function LatestInsights({ insights }: { insights: Insight[] }) {
  return (
    <section className="container mx-auto px-4 md:px-8 py-20">
      <div className="flex justify-between items-end mb-10">
        <div>
          <SectionLabel>From the Field</SectionLabel>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">Recent updates and research notes</h2>
        </div>
        <Link href="/insights" className="text-teal-700 font-medium text-sm hover:text-teal-900 transition hidden md:block">
          View All Insights →
        </Link>
      </div>

      {insights.length === 0 ? (
        <EmptyState title="No insights yet" description="Follow the development of our work through field updates, community perspectives, and evidence-based insights." />
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((article) => (
            <Link key={article._id} href={`/insights/${article.slug.current}`} className="group block rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition duration-300">
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                {article.featuredImage ? (
                  <Image src={article.featuredImage} alt={article.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">{article.category}</span>
                <h3 className="font-bold text-slate-900 mt-3 mb-2 leading-snug group-hover:text-teal-700 transition">{article.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-3">{article.excerpt}</p>
                <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
                  <span>{article.author}</span>
                  {article.readingTime && <span>· {article.readingTime} min read</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 text-center md:hidden">
        <Link href="/insights" className="text-teal-700 font-medium text-sm">View All Insights →</Link>
      </div>
    </section>
  )
}

// ─── Partner Strip ────────────────────────────────────────────────────────────
export function PartnerStrip({ partners }: { partners: Partner[] }) {
  if (partners.length === 0) return null

  return (
    <section className="border-t border-gray-100 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <SectionLabel>Our Network</SectionLabel>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">Research grows through collaboration</h2>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((p) => (
            <div key={p._id} className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              {p.logo ? (
                <Image src={p.logo} alt={p.name} width={80} height={32} className="object-contain grayscale opacity-60 hover:opacity-100 transition" />
              ) : (
                <span className="text-gray-400 text-xs border border-gray-200 px-3 py-1.5 rounded">{p.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Partnership CTA ──────────────────────────────────────────────────────────
export function PartnershipCTA() {
  return (
    <section className="bg-slate-900 text-white py-20">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to collaborate?</h2>
        <p className="text-slate-300 text-lg mb-8">
          We work with researchers, universities, healthcare professionals, public institutions, and communities seeking to strengthen coastal health evidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="bg-teal-600 text-white px-8 py-3 rounded-md font-medium hover:bg-teal-500 transition text-center">
            Get in Touch
          </a>
          <Link href="/research" className="border border-slate-600 text-slate-200 px-8 py-3 rounded-md font-medium hover:bg-slate-800 transition text-center">
            Explore Our Research
          </Link>
        </div>
      </div>
    </section>
  )
}
