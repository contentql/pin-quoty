import Link from 'next/link'

export default function BackButton({ path }: { path: string }) {
  return (
    <div className='z-40 mb-6 lg:absolute lg:top-6 lg:mb-0'>
      <Link
        className='relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white shadow shadow-black/5 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
        href={`/${path}`}>
        <svg width='12' height='10' xmlns='http://www.w3.org/2000/svg'>
          <path
            className='fill-blue-500'
            d='m5.94 10 1.05-.959-3.645-3.344H11.5V4.303H3.345L6.99.954 5.94 0 .5 5z'
          />
        </svg>
        <span className='sr-only'>Back to Home</span>
      </Link>
    </div>
  )
}
