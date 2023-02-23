import '@/polyfill';
import { DefineComponent, ProvideConfig, InjectOptions, CustomTagOptions, WatchMetaOptions, PropertyDeclaration, InjectConfig, StateOptions } from "@/type";
export * from './define';
export declare class WuComponent extends HTMLElement implements DefineComponent {
    static createProperty(name: string, options: PropertyDeclaration): void;
    protected static getPropertyDescriptor(name: string, options: PropertyDeclaration): (defaultValue?: any) => PropertyDescriptor;
    static createState(name: string, options?: StateOptions): void;
    static createWatch(path: string, options?: WatchMetaOptions): void;
    static creatProvide(path: string, options?: ProvideConfig): void;
    static createInject(path: string, options?: InjectConfig): void;
    protected static getStateDescriptor(name: any, options?: StateOptions): () => PropertyDescriptor;
    isInstalled: boolean;
    willUpdate: boolean;
    customStyleContent: string;
    customStyleElement: any;
    store: any;
    parentNode: any;
    elementId: number;
    $options: CustomTagOptions;
    host: any;
    static is: string;
    css: any;
    $watchMap: Map<any, any>;
    $providesMap: Record<string, ProvideConfig>;
    $injectsList: InjectOptions[];
    private initComponent;
    constructor();
    get inlineCss(): string;
    /**
     * 判断是否需要读取注入的数据
     */
    get isInject(): boolean;
    /**
     * 是否注入
     */
    get isProvide(): boolean;
    /**
     * 属性变化
     */
    attributeChangedCallback(name: string, oldValue: string, value: string): void;
    private _updateBooleanProperty;
    /**
     * 设置属性
     * @param key
     * @param val
     */
    setAttribute(key: string, val: any): void;
    /**
     * 读取属性
     * @param qualifiedName
     */
    getAttribute(qualifiedName: string): string | null;
    pureRemoveAttribute(key: string): void;
    pureSetAttribute(key: string, val: string): void;
    pureGetAttribute(key: string): string;
    /**
     * 组件更新
     * @param ignoreAttrs
     * @param updateSelf
     */
    update(ignoreAttrs?: string[], updateSelf?: boolean): void;
    /**
     * 强制刷新
     */
    forceUpdate(): void;
    /**
     * 执行对应的watch对应的回调函数
     * @param path
     * @param val
     * @param old
     */
    watchChange(path: string, val: any, old: any): void;
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
    disConnected(shadowRoot: ShadowRoot): void;
    /**
     * 组件更新前检查
     */
    preBeforeUpdate(propName: string, oldValue: string, newValue: string): boolean;
    /**
     * 更新前
     */
    beforeUpdate(): void;
    /**
     * 更新完成
     */
    updated(name?: any, oldValue?: any, newValue?: any): void;
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
    private _render;
    private rootPatch;
    getStyles(): string;
    /**
     * 更新行内样式
     * @private
     */
    private updateLineCss;
}
