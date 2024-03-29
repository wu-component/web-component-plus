/* eslint-env node */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const {commonRules} = require("./webpack_common.config");

module.exports = () => {
    return {
        mode: 'production',
        target: 'web',
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, '../', "dist"),
            filename: "index.umd.js",
            // libraryTarget: 'umd',
            publicPath: '/',
            library: {
                name: 'WuCodeSandbox',
                type: 'umd',
                export: 'default',
                umdNamedDefine: true,
            },
        },
        optimization: {
            minimize: true// We don't want to minify distributed code, only join everything together
        },
        resolve: {
            extensions: ['.ts', '.js', '.tsx'],
        },
        module: {
            rules: [
                ...commonRules,
            ]
        }
    };
};
