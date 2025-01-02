import configPromise from '@payload-config'
import { Term } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { termsData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<(string | Term)[]> => {
  try {
    spinner.start(`Started created terms...`)

    const results = await Promise.allSettled(
      termsData.map(termData =>
        payload.create({
          collection: 'terms',
          data: termData,
        }),
      ),
    )

    const formattedResults = results.map(result =>
      result.status === 'fulfilled'
        ? result.value
        : `Failed to seed: ${result.reason}`,
    )
    spinner.start(`Successfully created terms.`)
    return formattedResults
  } catch (error) {
    spinner.succeed(`Failed to create terms`)
    throw error
  }
}

export default seed
