import path from 'path'
import { DataFromGlobalSlug } from 'payload'

export type siteSettingsDataType = Omit<
  DataFromGlobalSlug<'site-settings'>,
  'id'
>

export type ImageType = {
  alt: string
  filePath: string
}

export const siteSettingsData: siteSettingsDataType = {
  general: {
    title: 'Mary Rutt',
    description: 'Invoice Theme',

    faviconUrl: 0,

    ogImageUrl: 0,
    currency: 'usd',
  },

  navbar: {
    logo: {
      imageUrl: 0,
      height: null,
      width: null,
    },

    menuLinks: [],
  },

  footer: {
    logo: {
      imageUrl: 0,
      height: null,
      width: null,
      description: null,
    },

    footerLinks: [],

    socialLinks: [],
    copyright: null,
  },

  redirectionLinks: {},

  monetization: {
    adSenseId: null,
    measurementId: null,
  },

  themeSettings: {
    lightMode: {
      primary: '#3b82f6',
      background: '#ffffff',
      text: '#1e293b',
      foreground: '#f1f5f9',
      popover: '#64748b',
      border: '#64748b',
    },

    darkMode: {
      primary: '#3b82f6',
      background: '#020617',
      text: '#e2e8f0',
      foreground: '#1e293b',
      popover: '#94a3b8',
      border: '#94a3b8',
    },

    fonts: {
      display: {
        type: 'googleFont',
        customFont: null,
        remoteFont:
          'https://fonts.googleapis.com/css2?family=Chewy&display=swap',
        fontName: 'Chewy',
      },

      body: {
        type: 'googleFont',
        customFont: null,
        remoteFont:
          'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
        fontName: 'Roboto',
      },
    },
    radius: 'none',
  },
}

export const siteSettingsImages: ImageType = {
  alt: 'Logo',
  filePath: path.join(process.cwd(), '/public/images/logo.jpg'),
}
