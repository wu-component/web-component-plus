import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import { terser } from "rollup-plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";
import pkg from "./package.json";

export default [
    {
        input: './src/index.ts',
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
            }),
            visualizer()
        ],
        output: {
            name: 'webCorePlus',
            file: pkg.browser,
            format: 'umd'
        },
    },
    {
        input: './src/index.ts',
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
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'es' }
        ],
    }
];
