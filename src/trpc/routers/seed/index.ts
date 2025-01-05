import { TRPCError } from '@trpc/server'
import ora from 'ora'

import { seedContactPage } from '@/seed/contact-page'
import { seedCostsBreakdown } from '@/seed/costs-breakdown'
import { seedCostsBreakdownDetailsPageData } from '@/seed/costs-breakdown-details-page'
import { seedForms } from '@/seed/forms'
import { seedHomePage } from '@/seed/home-page'
import { seedQuoteDetailsPage } from '@/seed/quote-details-page'
import { seedQuotes } from '@/seed/quotes'
import { seedSiteSettings } from '@/seed/site-settings'
import { seedTerms } from '@/seed/terms'
import { publicProcedure, router } from '@/trpc'

export const seedRouter = router({
  runSeed: publicProcedure.mutation(async () => {
    const spinner = ora({
      text: 'Starting the seeding process...',
      color: 'cyan',
      spinner: 'dots',
    }).start()
    try {
      // Ensure that the seeding functions are called in the correct order.
      // The blogs seeding depends on tags and authors being seeded first.
      // Therefore, make sure to seed tags and authors before seeding blogs.

      await seedCostsBreakdown(spinner)
      await seedTerms(spinner)
      await seedForms(spinner) // Assume this returns seeded forms
      await seedQuotes(spinner)
      await seedHomePage(spinner)
      await seedQuoteDetailsPage(spinner)
      await seedCostsBreakdownDetailsPageData(spinner)
      await seedContactPage(spinner)
      await seedSiteSettings(spinner)

      // await seedSiteSettings(spinner)

      return { success: true }
    } catch (error: any) {
      console.error('Error seeding:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      })
    }
  }),
})
