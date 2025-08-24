import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Update base if your repo name changes
export default defineConfig({
  plugins: [react()],
  base: '/arpita-portfolio/',
})