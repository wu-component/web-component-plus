import { CommonReactive } from "./CommonReactive";
interface WatchOptions {
    deep?: boolean;
}
export interface WatchMetaOptions {
    path: string;
    deep?: boolean;
    callbackName?: any;
    callback?: any;
    options?: WatchOptions;
}
export interface WatchOptType {
    handler?: () => Function;
    immediate?: boolean;
    deep?: boolean;
}
/**
 * Watch 装饰器
 * @param path
 * @param options
 * @constructor
 */
export declare function Watch(path: string, options?: WatchMetaOptions): any;
/**
 * PROP 响应式处理
 */
export declare class WatchReactive extends CommonReactive {
    private readonly watchList;
    constructor(vm: any, watchList?: WatchMetaOptions[]);
    /**
     * PROP 响应式处理
     * @private
     */
    private observer;
    /**
     * 添加一个观察者 create user watcher
     * @param expr 表达式
     * @param handler 回调函数
     * @param watchOpt 配置参数
     * @return 卸载当前观察者的函数 (暂未返回)
     */
    protected $watch(expr: string | Function, handler: Function | WatchOptType, watchOpt?: WatchOptType): Function;
}
export {};
