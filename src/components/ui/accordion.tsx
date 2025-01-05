'use client'

import { useEffect, useState } from 'react'

type AccordionpProps = {
  children: React.ReactNode
  title: string | boolean | undefined
  id: string
  active?: boolean
}

export default function Accordion({
  children,
  title,
  id,
  active = false,
}: AccordionpProps) {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false)

  useEffect(() => {
    setAccordionOpen(active)
  }, [])

  return (
    <div className='rounded-lg text-sm odd:bg-foreground'>
      <h3>
        <button
          className='flex w-full items-center justify-between px-5 py-3 text-left font-medium'
          onClick={e => {
            e.preventDefault()
            setAccordionOpen(!accordionOpen)
          }}
          aria-expanded={accordionOpen}
          aria-controls={`accordion-text-${id}`}>
          <span>{title}</span>
          <svg
            className='ml-8 shrink-0 fill-border'
            width='12'
            height='12'
            xmlns='http://www.w3.org/2000/svg'>
            <rect
              y='5'
              width='12'
              height='2'
              rx='1'
              className={`origin-center transform transition duration-200 ease-out ${accordionOpen && '!rotate-180'}`}
            />
            <rect
              y='5'
              width='12'
              height='2'
              rx='1'
              className={`origin-center rotate-90 transform transition duration-200 ease-out ${accordionOpen && '!rotate-180'}`}
            />
          </svg>
        </button>
      </h3>
      <div
        id={`accordion-text-${id}`}
        role='region'
        aria-labelledby={`accordion-title-${id}`}
        className={`grid overflow-hidden text-border transition-all duration-300 ease-in-out ${accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className='overflow-hidden'>
          <p className='px-5 pb-3'>{children}</p>
        </div>
      </div>
    </div>
  )
}
