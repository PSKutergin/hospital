import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tsconfigPaths()
    ],
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/styles/variables" as *;
          `
        }
      }
    }
  };
});
