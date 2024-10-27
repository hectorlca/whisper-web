import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Add proxy for WebSocket
    proxy: {
      '/ws': {
        target: 'ws://localhost:ws_port',
        ws: true
      }
    }
  },
})
