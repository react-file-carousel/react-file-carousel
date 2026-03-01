import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/react-file-carousel/',
  plugins: [react()],
  resolve: {
    alias: {
      'react-file-carousel': path.resolve(__dirname, '../src/index.ts'),
    },
  },
})
