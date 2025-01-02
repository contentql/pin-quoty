import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { quoteDetailsPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<Page> => {
  try {
    spinner.start(`Started created quote-details-page...`)
    const { docs: pages } = await payload.find({
      collection: 'pages',
    })

    const pageId = pages?.find(page => page?.slug === 'quotes')?.id
    const result = await payload.create({
      collection: 'pages',
      data: { ...quoteDetailsPageData, parent: pageId },
    })

    spinner.succeed(`Successfully created quote-details-page`)
    return result
  } catch (error) {
    spinner.succeed(`Failed to create quote-details-page`)
    throw error
  }
}

export default seed
