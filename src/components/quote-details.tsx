interface QuoteDetailsProps {
  projectLength: string
  startDate: string
  endDate: string
}

export default function QuoteDetails({
  projectLength,
  startDate,
  endDate,
}: QuoteDetailsProps) {
  return (
    <section className="py-8">
      <h2 className="text-lg font-semibold mb-5">Details</h2>
      <ul className="grid gap-4 min-[480px]:grid-cols-3 text-sm">
        <li className="px-5 py-4 rounded-lg bg-gradient-to-tr from-slate-950 to-slate-800 dark:from-slate-800/80 dark:to-slate-900">
          <div className="text-slate-200 font-medium">Project Length</div>
          <div className="text-slate-400">{projectLength}</div>
        </li>
        <li className="px-5 py-4 rounded-lg bg-gradient-to-tr from-slate-950 to-slate-800 dark:from-slate-800/80 dark:to-slate-900">
          <div className="text-slate-200 font-medium">Start Date</div>
          <time className="text-slate-400">{startDate}</time>
        </li>
        <li className="px-5 py-4 rounded-lg bg-gradient-to-tr from-slate-950 to-slate-800 dark:from-slate-800/80 dark:to-slate-900">
          <div className="text-slate-200 font-medium">End Date</div>
          <time className="text-slate-400">{endDate}</time>
        </li>
      </ul>
    </section>
  )
}
