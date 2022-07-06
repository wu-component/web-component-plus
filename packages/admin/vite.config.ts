import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.tsx',
      formats: ['es']
    },
    rollupOptions: {}
  }
})
