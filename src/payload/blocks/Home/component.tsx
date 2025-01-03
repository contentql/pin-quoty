import { Params } from '../types'
import configPromise from '@payload-config'
import { HomeType } from '@payload-types'
import { Copy } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

import { getCurrentUser } from '@/utils/getCurrentUser'

interface HomeProps extends HomeType {
  params: Params
}

const Home: React.FC<HomeProps> = async ({ params, ...block }) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const headerList = await headers()
  const user = await getCurrentUser(headerList)
  if (!user) {
    redirect('/sign-in')
  }

  const { docs: quotesData } = await payload.find({ collection: 'quotes' })
  console.log({ quotesData })

  return (
    <section className='center mx-auto w-full max-w-2xl py-24'>
      <h2 className='mb-5 text-lg font-semibold'>{block?.heading}</h2>
      <div className='overflow-x-auto'>
        <table className='w-full table-auto text-sm'>
          <tbody>
            {quotesData?.map((quoteData, index) => (
              <tr
                key={index}
                className='group from-slate-100 to-slate-50 odd:bg-gradient-to-tr dark:from-slate-800/80 dark:to-slate-900'>
                <th
                  scope='row'
                  className='relative px-4 py-5 text-left font-normal first:rounded-l-lg last:rounded-r-lg'>
                  <div className='mb-0.5 font-semibold'>
                    <Link
                      className='before:absolute before:inset-0 before:z-20 before:rounded-lg'
                      href={`/quote/${quoteData?.slug}`}>
                      {quoteData?.quote}
                    </Link>
                  </div>
                  <p className='line-clamp-3 text-slate-500 dark:text-slate-400'>
                    {quoteData?.aboutQuote}
                  </p>
                </th>
                <td>
                  {/* Copy icon */}
                  <button
                    className='flex items-center justify-center px-4 py-5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                    aria-label='Copy quote'>
                    <Copy size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Home
