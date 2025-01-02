import { Page } from 'payload-types'

export type QuotesPageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export const quotesPageData: QuotesPageDataType = {
  title: 'Quotes',

  layout: [
    {
      title: null,
      collectionSlug: 'quotes',
      blockName: null,
      blockType: 'List',
    },
  ],

  isHome: false,

  _status: 'published',
}
