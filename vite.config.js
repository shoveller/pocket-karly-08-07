import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        header: resolve(__dirname, 'src/pages/components/header.html'),
        footer: resolve(__dirname, 'src/pages/components/footer.html'),
        popup: resolve(__dirname, 'src/pages/components/popup.html'),
        productBox: resolve(__dirname, 'src/pages/components/productBox.html'),
        productList: resolve(__dirname, 'src/pages/productList/index.html'),
      },
    },
  },
  esbuild: {
    supported: {
      'top-level-await': true,
    },
  },
});
