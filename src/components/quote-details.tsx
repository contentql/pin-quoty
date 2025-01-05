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
          <li key={index} className='rounded-lg bg-foreground px-5 py-4'>
            <div className='font-medium text-text'>{quoteDetail?.title}</div>
            <div className='text-border'>{quoteDetail?.duration}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
