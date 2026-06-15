import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'sinar-institute',
  title: 'SINAR Institute CMS',

  projectId: process.env.SANITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'tld5bj2r',
  dataset: process.env.SANITY_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Konten')
          .items([
            S.listItem()
              .title('Insights & Artikel')
              .child(S.documentTypeList('insight').title('Insights')),
            S.listItem()
              .title('Research Projects')
              .child(S.documentTypeList('researchProject').title('Research Projects')),
            S.listItem()
              .title('Publikasi')
              .child(S.documentTypeList('publication').title('Publikasi')),
            S.divider(),
            S.listItem()
              .title('Tim (People)')
              .child(S.documentTypeList('person').title('Tim')),
            S.listItem()
              .title('Partner & Institusi')
              .child(S.documentTypeList('partner').title('Partner')),
            S.divider(),
            // Singleton — Site Settings
            S.listItem()
              .title('⚙️ Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Site Settings')
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
