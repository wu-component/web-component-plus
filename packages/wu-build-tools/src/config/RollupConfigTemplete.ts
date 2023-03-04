import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import url from '@rollup/plugin-url';
import scss from 'rollup-plugin-scss'
import autoprefixer from 'autoprefixer'
import { RollupOptions } from "rollup";
import { RollupConfigTempleteProps, PathConfig } from "./type";


const extensions = [
    '.js',
    '.ts',
    '.tsx'
]
const defaults = { compilerOptions: { declaration: true } };
class RollupConfigTemplete {

    public config: RollupOptions[] = []

    constructor(options: RollupConfigTempleteProps) {
        this.init(options);
    }

    public init(options: RollupConfigTempleteProps) {
        const { path, args } = options;
        const { inputPath, outputPath, tsconfig, umdOutputPath } = path;
        this.config = [
            {
                input: inputPath,
                plugins: [
                    terser(),
                    url({
                        include: ['**/*.svg', '**/*.txt', '**/*.html', '**/*.png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp', '**/*.ttf', '**/*.woff', '**/*?raw']
                    }),
                    nodeResolve(),
                    commonjs(),
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    postcss({ extensions: [ '.css', 'scss' ],plugins: [ autoprefixer() ], extract: false, minimize: args?.hasOwnProperty('cssminimize')? args?.cssminimize: true }),
                    typescript({
                        tsconfig: tsconfig, // 导入本地ts配置
                        tsconfigDefaults: defaults,
                        tsconfigOverride: {
                            compilerOptions: {
                                declaration: true
                            }
                        },
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                         // @ts-ignore
                        extensions

                    }),
                    json(),
                    replace({
                        preventAssignment: true
                    })
                ],
                output: [

                    { file: `${outputPath}/index.cjs.js`, format: 'cjs' },
                    { file: `${outputPath}/index.esm.js`, format: 'es' }
                ],
                external: [
                    "@wu-component/web-core-plus",
                    /^@wu-component\/wu-/g   // 忽略组件
                ],
            },
            {
                input: inputPath,
                plugins: [
                    terser(),
                    url({
                        include: ['**/*.svg', '**/*.txt', '**/*.html', '**/*.png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp', '**/*.ttf', '**/*.woff', '**/*?raw']
                    }),
                    nodeResolve(),
                    commonjs(),
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    postcss({ extensions: [ '.css', 'scss' ],plugins: [ autoprefixer() ], extract: false, minimize: args?.hasOwnProperty('cssminimize')? args?.cssminimize: true }),
                    typescript({
                        tsconfig: tsconfig, // 导入本地ts配置
                        tsconfigDefaults: defaults,
                        tsconfigOverride: {
                            compilerOptions: {
                                declaration: true
                            }
                        },
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                         // @ts-ignore
                        extensions

                    }),
                    json(),
                    replace({
                        preventAssignment: true
                    })
                ],
                output: [
                    {
                        name: args.name,
                        file: `${umdOutputPath}/index.umd.js`,
                        format: 'umd',
                        globals: {
                            "@wu-component/web-core-plus": "webCorePlus"
                        }
                    }
                ],
                external: [
                    "@wu-component/web-core-plus",
                    // @wu-component/wu-
                ],
            }
        ]
    }

}

export { RollupConfigTemplete }
