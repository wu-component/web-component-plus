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
const output = resolve(__dirname, "../dist");
const getPath = _path => resolve(__dirname, _path);
// import pkg from "../package.json";
//const name = pkg.name;
const name = 'WebUIPlus';
const extensions = [
    '.js',
    '.ts',
    '.tsx'
]
let defaults = { compilerOptions: { declaration: true } };



// 单独打包
const config = [
    {
        input: `./src/index.tsx`,
        plugins: [
            terser(),
            url({
                include: ['**/*.svg', '**/*.png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp', '**/*.ttf', '**/*.woff']
            }),
            nodeResolve(),
            commonjs(),
            postcss({
                name: 'index',
                extensions: [ '.css', 'scss' ],
                to: `./dist/index.css`,
                plugins: [
                    autoprefixer()
                ],
                // extract: `${output}/${name}/lib/index.css`
                extract: false
            }),
            // tsPlugin,
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
            { name: name, file: `${output}/index.umd.js`, format: 'umd' },
            { file: `${output}/index.cjs.js`, format: 'cjs' },
            { file: `${output}/index.esm.js`, format: 'es' }

        ]
    }
]

export default config;
