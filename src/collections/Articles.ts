import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'featuredImage',
      type: 'upload', // type upload needs to be related to a collection
      relationTo: 'media',
    },
    {
      name: 'journal',
      type: 'relationship', // type relationship upload needs to be related to a collection
      relationTo: 'journals',
    },
  ],
}
