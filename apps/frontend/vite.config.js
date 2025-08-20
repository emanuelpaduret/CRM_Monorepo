// apps/frontend/src/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: process.env.PORT || 4173,
    allowedHosts: ['crm-backend-6ngo.onrender.com', 'your-new-host.com']
  }
})