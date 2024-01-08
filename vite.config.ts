import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Pokedl/',
  plugins: [vue(),VitePWA({
    registerType: 'autoUpdate',
    injectRegister: 'inline',
    devOptions: {
      enabled: false
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      skipWaiting: true,
    },
    includeAssets: ['favicon-32x32.png', 'apple-touch-icon.png', 'favicon-16x16.png', 'safari-pinned-tab.svg'],
    manifest: {
      name: 'Pokedl',
      short_name: 'Pokedl',
      description: 'Pokedl',
      theme_color: '#FFBE0FFF',
      background_color: '#FFBE0FFF',
      icons: [
        {
          src: 'android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: 'android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: 'android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
  })],
})


