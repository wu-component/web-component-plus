import {
    CustomTagOptions,
    EventOptions, InjectConfig, InjectOptions, MethodOptions,
    PropOptions,
    ProvideConfig,
    ProvideOptions, ReactiveDataOption,
    StateOptions, WatchMetaOptions, WatchOptions
} from "@/type";
import {
    COMPONENT_CUSTOM_EVENT,
    COMPONENT_CUSTOM_INJECT, COMPONENT_CUSTOM_METHOD,
    COMPONENT_CUSTOM_PROVIDE, COMPONENT_WATCH,
    PROP_META_KEY,
    STATE_META_KEY
} from "@/app-data";
import { hyphenateReverse } from "@/share";

/**
 * 定义组件
 * @param options
 * @param ctor
 */
export function defineComponent(ctor: any, options: CustomTagOptions) {
    // 默认挂载dom
    if (options.isMountDom === undefined) {
        options.isMountDom = true;
    }
    if (customElements.get(options.name)) {
        return;
    }
    /*class El extends ctor {
        constructor() {
            super();
        }
    }*/
    ctor.$options = options;
    customElements.define(options.name, ctor, options.options || {});
}

/**
 * 定义Prop
 * @param options
 * @param target
 * @param attr
 */
export function defineProps(target: any, attr: string, options: PropOptions = { default: undefined }) {
    const value = options.default;
    const keys: ReactiveDataOption[] = Reflect.getMetadata(PROP_META_KEY, target) ?? [];
    keys.push({ default: value, type: options.type, attr, attrType: 'PROP' });
    Reflect.defineMetadata(PROP_META_KEY, keys, target);
}


/**
 * 定义Prop
 * @param options
 * @param target
 * @param attr
 */
export function defineStates( target: any, attr: string, options: StateOptions = { default: undefined },) {
    const value = options.default;
    const keys: ReactiveDataOption[] = Reflect.getMetadata(STATE_META_KEY, target) ?? [];
    keys.push({ default: value, type: options.type, attr, attrType: 'STATE' });
    Reflect.defineMetadata(STATE_META_KEY, keys, target);
}

/**
 * 定义事件
 * @param event
 * @param target
 * @param methodName
 * @param desc
 */
export function defineEmit(target: any, event: string,  methodName: string, desc: any) {
    const functions: EventOptions[] = Reflect.getMetadata(COMPONENT_CUSTOM_EVENT, target) ?? [];
    const methodFun = desc.value;
    const eventName = event ? event : hyphenateReverse(methodName);
    functions.push({ methodName: methodName, methodFun, eventName });
    Reflect.defineMetadata(COMPONENT_CUSTOM_EVENT, functions, target);
}

/**
 * 定义defineProvide
 * @param key
 * @param target
 * @param methodName
 * @param config
 */
export function defineProvide(target: any, key: string, methodName: string, config: ProvideOptions = {}) {
    const functions: ProvideConfig[] = Reflect.getMetadata(COMPONENT_CUSTOM_PROVIDE, target) ?? [];
    functions.push({ key: key, functionName: methodName, config });
    Reflect.defineMetadata(COMPONENT_CUSTOM_PROVIDE, functions, target);
}


/**
 * 组件接受父组件注入的数据
 * @param target
 * @param key
 * @param options
 * @param attr
 * @constructor
 */
export function defineInject(target: any, key: string, attr: string, options: InjectOptions = {}) {
    const keys: InjectConfig[] = Reflect.getMetadata(COMPONENT_CUSTOM_INJECT, target) ?? [];
    keys.push({ ...options, attr, key });
    Reflect.defineMetadata(COMPONENT_CUSTOM_INJECT, keys, target);
}

/**
 * 定义watch
 * @param target
 * @param path
 * @param methodName
 * @param desc
 * @param options
 */
export function defineWatch(target: any, path: string, methodName: string, desc: any, options?: WatchOptions) {
    const functions: WatchMetaOptions[] = Reflect.getMetadata(COMPONENT_WATCH, target) ?? [];
    const methodFun = desc.value;
    functions.push({
        callback: methodFun,
        options: options || {},
        callbackName: methodName,
        path,
    });
    Reflect.defineMetadata(COMPONENT_WATCH, functions, target);
}


/**
 * 定义watch
 * @param target
 * @param methodName
 * @param desc
 */
export function defineMethod(target: any, methodName: string, desc: any) {
    const functions: MethodOptions[] = Reflect.getMetadata(COMPONENT_CUSTOM_METHOD, target) ?? [];
    const methodFun = desc.value;
    functions.push({ methodName: methodName, methodFun });
    Reflect.defineMetadata(COMPONENT_CUSTOM_METHOD, functions, target);
}
