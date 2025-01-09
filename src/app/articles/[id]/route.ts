'use client'

import configPromise from '@payload-config'
import { useParams } from 'next/navigation'
import { getPayload } from 'payload'

export default async function Page() {
  const { id } = useParams()

  const payload = getPayload({
    config: configPromise,
  })

  const data = (await payload).findByID({
    id: `articles/${id}`,
    collection: 'articles',
  })

  return Response.json(data)
}
