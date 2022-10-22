import { RollupOptions } from "rollup";
import { BaseArgs, PathConfig } from "../config/type";
export interface BuildProps {
    rollupOptions: RollupOptions[];
    args: BaseArgs;
    pathConfig: PathConfig;
}

export interface BuildResult {
    state: boolean;
    bundle: any;
    error?: any;
}

export interface StartBuildResult {
    state: boolean;
    error?: any;
    fileList: string[];
}

export interface DeclarationResult {
    state: boolean;
}