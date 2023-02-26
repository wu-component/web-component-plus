import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import pkg from "./package.json";

export default [
    {
        input: './src/example/example.tsx',
        plugins: [
            terser(),
            nodeResolve(),
            commonjs(),
            postcss({
                extensions: [ '.css' ]
            }),
            typescript({
                compilerOptions: {
                    lib: [ "es5", "es6", "dom" ], target: "es5"
                }
            }),
            json(),
            replace({
                preventAssignment: true
            })
        ],
        output: {
            name: 'WebUIPlus',
            file: 'example/index.umd.js',
            format: 'umd'
        },
    },
    {
        input: './src/example.tsx',
        plugins: [
            terser(),
            nodeResolve(),
            commonjs(),
            postcss({
                extensions: [ '.css' ]
            }),
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
        ],
        output: [
            { file: 'example/index.cjs.js', format: 'cjs' },
            { file: 'example/index.esm.js', format: 'es' }
        ],
    }
];
