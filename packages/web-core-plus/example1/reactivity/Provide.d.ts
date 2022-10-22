export interface ProvideOptions {
    [key: string]: any;
}
export interface ProvideConfig {
    key: string;
    functionName: string;
    [key: string]: any;
}
/**
 * 向子组件注入数据
 * @param key
 * @param config
 * @constructor
 */
export declare function Provide(key: string, config?: ProvideOptions): any;
