import '@/polyfill';
import 'weakmap-polyfill';
import { DefineComponent, PropOptions, ProvideConfig, InjectOptions, CustomTagOptions } from "@/type";
export declare class WuComponent extends HTMLElement implements DefineComponent {
    tagName: string;
    rootNode: any;
    isInstalled: boolean;
    willUpdate: boolean;
    customStyleContent: string;
    props: {};
    prevProps: {};
    customStyleElement: any;
    store: any;
    injects: InjectOptions[];
    provides: ProvideConfig[];
    parentNode: any;
    shadowRoot: any;
    elementId: number;
    prevVNode: any;
    attachShadow: any;
    dispatchEvent: any;
    providesMap: Record<string, ProvideConfig>;
    injectsList: InjectOptions[];
    propsList: PropOptions[];
    $reactive: any;
    $prevReactive: any;
    $options: CustomTagOptions;
    host: any;
    static is: string;
    css: any;
    injection: Record<string, any>;
    private watchListMap;
    geMateList<K, T>(makeKey: K): T[];
    private initComponent;
    constructor();
    get inlineCss(): string;
    /**
     * 初始化watch
     * @private
     */
    private initWatch;
    initCss(shadowRoot: any): ShadowRoot;
    static get observedAttributes(): any[];
    /**
     * 获取当前组件注入的数据
     */
    getProvides(): Record<string, ProvideConfig>;
    /**
     * 获取当前组件注入的数据
     */
    getInjects(): InjectOptions[];
    /**
     * 判断是否需要读取注入的数据
     */
    get isInject(): boolean;
    /**
     * 是否注入
     */
    get isProvide(): boolean;
    /**
     * 属性移除
     * @param key
     */
    removeAttribute(key: string): void;
    /**
     * 设置属性
     * @param key
     * @param val
     */
    setAttribute(key: string, val: any): void;
    getAttribute(key: string): any;
    pureRemoveAttribute(key: string): void;
    pureSetAttribute(key: string, val: string): void;
    /**
     * 属性变化
     */
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    /**
     * 组件更新
     * @param ignoreAttrs
     * @param updateSelf
     */
    update(ignoreAttrs?: string[], updateSelf?: boolean): void;
    /**
     * 执行对应的watch对应的回调函数
     * @param path
     * @param val
     * @param old
     */
    watchChangeCallback(path: string, val: any, old: any): void;
    /**
     * 真正执行更新
     * @private
     */
    callUpdate(ignoreAttrs?: string[], updateSelf?: boolean): void;
    /**
     * 初始化影子dom
     * @private
     */
    initShadowRoot(): ShadowRoot;
    /**
     * 更新数据注入
     */
    updateInject(callBack: () => void): any;
    /***
     * 挂载自定义组件
     */
    connectedCallback(): void;
    /**
     * 组件销毁
     */
    disconnectedCallback(): void;
    /**
     * 组件挂载
     */
    connected(shadowRoot: ShadowRoot): void;
    /**
     * 组件卸载
     */
    disConnected(): void;
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
     * 强制刷新
     */
    forceUpdate(): void;
    /**
     * 更新属性
     * @param obj
     */
    updateProps(obj: any): void;
    /**
     * 屬性值初始化
     * @param ignoreAttrs
     */
    attrsToProps(ignoreAttrs?: any[]): void;
    /**
      * 事件
      * @param evtName
      * @param result
      */
    customDispatchEvent(evtName: string, result: any): void;
    beforeInstall(): void;
    install(): void;
    afterInstall(): void;
    /**
     * 渲染前
     */
    beforeRender(): void;
    /**
     * 渲染结束
     */
    rendered(): void;
    receiveProps(): void;
    render(props: {}, store: any): void;
}
