import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'heroImages',
      title: 'Hero Images (Slideshow)',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', type: 'string', title: 'Alt Text', validation: (R) => R.required() },
          { name: 'credit', type: 'string', title: 'Kredit Foto' },
        ],
      }],
      description: 'Upload 3-5 foto landscape. Berganti otomatis tiap 6 detik.',
      validation: (R) => R.max(5),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image (lama)',
      type: 'image',
      hidden: true,
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' },
        { name: 'credit', type: 'string', title: 'Kredit Foto' },
      ],
    }),
  ],
  preview: {
    prepare() { return { title: 'Site Settings' } },
  },
})