import { WuComponent } from "@/core";
export interface InjectOptions {
    [key: string]: any;
}
export interface InjectConfig {
    key?: string;
    attr?: string;
    [key: string]: any;
}
export interface ProvideOptions {
    [key: string]: any;
}
export interface ProvideConfig {
    key: string;
    functionName: string;
    [key: string]: any;
}
export declare type PropTyp = Object | String | Boolean | Function | Array<any>;
declare type ComponentEnums = 'CustomWebComponent' | 'LightDom';
export interface CustomTagOptions {
    name: string;
    is?: ComponentEnums;
    css?: any;
    isMountDom?: boolean;
    options?: ElementDefinitionOptions;
}
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
export declare type ReactiveDataOption = PropOptions & StateOptions & {
    attrType: "PROP" | 'STATE';
};
export interface EventOptions {
    methodName?: any;
    methodFun?: any;
    eventName?: string;
}
export interface WatchOptions {
    immediate?: boolean;
    deep?: boolean;
    path?: string;
}
export interface WatchMetaOptions {
    path: string;
    deep?: boolean;
    callbackName?: any;
    callback?: any;
    options?: WatchOptions;
}
export interface MethodOptions {
    methodName?: any;
    methodFun?: any;
    eventName?: string;
}
export interface WatchOptType {
    handler?: () => Function;
    immediate?: boolean;
    deep?: boolean;
}
export interface OnBeforeRender<T = any> {
    beforeRender(): any;
}
/**
 * 渲染后
 */
export interface OnRendered<T = any> {
    rendered(): any;
}
/**
 * 更新前预检查
 */
export interface OnPreBeforeUpdate<T = any> {
    preBeforeUpdate(): boolean;
}
/**
 * 更新前
 */
export interface OnBeforeUpdate<T = any> {
    beforeUpdate(): any;
}
/**
 * 更新前
 */
export interface OnUpdated<T = any> {
    updated(): any;
}
/**
 * 组件挂载
 */
export interface OnConnected<T = any> {
    connected(shadowRoot: ShadowRoot): any;
}
/**
 * 组件挂载
 */
export interface OnDisConnected<T = any> {
    disConnected(shadowRoot: ShadowRoot): any;
}
/**
 * 组件挂载过程中的生命周期
 */
export interface OnInstall<T = any> {
    beforeInstall?(): any;
    install?(): any;
    afterInstall?(): any;
    connected?(shadowRoot: ShadowRoot): any;
}
/**
 * 组件挂载过程中的生命周期
 */
export interface OnUpdate<T = any> {
    preBeforeUpdate?(): boolean;
    beforeUpdate?(): any;
    updated?(): any;
}
export interface DefineComponent {
    /**
     * 组件是否初始化完成
     */
    isInstalled?: boolean;
    /**
     * 组件是否将要更新
     */
    willUpdate?: boolean;
    /**
     * 组件自定义样式
     */
    customStyleContent?: string;
    /**
     * 组件自定义样式
     */
    customStyleElement?: HTMLStyleElement;
    /**
     * host
     */
    host?: any;
    /**
     * 组件id
     */
    elementId?: string | number;
    /**
     * 响应式数据
     */
    $reactive?: any;
    /**
     * 响应式数据
     */
    $prevReactive?: any;
    /**
     * 组件参数
     */
    $options?: CustomTagOptions;
    /**
     * 组件注入的数据
     */
    provides?: ProvideConfig[];
    /**
     * 接受的provide
     */
    injects?: InjectOptions[];
    /**
     * 上次构建的虚拟dom
     */
    prevVNode: any;
    /**
     * 属性变化
     * @param name
     * @param oldValue
     * @param newValue
     */
    attributeChangedCallback?(name: string, oldValue: any, newValue: any): void;
    /**
     * 组件初始化完成
     * @param shadowRoot
     */
    connected?(shadowRoot: ShadowRoot): void;
    /**
     * 组件卸载
     */
    disConnected?(): void;
    /**
     * 组件更新前检查
     */
    preBeforeUpdate?(): boolean;
    /**
     * 更新前
     */
    beforeUpdate?(): void;
    /**
     * 更新完成
     */
    updated?(): void;
    /**
     * 更新组件
     * @param ignoreAttrs
     * @param updateSelf
     */
    update?(ignoreAttrs?: string[], updateSelf?: boolean): void;
    /**
     * 初始化dom
     */
    initShadowRoot?(): ShadowRoot;
    /**
     * 组件 connected
     */
    connectedCallback?(): void;
    /**
     * 初始化前
     */
    beforeInstall?(): void;
    /**
     * 初始化
     */
    install?(): void;
    /**
     * 初始化完成
     */
    afterInstall?(): void;
    /**
     * 渲染前
     */
    beforeRender?(): void;
    /**
     * 渲染结束
     */
    rendered?(): void;
    /**
     * 虚拟dom
     * @param args
     */
    render?(...args: any[]): any;
}
export interface WuComponentConstructor {
    new (): WuComponent;
}
export {};
