import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    watch: {
      usePolling: true, // Обязательно для Windows!
    },
    hmr: {
      clientPort: 3000, // Чтобы браузер знал, куда слать сигналы об обновлении
    },
  },
})