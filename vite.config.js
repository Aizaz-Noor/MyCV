import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Vite 8 (Rolldown) requires manualChunks as a function
        manualChunks(id) {
          if (id.includes('node_modules/three/')) return 'three-vendor';
          if (id.includes('node_modules/@react-three/')) return 'r3f-vendor';
          if (id.includes('node_modules/react-icons/')) return 'icons-vendor';
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) return 'react-vendor';
        },
      },
    },
    // Raise chunk warning threshold — large 3D libs are expected
    chunkSizeWarningLimit: 600,
  },
})
