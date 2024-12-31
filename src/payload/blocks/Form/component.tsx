'use client'

import { Params } from '../types'
import { FormType } from '@payload-types'
import { usePathname } from 'next/navigation'
import React from 'react'

import BackButton from '@/components/ui/back-button'

import FormComponent from './Components/Form'

interface FormProps extends FormType {
  params: Params
}
const FormBlock: React.FC<FormProps> = ({ params, ...block }) => {
  const pathName = usePathname()
  const segments = pathName.split('/')
  const backPath = `${segments.slice(1, 3).join('/')}`
  const form =
    block?.form?.value && typeof block?.form?.value === 'object'
      ? block?.form?.value
      : undefined

  return (
    <section className='mx-auto w-full max-w-xl grow px-4 py-12 sm:px-6 lg:pb-20 lg:pt-24'>
      <BackButton path={backPath} />
      <h4 className='h2 mb-4 font-orbiter '>{block?.title}</h4>
      {form ? <FormComponent form={form} /> : null}
    </section>
  )
}

export default FormBlock
