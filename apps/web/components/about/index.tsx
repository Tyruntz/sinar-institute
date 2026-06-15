import Image from 'next/image'
import type { Person, Partner } from '@/lib/types'
import { SectionLabel, EmptyState } from '@/components/ui/index'

const MISSION_ITEMS = [
  'Generate high-quality epidemiological, clinical, genomic, and community-based evidence relevant to coastal and underserved populations.',
  'Document health needs, risk factors, access barriers, exposures, and community priorities through ethical and context-sensitive research.',
  'Translate findings into scientific publications, community reports, educational resources, policy insight, and appropriate practical initiatives.',
  'Build sustained partnerships with communities, universities, health professionals, public institutions, and research organisations.',
  'Strengthen research capability through mentorship, training, field experience, and multidisciplinary collaboration.',
  'Develop research approaches that can be responsibly adapted across coastal settings in Gorontalo and other parts of Indonesia.',
]

const VALUES = [
  { title: 'Scientific Integrity', desc: 'We use transparent methods, careful measurement, and responsible interpretation.' },
  { title: 'Community Respect', desc: 'Communities are partners in knowledge, not merely sources of data.' },
  { title: 'Ethical Responsibility', desc: 'Consent, confidentiality, safety, fairness, and accountability guide every stage of our work.' },
  { title: 'Local Relevance', desc: 'Research questions should reflect real conditions and meaningful local priorities.' },
  { title: 'Translational Value', desc: 'Evidence should contribute to understanding, communication, decisions, and appropriate action.' },
  { title: 'Collaboration', desc: 'Complex challenges require multidisciplinary and cross-sector partnerships.' },
  { title: 'Long-Term Commitment', desc: 'We seek continuity, trust, and responsible growth rather than one-time data collection.' },
]

export function OurStory() {
  return (
    <section className="container mx-auto px-4 md:px-8 py-12 max-w-3xl border-t border-gray-100">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Story</h2>
      <div className="text-gray-600 text-base space-y-5 leading-relaxed">
        <p>SINAR Institute is an independent research institute focused on coastal health, epidemiology, genomics, and the translation of evidence into practical community benefit.</p>
        <p>We began with a simple concern: many coastal and island communities experience distinct health risks, access barriers, environmental exposures, and social realities, yet remain insufficiently represented in research and routine health data.</p>
        <p className="font-medium text-slate-700">Our work begins with listening.</p>
        <p>We collaborate with communities, health professionals, researchers, universities, and local stakeholders to study health problems in their real context. We aim to produce evidence that is scientifically sound, ethically collected, and useful beyond academic publication.</p>
        <p className="font-medium text-slate-700">We do not believe research should be extractive.</p>
        <p>Data should not leave a community without returning knowledge, clarity, or practical value. Our work is therefore designed to support scientific publications, community reports, education, policy dialogue, capacity development, and responsible research-to-action initiatives.</p>
      </div>
    </section>
  )
}

export function GuidingPrinciple() {
  return (
    <section className="bg-slate-900 text-white py-16 text-center">
      <div className="container mx-auto px-4 md:px-8 max-w-2xl">
        <h3 className="text-xl font-bold text-teal-400 mb-4">Translating Evidence into Community Impact</h3>
        <p className="text-slate-300 text-lg leading-relaxed">
          Research is most valuable when it helps people understand their circumstances, strengthens decisions, and creates a responsible path toward action.
        </p>
      </div>
    </section>
  )
}

export function VisionMission() {
  return (
    <section className="container mx-auto px-4 md:px-8 py-16 max-w-5xl">
      <div className="mb-12">
        <SectionLabel>Our Vision</SectionLabel>
        <p className="text-2xl font-bold text-slate-900 leading-tight mt-3 max-w-3xl">
          To become a trusted and independent research institute advancing health, equity, and resilience among coastal and underserved communities through rigorous science and meaningful local partnerships.
        </p>
      </div>
      <div>
        <SectionLabel>Our Mission</SectionLabel>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {MISSION_ITEMS.map((item, i) => (
            <div key={i} className="p-5 border border-gray-100 rounded-lg bg-gray-50/50">
              <span className="font-bold text-slate-900 block mb-2">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CoreValues() {
  return (
    <section className="bg-gray-50 py-16 border-y border-gray-100">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {VALUES.map((v) => (
            <div key={v.title} className={`p-4 bg-white rounded-lg border border-gray-200 ${v.title === 'Long-Term Commitment' ? 'sm:col-span-2 lg:col-span-2' : ''}`}>
              <div className="font-bold text-slate-900 mb-1 text-sm">{v.title}</div>
              <p className="text-xs text-gray-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Leadership({ team }: { team: Person[] }) {
  if (team.length === 0) return null
  return (
    <section className="container mx-auto px-4 md:px-8 py-16 max-w-4xl">
      <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">Leadership</h2>
      <div className="grid md:grid-cols-2 gap-12">
        {team.map((person) => (
          <div key={person._id} className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200 shrink-0">
              {person.photograph ? (
                <Image src={person.photograph} alt={person.name} width={112} height={112} className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Photo</div>
              )}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg">{person.name}</h4>
              <div className="text-xs text-teal-700 font-medium mb-2">{person.role}</div>
              {person.affiliation && <p className="text-xs text-gray-500 mb-2">{person.affiliation}</p>}
              {person.biography && <p className="text-xs text-gray-600 leading-relaxed">{person.biography}</p>}
              <div className="flex gap-3 mt-3 justify-center md:justify-start">
                {person.orcid && <a href={`https://orcid.org/${person.orcid}`} target="_blank" rel="noopener noreferrer" className="text-xs text-teal-700 hover:underline">ORCID</a>}
                {person.linkedin && <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-teal-700 hover:underline">LinkedIn</a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function InstitutionalRelationships({ partners }: { partners: Partner[] }) {
  if (partners.length === 0) return null
  return (
    <section className="bg-gray-50 py-16 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Institutions and Stakeholders We Engage With</h2>
        <div className="flex flex-wrap gap-4">
          {partners.map((p) => (
            <div key={p._id} className="border border-gray-200 rounded-lg px-5 py-3 bg-white">
              <p className="font-medium text-slate-900 text-sm">{p.name}</p>
              {p.relationshipLabel && <p className="text-xs text-teal-700 mt-0.5">{p.relationshipLabel}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function GetInvolved() {
  return (
    <section className="container mx-auto px-4 md:px-8 py-16 max-w-3xl text-center">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Contribute to the next stage of coastal health research</h2>
      <p className="text-gray-600 mb-8">
        We welcome researchers, health professionals, students, institutions, and community partners interested in ethical field research, scientific collaboration, capacity building, or evidence translation.
      </p>
      <a href="#contact" className="bg-slate-900 text-white px-8 py-3 rounded-md font-medium hover:bg-slate-800 transition">
        Get in Touch
      </a>
    </section>
  )
}
