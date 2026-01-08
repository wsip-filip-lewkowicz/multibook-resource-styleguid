import { defineConfig } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: path.resolve(__dirname, '..'),
  build: {
    emptyOutDir: false,
    cssMinify: true,
    rollupOptions: {
      input: path.resolve(__dirname, '../src/styles/index.css'),
      output: {
        assetFileNames: 'styles[extname]',
      },
    },
  },
})
