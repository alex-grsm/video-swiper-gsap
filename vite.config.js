import { defineConfig } from 'vite';
import path from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const ext = path.extname(assetInfo.name).toLowerCase();
          const name = path.basename(assetInfo.name, ext);

          if (['.png', '.jpg', '.jpeg', '.svg', '.gif', '.tiff', '.bmp', '.ico'].includes(ext)) {
            return `assets/img/${name}${ext}`;
          }
          if (['.woff', '.woff2', '.eot', '.ttf', '.otf'].includes(ext)) {
            return `assets/fonts/${name}${ext}`;
          }
          if (ext === '.css') {
            return `assets/css/${name}${ext}`;
          }
          return `assets/js/${name}${ext}`; // Остальные файлы → в `js`
        },
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js',
      },
    },
  },
  plugins: [
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        lossless: true,
      },
    }),
    legacy({
        targets: ['defaults', 'not IE 11'],
    }),
  ],
});