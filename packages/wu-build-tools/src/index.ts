import { RollupOptions } from "rollup";
import {  Configuration} from "webpack";
import { Build } from "./build/Build";
import { Dev } from "./dev/Dev";
import { BuildConfig } from "./config/BuildConfig";
import chalk from "chalk";
import { StartBuildResult } from "./build/type";
import {DevConfig} from "./config/DevConfig";

/**
 * 构建打包
 */
export const build = async (baseConfig: BuildConfig) => {
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

/**
 * 开发
 */
export const dev = async (baseConfig: DevConfig) => {
    const devConfig = baseConfig.getWebpackConfig();
    const pathConfig = baseConfig.getPathConfig();
    const dev = new Dev({
        args: baseConfig.args,
        pathConfig: pathConfig,
        webpackConfig: devConfig,
    });
    dev.start();
}


const main = () => {
    const buildConfig = new BuildConfig();
    if (buildConfig.args?.operate === 'BUILD') {
        console.log("operate", buildConfig.args);
        build(buildConfig);
        return;
    }
    const devConfig = new DevConfig();
    if (devConfig.args?.operate === 'DEV') {
        console.log("operate", devConfig.args);
        dev(devConfig);
        return;
    }
}

main();
