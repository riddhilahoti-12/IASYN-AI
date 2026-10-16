import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const lodashShimsPath = path.resolve(__dirname, 'src/utils/lodash-shims.js');

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: 'lucide-react', replacement: path.resolve(__dirname, './node_modules/lucide-react/dist/cjs/lucide-react.js') },
      { find: 'fast-equals', replacement: path.resolve(__dirname, './node_modules/fast-equals/dist/cjs/index.cjs') },
      { find: /^lodash(\/.*)?$/, replacement: lodashShimsPath }
    ],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    esbuildOptions: {
      plugins: [
        {
          name: 'esbuild-lodash-resolver',
          setup(build) {
            build.onResolve({ filter: /^lodash(\/.*)?$/ }, () => {
              return { path: lodashShimsPath };
            });
          }
        }
      ]
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
