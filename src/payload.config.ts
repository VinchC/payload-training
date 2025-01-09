// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Articles } from './collections/Articles'
import { Journals } from './collections/Journals'
import { Pages } from './collections/Pages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Articles, Journals, Pages],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({
        blocks: [
          {
            slug: 'articleHighLight',
            fields: [
              {
                name: 'article',
                type: 'relationship',
                relationTo: 'articles',
              },
              {
                name: 'type',
                type: 'radio',
                defaultValue: 'image',
                options: [
                  {
                    label: 'Image',
                    value: 'image',
                  },
                  {
                    label: 'Gallery',
                    value: 'gallery',
                  },
                ],
              },
            ],
          },
        ],
        inlineBlocks: [
          {
            slug: 'articleTitle',
            admin: {
              components: {
                Label: '/components/ArticleTitleLabel',
              },
            },
            fields: [
              {
                name: 'article',
                type: 'relationship',
                relationTo: 'articles',
              },
            ],
          },
        ],
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
