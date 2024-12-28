export default function QuoteDetails({
  quoteDetails,
  quoteDetailsHeading,
}: {
  quoteDetails:
    | {
        title?: string | null
        duration?: string | null
        id?: string | null
      }[]
    | null
    | undefined
  quoteDetailsHeading: string | null | undefined
}) {
  return (
    <section className='py-8'>
      <h2 className='mb-5 text-lg font-semibold'>{quoteDetailsHeading}</h2>
      <ul className='grid gap-4 text-sm min-[480px]:grid-cols-3'>
        {quoteDetails?.map((quoteDetail, index) => (
          <li
            key={index}
            className='rounded-lg bg-gradient-to-tr from-slate-950 to-slate-800 px-5 py-4 dark:from-slate-800/80 dark:to-slate-900'>
            <div className='font-medium text-slate-200'>
              {quoteDetail?.title}
            </div>
            <div className='text-slate-400'>{quoteDetail?.duration}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
