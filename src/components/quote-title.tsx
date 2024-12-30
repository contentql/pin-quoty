import configPromise from '@payload-config'
import { format } from 'date-fns'
import Image from 'next/image'
import { getPayload } from 'payload'

import { Params } from '@/payload/blocks/types'
import Illustration from '@/public/images/bg-illustration.svg'

interface QuoteTitleProps {
  params: Params
}

export default async function QuoteTitle({ params }: QuoteTitleProps) {
  const quoteSlug = params.route.at(1)
  const payload = await getPayload({
    config: configPromise,
  })
  const { docs: quote } = await payload.find({
    collection: 'quotes',
    where: {
      slug: {
        equals: quoteSlug,
      },
    },
  })
  const quoteData = quote?.at(0)
  const date = format(new Date(quoteData?.date!), 'dd-MMMM-yyyy')
  return (
    <div className='no-scrollbar relative w-full bg-slate-900 lg:fixed lg:inset-0 lg:w-1/2 lg:overflow-y-auto lg:rounded-r-[3rem]'>
      {/* Background Illustration */}
      <div
        className='pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-64 blur-3xl'
        aria-hidden='true'>
        <Image
          className='max-w-none'
          src={Illustration}
          width={785}
          height={685}
          alt='Bg illustration'
        />
      </div>

      <div className='mx-auto flex min-h-full w-full max-w-xl flex-col justify-start px-4 pb-20 pt-36 sm:px-6 lg:py-20'>
        <div className='flex grow flex-col justify-center'>
          <div className='space-y-3'>
            <div className='font-caveat text-3xl text-blue-500'>
              {quoteData?.heading}
            </div>
            <h1 className='h1 font-orbiter font-bold text-white'>
              {quoteData?.quote}
            </h1>
            <time className="block font-caveat text-xl text-slate-400 before:content-['—_']">
              {date}
            </time>
          </div>
        </div>
      </div>
    </div>
  )
}
