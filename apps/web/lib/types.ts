export interface Insight {
  _id: string
  title: string
  slug: { current: string }
  category: string
  excerpt: string
  publishedAt: string
  readingTime: number
  featuredImage: string
  author: string
  tags?: string[]
  body?: any[]
  seoTitle?: string
  metaDescription?: string
}

export interface Domain {
  name: string
  description: string
  isExploratory: boolean
}

export interface Target {
  label: string
  value: string
  unit?: string
  type: 'Estimated' | 'Planned' | 'Target' | 'Achieved' | 'Verified'
}

export interface Milestone {
  milestone: string
  status: 'upcoming' | 'in_progress' | 'completed'
}

export interface Relationship {
  institution: string
  relationshipLabel: string
}

export interface Investigator {
  role: string
  person: { name: string; role: string; photograph: string }
}

export interface ResearchProject {
  _id: string
  title: string
  acronym: string
  status: string
  duration: string
  location: string
  overview: any[]
  domains: Domain[]
  studyDesign: {
    designType: string
    estimatedPopulation: string
    householdTarget: string
    methods: string[]
  }
  targets: Target[]
  outputs: string[]
  timeline: Milestone[]
  relationships: Relationship[]
  investigators: Investigator[]
  findingsPublished: boolean
  featuredImage: string
  relatedInsights?: Pick<Insight, '_id' | 'title' | 'slug'>[]
}

export interface Publication {
  _id: string
  title: string
  authors: string
  year: number
  status: 'Published' | 'Under Review' | 'In Preparation' | 'Planned' | 'Future Research'
  scope: string
  abstract?: string
  journal?: string
  doi?: string
  articleUrl?: string
  preprintUrl?: string
  pdfFile?: string
  citation?: string
  relatedProject?: { title: string; acronym: string }
}

export interface Person {
  _id: string
  name: string
  role: string
  biography: string
  affiliation?: string
  orcid?: string
  linkedin?: string
  photograph: string
  selectedPublications?: string[]
}

export interface Partner {
  _id: string
  name: string
  logo: string
  url?: string
  relationshipLabel?: string
}
