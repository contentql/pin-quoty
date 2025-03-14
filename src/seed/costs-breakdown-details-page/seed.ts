import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { costsBreakdownDetailsPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<Page> => {
  try {
    spinner.start(`Started created costs-breakdown-details-page...`)

    const result = await payload.create({
      collection: 'pages',
      data: { ...costsBreakdownDetailsPageData },
    })

    spinner.succeed(`Successfully created costs-breakdown-details-page`)
    return result
  } catch (error) {
    spinner.succeed(`Failed to create costs-breakdown-details-page`)
    throw error
  }
}

export default seed
