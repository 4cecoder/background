import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Ensure jsdom environment is set
    globals: true,       // Ensure globals are enabled
    setupFiles: ['./tests/setup.ts'],
    alias: {
      '@': path.resolve(__dirname, './'),
    },
    // Add explicit browser types if needed, though jsdom should handle it
    // environmentOptions: {
    //   jsdom: {
    //      resources: 'usable',
    //   },
    // },
  },
}); 