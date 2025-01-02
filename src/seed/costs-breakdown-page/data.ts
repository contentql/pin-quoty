import { Page } from 'payload-types'

export type CostsBreakdownPageDataType = Omit<
  Page,
  'id' | 'createdAt' | 'updatedAt'
>

export const costsBreakdownPageData: CostsBreakdownPageDataType = {
  title: 'Costs Breakdown',

  layout: [
    {
      title: null,
      collectionSlug: 'costsBreakdown',
      blockName: null,
      blockType: 'List',
    },
  ],
  isHome: false,
  isDynamic: false,

  parent: 0,

  _status: 'published',
}
