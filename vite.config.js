import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  server: {
    host: true,
    port: 5173
  },

  build: {
    minify: 'terser',

    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  }
})