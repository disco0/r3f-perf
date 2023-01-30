import { defineConfig } from 'vite'
import * as path from 'node:path'
import react from '@vitejs/plugin-react'

const entries = ['./src/index.ts', './src/headless.ts']

export default defineConfig({
  root: process.argv[2] ? undefined : 'demo',
  resolve: {
    alias: {
      'r3f-perf': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: false,
    sourcemap: true,
    target: 'es2018',
    lib: {
      formats: ['es', 'cjs'],
      entry: entries[0],
      fileName: '[name]',
    },
    rollupOptions: {
      external: (id) => !id.startsWith('.') && !path.isAbsolute(id),
      treeshake: false,
      input: entries,
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemapExcludeSources: true,
      },
    },
  },
  plugins: [react()],
})
