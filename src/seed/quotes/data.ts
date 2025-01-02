import { RequiredDataFromCollectionSlug } from 'payload'

export type QuoteDataType = RequiredDataFromCollectionSlug<'quotes'>

export const quotesData: QuoteDataType[] = [
  {
    heading: 'Quote for',
    quote: 'The Markyk Corp.',
    date: '2024-12-31T11:30:00.000Z',
    aboutHeading: 'Brief',
    aboutQuote:
      'The client is looking to review and revamp the information architecture, user experience and user interface design of The Markyk Corp., a web application that connects landlords and tenants across Europe and America.',
    detailsHeading: 'Details',

    details: [
      {
        title: 'Projects Length',
        duration: '4-8 weeks',
      },

      {
        title: 'Start Date',
        duration: '27 June 2024',
      },

      {
        title: 'End Date',
        duration: '27 Aug 2025',
      },
    ],
    costsBreakdownHeading: 'Costs Breakdown',

    termsHeading: 'Terms',

    _status: 'published',
  },
]
