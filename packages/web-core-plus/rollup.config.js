import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import pkg from "./package.json";
import gzipPlugin from 'rollup-plugin-gzip';
import esbuild from 'rollup-plugin-esbuild';


const esbuildMinifer = (options) => {
    const { renderChunk } = esbuild(options);

    return {
        name: 'esbuild-minifer',
        renderChunk,
    };
};
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
            // GZIP compression as .gz files
            gzipPlugin(),
            /*// Brotil compression as .br files
            gzipPlugin({
                customCompression: content => brotliPromise(Buffer.from(content)),
                fileName: '.br',
            }),*/
        ],
        output: {
            name: 'webCorePlus',
            file: "./dist/index.iife.js",
            format: 'iife',
            extend: true,
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
                    lib: [ "es5", "es6", "dom" ], target: "es5"
                }
            }),
            json(),
            replace({
                preventAssignment: true
            }),
            // GZIP compression as .gz files
            gzipPlugin(),
            /*// Brotil compression as .br files
            gzipPlugin({
                customCompression: content => brotliPromise(Buffer.from(content)),
                fileName: '.br',
            }),*/
        ],
        output: {
            name: 'webCorePlus',
            file: "./dist/index.umd.js",
            format: 'umd',
            extend: true,
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
                    lib: [ "es5", "es6", "dom" ], target: "es5"
                }
            }),
            json(),
            replace({
                preventAssignment: true
            }),
            // GZIP compression as .gz files
            gzipPlugin(),
            /*// Brotil compression as .br files
            gzipPlugin({
                customCompression: content => brotliPromise(Buffer.from(content)),
                fileName: '.br',
            }),*/
        ],
        output: {
            name: 'webCorePlus',
            file: pkg.jsdelivr,
            format: 'iife',
            extend: true,
            plugins: [
                esbuildMinifer({
                    minify: true,
                }),
            ],
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
            }),
            gzipPlugin(),
        ],
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'es' }
        ],
    }
];
