export interface BaseArgs {
    input: string;
    output: string;
    tsconfig?: string;
    operate?: 'BUILD';
    name?: string;
    typePath?: string;

}


export interface PathConfig {
    inputPath: string;
    outputPath: string;
    tsconfig?: string;
    rootPath: string;
    typePath: string;

}
export interface ConfigTempleteProps {
    path: PathConfig;
    args: BaseArgs
}