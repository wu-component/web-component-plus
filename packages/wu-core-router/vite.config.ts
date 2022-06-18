// @ts-ignore
import { defineConfig } from 'vite'
// @ts-ignore
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig({
  base: './',
  plugins: [
      vue({
        template: {
            compilerOptions: {
                // @ts-ignore
                isCustomElement: (tag: string[]) => tag.indexOf('wu') > -1
            }
        }
    })
  ],
  resolve: {
      alias: {
          '@/common': resolve(__dirname, 'src/common'),
          '@/interface': resolve(__dirname, 'src/interface'),
      }
  }
})
