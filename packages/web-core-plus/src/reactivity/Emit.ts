import { toDotCase } from '../utils';
import { COMPONENT_CUSTOM_EVENT } from '../app-data';

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
export function Emit(event?: string): any {
    return function(target: any, methodName: string, desc: any) {
        const functions: EventOptions[] = Reflect.getMetadata(COMPONENT_CUSTOM_EVENT, target) ?? [];
        const methodFun = desc.value;
        const eventName = event ? event : toDotCase(methodName);
        functions.push({ methodName: methodName, methodFun, eventName });
        Reflect.defineMetadata(COMPONENT_CUSTOM_EVENT, functions, target);
    };
}

/**
 * 自定义事件处理
 */
export class EmitReactive {
    private readonly vm!: any;
    private readonly emitList!: EventOptions[];
    constructor(vm: any, ) {
        this.vm = vm;
        this.emitList = Reflect.getMetadata(COMPONENT_CUSTOM_EVENT, this.vm) ?? [];
        this.observerEmits();
    }

    /**
     * PROP 响应式处理
     * @private
     */
    private observerEmits() {
        const that = this;
        const functions: EventOptions[] = this.emitList;
        functions.forEach((event: EventOptions) => {
            Object.defineProperty(this.vm, event.methodName, {
                get: function() {
                    return function(...args: any) {
                        const result: any = event.methodFun.call(that.vm, ...args);
                        const evtName = event.eventName ? event.eventName : toDotCase(event.methodName);
                        that.vm._dispatchEvent.call(that.vm, evtName, result);
                    };
                },
            });
        });

    }
}
