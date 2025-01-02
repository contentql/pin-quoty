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

  parent: 0,

  _status: 'published',
}
