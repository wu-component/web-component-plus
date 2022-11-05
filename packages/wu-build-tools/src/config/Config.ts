import path, { resolve } from "path";
import chalk from "chalk";
import { RollupOptions } from "rollup";
import { snake2camel } from "../utils";
import { ConfigTemplete } from "./ConfigTemplete";
import { BaseArgs, PathConfig } from "./type";



class BaseConfig {
    private rootPath: string = process.cwd();
    public packageInfo: Record<string, any> = require(resolve(this.rootPath, './package.json'));

    public args: BaseArgs = {
        input: "./src/index.tsx",
        output: "./dist",
        umdOutput: "./dist",
        tsconfig: "./tsconfig.build.json",
        typePath: './types',
     };

    constructor() {
        this.init();
    }

    /**
     * 初始化一些列参数
     */
    private init() {
        if (!this.rootPath) {
            this.rootPath = process.cwd();
        }
        const argument = process.argv.slice(2);
        argument.forEach((val: string, index: number) => {
            if (val.startsWith('--')) {
                this.args[val.replace("--", '')] = true;
            }
            else {
                let key = argument[index -1];
                if (key) {
                    key = key.replace("--", '');
                    this.args[key] = val;
                }
            }
        });
        if (!this.args.name) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const packageInfo = this.packageInfo;
            let name = packageInfo.name;
            if (name.startsWith("@")) {
                name.replace("@", '');
            }
            if (name.indexOf('/') > -1) {
                name = name.split('/')[1]
            }
            name = snake2camel(name)
            const characters = [...name];
		    characters[0] = characters[0].toUpperCase();
		    name = characters.join("");
            this.args.name = name;
        }
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
        return new ConfigTemplete({
            path: this.getPathConfig(),
            args: this.args
        }).config;
    }
}
export { BaseConfig }
