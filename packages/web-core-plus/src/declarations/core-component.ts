/**
 * 渲染前
 */
import { InjectOptions, PropOptions, ProvideConfig } from '@/decorators';

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

export interface BaseCustomComponent {

    provides: ProvideConfig[];

    injects: InjectOptions[];
    /**
     * 组件中props
     */
    props: Record<string, any>;

    /**
     * 数据仓库
     */
    store: Record<string, any>;

    /**
     * 上一次的props
     */
    prevProps: Record<string, any>;

    /**
     * 当前的 dom 结构
     */
    rootNode: HTMLElement;

    /**
     * 组件是否初始化完成
     */
    isInstalled: boolean;

    /**
     * 组件是否将要更新
     */
    willUpdate: boolean;

    /**
     * 组件自定义样式
     */
    _customStyleContent: string;

    /**
     * 组件自定义属性集合，组件内部会对这类属性做响应式的处理
     */
    __keyList__: PropOptions[];

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

    render(...args): any;
}
