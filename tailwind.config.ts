import type { Config } from 'tailwindcss'

export default {
  darkMode: 'media',
  content: [
    './index.html',
    './src/**/*.{ts,tsx,html}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0ea5e9'
        }
      }
    }
  },
  plugins: []
} satisfies Config
