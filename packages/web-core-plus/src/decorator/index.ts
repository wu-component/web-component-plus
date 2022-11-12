import {
    CustomTagOptions,
    InjectOptions,
    PropOptions,
    ProvideOptions,
    StateOptions,
    WatchOptions
} from "@/type";
import {
    defineComponent,
    defineEmit,
    defineInject,
    defineMethod,
    defineProps,
    defineProvide,
    defineStates,
    defineWatch
} from "@/core";

/**
 * 定义方法
 * @constructor
 */
export function Method(): any {
    return function(target: any, methodName: string, desc: any) {
        defineMethod(target, methodName, desc);
    };
}


/**
 * Watch 装饰器
 * @param path
 * @param options
 * @constructor
 */
export function Watch(path: string, options?: WatchOptions): any {
    return function(target: any, methodName: string, desc: any) {
        defineWatch(target, path, methodName, desc, options);
    };
}



/**
 * 向子组件注入数据
 * @param key
 * @param config
 * @constructor
 */
export function Provide(key: string, config: ProvideOptions = {}): any {
    return function(target: any, methodName: string) {
        defineProvide(target, key, methodName,config);
    };
}



/**
 * 组件接受父组件注入的数据
 * @param key
 * @param options
 * @constructor
 */
export function Inject(key: string, options: InjectOptions = {}): PropertyDecorator {
    return function(target: any, attr: any) {
        defineInject(target, key, attr, options);
    };
}


/**
 * 像外抛出自定义事件
 * @param event
 * @constructor
 */
export function Emit(event?: string): any {
    return function(target: any, methodName: string, desc: any) {
        defineEmit(target, event, methodName, desc);
    };
}


/**
 * 属性装饰器
 * @param options
 * @constructor
 */
export function Prop(options: PropOptions = { default: undefined }): PropertyDecorator {
    return function(target: any, attr: any) {
        defineProps(target, attr, options);
    };
}

/**
 * 属性装饰器
 * @param options
 * @constructor
 */
export function State(options: StateOptions = { default: undefined }): PropertyDecorator {
    return function(target: any, attr: any) {
        defineStates(target, attr, options);
    };
}

/**
 * 组件定义
 * @param options
 * @constructor
 */
export function Component(options: CustomTagOptions) {
    return function (target) {
        defineComponent(target, options);
    };
}

