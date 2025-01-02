import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { publicProcedure, router } from '@/trpc'

const payload = await getPayload({
  config: configPromise,
})
export const costsBreakdownRouter = router({
  getAllCostsBreakdown: publicProcedure.query(async () => {
    try {
      const { docs } = await payload.find({
        collection: 'costsBreakdown',
        depth: 5,
        draft: false,
        limit: 1000,
      })

      return docs
    } catch (error: any) {
      console.log(error)
      throw new Error(error.message)
    }
  }),
})
