import path, { resolve } from "path";
import { snake2camel } from "../utils";
import { BaseArgs, PathConfig } from "./type";



class CommonConfig {
    public rootPath: string = process.cwd();
    public packageInfo: Record<string, any> = require(resolve(this.rootPath, './package.json'));

    public commonArgs: BaseArgs = {
        input: "./src/index.tsx",
        output: "./dist",
        umdOutput: "./dist",
        tsconfig: "./tsconfig.build.json",
        typePath: './types',
    };

    /**
     * 初始化一些列参数
     */
    protected init() {
        if (!this.rootPath) {
            this.rootPath = process.cwd();
        }
        const argument = process.argv.slice(2);
        argument.forEach((_val: string, index: number) => {
            let val: any = _val;
            if (val.startsWith('--')) {
                this.commonArgs[val.replace("--", '')] = true;
            }
            else {
                let key = argument[index -1];
                if (key) {
                    key = key.replace("--", '');
                    if (val === 'true' || val === 'false') {
                        val = Boolean(val);
                    }
                    this.commonArgs[key] = val;
                }
            }
        });
        if (!this.commonArgs.name) {
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
            this.commonArgs.name = name;
        }
        return this.commonArgs;
    }
}
export { CommonConfig }
