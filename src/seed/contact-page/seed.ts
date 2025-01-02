import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { Ora } from 'ora'
import { RequiredDataFromCollectionSlug, getPayload } from 'payload'

import { contactPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<Page> => {
  spinner.start(`Started created contact-page...`)
  const { docs: pages } = await payload.find({
    collection: 'pages',
  })
  const { docs: formsData } = await payload.find({
    collection: 'forms',
  })
  const pageId = pages?.find(page => page?.slug === 'quote-details')?.id

  const contactPageResult: RequiredDataFromCollectionSlug<'pages'> = {
    ...contactPageData,
    layout: contactPageData?.layout?.map((block, index) => {
      if (block?.blockType === 'FormBlock') {
        return {
          ...block,
          form: {
            relationTo: 'forms',
            value: formsData?.at(0)?.id!,
          },
        }
      }
      return block
    }),
  }

  try {
    const result = await payload.create({
      collection: 'pages',
      data: { ...contactPageResult, parent: pageId },
    })

    spinner.succeed(`Successfully created contact-page...`)
    return result
  } catch (error) {
    spinner.fail(`Failed creating contact-page...`)
    throw error
  }
}

export default seed
