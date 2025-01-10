import { CostsBreakdownSelect } from '@payload-types'
import { CollectionAfterChangeHook } from 'payload'

import { createProduct } from './route'

const CreateQuoteInLemonSqueezy: CollectionAfterChangeHook = async ({
  collection,
  context,
  doc,
  operation,
  previousDoc,
  req,
}) => {
  if (operation === 'create' || operation === 'update') {
    const { slug, selectCostBreakdowns } = doc

    // Ensure selectCostBreakdowns is properly typed
    const costBreakdowns = selectCostBreakdowns as CostsBreakdownSelect[]

    // Calculate the total quote amount
    const quoteAmount =
      costBreakdowns?.reduce<number>((total, costBreakdown) => {
        const cost =
          typeof costBreakdown.cost === 'number' ? costBreakdown.cost : 0
        return total + cost
      }, 0) || 0

    await createProduct({ slug, quoteAmount })
  }
}

export default CreateQuoteInLemonSqueezy
