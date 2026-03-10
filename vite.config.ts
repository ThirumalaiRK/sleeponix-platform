import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',

  build: {
    // Raise warning limit slightly to avoid false alarms
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Split vendor libs into separate cached chunks
        // This way, users only re-download chunks that actually changed
        manualChunks: {
          'vendor-react':    ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion':   ['framer-motion'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-forms':    ['react-hook-form'],
          'vendor-ui':       ['react-hot-toast', 'lucide-react'],
        },
      },
    },
  },

  optimizeDeps: {
    // Keep lucide-react excluded from pre-bundling (improves cold start)
    exclude: ['lucide-react'],
  },
});
