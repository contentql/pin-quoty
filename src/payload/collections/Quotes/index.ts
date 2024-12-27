import { isAdmin } from '../../access'
import { CustomCollectionConfig } from '@contentql/core'

export const Quotes: CustomCollectionConfig = {
  slug: 'quotes',
  labels: {
    singular: 'Quote',
    plural: 'Quotes',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
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
    },
  ],
}
