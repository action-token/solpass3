'use client'

import { use } from 'react'
import { CollectionPage } from '@/components/collection-page'

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

export default function Collection({ params }: CollectionPageProps) {
  const { slug } = use(params)

  return <CollectionPage slug={slug} />
}
