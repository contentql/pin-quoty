import { collectionSlug } from '@contentql/core'
import configPromise from '@payload-config'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import {
  siteSettingsData,
  siteSettingsDataType,
  siteSettingsImages,
} from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora) => {
  try {
    spinner.start(`Started created site-settings...`)
    const logoImageSeedResult = await payload.create({
      collection: 'media',
      data: { alt: siteSettingsImages?.alt },
      filePath: siteSettingsImages?.filePath,
    })

    const formattedSiteSettingsData: siteSettingsDataType = {
      ...siteSettingsData,
      general: {
        ...siteSettingsData.general,
        faviconUrl: logoImageSeedResult?.id as number,
        ogImageUrl: logoImageSeedResult?.id as number,
      },
      navbar: {
        ...siteSettingsData.navbar,
        logo: {
          ...siteSettingsData.navbar.logo,
          imageUrl: logoImageSeedResult?.id as number,
        },
      },
      footer: {
        ...siteSettingsData.footer,
        logo: {
          ...siteSettingsData.footer.logo,
          imageUrl: logoImageSeedResult?.id as number,
        },
      },
    }

    const result = await payload.updateGlobal({
      slug: collectionSlug['site-settings'],
      data: formattedSiteSettingsData,
    })

    spinner.succeed(`Successfully created site-settings`)
    return result
  } catch (error) {
    spinner.succeed(`Failed to create site-settings`)
    throw error
  }
}

export default seed
