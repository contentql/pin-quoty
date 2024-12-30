import { Term, TermsSelect } from '@payload-types'

import Accordion from '@/components/ui/accordion'

export default function Terms({
  terms,
  termsHeading,
}: {
  terms: (number | Term)[] | null | undefined
  termsHeading: string | null | undefined
}) {
  return (
    <section className='py-8'>
      <h2 className='mb-5 text-lg font-semibold'>{termsHeading}</h2>
      <div className='space-y-3'>
        {terms?.map((term, index) => (
          <Accordion
            key={index}
            title={(term as TermsSelect)?.title}
            id={`terms-${index}`}
            active={false}>
            {(term as TermsSelect)?.description}
          </Accordion>
        ))}
      </div>
    </section>
  )
}
