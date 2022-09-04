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
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '.js', 'tsx', '.css', 'scss'],
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
