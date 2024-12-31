import Link from 'next/link'

export default function Cta({ totalCost }: { totalCost: number | undefined }) {
  return (
    <div className='fixed bottom-0 z-30 w-full bg-white !bg-opacity-80 backdrop-blur-sm dark:bg-slate-950 lg:w-1/2'>
      <div className='mx-auto w-full max-w-xl px-4 sm:px-6'>
        <div className='flex space-x-4 py-4 md:py-6'>
          <Link
            className='btn w-full border-slate-200 bg-white text-slate-900 shadow shadow-black/5 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700'
            href='/contact'>
            Contact Me
          </Link>
          <Link
            className='btn w-full animate-shine bg-blue-500 bg-[linear-gradient(100deg,theme(colors.blue.500),45%,theme(colors.blue.400),55%,theme(colors.blue.500))] bg-[size:200%_100%] text-white shadow shadow-black/5 hover:bg-blue-600 hover:bg-[image:none]'
            href='/pay'>
            Pay - ${totalCost}
          </Link>
        </div>
      </div>
    </div>
  )
}
