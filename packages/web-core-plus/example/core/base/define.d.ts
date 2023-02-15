import { CustomTagOptions, InjectOptions, PropOptions, ProvideOptions, StateOptions, WatchOptions } from "@/type";
/**
 * 定义组件
 * @param options
 * @param ctor
 */
export declare function defineComponent(ctor: any, options: CustomTagOptions): void;
/**
 * 定义Prop
 * @param options
 * @param target
 * @param attr
 */
export declare function defineProps(target: any, attr: string, options?: PropOptions): void;
/**
 * 定义Prop
 * @param options
 * @param target
 * @param attr
 */
export declare function defineStates(target: any, attr: string, options?: StateOptions): void;
/**
 * 定义事件
 * @param event
 * @param target
 * @param methodName
 * @param desc
 */
export declare function defineEmit(target: any, event: string, methodName: string, desc: any): void;
/**
 * 定义defineProvide
 * @param key
 * @param target
 * @param methodName
 * @param config
 */
export declare function defineProvide(target: any, key: string, methodName: string, config?: ProvideOptions): void;
/**
 * 组件接受父组件注入的数据
 * @param target
 * @param key
 * @param options
 * @param attr
 * @constructor
 */
export declare function defineInject(target: any, key: string, attr: string, options?: InjectOptions): void;
/**
 * 定义watch
 * @param target
 * @param path
 * @param methodName
 * @param desc
 * @param options
 */
export declare function defineWatch(target: any, path: string, methodName: string, desc: any, options?: WatchOptions): void;
/**
 * 定义watch
 * @param target
 * @param methodName
 * @param desc
 */
export declare function defineMethod(target: any, methodName: string, desc: any): void;
