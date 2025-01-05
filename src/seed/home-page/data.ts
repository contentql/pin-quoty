import { Page } from 'payload-types'

export type HomePageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export const homePageData: HomePageDataType = {
  title: 'Home',

  layout: [
    {
      heading: 'Your Quotes',
      blockName: null,
      blockType: 'Home',
    },
  ],

  isHome: true,
  _status: 'published',
}
