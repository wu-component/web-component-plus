import { WatchMetaOptions } from "./WatchReactive";
import { CommonReactive } from "./CommonReactive";
declare type PropTyp = Object | String | Boolean | Function | Array<any>;
export interface PropOptions {
    default?: any;
    attr?: string;
    type?: PropTyp;
}
/**
 * 属性装饰器
 * @param options
 * @constructor
 */
export declare function Prop(options?: PropOptions): PropertyDecorator;
/**
 * 定义Prop
 * @param options
 * @param target
 * @param attr
 */
export declare function defineProps(options: PropOptions, target: any, attr: string): void;
/**
 * PROP 响应式处理
 */
export declare class PropsReactive extends CommonReactive {
    private readonly propsList;
    constructor(vm: any, propsList?: PropOptions[], watchList?: WatchMetaOptions[]);
    /**
     * PROP 响应式处理
     * @private
     */
    private observerProps;
}
export {};
