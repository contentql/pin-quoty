import { Page } from 'payload-types'

export type CostsBreakdownDetailsPageDataType = Omit<
  Page,
  'id' | 'createdAt' | 'updatedAt'
>

export const costsBreakdownDetailsPageData: CostsBreakdownDetailsPageDataType =
  {
    title: 'Costs Breakdown Details',

    layout: [
      {
        collectionSlug: 'costsBreakdown',
        blockName: null,
        blockType: 'Details',
      },
    ],

    isHome: false,
    isDynamic: true,

    parent: 0,

    _status: 'published',
  }
