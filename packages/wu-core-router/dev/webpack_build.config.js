const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { commonRules } = require("./webpack_common.config");
module.exports = {
    entry: [ './src/index.ts' ],
    output: {
        path: path.resolve(__dirname, '../', "dist-example"),
        filename: "bundle.[chunkhash:8].js",
        publicPath: './',
        library: {
            name: 'wuRouter',
            type: 'umd'
        }
        // name: 'wuRouter',
    },
    target: 'web',
    resolve: {
        extensions: [ '.ts', '.js', '.tsx' ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            scriptLoading: 'blocking'
        }),
        /*...commonPlugins*/

    ],
    // devtool: 'eval-source-map',
    devtool: false,
    module: {
        rules: [
            ...commonRules
        ]
    }
};
