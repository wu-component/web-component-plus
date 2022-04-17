import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        // 将所有包含短横线的标签作为自定义元素处理
        isCustomElement: tag => tag.indexOf('wu-') > -1
      }
    }
  })]
})
