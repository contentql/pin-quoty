import { CostsBreakdown } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidateCostsBreakdown: CollectionAfterChangeHook<
  CostsBreakdown
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page

  revalidateTag('list-costsBreakdown')
  revalidateTag(`details-costsBreakdown-${doc?.slug}`)
  console.log(`list-costsBreakdown at ${new Date().getTime()}`)
}
