import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Vite plugin to copy data/processed/*.csv to dist/data/ during build
function copyDataPlugin(): Plugin {
  return {
    name: 'copy-processed-data',
    buildStart() {
      const srcDir = path.resolve(__dirname, '../data/processed');
      const destDir = path.resolve(__dirname, 'public/data');
      if (fs.existsSync(srcDir)) {
        fs.mkdirSync(destDir, { recursive: true });
        const files = fs.readdirSync(srcDir);
        for (const file of files) {
          if (file.endsWith('.csv')) {
            fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
          }
        }
      }
    },
    configureServer(server) {
      // In dev server, serve /data/*.csv directly from ../data/processed
      server.middlewares.use('/data', (req, res, next) => {
        const filePath = path.resolve(__dirname, '../data/processed', req.url?.replace(/^\//, '') || '');
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          res.setHeader('Content-Type', 'text/csv; charset=utf-8');
          fs.createReadStream(filePath).pipe(res);
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), copyDataPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
});
