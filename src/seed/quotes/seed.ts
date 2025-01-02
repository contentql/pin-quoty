import configPromise from '@payload-config'
import { Quote } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { QuoteDataType, quotesData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<(string | Quote)[]> => {
  const { docs: costsBreakdownData } = await payload.find({
    collection: 'costsBreakdown',
  })
  const { docs: termsData } = await payload.find({
    collection: 'terms',
  })
  try {
    spinner.start(`Started created quotes...`)

    const formattedQuotesData: QuoteDataType[] = quotesData.map(quoteData => {
      const formattedQuote = {
        ...quoteData,
        selectCostBreakdowns: costsBreakdownData?.map(costsBreakdown => ({
          ...costsBreakdown,
          title: costsBreakdown?.title,
          description: costsBreakdown?.description,
          content: costsBreakdown?.content,
          cost: costsBreakdown?.cost,
        })),
        selectTerms: termsData?.map(termData => ({
          ...termData,
          title: termData.title,
          description: termData.description,
        })),
      }

      return formattedQuote
    })

    const results = await Promise.allSettled(
      formattedQuotesData.map(quoteData =>
        payload.create({
          collection: 'quotes',
          data: quoteData,
        }),
      ),
    )

    const formattedResults = results.map(result =>
      result.status === 'fulfilled'
        ? result.value
        : `Failed to seed: ${result.reason}`,
    )
    spinner.start(`Successfully created quotes.`)
    return formattedResults
  } catch (error) {
    spinner.succeed(`Failed to create quotes`)
    throw error
  }
}

export default seed
