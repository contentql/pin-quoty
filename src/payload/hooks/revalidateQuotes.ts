import { Quote } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateQuotesAfterChange: CollectionAfterChangeHook<
  Quote
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-quotes')
    revalidateTag(`details-quotes-${doc?.slug}`)
    console.log(`list-quotes at ${new Date().getTime()}`)
  }
}

export const revalidateQuotesAfterDelete: CollectionAfterDeleteHook<
  Quote
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-quotes')
    revalidateTag(`details-quotes-${doc?.slug}`)
    console.log(`list-quotes at ${new Date().getTime()}`)
  }
}
