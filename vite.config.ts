import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/utils': path.resolve(__dirname, './utils'),
      '@/components': path.resolve(__dirname, './components'),
      '@/constants': path.resolve(__dirname, './utils/constants.ts'),
      '@/context': path.resolve(__dirname, './context'),
    },
  },
})
