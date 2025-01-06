import { isAdmin } from '../../access'
import { CustomCollectionConfig } from '@contentql/core'

import { revalidateQuotes } from '@/payload/hooks/revalidateQuotes'
import { formatSlug } from '@/utils/formatSlug'

import { sendEmailAfterProjectCreation } from './sendEmalAfterCreate'

export const Quotes: CustomCollectionConfig = {
  slug: 'quotes',
  labels: {
    singular: 'Quote',
    plural: 'Quotes',
  },
  admin: {
    useAsTitle: 'quote',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      admin: {
        description: 'The main heading for the quote section.',
      },
    },
    {
      name: 'quote',
      label: 'Quote',
      type: 'text',
      admin: {
        description:
          "The actual quote text to be displayed, e.g., 'FrontEnd Developer, Acme Corp.'",
      },
    },

    {
      name: 'date',
      label: 'Date',
      type: 'date',
      admin: {
        description:
          'The date associated with the quote (e.g., when it was said or published).',
      },
    },
    {
      name: 'aboutHeading',
      label: 'About Heading',
      type: 'text',
      admin: {
        description:
          "The heading for the 'About' section related to the quote.",
      },
    },
    {
      name: 'aboutQuote',
      label: 'About Quote',
      type: 'text',
      admin: {
        description:
          "Additional details or context about the quote in the 'About' section.",
      },
    },
    {
      name: 'detailsHeading',
      label: 'Details Heading',
      type: 'text',
      admin: {
        description:
          "The heading for the 'Details' section that provides more information about the quote.",
      },
    },
    {
      name: 'details',
      label: 'Details',
      type: 'array',
      admin: {
        description:
          'An array of additional details associated with the quote.',
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          admin: {
            description: 'The title of a specific detail.',
          },
        },
        {
          name: 'duration',
          label: 'Duration',
          type: 'text',
          admin: {
            description:
              'The duration associated with this detail, if applicable.',
          },
        },
      ],
    },
    {
      name: 'costsBreakdownHeading',
      label: 'Costs Breakdown Heading',
      type: 'text',
    },
    {
      name: 'selectCostBreakdowns',
      label: 'Select Cost Breakdowns',
      type: 'relationship',
      relationTo: 'costsBreakdown',
      hasMany: true,
    },
    {
      name: 'termsHeading',
      label: 'Terms Heading',
      type: 'text',
    },
    {
      name: 'selectTerms',
      label: 'Select Terms',
      type: 'relationship',
      relationTo: 'terms',
      hasMany: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      index: true,
      required: false,
      admin: {
        description: 'Contains only lowercase letters, numbers, and dashes.',
        position: 'sidebar',
        components: {
          Field: {
            path: '@contentql/core/client#CustomSlugField',
            clientProps: {
              fieldToUse: String('quote'),
            },
          },
        },
      },
      hooks: {
        beforeValidate: [formatSlug('quote')],
      },
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateQuotes, sendEmailAfterProjectCreation],
  },
}
