import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * CJS deps used by Emotion/MUI — pre-bundle with default export interop.
 * @mui/material must stay OUT of optimizeDeps: Vite's pre-bundle calls
 * createTheme() in Box.js before init_createTheme() runs (createTheme_default error).
 */
const cjsInterop = ['hoist-non-react-statics', 'prop-types', 'react-is'];

export default defineConfig({
  plugins: [
    react({
      include: /\.(jsx|js|tsx|ts)$/,
    }),
  ],
  server: {
    port: 3001,
  },
  resolve: {
    dedupe: ['react', 'react-dom', '@emotion/react', '@emotion/styled'],
  },
  optimizeDeps: {
    include: [
      ...cjsInterop,
      '@emotion/react',
      '@emotion/styled',
      '@emotion/react/jsx-runtime',
      '@emotion/react/jsx-dev-runtime',
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
    ],
    needsInterop: cjsInterop,
    // Root package excluded (Box/createTheme bug); listed @mui/material/* subpaths are still pre-bundled via include
    exclude: ['@mui/material'],
  },
});
