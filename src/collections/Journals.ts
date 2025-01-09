import type { CollectionConfig } from 'payload'

export const Journals: CollectionConfig = {
  slug: 'journals',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'logo',
      type: 'upload', // type upload needs to be related to a collection
      relationTo: 'media',
    },
    {
      name: 'article',
      type: 'join', // implements a bi-directional relation to a collection
      on: 'journal',
      collection: 'articles',
    },
  ],
}
