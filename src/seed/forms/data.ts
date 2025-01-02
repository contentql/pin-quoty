import { RequiredDataFromCollectionSlug } from 'payload'

export type formsDataType = RequiredDataFromCollectionSlug<'forms'>

export const formsData: formsDataType[] = [
  {
    title: 'Contact Me',

    fields: [
      {
        name: 'email',
        label: 'Email',
        width: 100,
        required: null,
        blockName: null,
        blockType: 'email',
      },

      {
        name: 'client',
        label: 'Client',
        width: 100,
        defaultValue: null,
        required: null,
        blockName: null,
        blockType: 'text',
      },

      {
        name: 'subject',
        label: 'Subject',
        width: 100,
        defaultValue: null,
        required: null,
        blockName: null,

        options: [
          {
            label: ' There is an error with the quote',
            value: '1',
          },

          {
            label: ' I have a problem with payments',
            value: '2',
          },

          {
            label: 'I wont to modify the payment date',
            value: '3',
          },
        ],
        blockType: 'select',
      },

      {
        name: 'message',
        label: 'Message',
        width: 100,
        defaultValue: null,
        required: null,
        blockName: null,
        blockType: 'textarea',
      },
    ],
    submitButtonLabel: 'Send',
    confirmationType: 'message',

    confirmationMessage: [
      {
        children: [
          {
            text: 'Form Sent successfully',
          },
        ],
      },
    ],

    emails: [],
  },
]
