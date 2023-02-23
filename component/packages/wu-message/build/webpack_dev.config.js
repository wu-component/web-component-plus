const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {commonPlugins, commonRules} = require("./webpack_common.config");
module.exports = {
    entry: ['./src/index.tsx'],
    output: {
        path: path.resolve(__dirname, '../', "dist"),
        filename: "bundle.[chunkhash:8].js",
        publicPath: '/',
        // 下面两个是结合使用的。
        libraryTarget: "umd",  // 标签名总4个。详细文档参见 【webpck  library 配置文档】
        // 1\. UMD：在 AMD 或 CommonJS require 之后可访问
        // 2\. window：在浏览器中通过 window 对象访问
        // 3\. this：通过 this 对象访问
        // 4\. 变量：作为一个全局变量，通过 script 标签来访问
        library: "WuMessage", // 引入全局名称。 这里的设置，和script 中的调用名是对应的。
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '.js', 'tsx'],
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
        port: 9005
    },
    // devtool: 'eval-source-map',
    devtool: false,
    module: {
        rules: [
            ...commonRules
        ]
    }
}
