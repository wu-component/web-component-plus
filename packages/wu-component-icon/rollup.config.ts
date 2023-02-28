import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import { babel } from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-import-css';
import postcss from "rollup-plugin-postcss";
// @ts-ignore
import autoprefixer from 'autoprefixer';
// @ts-ignore
import fs from 'fs';
// @ts-ignore
import path from 'path';

const extensions = [ '.js', '.ts', '.tsx' ];
const packageSrcRoot = path.join(__dirname, './src/packages');
const componentNames = fs
    // 获取所有文件夹及文件
    .readdirSync(packageSrcRoot, { withFileTypes: true })
    // 筛选出所有文件夹
    .filter((p) => p.isDirectory())
    // 数据预处理
    .map((p) => ({
        path: `${p.name}/index`,
        name: p.name,
    }))
    // 带上package/index.js
    .concat({ path: 'index', name: 'index' });

/**
 * @type {import('rollup').RollupOptions}
 */
const options = [
    {
        input: './src/packages/index.ts',
        output: [
            { file: `dist/index.cjs.js`, format: 'cjs' },
            { file: `dist/index.esm.js`, format: 'es' },
            { file: `dist/index.iife.js`, format: 'iife', extend: true,name: 'WuIcon' },
        ],
        plugins: [
            postcss({ extensions: [ '.css', 'scss' ],plugins: [ autoprefixer() ], extract: false, minimize: true }),
            css(),
            typescript({
                // @ts-ignore
                compilerOptions: {
                    "declaration": false,
                }
            }),
            commonjs(),
            nodeResolve({
                extensions
            }),
            terser(),
        ],
    },
    {
        input: componentNames.reduce((result, p) => {
            result[p.path] = `${packageSrcRoot}/${p.name}`;
            return result;
        }, {}),

        /*output: [
            { file: `lib/index.cjs.js`, format: 'cjs' },
            { file: `lib/index.esm.js`, chunkFileNames: '[name].js', format: 'es' },
            { file: `lib/index.mini.js`, name: 'WuIcon', format: 'umd' },
        ],*/
        output: {
            dir: 'lib',
            chunkFileNames: '[name].js',
            format: 'es',
        },
        treeshake: false,
        plugins: [
            postcss({ extensions: [ '.css', 'scss' ],plugins: [ autoprefixer() ], extract: false, minimize: true }),
            css(),
            typescript({
                // @ts-ignore
                compilerOptions: {
                    "declaration": true,
                }
            }),
            commonjs(),
            nodeResolve({
                extensions,
                modulesOnly: true,
            }),
            terser()
        ],
    },
    /*{
        input: './src/index.ts',
        output: {
            dir: './dist',
            format: 'umd',
            name: 'index.umd.js',
        },
        plugins: [
            css(),
            typescript(),
            commonjs(),
            nodeResolve({
                extensions
            }),
            babel({
                babelHelpers: 'runtime',
                exclude: 'node_modules/!**',
                extensions,
            }),
            terser(),
        ],
    },*/
];

export default options;
