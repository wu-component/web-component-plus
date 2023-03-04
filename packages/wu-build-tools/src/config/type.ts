export interface BaseArgs {
    input: string;
    output: string;
    umdOutput: string;
    tsconfig?: string;
    operate?: 'BUILD' | 'DEV';
    name?: string;
    typePath?: string;
    cssminimize?: boolean;

}

export type BuildArgs = BaseArgs
export interface DevArgs extends BaseArgs{
    template?: string;
    devtool: string | boolean;
    port?: number;
    mode?: "none" | "development" | "production";
}


export interface PathConfig {
    inputPath: string;
    outputPath: string;
    umdOutputPath: string;
    tsconfig?: string;
    rootPath: string;
    typePath: string;

}
export interface RollupConfigTempleteProps {
    path: PathConfig;
    args: BuildArgs
}

export interface WebpackConfigTempleteProps {
    path: PathConfig;
    args: DevArgs
}

