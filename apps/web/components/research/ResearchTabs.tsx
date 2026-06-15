'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import type { ResearchProject, Publication, Insight } from '@/lib/types'
import { StatusBadge } from '@/components/ui/Badge'
import { SectionLabel, StatCard, EmptyState } from '@/components/ui/index'

const TABS = [
  { id: 'active-projects', label: 'Active Projects' },
  { id: 'completed-studies', label: 'Completed Studies' },
  { id: 'publications', label: 'Publications' },
  { id: 'future-pipeline', label: 'Future Pipeline' },
]

// ─── Tab Nav ─────────────────────────────────────────────────────────────────
export function ResearchTabNav({ activeTab, onTab }: { activeTab: string; onTab: (id: string) => void }) {
  return (
    <div className="sticky top-16 z-30 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTab(tab.id)}
              className={`shrink-0 px-5 py-4 text-sm font-medium border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-teal-700 text-teal-700'
                  : 'border-transparent text-gray-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Tab controller ────────────────────────────────────────────────────────────
interface ResearchTabsProps {
  activeProjects: ResearchProject[]
  publications: Publication[]
}

export function ResearchTabs({ activeProjects, publications }: ResearchTabsProps) {
  const [activeTab, setActiveTab] = useState('active-projects')

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (TABS.find((t) => t.id === hash)) setActiveTab(hash)
  }, [])

  const handleTab = (id: string) => {
    setActiveTab(id)
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <>
      <ResearchTabNav activeTab={activeTab} onTab={handleTab} />
      <div className="container mx-auto px-4 md:px-8 py-12">
        {activeTab === 'active-projects' && <ActiveProjectsTab projects={activeProjects} />}
        {activeTab === 'completed-studies' && <CompletedTab />}
        {activeTab === 'publications' && <PublicationsTab publications={publications} />}
        {activeTab === 'future-pipeline' && <FuturePipelineTab />}
      </div>
    </>
  )
}

// ─── Active Projects ───────────────────────────────────────────────────────────
function ActiveProjectsTab({ projects }: { projects: ResearchProject[] }) {
  if (projects.length === 0) {
    return <EmptyState title="No active projects" description="Active research projects will appear here." />
  }
  return (
    <div className="space-y-20">
      {projects.map((project) => (
        <ProjectDetail key={project._id} project={project} />
      ))}
    </div>
  )
}

function ProjectDetail({ project }: { project: ResearchProject }) {
  const [openDomain, setOpenDomain] = useState<number | null>(null)

  return (
    <article>
      {/* Header */}
      <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
        <div>
          <StatusBadge status={project.status} />
          <h2 className="text-3xl font-bold text-slate-900 mt-4 mb-2">{project.title}</h2>
          {project.acronym && <p className="text-teal-700 font-semibold mb-4">{project.acronym}</p>}
          <div className="grid grid-cols-2 gap-3 text-sm mb-6">
            {project.duration && (
              <div><span className="text-gray-400 block text-xs uppercase tracking-wide">Period</span><span className="text-slate-800 font-medium">{project.duration}</span></div>
            )}
            {project.location && (
              <div><span className="text-gray-400 block text-xs uppercase tracking-wide">Location</span><span className="text-slate-800 font-medium">{project.location}</span></div>
            )}
          </div>
          {project.investigators?.length > 0 && (
            <div className="mb-6">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Lead Researchers</p>
              <div className="space-y-2">
                {project.investigators.map((inv, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {inv.person?.photograph && (
                      <Image src={inv.person.photograph} alt={inv.person.name} width={36} height={36} className="rounded-full object-cover" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-slate-900">{inv.person?.name}</p>
                      <p className="text-xs text-gray-500">{inv.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {project.featuredImage && (
          <div className="h-72 rounded-xl overflow-hidden relative">
            <Image src={project.featuredImage} alt={project.title} fill className="object-cover" />
          </div>
        )}
      </div>

      {/* Overview */}
      {project.overview && (
        <div className="prose prose-slate max-w-3xl mb-12">
          <PortableText value={project.overview} />
        </div>
      )}

      {/* Research Domains */}
      {project.domains?.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Research Domains</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {project.domains.map((domain, i) => (
              <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenDomain(openDomain === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-slate-900 text-sm">{domain.name}</span>
                    {domain.isExploratory && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Exploratory</span>
                    )}
                  </div>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${openDomain === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDomain === i && domain.description && (
                  <div className="px-4 pb-4 text-sm text-gray-600">{domain.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Targets */}
      {project.targets?.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Study Coverage & Targets</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.targets.map((t) => (
              <StatCard key={t.label} label={t.label} value={t.value} unit={t.unit} type={t.type} />
            ))}
          </div>
        </div>
      )}

      {/* Theory of Change */}
      <TheoryOfChange />

      {/* Outputs */}
      {project.outputs?.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Planned Evidence Outputs</h3>
          <ul className="space-y-2">
            {project.outputs.map((o, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                <svg className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {o}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Institutional relationships */}
      {project.relationships?.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Institutions and Stakeholders We Engage With</h3>
          <div className="flex flex-wrap gap-3">
            {project.relationships.map((r, i) => (
              <div key={i} className="border border-gray-200 rounded-lg px-4 py-2.5">
                <p className="text-sm font-medium text-slate-900">{r.institution}</p>
                <p className="text-xs text-teal-700">{r.relationshipLabel}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
        <Link href={`/insights?tag=tide-2026`} className="border border-slate-300 text-slate-700 px-5 py-2.5 rounded-md text-sm font-medium hover:bg-slate-50 transition">
          Follow {project.acronym} Updates
        </Link>
        {project.findingsPublished && (
          <Link href="/research/tide-2026-proposal" className="bg-teal-700 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-teal-600 transition">
            View Preliminary Findings
          </Link>
        )}
      </div>
    </article>
  )
}

// ─── Theory of Change ─────────────────────────────────────────────────────────
const TOC_STEPS = [
  'Local Realities', 'Structured Data', 'Scientific Evidence',
  'Community Interpretation', 'Community Report', 'Policy Insight',
  'Education & Advocacy', 'Pilot Intervention', 'Monitoring', 'Responsible Scale-Up',
]

function TheoryOfChange() {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Theory of Change</h3>
      {/* Desktop: horizontal */}
      <div className="hidden md:flex items-center gap-0 overflow-x-auto pb-2">
        {TOC_STEPS.map((step, i) => (
          <div key={step} className="flex items-center shrink-0">
            <div className="bg-teal-50 border border-teal-200 rounded-lg px-3 py-2 text-xs font-medium text-teal-800 text-center whitespace-nowrap">
              {step}
            </div>
            {i < TOC_STEPS.length - 1 && (
              <svg className="w-4 h-4 text-teal-400 shrink-0 mx-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        ))}
      </div>
      {/* Mobile: vertical */}
      <div className="md:hidden space-y-2">
        {TOC_STEPS.map((step, i) => (
          <div key={step} className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center shrink-0">
              {i + 1}
            </div>
            <span className="text-sm text-slate-700 font-medium">{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Completed ────────────────────────────────────────────────────────────────
function CompletedTab() {
  return (
    <EmptyState
      title="Completed research will be documented here"
      description="TIDE 2026 is SINAR Institute's first flagship institutional programme. Completed studies, pilot projects, and archived research outputs will be added as they become available."
    />
  )
}

// ─── Publications ─────────────────────────────────────────────────────────────
const PUB_STATUS_ORDER = ['Published', 'Under Review', 'In Preparation', 'Planned', 'Future Research']

function PublicationsTab({ publications }: { publications: Publication[] }) {
  const grouped = PUB_STATUS_ORDER.reduce<Record<string, Publication[]>>((acc, status) => {
    const group = publications.filter((p) => p.status === status)
    if (group.length > 0) acc[status] = group
    return acc
  }, {})

  if (publications.length === 0) {
    return <EmptyState title="No publications yet" description="Research outputs and manuscript pipeline will appear here." />
  }

  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <SectionLabel>Research Outputs</SectionLabel>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">Research Outputs and Manuscript Pipeline</h2>
      </div>
      {Object.entries(grouped).map(([status, pubs]) => (
        <div key={status}>
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-3">
            <StatusBadge status={status} />
          </h3>
          <div className="space-y-4">
            {pubs.map((pub) => (
              <PublicationItem key={pub._id} pub={pub} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function PublicationItem({ pub }: { pub: Publication }) {
  return (
    <div className="border border-gray-100 rounded-xl p-6">
      <p className="font-semibold text-slate-900 mb-1">{pub.title}</p>
      <p className="text-sm text-gray-500 mb-3">{pub.authors}{pub.year ? ` · ${pub.year}` : ''}</p>
      {pub.journal && <p className="text-sm text-gray-600 mb-2 italic">{pub.journal}</p>}
      {pub.scope && <p className="text-sm text-gray-500 mb-4">{pub.scope}</p>}
      <div className="flex flex-wrap gap-3">
        {pub.abstract && (
          <details className="text-sm text-gray-600 w-full">
            <summary className="cursor-pointer text-teal-700 font-medium">View Abstract</summary>
            <p className="mt-2 leading-relaxed">{pub.abstract}</p>
          </details>
        )}
        {pub.articleUrl && (
          <a href={pub.articleUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-teal-700 font-medium hover:underline">Read Article →</a>
        )}
        {pub.preprintUrl && (
          <a href={pub.preprintUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-teal-700 font-medium hover:underline">View Preprint →</a>
        )}
        {pub.pdfFile && (
          <a href={pub.pdfFile} target="_blank" rel="noopener noreferrer" className="text-sm text-teal-700 font-medium hover:underline">Download PDF →</a>
        )}
        {pub.doi && (
          <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:underline">DOI: {pub.doi}</a>
        )}
      </div>
    </div>
  )
}

// ─── Future Pipeline ──────────────────────────────────────────────────────────
const PIPELINE = [
  {
    phase: 'Phase 2',
    title: 'Multi-Site Coastal Baselines',
    timeframe: 'Year 2–3',
    status: 'Concept Development',
    description: 'Adapt validated components of the TIDE toolkit for three to five additional coastal communities in Gorontalo.',
    note: 'All targets remain provisional until site selection, ethical review, partnership, and funding are confirmed.',
  },
  {
    phase: 'Phase 3',
    title: 'Coastal Health Observatory',
    timeframe: 'Year 3 onward',
    status: 'Planning Concept',
    description: 'Develop a structured platform for comparing selected health and resilience indicators across participating coastal communities.',
  },
  {
    phase: 'Phase 4',
    title: 'Multidisciplinary Coastal Resilience Portfolio',
    timeframe: 'Year 4–5',
    status: 'Conceptual',
    description: 'Expand research into WASH improvement, nutrition, NCD screening, occupational health, coastal livelihoods, and climate adaptation.',
  },
  {
    phase: 'Long-Term Vision',
    title: 'National Coastal Health Evidence Network',
    timeframe: 'Year 5–10',
    status: 'Long-Term Vision',
    description: 'A collaborative, multi-province research network producing comparative evidence, policy analysis, and shared methods for coastal health research in Indonesia.',
  },
]

function FuturePipelineTab() {
  return (
    <div>
      <div className="max-w-2xl mb-12">
        <SectionLabel>Pipeline</SectionLabel>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">A Responsible Path to Scale</h2>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />
        <div className="space-y-10">
          {PIPELINE.map((item, i) => (
            <div key={i} className="md:pl-12 relative">
              <div className="hidden md:flex absolute left-0 top-1 w-8 h-8 rounded-full bg-teal-50 border-2 border-teal-200 items-center justify-center">
                <span className="text-xs font-bold text-teal-700">{i + 1}</span>
              </div>
              <div className="border border-gray-100 rounded-xl p-6">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">{item.phase}</span>
                  <StatusBadge status={item.status} />
                  <span className="text-xs text-gray-400">{item.timeframe}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                {item.note && (
                  <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded px-3 py-2">{item.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
