import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',  // Asegúrate de que sea ESNext
    polyfillDynamicImport: false
  }
});
