import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // prevent create/delete — singleton
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image (Homepage)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (R) => R.required(),
        },
        {
          name: 'credit',
          type: 'string',
          title: 'Kredit Foto / Fotografer',
        },
      ],
      description: 'Foto utama yang tampil di hero section homepage.',
    }),
    defineField({
      name: 'heroImageSecondary',
      title: 'Hero Image Secondary (opsional)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' },
        { name: 'credit', type: 'string', title: 'Kredit Foto' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
