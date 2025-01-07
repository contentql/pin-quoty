'use client'

import { formatCurrency } from '@contentql/core/client'
import { CostsBreakdownSelect, Quote, SiteSetting, User } from '@payload-types'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import Brief from '@/components/brief'
import Button from '@/components/common/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/common/Dialog'
import { Input } from '@/components/common/Input'
import CostsList from '@/components/costs-list'
import Cta from '@/components/cta'
import QuoteDetails from '@/components/quote-details'
import Terms from '@/components/terms'

export default function QuoteDetailsComponent({
  quote,
  slug,
  user,
  generalData,
}: {
  quote: Quote
  slug: string
  user: User | null
  generalData: SiteSetting['general']
}) {
  const [email, setEmail] = useState('')
  const [isEmailVerified, setIsEmailVerified] = useState(false)

  useEffect(() => {
    const customerEmail = localStorage.getItem('customerEmail')
    if (user?.role.includes('admin') || customerEmail) {
      setIsEmailVerified(true)
    }
  }, [user])

  const totalCost = quote?.selectCostBreakdowns?.reduce<number>(
    (total, costBreakdown) => {
      const breakdown = costBreakdown as CostsBreakdownSelect
      const cost = typeof breakdown?.cost === 'number' ? breakdown.cost : 0
      return total + cost
    },
    0,
  )

  const currency = {
    amount: totalCost ?? 0,
    currencyCode: generalData?.currency,
  }

  const totalPrice = formatCurrency(currency)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (email === quote.email) {
      localStorage.setItem('customerEmail', email)
      toast.success('Your email has been successfully saved!')
      setIsEmailVerified(true) // Trigger re-render after email verification
    } else {
      toast.error('Email does not match! Please try again.')
    }
  }

  if (isEmailVerified) {
    return (
      <>
        <div className='mx-auto w-full max-w-xl grow px-4 py-12 sm:px-6 lg:pb-20 lg:pt-24'>
          <article className='-mt-8 mb-4 divide-y divide-foreground'>
            <Brief aboutHeading={quote?.aboutHeading}>
              {quote?.aboutQuote}
            </Brief>
            <QuoteDetails
              quoteDetails={quote?.details}
              quoteDetailsHeading={quote?.detailsHeading}
            />
            <CostsList
              totalPrice={totalPrice}
              currencyCode={generalData?.currency}
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
        <Cta totalPrice={totalPrice} />
      </>
    )
  }

  return (
    <>
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Your Email</DialogTitle>
            <DialogDescription>
              Could you please provide your email address where you receive the
              quote in order to access it?
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className='mt-6 flex flex-col gap-y-5'>
            <div>
              <label
                htmlFor='email'
                className='mb-2 text-sm font-medium text-text'>
                Email <span className='text-red-500'>*</span>
              </label>
              <Input
                placeholder='Enter your Email'
                type='email'
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className='text-white'
              />
            </div>

            <div className='inline-flex w-full justify-end'>
              <Button type='submit'>Submit</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
