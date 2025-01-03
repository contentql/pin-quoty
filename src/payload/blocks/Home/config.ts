import { Block } from 'payload'

const HomeConfig: Block = {
  slug: 'Home',
  // imageURL: '',
  interfaceName: 'HomeType',
  labels: {
    singular: 'Home Block',
    plural: 'Home Blocks',
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
    },
  ],
}

export default HomeConfig
