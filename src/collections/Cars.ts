import type { CollectionConfig } from 'payload'

export const Cars: CollectionConfig = {
  slug: 'cars',
  admin: {
    useAsTitle: 'title',
  },
  // utility ???
  hooks: {
    afterRead: [
      ({ doc }) => {
        doc.doILikeIt = doc.title.includes('Vantage')
        return doc
      },
    ],
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
      name: 'manufacturer',
      type: 'relationship', // type relationship upload needs to be related to a collection
      relationTo: 'manufacturers',
    },
  ],
}
