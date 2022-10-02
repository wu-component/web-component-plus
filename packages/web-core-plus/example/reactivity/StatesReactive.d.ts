import { CommonReactive } from "./CommonReactive";
declare type PropTyp = Object | String | Boolean | Function | Array<any>;
export interface StateOptions {
    default?: any;
    attr?: string;
    type?: PropTyp;
}
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
/**
 * PROP 响应式处理
 */
export declare class StatesReactive extends CommonReactive {
    private readonly statesList;
    constructor(vm: any, statesList?: StateOptions[]);
    /**
     * PROP 响应式处理
     * @private
     */
    private observerStates;
}
export {};
