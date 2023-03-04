import {BaseArgs, PathConfig} from "../config/type";
import { Configuration} from "webpack";

export interface DevProps {
    args: BaseArgs;
    pathConfig: PathConfig;
    webpackConfig: Configuration
}


export interface DevBuildResult {
    state: boolean;
    error?: any;
}
