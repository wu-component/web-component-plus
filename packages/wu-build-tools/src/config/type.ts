export interface BaseArgs {
    input: string;
    output: string;
    umdOutput: string;
    tsconfig?: string;
    operate?: 'BUILD';
    name?: string;
    typePath?: string;

}


export interface PathConfig {
    inputPath: string;
    outputPath: string;
    umdOutputPath: string;
    tsconfig?: string;
    rootPath: string;
    typePath: string;

}
export interface ConfigTempleteProps {
    path: PathConfig;
    args: BaseArgs
}
