import { resolve } from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import scss from 'rollup-plugin-scss'
import autoprefixer from 'autoprefixer'
import url from '@rollup/plugin-url';

const input = resolve(__dirname, "../src/packages");
const output = resolve(__dirname, "../dist-lib");
const getPath = _path => resolve(__dirname, _path)
const extensions = [
    '.js',
    '.ts',
    '.tsx'
]
let defaults = { compilerOptions: { declaration: true } };
const config = []
// 整合打;包
config.push({
    input: resolve(__dirname, "../src/packages/wu-date-picker/index.tsx"),
    plugins: [
        url({
            include: ['**/*.woff', '**/*.woff2', '**/*.ttf'],
            // setting infinite limit will ensure that the files
            // are always bundled with the code, not copied to /dist
            limit: Infinity,
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
            extract: false
        }),
        typescript({
            tsconfig: getPath('../tsconfig.json'), // 导入本地ts配置
            tsconfigDefaults: defaults,
            tsconfigOverride: {
                compilerOptions: {
                    declaration: true
                }
            },
            extensions
        }),
        json(),
        replace({
            preventAssignment: true
        })
    ],
    output: [
        {
            name: 'webUIPlusDatePicker',
            file: `${output}/web-plus-data-picker.umd.js`,
            format: 'umd',
            globals: {
                '@canyuegongzi/web-core-plus': 'webCorePlus'
            }
        },
        // { file: `${output}/web-plus.cjs.js`, format: 'cjs' },
        // { file: `${output}/web-plus.esm.js`, format: 'es' }

    ],
    external: [/web-core-plus$/],
})
export default config;
