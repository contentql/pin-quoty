import type { Config } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/blocks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/payload/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        text: 'hsl(var(--text))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        border: 'hsl(var(--border))',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5715' }],
        base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.415', letterSpacing: '-0.01em' }],
        '3xl': ['1.875rem', { lineHeight: '1.333', letterSpacing: '-0.01em' }],
        '4xl': ['2.25rem', { lineHeight: '1.277', letterSpacing: '-0.01em' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.01em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.01em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.01em' }],
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        orbiter: ['var(--font-orbiter)', 'sans-serif'],
        caveat: ['var(--font-caveat)', 'cursive'],
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.01em',
        wider: '0.02em',
        widest: '0.4em',
      },
      transitionTimingFunction: {
        'custom-ease': 'cubic-bezier(0.33, 1, 0.68, 1)',
      },
      keyframes: {
        shine: {
          '0%': {
            backgroundPosition: '150% 0',
          },
          '25%': {
            backgroundPosition: '-50% 0',
          },
          '100%': {
            backgroundPosition: '-50% 0',
          },
        },
      },
      animation: {
        shine: 'shine 4s ease infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

export default config
