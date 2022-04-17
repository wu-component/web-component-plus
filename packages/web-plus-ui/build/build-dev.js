import { resolve } from "path";
import { readdirSync } from "fs";
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

const input = resolve(__dirname, "../src/packages");
const output = resolve(__dirname, "../dist");
const getPath = _path => resolve(__dirname, _path)
const extensions = [
    '.js',
    '.ts',
    '.tsx'
]
let defaults = { compilerOptions: { declaration: true } };
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
/*const config = readdirSync(input)
    .filter(name => ![].includes(name))
    .map(name => ({
        input: `${input}/${name}/index.tsx`,
        plugins: [
            url({
                include: ['**!/!*.svg', '**!/!*.png', '**!/!*.jp(e)?g', '**!/!*.gif', '**!/!*.webp', '**!/!*.ttf', '**!/!*.woff']
            }),
            nodeResolve(),
            commonjs(),
            postcss({
                name: 'index',
                extensions: [ '.css', 'scss' ],
                to: `${output}/${name}/lib/index.css`,
                plugins: [
                    autoprefixer()
                ],
                // extract: `${output}/${name}/lib/index.css`
                extract: false
            }),
            tsPlugin,
            json(),
            replace({
                preventAssignment: true
            })
        ],
        output: [
            { name: name, file: `${output}/${name}/lib/web-plus.umd.js`, format: 'umd' },
            // { file: `${output}/${name}/lib/web-plus.cjs.js`, format: 'cjs' },
            // { file: `${output}/${name}/lib/web-plus.esm.js`, format: 'es' }

        ]
    }));*/

const config = []
// 整合打;包
config.push({
    input: resolve(__dirname, "../src/index.ts"),
    plugins: [
        url(),
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
        { name: 'WebUIPlus', file: `${output}/web-plus.umd.js`, format: 'umd' },
        // { file: `${output}/web-plus.cjs.js`, format: 'cjs' },
        // { file: `${output}/web-plus.esm.js`, format: 'es' }

    ]
})
export default config;
