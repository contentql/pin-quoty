import { RequiredDataFromCollectionSlug } from 'payload'

export type termsDataType = RequiredDataFromCollectionSlug<'terms'>

export const termsData: termsDataType[] = [
  {
    title: 'Equipment and expenses',
    description:
      'Equipment refers to the tools or resources required for the project, whether provided by the client or the service provider. Expenses cover additional costs incurred during the project, such as travel, materials, or software. ',
  },
  {
    title: 'Ownership/copyright',
    description:
      "Ownership defines who retains control over the deliverables or intellectual property. Copyright ensures the creator's legal rights, allowing them to reproduce, distribute, or license the work.",
  },
  {
    title: 'Kill fee and cancellation terms',
    description:
      'A kill fee is a predetermined payment made to compensate for work completed if a project is canceled before full delivery.',
  },
  {
    title: 'Deadlines and timeline',
    description:
      'Deadlines define specific dates for task completion, ensuring timely progress. Timelines provide an overview of key milestones and their schedules within a project. Together, they help track progress, manage resources, and meet goals effectively.',
  },
  {
    title: 'Payment schedule and options',
    description:
      'Payments are recurring based on the chosen billing cycle (monthly, quarterly, or annually). Accepted payment methods include credit/debit cards, PayPal, and bank transfers.',
  },
]
