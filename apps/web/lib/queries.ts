import { client } from './sanity.client'
import type { Insight, ResearchProject, Publication, Person, Partner } from './types'

// ─── Insights ───────────────────────────────────────────────────────────────

const insightsQuery = `*[_type == "insight" && status == "published"] | order(publishedAt desc) {
  _id, title, slug, category, excerpt, publishedAt, readingTime, tags,
  "featuredImage": featuredImage.asset->url,
  "author": author->name
}`

const latestInsightsQuery = `*[_type == "insight" && status == "published"] | order(publishedAt desc)[0...3] {
  _id, title, slug, category, excerpt, publishedAt, readingTime,
  "featuredImage": featuredImage.asset->url,
  "author": author->name
}`

const insightBySlugQuery = `*[_type == "insight" && slug.current == $slug][0] {
  _id, title, slug, category, body, excerpt, publishedAt, readingTime,
  "featuredImage": featuredImage{ "url": asset->url, alt, credit, consentStatus },
  "author": author->{ name, "photograph": photograph.asset->url, role },
  tags, seoTitle, metaDescription
}`

const insightSlugsQuery = `*[_type == "insight" && status == "published"]{ "slug": slug.current }`

const relatedInsightsQuery = `*[_type == "insight" && status == "published" && category == $category && slug.current != $currentSlug] | order(publishedAt desc)[0...3] {
  _id, title, slug, category, excerpt, publishedAt, readingTime,
  "featuredImage": featuredImage.asset->url,
  "author": author->name
}`

// ─── Research ────────────────────────────────────────────────────────────────

const activeProjectsQuery = `*[_type == "researchProject" && status in ["Active","Data Collection","Data Analysis","In Preparation"]] {
  _id, title, acronym, status, duration, location, overview,
  domains, studyDesign, targets, outputs, timeline, relationships, findingsPublished,
  "investigators": investigators[]{ role, "person": person->{ name, role, "photograph": photograph.asset->url } },
  "featuredImage": featuredImage.asset->url,
  "relatedInsights": relatedInsights[]->{ _id, title, slug }
}`

const allProjectsQuery = `*[_type == "researchProject"] | order(_createdAt asc) {
  _id, title, acronym, status, duration, location,
  "featuredImage": featuredImage.asset->url
}`

// ─── Publications ────────────────────────────────────────────────────────────

const publicationsQuery = `*[_type == "publication"] | order(year desc) {
  _id, title, authors, year, status, scope, abstract,
  journal, doi, articleUrl, preprintUrl, citation,
  "pdfFile": pdfFile.asset->url,
  "relatedProject": relatedProject->{ title, acronym }
}`

// ─── People ──────────────────────────────────────────────────────────────────

const teamQuery = `*[_type == "person"] | order(displayOrder asc) {
  _id, name, role, biography, affiliation, orcid, linkedin, selectedPublications,
  "photograph": photograph.asset->url
}`

// ─── Partners ────────────────────────────────────────────────────────────────

const partnersQuery = `*[_type == "partner"] | order(displayOrder asc) {
  _id, name, url, relationshipLabel,
  "logo": logo.asset->url
}`

// ─── Fetch functions ─────────────────────────────────────────────────────────

export async function getInsights(): Promise<Insight[]> {
  return client.fetch(insightsQuery)
}

export async function getLatestInsights(): Promise<Insight[]> {
  return client.fetch(latestInsightsQuery)
}

export async function getInsightBySlug(slug: string): Promise<Insight | null> {
  return client.fetch(insightBySlugQuery, { slug })
}

export async function getInsightSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(insightSlugsQuery)
}

export async function getRelatedInsights(category: string, currentSlug: string): Promise<Insight[]> {
  return client.fetch(relatedInsightsQuery, { category, currentSlug })
}

export async function getActiveProjects(): Promise<ResearchProject[]> {
  return client.fetch(activeProjectsQuery)
}

export async function getAllProjects(): Promise<ResearchProject[]> {
  return client.fetch(allProjectsQuery)
}

export async function getPublications(): Promise<Publication[]> {
  return client.fetch(publicationsQuery)
}

export async function getTeam(): Promise<Person[]> {
  return client.fetch(teamQuery)
}

export async function getPartners(): Promise<Partner[]> {
  return client.fetch(partnersQuery)
}

// ─── Site Settings ────────────────────────────────────────────────────────────

const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0] {
  "heroImage": heroImage{ "url": asset->url, alt, credit },
  "heroImageSecondary": heroImageSecondary{ "url": asset->url, alt, credit }
}`

export interface SiteSettings {
  heroImage?: { url: string; alt: string; credit?: string }
  heroImageSecondary?: { url: string; alt: string; credit?: string }
}

export async function getSiteSettings(): Promise<any> {
  return client.fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0] {
    "heroImages": heroImages[]{
      "url": asset->url,
      alt,
      credit
    },
    "heroImage": heroImage{ "url": asset->url, alt, credit }
  }`) ?? {}
}
