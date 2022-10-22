export interface InjectOptions {
    [key: string]: any;
}
export interface InjectConfig {
    key?: string;
    attr?: string;
    [key: string]: any;
}
/**
 * 组件接受父组件注入的数据
 * @param key
 * @param options
 * @constructor
 */
export declare function Inject(key: string, options?: InjectOptions): PropertyDecorator;
export declare function GetInject(): PropertyDecorator;
