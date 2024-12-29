import { isAdmin } from '../../access'
import { CustomCollectionConfig } from '@contentql/core'

import { revalidateCostsBreakdown } from '@/payload/hooks/revalidateCostsBreakdown'
import { formatSlug } from '@/utils/formatSlug'

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
  admin: {
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      admin: {
        description:
          "The title or name of the cost item (e.g., 'Hosting Fee').",
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
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
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      admin: {
        description: 'Detailed information about the cost breakdown.',
      },
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
              fieldToUse: String('title'),
            },
          },
        },
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
  ],
  hooks: {
    afterChange: [revalidateCostsBreakdown],
  },
}
