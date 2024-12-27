import Brief from '@/components/brief'
import CostsList from '@/components/costs-list'
import Cta from '@/components/cta'
import QuoteDetails from '@/components/quote-details'
import Terms from '@/components/terms'

export const metadata = {
  title: 'Home - Quoty',
  description: 'Page description',
}

export default function Home() {
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
          <Brief>
            The client is looking to review and revamp the information
            architecture, user experience and user interface design of{' '}
            <strong className='font-medium text-slate-900 dark:text-slate-200'>
              The Markyk Corp.
            </strong>
            , a web application that connects landlords and tenants across
            Europe and America.
          </Brief>
          <QuoteDetails
            projectLength='4-8 Weeks'
            startDate='27 Jun, 2024'
            endDate='27 Aug, 2024'
          />
          <CostsList costs={costs} />
          <Terms />
        </article>
      </div>
      <Cta />
    </>
  )
}
