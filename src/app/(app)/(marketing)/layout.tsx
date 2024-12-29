import '../css/style.css'
import Theme from '../theme-provider'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import QuoteTitle from '@/components/quote-title'
import Header from '@/components/ui/header'

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const getCachedSiteSettings = unstable_cache(
    async () => {
      const payload = await getPayload({
        config: configPromise,
      })

      const data = await payload.findGlobal({
        slug: 'site-settings',
        draft: false,
      })

      return data
    },
    ['site-settings'],
    { tags: ['site-settings'] },
  )
  const metadata = await getCachedSiteSettings()
  return (
    <Theme>
      <div className='flex min-h-screen flex-col overflow-hidden'>
        <Header metadata={metadata} />

        <div className='flex grow flex-col lg:flex-row'>
          {/* Left side */}
          <QuoteTitle title='The Markyk Corp.' date='20 April, 2024' />

          {/* Right side */}
          <main className='flex w-full flex-col max-lg:grow lg:ml-auto lg:w-1/2'>
            {children}
          </main>
        </div>
      </div>
    </Theme>
  )
}
