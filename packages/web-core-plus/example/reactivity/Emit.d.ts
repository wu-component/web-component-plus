export interface EventOptions {
    methodName?: any;
    methodFun?: any;
    eventName?: string;
}
/**
 * 像外抛出自定义事件
 * @param event
 * @constructor
 */
export declare function Emit(event?: string): any;
/**
 * 自定义事件处理
 */
export declare class EmitReactive {
    private readonly vm;
    private readonly emitList;
    constructor(vm: any);
    /**
     * PROP 响应式处理
     * @private
     */
    private observerEmits;
}
