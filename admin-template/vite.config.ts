import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      // 这里的 @ 就是我们要为 src 配置的别名
    }
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      /*output:{
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split('/')
              : [];
          const fileName =
              facadeModuleId[facadeModuleId.length - 2] || '[name]';
          return `js/${fileName}/[name].[hash].js`;
        }
      }*/
    }
  }
})
