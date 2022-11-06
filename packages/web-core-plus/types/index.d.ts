
export declare function nextTick(cb?: Function, ctx?: Object): void;
declare const newArrayProto: any;
export declare const isExpectType: (param: unknown, ...types: string[]) => boolean;
export declare const get: (data: object, strKeys: string) => any;
export declare const has: (data: object, key: string | number) => boolean;
export declare const hasProto: boolean;
export declare function def(obj: object, key: string | number, val: any, enumerable?: boolean): void;
export declare function parsePath(path: string): (data: object | any[]) => any;
export declare function traverse(value: any): void;
export { newArrayProto };
export interface WatchOptType {
    handler?: () => Function;
    immediate?: boolean;
    deep?: boolean;
}
export class Watcher {
    id: number;
    $vm: any;
    expr: string | Function;
    cb: Function;
    deep: boolean;
    getter: Function;
    value: any;
    timerFunc: any;
    callbacks: any[];
    /**
     * 观察者构造器
     * @param {*} $vm
     * @param {*} expr
     * @param {*} cb
     * @param options
     * @param vm
     */
    constructor($vm: any, expr: string | Function, cb: Function, options?: WatchOptType);
    /**
     * 根据表达式获取新值
     */
    get(): any;
    /**
     * 触发 watcher 更新
     */
    update(): void;
    run(): void;
    flushCallbacks(): void;
}

export class Dep {
    static target: Watcher | null;
    private subs;
    /**
     * 订阅中心构造器
     */
    constructor();
    /**
     * 收集依赖
     * @param {*} sub
     */
    addSub(sub: Watcher): void;
    /**
     * 派发更新
     */
    notify(): void;
    depend(): void;
}
export class Observer {
    value: any;
    dep: Dep;
    /**
     * 观察者构造器
     * @param value
     */
    constructor(value: any);
    walk(data: object | any[]): void;
}
/**
 * 处理响应式
 * @param { Object | Array } data
 */
export declare function observe(data: any): Observer | void;
/**
 * 重写 setter / getter
 * @param {*} data
 * @param {*} key
 * @param {*} val
 */
export declare function defineReactive(data: any, key: string | number, val: any): void;
export declare const webOptions: {
    store: any;
    root: any;
    mapping: any;
    vnode: any;
};
export declare const ATTR_KEY = "prevProps";
export declare const IS_NON_DIMENSIONAL: RegExp;
export declare const PROP_META_KEY: unique symbol;
export declare const STATE_META_KEY: unique symbol;
export declare const COMPONENT_CUSTOM_EVENT: unique symbol;
export declare const COMPONENT_CUSTOM_METHOD: unique symbol;
export declare const COMPONENT_CUSTOM_INJECT: unique symbol;
export declare const COMPONENT_CUSTOM_PROVIDE: unique symbol;
export declare const COMPONENT_WATCH: unique symbol;

/**
 * Proxy an event to hooked event handlers
 * @param {Event} e The event object from the browser
 * @private
 */
export declare function eventProxy(e: any): any;
export declare function bindEvent(node: any, name: any, value: any, old: any): void;

/**
 * Create an element with the given nodeName.
 * @param {string} nodeName The DOM node to create
 * @param {boolean} [isSvg=false] If `true`, creates an element within the SVG
 *  namespace.
 * @returns {Element} The created DOM node
 */
export declare function createNode(nodeName: string, isSvg: boolean): any;
/**
 * Remove a child node from its parent if attached.
 * @param {Node} node The node to remove
 */
export declare function removeNode(node: HTMLElement): void;
/**
 * Check if two nodes are equivalent.
 *
 * @param {Node} node      DOM Node to compare
 * @param {VNode} vnode      Virtual DOM node to compare
 * @param {boolean} [hydrating=false]  If true, ignores component constructors when comparing.
 * @private
 */
export declare function isSameNodeType(node: any, vnode: any, hydrating: boolean): boolean;
/**
 * Check if an Element has a given nodeName, case-insensitively.
 *
 * @param {Element} node  A DOM Element to inspect the name of.
 * @param {String} nodeName  Unnormalized name to compare against.
 */
export declare function isNamedNode(node: any, nodeName: string): boolean;

/**
 * Set a named attribute on the given Node, with special behavior for some names
 * and event handlers. If `value` is `null`, the attribute/handler will be
 * removed.
 * @param {Element} node An element to mutate
 * @param {string} name The name/key to set, such as an event or attribute name
 * @param {*} old The last value that was set for this name/node pair
 * @param {*} value An attribute value, such as a function to be used as an
 *  event handler
 * @param {boolean} isSvg Are we currently diffing inside an svg?
 * @param component
 * @private
 */
export declare function setAccessor(node: any, name: string, old: HTMLElement, value: any, isSvg: boolean, component: any): void;

/** Queue of components that have been mounted and are awaiting componentDidMount */
export declare const mounts: any[];
/** Diff recursion count, used to track the end of the diff cycle. */
export declare let diffLevel: number;
/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *  @param {Element} [dom=null]    A DOM node to mutate into the shape of the `vnode`
 *  @param {VNode} vnode      A VNode (with descendants forming a tree) representing the desired DOM structure
 *  @param parent
 *  @param component
 *  @param updateSelf
 *  @returns {Element} dom      The created/mutated element
 *  @private
 */
export declare function diff(dom: HTMLElement | null, vnode: any, parent: any, component: any, updateSelf?: any): any;
/** Recursively recycle (or just unmount) a node and its descendants.
 *  @param {Node} node            DOM node to start unmount/removal from
 *  @param {Boolean} [unmountOnly=false]  If `true`, only triggers unmount lifecycle, skips removal
 */
export declare function recollectNodeTree(node: any, unmountOnly: any): void;
/** Recollect/unmount all children.
 *  - we use .lastChild here because it causes less reflow than .firstChild
 *  - it's also cheaper than accessing the .childNodes Live NodeList
 */
export declare function removeChildren(node: any): void;

export declare function h(nodeName?: any, attributes?: any): any[] | {
    nodeName: any;
    children: any[];
    attributes: any;
    key: any;
};


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
export declare function defineWatch(target: any, path: string, methodName: string, desc: any, options?: WatchMetaOptions): void;
/**
 * 定义watch
 * @param target
 * @param methodName
 * @param desc
 */
export declare function defineMethod(target: any, methodName: string, desc: any): void;

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
export declare function Watch(path: string, options?: WatchMetaOptions): any;
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

export declare function proxy(target: any, sourceKey: any, key: any): void;
/**
 * 数据响应式操操作
 */
export declare function dataReactive(): void;
/**
 * 事件处理
 */
export declare function emitReactive(): void;
export declare function $watch(expr: string | Function, handler: Function | WatchOptType, watchOpt: WatchOptType, that: any): Function;
/**
 * watch 处理
 */
export declare function watchReactive(): void;

/**
 * Used to learn the size of a string in bytes.
 *
 * @param str The string to measure
 * @returns number
 */
export declare const byteSize: (str: string) => number;

export declare const enum MEMBER_FLAGS {
    String = 1,
    Number = 2,
    Boolean = 4,
    Any = 8,
    Unknown = 16,
    State = 32,
    Method = 64,
    Event = 128,
    Element = 256,
    ReflectAttr = 512,
    Mutable = 1024,
    Prop = 31,
    HasAttribute = 15,
    PropLike = 63
}
export declare const enum EVENT_FLAGS {
    Cancellable = 1,
    Composed = 2,
    Bubbles = 4
}
export declare const enum LISTENER_FLAGS {
    Passive = 1,
    Capture = 2,
    TargetDocument = 4,
    TargetWindow = 8,
    TargetBody = 16,
    /**
     * @deprecated Prevented from new apps, but left in for older collections
     */
    TargetParent = 32
}
export declare const enum HOST_FLAGS {
    hasConnected = 1,
    hasRendered = 2,
    isWaitingForChildren = 4,
    isConstructingInstance = 8,
    isQueuedForUpdate = 16,
    hasInitializedComponent = 32,
    hasLoadedComponent = 64,
    isWatchReady = 128,
    isListenReady = 256,
    needsRerender = 512,
    devOnRender = 1024,
    devOnDidLoad = 2048
}
export declare const enum CMP_FLAGS {
    shadowDomEncapsulation = 1,
    scopedCssEncapsulation = 2,
    hasSlotRelocation = 4,
    needsShadowDomShim = 8,
    shadowDelegatesFocus = 16,
    hasMode = 32,
    needsScopedEncapsulation = 10
}
/**
 * Default style mode id
 */
export declare const DEFAULT_STYLE_MODE = "$";
/**
 * Reusable empty obj/array
 * Don't add values to these!!
 */
export declare const EMPTY_OBJ: any;
/**
 * Namespaces
 */
export declare const SVG_NS = "http://www.w3.org/2000/svg";
export declare const HTML_NS = "http://www.w3.org/1999/xhtml";
export declare const XLINK_NS = "http://www.w3.org/1999/xlink";
export declare const XML_NS = "http://www.w3.org/XML/1998/namespace";
/**
 * File names and value
 */
export declare const COLLECTION_MANIFEST_FILE_NAME = "collection-manifest.json";

export declare function getAttrMap(dom: any): Record<string, any>;
export declare function getHost(ele: any): any;

export declare const extension: any;
export declare function extend(name: string, handler: any): void;
export declare function bind(el: any, type: string, handler: any): void;
export declare function unbind(el: HTMLElement, type: string): void;

/**
 * 格式化数据类型
 */
export declare function formatValue(val: any, type?: PropTyp, defaultValue?: any): any;
export declare function isEqual(a: any, b: any): boolean;
export declare function newEval(fn: string): any;
export declare const isDef: (v: any) => boolean;
export declare const toLowerCase: (str: string) => string;
export declare const toDashCase: (str: string) => string;
export declare const dashToPascalCase: (str: string) => string;
export declare const toTitleCase: (str: string) => string;
export declare const noop: () => any;
export declare const isComplexType: (o: any) => boolean;
export declare const sortBy: <T>(array: T[], prop: (item: T) => string | number) => T[];
export declare const flatOne: <T>(array: T[][]) => T[];
export declare const unique: <T>(array: T[], predicate?: (item: T) => any) => T[];
export declare const fromEntries: <V>(entries: IterableIterator<[string, V]>) => {
    [key: string]: V;
};
export declare const pluck: (obj: {
    [key: string]: any;
}, keys: string[]) => {
    [key: string]: any;
};
export declare const isBoolean: (v: any) => v is boolean;
export declare const isDefined: (v: any) => boolean;
export declare const isUndefined: (v: any) => boolean;
export declare const isFunction: (v: any) => v is Function;
export declare const isNumber: (v: any) => v is boolean;
export declare const isObject: (val: Object) => boolean;
export declare const isString: (v: any) => v is string;
export declare const isIterable: (v: any) => v is Iterable<any>;
export declare const isPromise: <T = any>(v: any) => v is Promise<T>;
export declare const toDotCase: (str: string) => string;
/**
 * Convert Windows backslash paths to slash paths: foo\\bar ➔ foo/bar
 * Forward-slash paths can be used in Windows as long as they're not
 * extended-length paths and don't contain any non-ascii characters.
 * This was created since the path methods in Node.js outputs \\ paths on Windows.
 */
export declare const normalizePath: (path: string) => string;
/**
 * Same as normalizePath(), expect it'll also strip any querystrings
 * from the path name. So /dir/file.css?tag=cmp-a becomes /dir/file.css
 */
export declare const normalizeFsPath: (p: string) => string;
export declare const normalizeFsPathQuery: (importPath: string) => {
    filePath: string;
    ext: string;
    params: URLSearchParams;
    format: string;
};
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
export declare function cssToDom(css: string): HTMLStyleElement;
export declare function camelCase(str: string): string;
export declare function Fragment(props: any): any;
/** Invoke or update a ref, depending on whether it is a function or object ref.
 *  @param {object|function} [ref=null]
 *  @param {any} [value]
 */
export declare function applyRef(ref: any, value: any): void;
/**
 * Call a function asynchronously, as soon as possible. Makes
 * use of HTML Promise to schedule the callback if available,
 * otherwise falling back to `setTimeout` (mainly for IE<11).
 * @type {(callback: function) => void}
 */
export declare const defer: any;
export declare function isArray(obj: any): boolean;
export declare function pathToArr(path: string): string[];
export declare function hyphenate(str: string): string;
export declare function hyphenateReverse(str: string): string;
export declare function capitalize(name: string): string;
export declare function getValByPath(path: string, current: any): any;
export declare function removeItem(item: any, arr: any): void;
export declare function getGuid(): string;

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
    geMateList<K, T>(makeKey: K): T[];
    private initComponent;
    constructor();
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
export interface EventOptions {
    methodName?: any;
    methodFun?: any;
    eventName?: string;
}
interface WatchOptions {
    deep?: boolean;
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
