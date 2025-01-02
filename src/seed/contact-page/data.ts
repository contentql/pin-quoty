import { Page } from 'payload-types'

export type ContactPageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export const contactPageData: ContactPageDataType = {
  title: 'Contact',

  layout: [
    {
      title: 'Contact Me',
      blockName: null,
      blockType: 'FormBlock',

      form: {
        relationTo: 'forms',

        value: 0,
      },
    },
  ],

  isHome: false,
  isDynamic: false,

  parent: 0,

  _status: 'published',
}
