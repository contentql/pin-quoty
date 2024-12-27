import Link from 'next/link'
import { useMemo } from 'react'

import { formatValue } from '@/utils/utils'

interface Cost {
  title: string
  description: string
  price: number
}

export default function CostsList({ costs }: { costs: Cost[] }) {
  const totalCost: number = useMemo<number>(() => {
    return costs.reduce((acc: number, cost: Cost) => acc + cost.price, 0)
  }, [costs])

  return (
    <section className='py-8'>
      <h2 className='mb-5 text-lg font-semibold'>Costs Breakdown</h2>
      <div className='overflow-x-auto'>
        <table className='w-full table-auto text-sm'>
          <thead className='sr-only'>
            <tr>
              <th>Description</th>
              <th scope='col'>Cost</th>
            </tr>
          </thead>
          <tbody>
            {costs.map((cost, index) => (
              <tr
                key={index}
                className='group from-slate-100 to-slate-50 odd:bg-gradient-to-tr dark:from-slate-800/80 dark:to-slate-900'>
                <th
                  scope='row'
                  className='relative px-4 py-5 text-left font-normal first:rounded-l-lg last:rounded-r-lg'>
                  <div className='mb-0.5 font-semibold'>
                    <Link
                      className='before:absolute before:inset-0 before:z-20 before:rounded-lg'
                      href='/details'>
                      {cost.title}
                    </Link>
                  </div>
                  <p className='text-slate-500 dark:text-slate-400'>
                    {cost.description}
                  </p>
                </th>
                <td className="relative w-[1%] px-4 py-5 text-right font-semibold after:pointer-events-none after:absolute after:inset-0 after:flex after:items-center after:justify-end after:whitespace-nowrap after:rounded-lg after:bg-gradient-to-l after:from-white after:to-50% after:pr-4 after:font-medium after:tracking-normal after:text-blue-500 after:opacity-0 after:transition after:content-['Details_->'] first:rounded-l-lg last:rounded-r-lg group-odd:after:from-slate-50 group-hover:after:opacity-100 dark:after:from-slate-950 group-odd:dark:after:from-slate-900">
                  <Link
                    className='transition-opacity before:absolute before:inset-0 before:z-20 before:rounded-lg group-hover:opacity-0'
                    href='/details'
                    tabIndex={-1}>
                    {formatValue(cost.price)}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope='row' className='px-4 py-5 text-left font-normal'>
                <p className='italic text-slate-500'>TOT in USD dollar</p>
              </th>
              <td className='w-[1%] px-4 py-5 text-right text-base font-semibold text-emerald-500 underline'>
                {formatValue(totalCost)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  )
}
