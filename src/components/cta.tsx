'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Cta({ totalPrice }: { totalPrice: string }) {
  const pathName = usePathname()
  const segments = pathName.split('/')
  const backPath = `${segments.slice(1, 3).join('/')}`
  return (
    <div className='fixed bottom-0 z-30 w-full bg-background !bg-opacity-80 backdrop-blur-sm  lg:w-1/2'>
      <div className='mx-auto w-full max-w-xl px-4 sm:px-6'>
        <div className='flex space-x-4 py-4 md:py-6'>
          <Link
            className='btn w-full border-foreground bg-background text-text shadow shadow-black/5 hover:border-slate-300 dark:hover:border-slate-700'
            href={`/${backPath}/contact`}>
            Contact Me
          </Link>
          <Link
            className='btn w-full animate-shine bg-primary bg-[linear-gradient(100deg,theme(colors.blue.500),45%,theme(colors.blue.400),55%,theme(colors.blue.500))] bg-[size:200%_100%] text-white shadow shadow-black/5 hover:bg-[image:none]'
            href='/pay'>
            Pay - {totalPrice}
          </Link>
        </div>
      </div>
    </div>
  )
}
