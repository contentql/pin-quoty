'use client'

import { CostsBreakdown } from '@payload-types'
import { slateToHtml } from '@slate-serializers/html'
import DOMPurify from 'isomorphic-dompurify'
import { usePathname } from 'next/navigation'

import BackButton from '@/components/ui/back-button'

export default function CostsBreakdownDetails({
  costsBreakdown,
}: {
  costsBreakdown: CostsBreakdown
}) {
  const pathName = usePathname()
  const segments = pathName.split('/')
  const backPath = `${segments.slice(1, 3).join('/')}`
  const html = slateToHtml(costsBreakdown?.content!)
  const sanitizeHtml = DOMPurify.sanitize(html, {
    ADD_ATTR: ['target'], // Allow the "target" attribute
    ADD_TAGS: ['iframe'], // You can also add other tags if needed (optional)
  })
  return (
    <div className='mx-auto w-full max-w-xl grow px-4 py-12 sm:px-6 lg:pb-20 lg:pt-24'>
      <BackButton path={backPath} />

      <article>
        <h2 className='h2 font-orbiter mb-4'>{costsBreakdown?.title}</h2>
        <div
          className='prose space-y-4 text-slate-500 dark:text-slate-400'
          dangerouslySetInnerHTML={{ __html: sanitizeHtml }}
        />
      </article>
    </div>
  )
}
