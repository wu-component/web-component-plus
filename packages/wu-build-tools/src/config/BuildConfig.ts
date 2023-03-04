import { RollupOptions } from "rollup";
import { RollupConfigTemplete } from "./RollupConfigTemplete";
import {CommonConfig} from "./CommonConfig";
import {BuildArgs, PathConfig} from "./type";
import path, { resolve } from "path";

class BuildConfig extends CommonConfig {
    public args: BuildArgs = {
        input: "./src/index.tsx",
        output: "./dist",
        umdOutput: "./dist",
        tsconfig: "./tsconfig.build.json",
        typePath: './types',
    };

    constructor() {
        super();
        this.args = this.init();
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
    public getRollupConfig(): RollupOptions[] {
        // 生成配置
        return new RollupConfigTemplete({
            path: this.getPathConfig(),
            args: this.args
        }).config;
    }
}
export { BuildConfig }
