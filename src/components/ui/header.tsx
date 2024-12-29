'use client'

import { Media, SiteSetting } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import ThemeToggle from './theme-toggle'

export default function Header({ metadata }: { metadata: SiteSetting }) {
  const pathName = usePathname()
  const segments = pathName.split('/')
  const backPath = `${segments.slice(1, 3).join('/')}`
  return (
    <header className='absolute z-30 w-full'>
      <div className='mx-auto max-w-xl px-4 sm:px-6 lg:max-w-[calc(50%+theme(maxWidth.xl))]'>
        <div className='flex h-16 items-center justify-between md:h-20'>
          {/* Site branding */}
          <div className='mr-4 shrink-0 lg:fixed'>
            {/* Logo */}
            <Link
              className='flex items-center space-x-4'
              href={`/${backPath}`}
              aria-label='Cruip'>
              <Image
                className='rounded-full'
                src={(metadata?.navbar?.logo?.imageUrl as Media)?.url!}
                width='32'
                height='32'
                alt={(metadata?.navbar?.logo?.imageUrl as Media)?.alt || 'Logo'}
              />
              <span className='font-caveat text-xl text-slate-200'>
                {metadata?.general?.title}
              </span>
            </Link>
          </div>

          {/* Right side */}
          <div className='flex grow justify-end'>
            {/* Light switch */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
