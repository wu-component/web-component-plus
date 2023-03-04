import { HotModuleReplacementPlugin, Configuration} from "webpack";
import { WebpackConfigTempleteProps } from "./type";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {commonRules} from "./CommonWebpack";

class WebpackConfigTemplete {

    public config: Configuration

    constructor(options: WebpackConfigTempleteProps) {
        this.init(options);
    }

    public init(options: WebpackConfigTempleteProps) {
        const { path, args } = options;
        const { inputPath, outputPath } = path;
        this.config = {
            entry: [inputPath],
            output: {
                path: outputPath,
                filename: "bundle.[chunkhash:8].js",
                publicPath: '/',
            },
            target: 'web',
            resolve: {
                extensions: ['.ts', '.js', 'tsx'],
            },
            mode: args.mode || "development",
            plugins: [
                /*new webpack.EvalSourceMapDevToolPlugin({}),*/
                new HotModuleReplacementPlugin(),
                new HtmlWebpackPlugin({
                    template: args.template || './public/index.html'
                }),
                /*...commonPlugins*/

            ],
            //devServer: devServerOptions(args),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            devtool: args.devtool,
            module: {
                rules: [
                    ...commonRules
                ]
            }
        }
    }

}

export { WebpackConfigTemplete }
