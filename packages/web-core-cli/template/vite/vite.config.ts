import { resolve } from 'path';
import { defineConfig } from 'vite';
/*import typescript from "rollup-plugin-typescript2";
const getPath = _path => resolve(__dirname, _path);*/
/*const defaults = { compilerOptions: { declaration: true } };*/
// 'es', 'cjs',
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'index',
      formats: [ 'umd' ],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
        plugins: [
            /*typescript({
                tsconfig: getPath('../tsconfig.json'), // 导入本地ts配置
                // tsconfigDefaults: defaults,
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: false,
                        target: "ES2016"
                    }
                }
            }),*/
        ],
    }
  },
  esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'h.f'
    },
  server: {
        fs: {
            strict: true
        }
    }
});
