import { Quote } from '@payload-types'

import Brief from '@/components/brief'
import CostsList from '@/components/costs-list'
import Cta from '@/components/cta'
import QuoteDetails from '@/components/quote-details'
import Terms from '@/components/terms'

export default function QuoteDetailsComponent({
  quote,
  slug,
}: {
  quote: Quote
  slug: string
}) {
  return (
    <>
      <div className='mx-auto w-full max-w-xl grow px-4 py-12 sm:px-6 lg:pb-20 lg:pt-24'>
        <article className='-mt-8 mb-4 divide-y divide-slate-100 dark:divide-slate-800'>
          <Brief aboutHeading={quote?.aboutHeading}>{quote?.aboutQuote}</Brief>
          <QuoteDetails
            quoteDetails={quote?.details}
            quoteDetailsHeading={quote?.detailsHeading}
          />
          <CostsList
            slug={slug}
            costsBreakdowns={quote?.selectCostBreakdowns}
            costsBreakdownHeading={quote?.costsBreakdownHeading}
          />
          <Terms
            terms={quote?.selectTerms}
            termsHeading={quote?.termsHeading}
          />
        </article>
      </div>
      <Cta />
    </>
  )
}
