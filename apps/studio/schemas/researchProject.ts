import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'researchProject',
  title: 'Research Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Judul Project', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'acronym', title: 'Akronim (contoh: TIDE 2026)', type: 'string' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Planning', value: 'Planning' },
          { title: 'Active', value: 'Active' },
          { title: 'Data Collection', value: 'Data Collection' },
          { title: 'Data Analysis', value: 'Data Analysis' },
          { title: 'In Preparation', value: 'In Preparation' },
          { title: 'Under Review', value: 'Under Review' },
          { title: 'Published', value: 'Published' },
          { title: 'Completed', value: 'Completed' },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'duration', title: 'Durasi (contoh: 2026–2028)', type: 'string' }),
    defineField({ name: 'location', title: 'Lokasi', type: 'string' }),
    defineField({
      name: 'investigators',
      title: 'Peneliti',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'person', title: 'Nama', type: 'reference', to: [{ type: 'person' }] },
          { name: 'role', title: 'Peran (contoh: Principal Investigator)', type: 'string' },
        ],
        preview: {
          select: { title: 'person.name', subtitle: 'role' },
        },
      }],
    }),
    defineField({
      name: 'overview',
      title: 'Deskripsi Project',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'domains',
      title: 'Research Domains',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Nama Domain', type: 'string', validation: (R) => R.required() },
          { name: 'description', title: 'Deskripsi', type: 'text', rows: 2 },
          { name: 'isExploratory', title: 'Exploratory (bukan core)?', type: 'boolean', initialValue: false },
        ],
        preview: {
          select: { title: 'name', subtitle: 'isExploratory' },
          prepare({ title, subtitle }) {
            return { title, subtitle: subtitle ? '⚠ Exploratory' : 'Core Domain' }
          },
        },
      }],
    }),
    defineField({
      name: 'studyDesign',
      title: 'Study Design',
      type: 'object',
      fields: [
        { name: 'designType', title: 'Tipe Desain', type: 'string' },
        { name: 'estimatedPopulation', title: 'Estimasi Populasi', type: 'string' },
        { name: 'householdTarget', title: 'Target Rumah Tangga', type: 'string' },
        { name: 'methods', title: 'Metode', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } },
      ],
    }),
    defineField({
      name: 'targets',
      title: 'Target & Angka',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string', validation: (R) => R.required() },
          { name: 'value', title: 'Nilai', type: 'string', validation: (R) => R.required() },
          { name: 'unit', title: 'Satuan (opsional)', type: 'string' },
          {
            name: 'type',
            title: 'Tipe Angka',
            type: 'string',
            options: {
              list: [
                { title: 'Estimated', value: 'Estimated' },
                { title: 'Planned', value: 'Planned' },
                { title: 'Target', value: 'Target' },
                { title: 'Achieved', value: 'Achieved' },
                { title: 'Verified', value: 'Verified' },
              ],
            },
            validation: (R) => R.required(),
          },
        ],
        preview: {
          select: { title: 'label', subtitle: 'type' },
        },
      }],
    }),
    defineField({
      name: 'outputs',
      title: 'Output yang Direncanakan',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline / Milestones',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'milestone', title: 'Milestone', type: 'string' },
          {
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
              list: [
                { title: 'Upcoming', value: 'upcoming' },
                { title: 'In Progress', value: 'in_progress' },
                { title: 'Completed', value: 'completed' },
              ],
            },
          },
        ],
        preview: { select: { title: 'milestone', subtitle: 'status' } },
      }],
    }),
    defineField({
      name: 'relationships',
      title: 'Institutional Relationships',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'institution', title: 'Nama Institusi', type: 'string', validation: (R) => R.required() },
          {
            name: 'relationshipLabel',
            title: 'Label Hubungan',
            type: 'string',
            options: {
              list: [
                { title: 'Academic Affiliation', value: 'Academic Affiliation' },
                { title: 'Research Partner', value: 'Research Partner' },
                { title: 'Local Stakeholder', value: 'Local Stakeholder' },
                { title: 'Technical Contributor', value: 'Technical Contributor' },
                { title: 'Community Partner', value: 'Community Partner' },
              ],
            },
            validation: (R) => R.required(),
          },
        ],
        preview: { select: { title: 'institution', subtitle: 'relationshipLabel' } },
      }],
    }),
    defineField({
      name: 'findingsPublished',
      title: 'Preliminary Findings sudah siap dipublikasikan?',
      type: 'boolean',
      initialValue: false,
      description: 'Jika false, tombol "View Preliminary Findings" akan disembunyikan di website.',
    }),
    defineField({
      name: 'downloads',
      title: 'File Unduhan',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'file', title: 'File', type: 'file' },
        ],
        preview: { select: { title: 'label' } },
      }],
    }),
    defineField({
      name: 'relatedInsights',
      title: 'Insights Terkait',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'insight' }] }],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Foto Utama',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status', media: 'featuredImage' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media }
    },
  },
})
