import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Partner & Institusi',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nama Institusi', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: false },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),
    defineField({ name: 'url', title: 'Website URL', type: 'url' }),
    defineField({
      name: 'relationshipLabel',
      title: 'Label Hubungan',
      type: 'string',
      options: {
        list: [
          { title: 'Academic Affiliation', value: 'Academic Affiliation' },
          { title: 'Research Dialogue', value: 'Research Dialogue' },
          { title: 'Local Stakeholder', value: 'Local Stakeholder' },
          { title: 'Technical Collaborator', value: 'Technical Collaborator' },
          { title: 'Community Engagement Partner', value: 'Community Engagement Partner' },
        ],
      },
    }),
    defineField({ name: 'displayOrder', title: 'Urutan Tampil', type: 'number', initialValue: 99 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'relationshipLabel', media: 'logo' },
  },
})
