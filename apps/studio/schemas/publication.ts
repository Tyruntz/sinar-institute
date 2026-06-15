import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'publication',
  title: 'Publikasi',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Judul', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'authors', title: 'Penulis (format: Yapanto AM, Lestari KA, et al.)', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'year', title: 'Tahun', type: 'number' }),
    defineField({
      name: 'status',
      title: 'Status Publikasi',
      type: 'string',
      options: {
        list: [
          { title: 'Published', value: 'Published' },
          { title: 'Under Review', value: 'Under Review' },
          { title: 'In Preparation', value: 'In Preparation' },
          { title: 'Planned', value: 'Planned' },
          { title: 'Future Research', value: 'Future Research' },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'scope', title: 'Scope / Deskripsi Singkat', type: 'text', rows: 3 }),
    defineField({ name: 'abstract', title: 'Abstract', type: 'text', rows: 6 }),
    defineField({ name: 'journal', title: 'Jurnal', type: 'string' }),
    defineField({ name: 'doi', title: 'DOI', type: 'string' }),
    defineField({ name: 'articleUrl', title: 'URL Artikel', type: 'url' }),
    defineField({ name: 'preprintUrl', title: 'URL Preprint', type: 'url' }),
    defineField({ name: 'pdfFile', title: 'PDF File', type: 'file' }),
    defineField({ name: 'citation', title: 'Citation (format APA/Vancouver)', type: 'text', rows: 3 }),
    defineField({
      name: 'relatedProject',
      title: 'Research Project Terkait',
      type: 'reference',
      to: [{ type: 'researchProject' }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status' },
    prepare({ title, subtitle }) {
      const statusEmoji: Record<string, string> = {
        'Published': '✅',
        'Under Review': '🔍',
        'In Preparation': '✏️',
        'Planned': '📋',
        'Future Research': '🔭',
      }
      return { title, subtitle: `${statusEmoji[subtitle] || ''} ${subtitle}` }
    },
  },
  orderings: [
    { title: 'Status', name: 'statusAsc', by: [{ field: 'status', direction: 'asc' }] },
    { title: 'Tahun Terbaru', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
})
