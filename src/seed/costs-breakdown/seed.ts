import configPromise from '@payload-config'
import { CostsBreakdown } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { costsBreakdownsData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<(string | CostsBreakdown)[]> => {
  try {
    spinner.start(`Started created costsBreakdown...`)

    const results = await Promise.allSettled(
      costsBreakdownsData.map(costsBreakdown =>
        payload.create({
          collection: 'costsBreakdown',
          data: costsBreakdown,
        }),
      ),
    )

    const formattedResults = results.map(result =>
      result.status === 'fulfilled'
        ? result.value
        : `Failed to seed: ${result.reason}`,
    )
    spinner.start(`Successfully created costsBreakdown.`)
    return formattedResults
  } catch (error) {
    spinner.succeed(`Failed to create costsBreakdown`)
    throw error
  }
}

export default seed
