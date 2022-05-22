/**
 * 渲染前
 */
import { InjectOptions, PropOptions, ProvideConfig } from '../decorators';

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

export interface BaseCustomComponent extends DefineComponent {

    /**
     * 组件注入的数据
     */
    provides?: ProvideConfig[];

    injects?: InjectOptions[];
    /**
     * 组件中props
     */
    props?: Record<string, any>;

    /**
     * 数据仓库
     */
    store?: Record<string, any>;

    /**
     * 上一次的props
     */
    prevProps?: Record<string, any>;

    /**
     * 当前的 dom 结构
     */
    rootNode?: HTMLElement;

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
    _customStyleContent: string;

    /**
     * 组件自定义属性集合，组件内部会对这类属性做响应式的处理
     */
    __keyList__: PropOptions[];

    /**
     * host
     */
    host: any;

    /**
     * 影子dom
     */
    shadowRoot:any;

    /**
     * 标签
     */
    tagName: string;

    /**
     * 移除属性
     * @param key
     */
    removeAttribute(key: string): void;

    /**
     * 设置属性
     * @param key
     * @param val
     */
    setAttribute(key: string, val: any): void;
}

export interface DefineComponent {

    /**
     * 移除属性
     * @param key
     */
    removeAttribute(key: string): void;

    /**
     * 移除属性
     * @param key
     */
    getAttribute(key: string): void;

    /**
     * 设置属性
     * @param key
     * @param val
     */
    setAttribute(key: string, val: any): void;
    /**
     * 属性变化
     * @param name
     * @param oldValue
     * @param newValue
     */
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;

    /**
     * 组件初始化完成
     * @param shadowRoot
     */
    connected(shadowRoot: ShadowRoot): void;

    /**
     * 组件卸载
     */
    disConnected(): void

    /**
     * 组件更新前检查
     */
    preBeforeUpdate(): boolean;

    /**
     * 更新前
     */
    beforeUpdate(): void;

    /**
     * 更新完成
     */
    updated(): void;

    /**
     * 更新组件
     * @param ignoreAttrs
     * @param updateSelf
     */
    update(ignoreAttrs?: string[], updateSelf?: boolean): void;

    /**
     * 初始化dom
     */
    initShadowRoot(): ShadowRoot;

    /**
     * 组件 connected
     */
    connectedCallback(): void;

    /**
     * 初始化前
     */
    beforeInstall(): void;

    /**
     * 初始化
     */
    install(): void;

    /**
     * 初始化完成
     */
    afterInstall(): void;

    /**
     * 渲染前
     */
    beforeRender(): void;

    /**
     * 渲染结束
     */
    rendered(): void;

    render(...args): any;
}
