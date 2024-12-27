import { isAdmin } from '../../access'
import { CustomCollectionConfig } from '@contentql/core'

export const Terms: CustomCollectionConfig = {
  slug: 'terms',
  labels: {
    singular: 'Term',
    plural: 'Terms',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'terms',
      label: 'Terms',
      type: 'array',
      admin: {
        description: 'A collection of terms with titles and descriptions.',
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          admin: {
            description: "The title of the term (e.g., 'Privacy Policy').",
          },
        },
        {
          name: 'description',
          label: 'Description',
          type: 'text',
          admin: {
            description: 'A detailed explanation or description of the term.',
          },
        },
      ],
    },
  ],
}
