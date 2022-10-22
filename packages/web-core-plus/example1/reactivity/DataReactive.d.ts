import { WatchMetaOptions } from "./WatchReactive";
import { CommonReactive } from "./CommonReactive";
import { WuComponent } from "./component";
declare type PropTyp = Object | String | Boolean | Function | Array<any>;
export interface PropOptions {
    default?: any;
    attr?: string;
    type?: PropTyp;
}
export interface StateOptions {
    default?: any;
    attr?: string;
    type?: PropTyp;
}
export interface DataReactiveOptions {
    vm: WuComponent;
    propsList?: PropOptions[];
    statesList?: StateOptions[];
    watchList?: WatchMetaOptions[];
}
export declare type ReactiveType = 'PROPS' | 'STATE';
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
 * 属性装饰器
 * @param options
 * @constructor
 */
export declare function State(options?: StateOptions): PropertyDecorator;
/**
 * 定义Prop
 * @param options
 * @param target
 * @param attr
 */
export declare function defineStates(options: StateOptions, target: any, attr: string): void;
/**
 * PROP 响应式处理
 */
export declare class DataReactive extends CommonReactive {
    private readonly propsList;
    private readonly statesList;
    constructor(options: DataReactiveOptions);
    /**
     * 数据劫持更新
     * @private
     */
    private observer;
}
export {};
