import { CustomTagOptions, InjectOptions, PropOptions, ProvideOptions, StateOptions, WatchOptions } from "@/type";
/**
 * 定义方法
 * @constructor
 */
export declare function Method(): any;
/**
 * Watch 装饰器
 * @param path
 * @param options
 * @constructor
 */
export declare function Watch(path: string, options?: WatchOptions): any;
/**
 * 向子组件注入数据
 * @param key
 * @param config
 * @constructor
 */
export declare function Provide(key: string, config?: ProvideOptions): any;
/**
 * 组件接受父组件注入的数据
 * @param key
 * @param options
 * @constructor
 */
export declare function Inject(key: string, options?: InjectOptions): PropertyDecorator;
/**
 * 像外抛出自定义事件
 * @param event
 * @constructor
 */
export declare function Emit(event?: string): any;
/**
 * 属性装饰器
 * @param options
 * @constructor
 */
export declare function Prop(options?: PropOptions): PropertyDecorator;
/**
 * 属性装饰器
 * @param options
 * @constructor
 */
export declare function State(options?: StateOptions): PropertyDecorator;
/**
 * 组件定义
 * @param options
 * @constructor
 */
export declare function Component(options: CustomTagOptions): (target: any) => void;
