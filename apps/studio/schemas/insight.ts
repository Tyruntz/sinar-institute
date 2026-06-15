import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'insight',
  title: 'Insight / Artikel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Field Updates', value: 'Field Updates' },
          { title: 'Community Voices', value: 'Community Voices' },
          { title: 'Methodology', value: 'Methodology' },
          { title: 'Policy Insights', value: 'Policy Insights' },
          { title: 'Team Reflections', value: 'Team Reflections' },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Ringkasan (maks 200 karakter)',
      type: 'text',
      rows: 3,
      validation: (R) => R.required().max(200),
    }),
    defineField({
      name: 'body',
      title: 'Isi Artikel',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text', validation: (R) => R.required() },
            { name: 'credit', type: 'string', title: 'Kredit Foto' },
            { name: 'consentStatus', type: 'string', title: 'Status Consent', options: { list: ['Consent obtained', 'No individuals shown', 'Pending'] } },
          ],
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Penulis',
      type: 'reference',
      to: [{ type: 'person' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Tanggal Publikasi',
      type: 'datetime',
    }),
    defineField({
      name: 'readingTime',
      title: 'Estimasi Waktu Baca (menit)',
      type: 'number',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Foto Utama',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text', validation: (R) => R.required() },
        { name: 'credit', type: 'string', title: 'Kredit Foto / Fotografer' },
        {
          name: 'consentStatus',
          type: 'string',
          title: 'Status Consent',
          options: {
            list: [
              { title: 'Consent obtained', value: 'consent_obtained' },
              { title: 'No individuals shown', value: 'no_individuals' },
              { title: 'Pending review', value: 'pending' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (opsional, override judul untuk search engine)',
      type: 'string',
      validation: (R) => R.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      validation: (R) => R.max(160),
    }),
  ],
  preview: {
    select: { title: 'title', status: 'status', media: 'featuredImage' },
    prepare({ title, status, media }) {
      return { title, subtitle: status?.toUpperCase(), media }
    },
  },
  orderings: [
    { title: 'Terbaru', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
})
