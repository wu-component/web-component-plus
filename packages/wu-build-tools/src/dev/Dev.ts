import { pathExists } from "fs-extra";
import webpack from "webpack";
import { devServerOptions as devServerConfig } from "../config/DevServerWebpack"
import WebpackDevServer from "webpack-dev-server";
import { DevProps} from "./type";
import {DevArgs} from "../config/type";

class Dev {
    private config: DevProps;
    constructor(options: DevProps) {
        this.config = options;
    }
    /**
     * 开始打包
     * @returns
     */
    public async start() {
        await this.pre();
        const compiler = webpack(this.config.webpackConfig);
        const devServerOptions = devServerConfig(this.config.args as DevArgs);
        const server = new WebpackDevServer(devServerOptions, compiler);
        // const localIPv4 = WebpackDevServer.internalIPSync('v4');
        console.log('Starting server...');
        await server.start();
        /*server.startCallback(() => {
            console.log(`Successfully started server on http://127.0.0.1:${server.options.port} \n localIPv4: ${localIPv4}:${server.options.port}`);
        });*/
    }

    /**
     * 预构建检查
     * @returns
     */
    private pre() {
        return new Promise(async (resolve) => {
            const inputeEists = await pathExists(this.config.pathConfig.inputPath);
            if (!inputeEists) {
                resolve({
                    state: false,
                    errMaeeage: `not found entry file, please check ${this.config.pathConfig.inputPath}`
                });
                return;
            }
            resolve(true);
        })
    }
}

export { Dev }
