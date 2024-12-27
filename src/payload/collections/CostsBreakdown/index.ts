import { isAdmin } from '../../access'
import { CustomCollectionConfig } from '@contentql/core'

export const CostsBreakdown: CustomCollectionConfig = {
  slug: 'costsBreakdown',
  labels: {
    singular: 'Cost Breakdown',
    plural: 'Costs Breakdown',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'costsBreakdown',
      label: 'Costs Breakdown',
      type: 'array',
      admin: {
        description:
          'An array of cost details, including titles, descriptions, and associated costs.',
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          admin: {
            description:
              "The title or name of the cost item (e.g., 'Hosting Fee').",
          },
        },
        {
          name: 'description',
          label: 'Description',
          type: 'text',
          admin: {
            description:
              "A brief description of the cost item (e.g., 'Monthly website hosting').",
          },
        },
        {
          name: 'cost',
          label: 'Cost',
          type: 'number',
          admin: {
            description:
              'The monetary cost associated with the item (e.g., 100 for $100).',
          },
        },
      ],
    },
  ],
}
