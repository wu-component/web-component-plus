import {DevArgs} from "./type";
const devServerOptions = (args: DevArgs) => {
    return {
        compress: true,
        open: true,
        // port: args.port || 9005
    }
}

export { devServerOptions }
