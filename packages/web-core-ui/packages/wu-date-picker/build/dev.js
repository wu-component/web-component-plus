import { resolve } from "path";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import servePlugin from "rollup-plugin-serve";
import livereload from 'rollup-plugin-livereload'
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
                tsconfig: getPath('../tsconfig.build.json'), // 导入本地ts配置
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
            }),
            servePlugin({
                //打开ip
                host: "localhost",

                //端口号
                port: 8080,

                //设置静态资源所在的目录 访问http://localhost:8080->当前文件所在目录的绝对目录/public
                //contentBase: ["public", "dist"], //string | string[]
                contentBase: "", //string | string[]

                //auto open browser
                open: false,

                //自动打开的默认目录
                openPage: "public/index.html",

                // Show server address in console (default: true)
                verbose: true,

                //发生错误显示地址 设置false为404
                historyApiFallback: "/200.html", // false | string

                //设置响应头
                headers: {
                    "Access-Control-Allow-Origin": "*", //跨域
                    foo: "bar",
                },

                //开启监听后回调函数
                onListening(server) {
                    // server.address
                    // server.host
                },
            }),
            livereload('src')

        ],
        output: [
            { name: name, file: `${output}/index.umd.js`, format: 'umd' },
            /*{ file: `${output}/index.cjs.js`, format: 'cjs' },
            { file: `${output}/index.esm.js`, format: 'es' }*/

        ]
    }
]

export default config;
