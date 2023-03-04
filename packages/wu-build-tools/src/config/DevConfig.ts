import {CommonConfig} from "./CommonConfig";
import {Configuration} from "webpack";
import {DevArgs, PathConfig} from "./type";
import {WebpackConfigTemplete} from "./WebpackConfigTemplete";
import path, { resolve } from "path";

class DevConfig extends CommonConfig {

    public args: DevArgs = {
        input: "./src/index.tsx",
        output: "./dist",
        umdOutput: "./dist",
        tsconfig: "./tsconfig.build.json",
        typePath: './types',
        template: './public/index.html',
        devtool: false
    };
    constructor() {
        super();
        this.args = this.init() as DevArgs;
    }

        /**
     * 读取打包信息的路径
     * @returns
     */
    public getPathConfig(): PathConfig {
        return {
            inputPath: resolve(this.rootPath, this.args.input),
            outputPath: resolve(this.rootPath, this.args.output),
            umdOutputPath: resolve(this.rootPath, this.args.umdOutput),
            tsconfig: resolve(this.rootPath, this.args.tsconfig),
            rootPath: this.rootPath,
            typePath: path.join(this.rootPath, this.args.typePath || './types')
        }
    }

    /**
     * 读取构建参数
     * @returns
     */
    public getWebpackConfig(): Configuration {
        // 生成配置
        return new WebpackConfigTemplete({
            path: this.getPathConfig(),
            args: this.args
        }).config;
    }
}

export { DevConfig }
