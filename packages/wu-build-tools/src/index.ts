import { RollupOptions } from "rollup";
import { Build } from "./build/Build";
import { BaseConfig } from "./config/Config";
import chalk from "chalk";
import { StartBuildResult } from "./build/type";

/**
 * 构建打包
 */
export const build = async (baseConfig: BaseConfig) => {
    const buildConfig: RollupOptions[] = baseConfig.getRollupConfig();
    const pathConfig = baseConfig.getPathConfig();
    const builder = new Build({
        rollupOptions: buildConfig,
        args: baseConfig.args,
        pathConfig: pathConfig,
    });
    console.log(chalk.yellow('start build......'));
    const res: StartBuildResult = await builder.start();
    if (res.state) {
        let str = '';
        for(let i = 0; i < res?.fileList.length; i ++) {
            str += `        ${res.fileList[i]}\n`;
        }
        console.log(chalk.green(`${baseConfig.packageInfo.name}: build success, \n   entry: ${pathConfig.inputPath}  \n   output:\n${str}`));
    }else {
        console.error(res.error);
    }
}


const main = () => {
    const baseConfig = new BaseConfig();
    console.log("operate", baseConfig.args);
    if (baseConfig.args?.operate === 'BUILD') {
        build(baseConfig);
    }
}

main();
