import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { costsBreakdownPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<Page> => {
  try {
    spinner.start(`Started created costs-breakdown-page...`)
    const { docs: pages } = await payload.find({
      collection: 'pages',
    })
    const pageId = pages?.find(page => page?.slug === 'quote-details')?.id

    const result = await payload.create({
      collection: 'pages',
      data: { ...costsBreakdownPageData, parent: pageId },
    })

    spinner.succeed(`Started created costs-breakdown-page...`)
    return result
  } catch (error) {
    spinner.succeed(`Failed to create costs-breakdown-page`)
    throw error
  }
}

export default seed
