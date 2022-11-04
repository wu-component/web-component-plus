import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import { terser } from "rollup-plugin-terser";
import css from 'rollup-plugin-import-css';
import pkg from "./package.json";
import path from "path";
import fs from "fs";

const extensions = [ '.js', '.ts', '.tsx' ];
const packageSrcRoot = path.join(__dirname, './src/packages');
const componentNames = fs
    // 获取所有文件夹及文件
    .readdirSync(packageSrcRoot, { withFileTypes: true })
    // 筛选出所有文件夹
    .filter((p) => p.isDirectory())
    // 数据预处理
    .map((p) => ({
        path: `${p.name}/index.ts`,
        name: p.name,
    }));
    // 带上package/index.js
export default [
    {
        input: componentNames.reduce((result, p) => {
            result[p.path] = `${packageSrcRoot}/${p.name}/index.ts`;
            return result;
        }, {}),
        output: {
            dir: 'lib',
            chunkFileNames: '[name].js',
            format: 'es',
        },
        treeshake: false,
        plugins: [
            css(),
            terser(),
            nodeResolve(),
            commonjs(),
            typescript({
                compilerOptions: {
                    lib: [ "dom", "es2018", "esnext.array" ],
                    target: "esnext"
                }
            }),
            json(),
            replace({
                preventAssignment: true
            })
        ]
    },
    {
        input: './src/packages/index.ts',
        // treeshake: false,
        plugins: [
            css(),
            terser(),
            nodeResolve(),
            commonjs(),
            typescript(),
            json(),
            replace({
                preventAssignment: true
            })
        ],
        output: {
            name: 'index',
            file: 'lib/index.js',
            format: 'es',
        },
    }
];
