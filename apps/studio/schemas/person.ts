import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'person',
  title: 'Tim (Person)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Lengkap',
      type: 'string',
      description: 'Jangan otomatis tambahkan gelar "Dr." — hanya tambahkan jika sudah dikonfirmasi untuk ditampilkan.',
      validation: (R) => R.required(),
    }),
    defineField({ name: 'role', title: 'Jabatan / Peran', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'photograph',
      title: 'Foto Portrait',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),
    defineField({ name: 'biography', title: 'Biografi Singkat', type: 'text', rows: 4 }),
    defineField({ name: 'affiliation', title: 'Afiliasi Institusi', type: 'string' }),
    defineField({ name: 'orcid', title: 'ORCID', type: 'string' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
    defineField({
      name: 'selectedPublications',
      title: 'Selected Publications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tuliskan publikasi dalam format citation singkat.',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Urutan Tampil',
      type: 'number',
      description: 'Angka kecil = tampil lebih dulu.',
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photograph' },
  },
  orderings: [
    { title: 'Urutan Tampil', name: 'displayOrderAsc', by: [{ field: 'displayOrder', direction: 'asc' }] },
  ],
})
