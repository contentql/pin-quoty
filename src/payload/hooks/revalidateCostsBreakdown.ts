import { CostsBreakdown } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateCostsBreakdownAfterChange: CollectionAfterChangeHook<
  CostsBreakdown
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page

  revalidateTag('list-costsBreakdown')
  revalidateTag(`details-costsBreakdown-${doc?.slug}`)
  console.log(`list-costsBreakdown at ${new Date().getTime()}`)
}

export const revalidateCostsBreakdownAfterDelete: CollectionAfterDeleteHook<
  CostsBreakdown
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page

  revalidateTag('list-costsBreakdown')
  revalidateTag(`details-costsBreakdown-${doc?.slug}`)
  console.log(`list-costsBreakdown at ${new Date().getTime()}`)
}
