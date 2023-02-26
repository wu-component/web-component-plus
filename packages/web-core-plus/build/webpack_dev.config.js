const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {commonPlugins, commonRules} = require("./webpack_common.config");
const {resolve} = require("path");
module.exports = {
    entry: ['./src/example/example.tsx'],
    output: {
        path: path.resolve(__dirname, '../', "dist"),
        filename: "bundle.[chunkhash:8].js",
        publicPath: '/',
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '.js', 'tsx'],
        alias: {
            // __dirname  可以获取被执行 js 文件的绝对路径
            //'@': resolve(__dirname,'src')// 这样引入的写法引入const {resolve } = require('path')
            '@': resolve('src')// 这样配置后 @ 可以指向 src 目录
            //当然，别名写更深层也可以   前提是你得有这个目录啊！！
        }
    },
    plugins: [
        /*new webpack.EvalSourceMapDevToolPlugin({}),*/
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        /*...commonPlugins*/

    ],
    devServer: {
        compress: true,
        open: true,
        port: 9005,
        host:'0.0.0.0'
    },
    devtool: 'eval-source-map',
    // devtool: false,
    module: {
        rules: [
            ...commonRules
        ]
    }
}
