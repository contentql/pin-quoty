import { Page } from 'payload-types'

export type QuoteDetailsPageDataType = Omit<
  Page,
  'id' | 'createdAt' | 'updatedAt'
>

export const quoteDetailsPageData: QuoteDetailsPageDataType = {
  title: 'Quote Details',

  layout: [
    {
      collectionSlug: 'quotes',
      blockName: null,
      blockType: 'Details',
    },
  ],

  isHome: false,
  isDynamic: true,
  slugMode: 'generate',
  slug: 'quote-details',
  pathMode: 'custom',
  path: '/quote/[quote-details]',
  parent: null,

  _status: 'published',
}
