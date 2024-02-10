import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        desk: "url('/images/articles-display/bg.png')",
        'card-gray': "url('/images/articles-display/card_gray.png')",
        'card-blue': "url('/images/articles-display/card_blue.png')",
        'card-red': "url('/images/articles-display/card_red.png')",
        room: "url('/images/tag-cloud-page/bg_static.png')"
      },
      cursor: { pointer: 'url(/images/common/pointer.png), auto' },
      keyframes: {
        throught: {
          '0, 10%': {
            transform: 'translateY(100%)',
            opacity: '0'
          },
          '30%, 70%': {
            transform: 'translateY(0)',
            opacity: '1'
          },
          '90%, 100%': {
            transform: 'translateY(-100%)',
            opacity: '0'
          }
        }
      },
      animation: {
        throught: 'throught 4s ease infinite'
      }
    }
  },
  plugins: []
}
export default config
