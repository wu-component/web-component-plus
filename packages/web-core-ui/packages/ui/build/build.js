import { resolve } from "path";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import scss from 'rollup-plugin-scss'
import autoprefixer from 'autoprefixer'
import url from '@rollup/plugin-url';
import cleanup from "rollup-plugin-cleanup";
const output = resolve(__dirname, "../dist");
const name = 'WebUIPlus';
const extensions = [
    '.js',
    '.ts',
    '.tsx'
]
let defaults = { compilerOptions: { declaration: true } };
const getPath = _path => resolve(__dirname, _path);
import os from 'os';
const cpuNums = os.cpus().length;
let override = { compilerOptions: { declaration: false } };

// ts
const tsPlugin = typescript({
    tsconfig: getPath('../tsconfig.json'), // 导入本地ts配置
    tsconfigDefaults: defaults,
    tsconfigOverride: {
        compilerOptions: {
            declaration: false
        }
    },
    extensions
})


// 单独打包
const config = [
    {
        input: resolve(__dirname, "../src/index.tsx"),
        plugins: [
            terser({
                    output: {
                        comments: false,
                    },
                    numWorkers: cpuNums, //多线程压缩
                }
            ),
            url({
                include: ['**/*.svg', '**/*.png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp', '**/*.ttf', '**/*.woff']
            }),
            nodeResolve(),
            commonjs(),
            postcss({
                extensions: [ '.css', 'scss' ],
                name: 'index',
                to: `${output}/index.css`,
                plugins: [
                    autoprefixer()
                ],
                // extract: `${output}/index.css`
                extract: false,
                minimize: true
            }),
            typescript({
                tsconfig: getPath('../tsconfig.json'), // 导入本地ts配置
                tsconfigDefaults: defaults,
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: true
                    }
                },
                // https://unpkg.com/vue@3
                // unpkg.com/:package@:version/:file
                // https://unpkg.com/@canyuegongzi/web-ui-plus@0.0.20/dist/index.umd.js
                extensions
            }),
            json(),
            replace({
                preventAssignment: true
            })
        ],
        output: [
            {
                name: 'webUIPlus',
                file: `${output}/index.umd.js`,
                format: 'umd',
                globals: {
                    '@wu-component/web-core-plus': 'webCorePlus'
                }
            },
            { file: `${output}/index.cjs.js`, format: 'cjs' },
            { file: `${output}/index.esm.js`, format: 'es' }

        ],
        external: [/web-core-plus$/],
    }
]

export default config;
