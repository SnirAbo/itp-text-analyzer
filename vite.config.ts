import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webp,woff2}']
      },
      manifest: {
        name: 'Text Analyzer',
        short_name: 'Analyzer',
        description: 'Count words, sentences, graphemes; fast and private.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0b0f19',
        theme_color: '#0ea5e9',
        icons: [
          { src: '/icons/icon.svg', sizes: 'any', type: 'image/svg+xml' }
        ]
      }
    })
  ],
  build: {
    target: 'es2020'
  }
})
