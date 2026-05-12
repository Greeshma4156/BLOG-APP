import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/user-api': {
        target: 'https://blog-app-if8r.onrender.com',
        changeOrigin: true,
      },
      '/author-api': {
        target: 'https://blog-app-if8r.onrender.com',
        changeOrigin: true,
      },
      '/admin-api': {
        target: 'https://blog-app-if8r.onrender.com',
        changeOrigin: true,
      },
      '/common-api': {
        target: 'https://blog-app-if8r.onrender.com',
        changeOrigin: true,
      }
    }
  }
})
