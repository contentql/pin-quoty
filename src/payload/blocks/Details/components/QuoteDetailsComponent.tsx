import { Quote } from '@payload-types'

import Brief from '@/components/brief'
import CostsList from '@/components/costs-list'
import Cta from '@/components/cta'
import QuoteDetails from '@/components/quote-details'
import Terms from '@/components/terms'

export const metadata = {
  title: 'Home - Quoty',
  description: 'Page description',
}

export default function QuoteDetailsComponent({ quote }: { quote: Quote }) {
  const costs = [
    {
      title: 'Competitive Analysis',
      description: 'The client is looking to review the information.',
      price: 7800,
    },
    {
      title: 'UX Research Reports',
      description: 'The client is looking to review the information.',
      price: 2560,
    },
    {
      title: 'Sitemap and Information Architecture',
      description: 'The client is looking to review the information.',
      price: 1420,
    },
    {
      title: 'UX Wireframes and User Flows',
      description: 'The client is looking to review the information.',
      price: 3978,
    },
    {
      title: 'Visual Design',
      description: 'The client is looking to review the information.',
      price: 4476,
    },
    {
      title: 'Interactive Prototypes + Assets Exports',
      description: 'The client is looking to review the information.',
      price: 4326,
    },
  ]

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
