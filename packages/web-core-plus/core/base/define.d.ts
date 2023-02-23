import { WuComponent } from "@/core/base/WuComponent";
import { CustomTagOptions, InjectOptions, PropertyDeclaration, ProvideOptions, StateOptions, WatchOptions } from "@/type";
/**
 * 定义组件
 * @param options
 * @param ctor
 */
export declare function defineComponent(ctor: typeof WuComponent, options: CustomTagOptions): void;
/**
 * 属性装饰器
 * @param options
 * @constructor
 */
export declare const Prop: (options?: PropertyDeclaration) => (target: unknown, name: string) => void;
/**
 * 属性装饰器
 * @param options
 * @constructor
 */
export declare const State: (options?: StateOptions) => (target: unknown, name: string) => void;
/**
 * 像外抛出自定义事件
 * @param event
 * @constructor
 */
export declare const Emit: (event?: string) => (target: any, methodName: string, descriptor: any) => any;
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
 * 组件定义
 * @param options
 * @constructor
 */
export declare function Component(options: CustomTagOptions): (target: typeof WuComponent) => void;
