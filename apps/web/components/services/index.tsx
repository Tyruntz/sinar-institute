import Link from 'next/link'
import { SectionLabel } from '@/components/ui/index'

const SERVICES = [
  {
    title: 'Research Capacity Building',
    description: 'Structured learning and mentorship in community-based research, epidemiology, scientific writing, research ethics, qualitative inquiry, and applied statistics.',
    relevantFor: ['Medical students', 'Young researchers', 'Health professionals', 'Field teams', 'Community health workers'],
    cta: 'Discuss Capacity Building',
    enquiryType: 'Research Capacity Building',
  },
  {
    title: 'Community Baseline Studies',
    description: 'Support for the design and implementation of village- or community-level health baselines using context-appropriate methods.',
    relevantFor: ['Protocol development', 'Questionnaire design', 'Enumerator training', 'Data collection systems', 'Data analysis', 'Community reporting', 'Policy briefs'],
    cta: 'Discuss a Baseline Study',
    enquiryType: 'Community Baseline Study',
  },
  {
    title: 'Evidence and Publication Support',
    description: 'Collaboration in translating completed research into manuscripts, abstracts, policy briefs, dashboards, visual summaries, and accessible community materials. We support responsible scientific communication. Publication outcomes cannot be guaranteed.',
    relevantFor: [],
    cta: 'Discuss an Evidence Output',
    enquiryType: 'Evidence and Publication Support',
  },
  {
    title: 'Policy Evidence',
    description: 'Support for institutions seeking to organise local evidence into clear policy questions, indicator dashboards, briefing materials, and practical recommendations.',
    relevantFor: [],
    cta: 'Discuss a Policy Collaboration',
    enquiryType: 'Policy Collaboration',
  },
  {
    title: 'Workshops and Field Training',
    description: 'Custom workshops may cover coastal health research, field epidemiology, community engagement, data interpretation, ethical research practice, and evidence communication.',
    relevantFor: [],
    cta: 'Plan a Workshop',
    enquiryType: 'Workshop or Training',
  },
  {
    title: 'Research Collaboration in Coastal Settings',
    description: 'SINAR Institute may support approved research partnerships through contextual guidance, local engagement, field planning, and scientific collaboration. All proposed activities remain subject to community approval, ethical review, local permission, scientific relevance, data governance, and operational feasibility.',
    relevantFor: [],
    cta: 'Explore a Research Partnership',
    enquiryType: 'Research Collaboration',
  },
]

const HOW_WE_WORK = [
  { step: '01', title: 'Initial Conversation', desc: 'We clarify the research problem, intended users, setting, available resources, and expected value.' },
  { step: '02', title: 'Collaborative Design', desc: 'We define roles, methods, ethics, governance, outputs, timelines, and responsibilities.' },
  { step: '03', title: 'Implementation', desc: 'Activities are conducted with transparent quality control, communication, and documentation.' },
  { step: '04', title: 'Evaluation and Learning', desc: 'We review findings, outputs, lessons, and appropriate next steps.' },
]

export function ServiceCards() {
  return (
    <section className="container mx-auto px-4 md:px-8 py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service) => (
          <div key={service.title} className="border border-gray-100 rounded-xl p-6 flex flex-col hover:shadow-lg transition duration-300">
            <h3 className="font-bold text-slate-900 text-lg mb-3">{service.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{service.description}</p>
            {service.relevantFor.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Relevant for</p>
                <ul className="space-y-1">
                  {service.relevantFor.map((item) => (
                    <li key={item} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1 h-1 bg-teal-500 rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <a
              href={`#contact`}
              className="mt-auto border border-slate-300 text-slate-700 text-center px-4 py-2.5 rounded-md text-sm font-medium hover:bg-slate-50 transition"
            >
              {service.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export function HowWeWork() {
  return (
    <section className="bg-soft-sand py-16 border-y border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-2xl mb-12">
          <SectionLabel>Process</SectionLabel>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">How We Work Together</h2>
        </div>
        {/* Desktop horizontal */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {HOW_WE_WORK.map((item) => (
            <div key={item.step} className="relative">
              <div className="text-3xl font-bold text-teal-100 mb-3">{item.step}</div>
              <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        {/* Mobile vertical */}
        <div className="md:hidden space-y-8">
          {HOW_WE_WORK.map((item) => (
            <div key={item.step} className="flex gap-5">
              <div className="text-2xl font-bold text-teal-200 w-8 shrink-0">{item.step}</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServicesCTA() {
  return (
    <section className="bg-slate-900 text-white py-20">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to build something useful together?</h2>
        <p className="text-slate-300 mb-8">
          Whether you represent a community, research group, university, health service, or public institution, we welcome conversations grounded in shared scientific and community value.
        </p>
        <a href="#contact" className="bg-teal-600 text-white px-8 py-3 rounded-md font-medium hover:bg-teal-500 transition">
          Start a Conversation
        </a>
      </div>
    </section>
  )
}
