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
    slugMode: 'generate',
    slug: 'costs-breakdown-details',
    pathMode: 'custom',
    path: '/quote/[quote-details]/costs-breakdown/[costs-breakdown-details]',
    parent: null,

    _status: 'published',
  }
