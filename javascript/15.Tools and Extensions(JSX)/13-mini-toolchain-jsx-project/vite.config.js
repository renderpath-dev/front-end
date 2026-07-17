// Goal:
// Configure Vite to transform React JSX during development and build.

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
