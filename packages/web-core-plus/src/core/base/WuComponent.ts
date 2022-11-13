import '@/polyfill';
import 'weakmap-polyfill';
import { cssToDom, getAttrMap, hyphenateReverse, formatValue } from "@/share";
import { diff } from "@/core";
import {
    COMPONENT_CUSTOM_INJECT,
    COMPONENT_CUSTOM_PROVIDE,
    COMPONENT_WATCH,
    PROP_META_KEY,
    STATE_META_KEY
} from "@/app-data";
import { dataReactive, emitReactive } from "@/core/reactivity";
import {
    DefineComponent,
    PropOptions,
    ProvideConfig,
    InjectOptions,
    CustomTagOptions,
    WatchMetaOptions, StateOptions, ReactiveDataOption
} from "@/type";

let id = 0;

const adoptedStyleSheetsMap = new WeakMap();
export class WuComponent extends HTMLElement implements DefineComponent {
    public override tagName!: string;
    public rootNode = null;
    public isInstalled = false;
    public willUpdate = false;
    public customStyleContent = '';
    public props = {};
    public prevProps = {};
    public customStyleElement = null;
    public store;
    public injects: InjectOptions[];
    public provides: ProvideConfig[] = [];
    public override parentNode!: any;
    public override shadowRoot!: any;
    public elementId = 0;
    public prevVNode: any;
    public override attachShadow!: any;
    public override dispatchEvent!: any;

    public providesMap: Record<string, ProvideConfig>;
    public injectsList: InjectOptions[];
    public propsList: PropOptions[];
    public $reactive: any;
    public $prevReactive: any;
    public $options: CustomTagOptions;

    public host!: any;
    static is = 'CustomWebComponent';
    public css: any;
    public injection: Record<string, any> = {};

    private watchListMap: Map<string, WatchMetaOptions[]> = new Map<string, WatchMetaOptions[]>();

    public geMateList<K, T>(makeKey: K): T[] {
        return Reflect.getMetadata(makeKey as any, this) ?? [] as T[];
    }
    private initComponent(){
        this.elementId = id++;
        this.propsList = this.geMateList(PROP_META_KEY);
        this.injects = this.geMateList(COMPONENT_CUSTOM_INJECT) ?? [] as InjectOptions[];
        this.provides = this.geMateList(COMPONENT_CUSTOM_PROVIDE) ?? [] as ProvideConfig[];
        const propsList: PropOptions[] = this.geMateList(PROP_META_KEY) || [];
        const statesList: StateOptions[] = this.geMateList(STATE_META_KEY) || [];
        const dataReactiveList: ReactiveDataOption[] = propsList.concat(statesList) as ReactiveDataOption[];
        this.watchListMap = this.initWatch();
        dataReactive.call(this, dataReactiveList);
        emitReactive.call(this);
        // watchReactive.call(this);
    }

    constructor() {
        super();
        this.elementId = id ++;
        this.$options = (this.constructor as any).$options;
        this.initComponent();
        this.injection = {};
        this.providesMap = this.getProvides();
        this.injectsList = this.getInjects();
    }

    get inlineCss() {
        return super.getAttribute("css");
    }

    /**
     * 初始化watch
     * @private
     */
    private initWatch(): Map<string, WatchMetaOptions[]> {
        const watchMap: Map<string, WatchMetaOptions[]> = new Map<string, WatchMetaOptions[]>();
        const watchList = this.geMateList(COMPONENT_WATCH) ?? [] as WatchMetaOptions[];
        watchList.forEach((item: WatchMetaOptions) => {
            const current = watchMap.get(item.path);
            if(current && Object.prototype.toString.call(current) === '[object Array]') {
                watchMap.set(item.path, [ ...current, item ]);
            }else {
                watchMap.set(item.path, [ item ]);
            }
        });
        return watchMap;
    }

    public initCss(shadowRoot: any): ShadowRoot {
        if (adoptedStyleSheetsMap.has(this.constructor)) {
            (shadowRoot as any).adoptedStyleSheets = adoptedStyleSheetsMap.get(this.constructor);
        } else {
            const css = this.$options.css;
            if (css) {
                if (typeof css === 'string') {
                    const styleSheet: any = new CSSStyleSheet();
                    styleSheet.replaceSync(css);
                    shadowRoot.adoptedStyleSheets = [ styleSheet ];
                }
                if (Object.prototype.toString.call(css) === '[object Array]') {
                    const styleSheets = [];
                    css.forEach((styleSheet) => {
                        if (typeof styleSheet === 'string') {
                            const adoptedStyleSheet: any = new CSSStyleSheet();
                            adoptedStyleSheet.replaceSync(styleSheet);
                            styleSheets.push(adoptedStyleSheet);
                        }
                        if (Object.prototype.toString.call(styleSheet) === '[object Array]') {
                            const adoptedStyleSheet: any = new CSSStyleSheet();
                            adoptedStyleSheet.replaceSync(styleSheet[1]);
                            styleSheets.push(adoptedStyleSheet);
                        } else {
                            styleSheets.push(styleSheet);
                        }
                        shadowRoot.adoptedStyleSheets = styleSheets;
                    });
                } else if (css.default && typeof css.default === 'string') {
                    // [object Module]
                    const styleSheet: any = new CSSStyleSheet();
                    styleSheet.replaceSync(css.default);
                    shadowRoot.adoptedStyleSheets = [ styleSheet ];
                } else if(typeof css === 'string') {
                    const styleSheet: any = new CSSStyleSheet();
                    styleSheet.replaceSync(css);
                    shadowRoot.adoptedStyleSheets = [ styleSheet ];
                } else {
                    shadowRoot.adoptedStyleSheets = [ css ];
                }
                adoptedStyleSheetsMap.set(this.constructor, shadowRoot.adoptedStyleSheets);
            }
        }
        return shadowRoot;
    }
    static get observedAttributes() {
        return [];
    }

    /**
     * 获取当前组件注入的数据
     */
    public getProvides() {
        return this.provides.reduce((previousValue: Record<string, ProvideConfig>, currentValue: ProvideConfig) => {
            previousValue[currentValue.key] = currentValue;
            return previousValue;
        }, {} as Record<string, ProvideConfig> );

    }

    /**
     * 获取当前组件注入的数据
     */
    public getInjects() {
        return this.injects;

    }

    /**
     * 判断是否需要读取注入的数据
     */
    get isInject() {
        return Array.isArray(this.injectsList) && this.injectsList.length > 0;
    }

    /**
     * 是否注入
     */
    get isProvide() {
        return Object.keys(this.providesMap).length > 0;
    }

    /**
     * 属性移除
     * @param key
     */
    public override removeAttribute(key: string): void {
        super.removeAttribute(key);
        this.isInstalled && this.update();
    }

    /**
     * 设置属性
     * @param key
     * @param val
     */
    public override setAttribute(key: string, val: any): void {
        let newValue;
        if (val && typeof val === 'object') {
            newValue = JSON.stringify(val);

        } else {
            newValue = val;
        }
        super.setAttribute(key, newValue);
        if (this.isInstalled) {
            this[key] = val;
            // this.$reactive[key] = val;
        }
    }

    public override getAttribute(key: string) {
        let value = this[key];
        if (!value) {
            value = super.getAttribute(key);
        }
        return value;
    }

    public pureRemoveAttribute(key: string) {
        super.removeAttribute(key);
    }

    public pureSetAttribute(key: string, val: string) {
        super.setAttribute(key, val);
    }

    /**
     * 属性变化
     */
    public attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        this.update([], false);
    }

    /**
     * 组件更新
     * @param ignoreAttrs
     * @param updateSelf
     */
    public update(ignoreAttrs?: string[], updateSelf?: boolean) {
        // queueWatcher(this as any);
        this.callUpdate(ignoreAttrs, updateSelf);
    }

    /**
     * 执行对应的watch对应的回调函数
     * @param path
     * @param val
     * @param old
     */
    public watchChangeCallback(path: string, val: any, old: any) {
        if (this.watchListMap.has(path)){
            const watchers: WatchMetaOptions[] = this.watchListMap.get(path);
            if (watchers && Object.prototype.toString.call(watchers) === '[object Array]') {
                for (let i = 0; i < watchers.length; i ++) {
                    if (!this.isInstalled) {
                        if (watchers[i]?.options?.immediate) {
                            this[watchers[i].callbackName].call(this, val, old);
                        }
                    } else {
                        this[watchers[i].callbackName].call(this, val, old);
                    }

                }
            }
        }
    }

    /**
     * 真正执行更新
     * @private
     */
    public callUpdate(ignoreAttrs?: string[], updateSelf?: boolean) {
        if (!this.isInstalled || this.willUpdate) {
            return;
        }
        if (!this.preBeforeUpdate()) {
            return;
        }
        this.willUpdate = true;
        if (this.customStyleContent != this.inlineCss) {
            this.customStyleContent = this.inlineCss;
            if (this.customStyleElement) {
                this.customStyleElement.textContent = this.customStyleContent;
            } else {
                this.customStyleElement = cssToDom(this.inlineCss);
                this.shadowRoot.appendChild(this.customStyleElement);
            }
        }
        // this.attrsToProps();
        this.beforeUpdate();
        this.beforeRender();
        /*if (this.customStyleContent != this.$options.css) {
            this.customStyleContent = this.$options.css;
            // this.customStyleElement.textContent = this.customStyleContent;
        }*/
        // 属性变化，重新执行render 渲染， 走diff，生成新的dom
        const rendered = this.render(this.$reactive, this.store);
        this.rendered();
        this.rootNode = diff(this.rootNode, rendered, this?.shadowRoot || this, this, updateSelf);
        this.willUpdate = false;
        this.updated();
    }

    /**
     * 初始化影子dom
     * @private
     */
    public initShadowRoot() {
        let shadowRoot: ShadowRoot;
        if (this.$options.is === 'LightDom') {
            shadowRoot = (this as unknown) as ShadowRoot;
        } else {
            shadowRoot = this.shadowRoot || this.attachShadow?.({ mode: 'open' });
            let fc;
            while ((fc = shadowRoot.firstChild)) {
                shadowRoot.removeChild(fc);
            }
        }
        shadowRoot = this.initCss(shadowRoot);
        if (this.css) {
            shadowRoot.appendChild(
                cssToDom(typeof this.css === 'function' ? this.css() : this.css)
            );
        }
        const propsCss = this.inlineCss;
        if (propsCss) {
            this.customStyleElement = cssToDom(propsCss);
            this.customStyleContent = propsCss;
            shadowRoot.appendChild(this.customStyleElement);
        }
        return shadowRoot;
    }

    /**
     * 更新数据注入
     */
    public updateInject(callBack: () => void): any {
        if (!this.isInject) {
            return;
        }
        Promise.resolve().then(() => {
            let p = this.parentNode as this;
            let currentParent;
            let provide;
            while (p && !provide) {
                provide = p.isProvide ? p.providesMap: undefined;
                if (provide) {
                    currentParent = p;
                }
                p = p.parentNode || p.host;
            }
            if (provide) {
                this.injectsList.forEach((inject: InjectOptions) =>  {
                    const callName = provide[inject.key].functionName;
                    this[inject.attr] = currentParent[callName]();
                });
                typeof callBack === "function" && callBack();
                return;
            }
            else {
                console.warn(`The provide prop was not found on the parent node or the provide type is incorrect. please check ${this.tagName}`);
            }
        });
    }

    /***
     * 挂载自定义组件
     */
    public connectedCallback() {
        this.updateInject(this.update.bind(this));
        const shadowRoot: ShadowRoot = this.initShadowRoot();
        this.attrsToProps();
        this.beforeInstall();
        this.install();
        this.afterInstall();
        this.beforeRender();
        const rendered = this.render(this.$reactive, this.store);
        this.rootNode = diff(null, rendered, null, this);
        if (this.$options.isMountDom === true) {
            if (Array.isArray(this.rootNode)) {
                this.rootNode.forEach(item => shadowRoot.appendChild(item));
            } else {
                this.rootNode && shadowRoot.appendChild(this.rootNode);
            }
        }
        this.isInstalled = true;
        this.rendered();
        if (this.isInject) {
            Promise.resolve().then(() => this.connected(shadowRoot));
        } else {
            this.connected(shadowRoot);
        }

    }

    /**
     * 组件销毁
     */
    public disconnectedCallback() {
        this.disConnected();
    }

    /**
     * 组件挂载
     */
    public connected(shadowRoot: ShadowRoot) {}

    /**
     * 组件卸载
     */
    public disConnected() {}

    /**
     * 组件更新前检查
     */
    public preBeforeUpdate(): boolean {
        return true;
    }

    /**
     * 更新前
     */
    public beforeUpdate() {}

    /**
     * 更新完成
     */
    public updated() {}

    /**
     * 强制刷新
     */
    public forceUpdate() {
        this.update([], true);
    }

    /**
     * 更新属性
     * @param obj
     */
    public updateProps(obj: any) {
        Object.keys(obj).forEach((key: string) => {
            this[key] = obj[key];
            if (this.prevProps) {
                this.prevProps[key] = obj[key];
            }
        });
        this.forceUpdate();
    }

    /**
     * 屬性值初始化
     * @param ignoreAttrs
     */
    public attrsToProps(ignoreAttrs?: any[]) {
        const ele: any = this;
        const host = this.shadowRoot && this.shadowRoot.host? this.shadowRoot.host: this;
        const attrMap = getAttrMap(host);
        // if (!this.$reactive) {
        //     this.$reactive = {};
        // }
        this.propsList.forEach((key: PropOptions) => {
            const attr = hyphenateReverse(key.attr);
            let val = attrMap[attr];
            if (!val) {
                val = ele.getAttribute(attr);
            }
            const newValue = formatValue(val, key.type, key.default);
            this[attr] = newValue;
            // this.$reactive[attr] = newValue;
        });
    }

   /**
     * 事件
     * @param evtName
     * @param result
     */
    public customDispatchEvent(evtName: string, result: any) {
        const event: CustomEvent = new CustomEvent(evtName, {
            detail: result || null,
            bubbles: true, // 设置为冒泡
            composed: true, // 设置为可穿透组件
            cancelable: false
        });
        // const handler = this.getAttribute(`on${happ(evtName)}`);
        // if (handler) {
        //     if (typeof handler === 'function') {
        //         handler(event);
        //     } else {
        //         //eval(handler)(event);
        //     }
        //     return;
        // }
        if (this?.shadowRoot) {
            this?.shadowRoot.dispatchEvent(event);
            return;
        }
        this.dispatchEvent(event);
    }

    public beforeInstall() {}

    public install() {}

    public afterInstall() {}

    /**
     * 渲染前
     */
    public beforeRender() {}

    /**
     * 渲染结束
     */
    public rendered() {}

    public receiveProps() {}

    public render(props: {}, store) {}
}
