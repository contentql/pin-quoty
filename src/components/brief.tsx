export default function Brief({
  aboutHeading,
  children,
}: {
  aboutHeading: string | null | undefined
  children: React.ReactNode
}) {
  return (
    <section className='py-8'>
      <h2 className='mb-2 text-lg font-semibold'>{aboutHeading}</h2>
      <div className='space-y-4 text-slate-500 dark:text-slate-400'>
        {children}
      </div>
    </section>
  )
}
