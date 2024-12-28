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
        description: "The title of the term (e.g., 'Privacy Policy').",
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      admin: {
        description: 'A detailed explanation or description of the term.',
      },
    },
  ],
}
