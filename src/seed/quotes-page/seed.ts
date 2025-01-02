import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { quotesPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<Page> => {
  try {
    spinner.start(`Started created quotes-page...`)
    const result = await payload.create({
      collection: 'pages',
      data: quotesPageData,
    })

    spinner.succeed(`Started created quotes-page...`)
    return result
  } catch (error) {
    spinner.succeed(`Failed to create quotes-page`)
    throw error
  }
}

export default seed
