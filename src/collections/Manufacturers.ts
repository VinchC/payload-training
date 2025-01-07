import type { CollectionConfig } from 'payload'

export const Manufacturers: CollectionConfig = {
  slug: 'manufacturers',
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
      name: 'cars',
      type: 'join', // implements a bi-directional relation to a collection
      on: 'manufacturer',
      collection: 'cars',
    },
  ],
}
