import { env } from '@env'
import { CollectionAfterChangeHook } from 'payload'

import { QuoteEmail } from '@/emails/quote-mail'

export const sendEmailAfterProjectCreation: CollectionAfterChangeHook = async ({
  collection,
  operation,
  doc,
  previousDoc,
  req,
}) => {
  if (operation === 'create') {
    try {
      const { payload } = req

      const siteSettings = await payload.findGlobal({
        slug: 'site-settings',
      })
      await payload.sendEmail({
        to: doc?.email,
        from: env?.RESEND_SENDER_EMAIL,
        subject: 'Quote Created Successfully',
        html: QuoteEmail({
          actionLabel: 'received new quote',
          buttonText: 'quote',
          userName: 'User',
          image: `${env.PAYLOAD_URL}/(siteSettings?.navbar?.logo?.imageUrl as Media)?.url!`,
          href: `${env.PAYLOAD_URL}/quote/${doc?.slug}`,
          logoTitle: siteSettings?.general?.title,
        }),
      })
    } catch (error) {
      console.log('Error while sending email', error)
      throw error
    }
  }
}
