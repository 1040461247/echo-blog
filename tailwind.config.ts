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
        room: "url('/images/classification/bg.png')",
        window: "url('/images/classification/window.png')",
        'book-purpel': "url('/images/classification/book_purpel.png')",
        'book-purpel-cur': "url('/images/classification/book_purpel_cur.png')",
        'book-red': "url('/images/classification/book_red.png')",
        'book-red-cur': "url('/images/classification/book_red_cur.png')",
        'book-yellow': "url('/images/classification/book_yellow.png')",
        'book-yellow-cur': "url('/images/classification/book_yellow_cur.png')"
      }
    }
  },
  plugins: []
}
export default config
