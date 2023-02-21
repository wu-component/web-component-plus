import '@/polyfill';
import { cssToDom, deepCopy, getCamelCase, getKebabCase, isEmpty } from "@/share";
import {
    DefineComponent,
    ProvideConfig,
    InjectOptions,
    CustomTagOptions,
    WatchMetaOptions, PropertyDeclaration, InjectConfig, StateOptions
} from "@/type";

import { render } from "@/core";
import {
    Descriptors,
    ElementProperties,
    WatchDescriptors,
    ProvideDescriptors, InjectDescriptors
} from "@/core/base/constant";

export * from './define';

let id = 0;

export class WuComponent extends HTMLElement implements DefineComponent {

    public static createProperty(name: string, options: PropertyDeclaration) {
        ElementProperties.set(this, name, options);
        Descriptors.set(this, name, this.getPropertyDescriptor(name, options));
    }

    protected static getPropertyDescriptor(name: string, options: PropertyDeclaration): (defaultValue?: any) => PropertyDescriptor {
        return (defaultValue?: any) => {
            let _value = defaultValue;
            const keyName = getKebabCase(name);
            return {
                get(this: WuComponent): any {
                    let val = this.pureGetAttribute(keyName);

                    if (!isEmpty(defaultValue)) {
                        // 判断val是否为空值
                        // const isEmpty = () => !(val || val === false || val === 0)
                        // 当类型为非Boolean时，通过isEmpty方法判断val是否为空值
                        // 当类型为Boolean时，在isEmpty判断之外，额外认定空字符串不为空值
                        //
                        // 条件表达式推导过程
                        // 由：(options.type !== Boolean && isEmpty(val)) || (options.type === Boolean && isEmpty(val) && val !== '')
                        // 变形为：isEmpty(val) && (options.type !== Boolean || (options.type === Boolean && val !== ''))
                        // 其中options.type === Boolean显然恒等于true：isEmpty(val) && (options.type !== Boolean || (true && val !== ''))
                        // 得出：isEmpty(val) && (options.type !== Boolean || val !== '')
                        if (isEmpty(val) && (options.type !== Boolean || val !== "")) {
                            return defaultValue;
                        }
                    }
                    if (typeof options.converter === "function") {
                        val = options.converter(val, options.type) as string;
                    }
                    return val;
                },
                set(this: WuComponent, value: string | boolean | null) {
                    let val = value as string;
                    if (typeof options.converter === "function") {
                        val = options.converter(value, options.type) as string;
                    }
                    try {
                        this.watchChange.call(this, name, val, deepCopy(_value));
                    }catch (e){
                        console.warn(e);
                    }

                    let newValue;
                    if (val && typeof val === 'object') {
                        newValue = JSON.stringify(val);
                    } else {
                        newValue = val;
                    }
                    if (val) {
                        if (typeof val === "boolean") {
                            this.pureSetAttribute(keyName, "");
                        } else {
                            this.pureSetAttribute(keyName, newValue);
                        }
                    } else {
                        this.removeAttribute(keyName);
                    }
                    _value = val;
                },
                configurable: true,
                enumerable: true,
            };
        };
    }

    public static createState(name: string, options?: StateOptions) {
        Descriptors.set(this, name, this.getStateDescriptor(name, options));
    }

    public static createWatch(path: string, options?: WatchMetaOptions) {
        WatchDescriptors.set(this, path, options);
    }

    public static creatProvide(path: string, options?: ProvideConfig) {
        ProvideDescriptors.set(this, path, options);
    }

    public static createInject(path: string, options?: InjectConfig) {
        InjectDescriptors.set(this, path, options);
    }

    protected static getStateDescriptor(name, options?: StateOptions): () => PropertyDescriptor {
        return (defaultValue?: any) => {
            let _value = defaultValue || options.default;
            return {
                get(this: WuComponent): any {
                    return _value;
                },
                set(this: WuComponent, value: string | boolean | null) {
                    try {
                        this.watchChange.call(this, name, value, deepCopy(_value));
                    }catch (e){
                        console.warn(e);
                    }
                    _value = value;
                    this._render();
                },
                configurable: true,
                enumerable: true,
            };
        };
    }

    public isInstalled = false;
    public willUpdate = false;
    public customStyleContent = '';
    public customStyleElement = null;
    public store;
    public override parentNode!: any;
    public elementId = 0;
    public $options!: CustomTagOptions;

    public host!: any;
    static is = 'CustomWebComponent';
    public css: any;

    public $watchMap = new Map();
    public $providesMap: Record<string, ProvideConfig>;
    public $injectsList: InjectOptions[];

    private initComponent(){
        this.elementId = id++;
    }

    constructor() {
        super();
        this.elementId = id ++;
        this.$options = (this.constructor as any).$options;
        this.initComponent();
    }

    get inlineCss() {
        return super.getAttribute("css");
    }

    /**
     * 判断是否需要读取注入的数据
     */
    get isInject() {
        return Array.isArray(this.$injectsList) && this.$injectsList.length > 0;
    }

    /**
     * 是否注入
     */
    get isProvide() {
        return Object.keys(this.$providesMap).length > 0;
    }
    /**
     * 属性变化
     */
    public attributeChangedCallback(name: string, oldValue: string, value: string) {
        // 因为 React 的属性变更并不会触发 set，此时如果 boolean 值变更，这里的 value 会是字符串，组件内部通过 get 操作可以获取到正确的类型
        const newValue = this[name] || value;
        if (!this.preBeforeUpdate(name, oldValue, newValue)) {
            return;
        }
        this._render();

        this.updated(name, oldValue, newValue);

        // 因为 React的属性变更并不会触发set，此时如果boolean值变更，这里的value会是字符串，组件内部通过get操作可以正常判断类型，但css里面有根据boolean属性设置样式的将会出现问题
        if (value !== oldValue) {
            // boolean 重走set
            this._updateBooleanProperty(name);
        }
    }
    private _updateBooleanProperty(propertyName: string) {
        if ((this.constructor as any).isBooleanProperty(propertyName)) {
            if (!(this as any)[propertyName]) {
                (this as any)[propertyName] = (this as any)[propertyName];
            }
        }
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
        super.setAttribute(getKebabCase(key), newValue);
        this[key] = val;
    }

    /**
     * 读取属性
     * @param qualifiedName
     */
    public override getAttribute(qualifiedName: string): string | null {
        const key: string = getCamelCase(qualifiedName);
        let val = this[key];
        if (isEmpty(val)) {
            val = this.pureGetAttribute(key);
        }

        return val;
    }

    public pureRemoveAttribute(key: string) {
        super.removeAttribute(key);
    }

    public pureSetAttribute(key: string, val: string) {
        super.setAttribute(key, val);
    }

    public pureGetAttribute(key: string) {
        return super.getAttribute(key);
    }

    /**
     * 组件更新
     * @param ignoreAttrs
     * @param updateSelf
     */
    public update(ignoreAttrs?: string[], updateSelf?: boolean) {
        if (!this.isInstalled || this.willUpdate) {
            return;
        }
        this.willUpdate = true;
        this.updateLineCss();
        this.beforeUpdate();
        this.beforeRender();
        this._render();
        this.willUpdate = false;
        this.updated();
    }

    /**
     * 强制刷新
     */
    public forceUpdate() {
        this.update([], true);
    }

    /**
     * 执行对应的watch对应的回调函数
     * @param path
     * @param val
     * @param old
     */
    public watchChange(path: string, val: any, old: any) {
        if (this.$watchMap?.has(path)){
            const watcher: WatchMetaOptions = this.$watchMap.get(path);
            if (!this.isInstalled) {
                if (watcher?.options?.immediate) {
                    this[watcher.callbackName].call(this, val, old);
                }
            } else {
                this[watcher.callbackName].call(this, val, old);
            }
        }
    }

    /**
     * 初始化影子dom
     * @private
     */
    public initShadowRoot() {
        if (this.css) {
            this.shadowRoot.appendChild(
                cssToDom(typeof this.css === 'function' ? this.css() : this.css)
            );
        }
        const propsCss = this.inlineCss;
        if (propsCss) {
            this.customStyleElement = cssToDom(propsCss);
            this.customStyleContent = propsCss;
            this.shadowRoot.appendChild(this.customStyleElement);
        }
        return this.shadowRoot;
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
                provide = p.isProvide ? p.$providesMap: undefined;
                if (provide) {
                    currentParent = p;
                }
                p = p.parentNode || p.host;
            }
            if (provide) {
                this.$injectsList.forEach((inject: InjectOptions) =>  {
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
        // this.attrsToProps();
        this.beforeInstall();
        this.install();
        this.afterInstall();
        this.beforeRender();

        this._render();
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
        this.disConnected(this.shadowRoot);
        this.rootPatch(null);
    }

    /**
     * 组件挂载
     */
    public connected(shadowRoot: ShadowRoot) {}

    /**
     * 组件卸载
     */
    public disConnected(shadowRoot: ShadowRoot) {}

    /**
     * 组件更新前检查
     */
    public preBeforeUpdate(propName: string, oldValue: string, newValue: string): boolean {
        return oldValue !== newValue;
    }

    /**
     * 更新前
     */
    public beforeUpdate() {}

    /**
     * 更新完成
     */
    public updated(name?, oldValue?, newValue?) {}

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

    private _render() {
        const newRootVNode: any = this.render(this, this.store);
        if (newRootVNode) {
            this.updateLineCss();
            return this.rootPatch(newRootVNode);
        }
    }

    private rootPatch = (newRootVNode: any) => {
        if (this.shadowRoot) {
            render(newRootVNode, this.shadowRoot);
        }
    };

    public getStyles(): string {
        return "";
    }

    /**
     * 更新行内样式
     * @private
     */
    private updateLineCss() {
        if (this.customStyleContent != this.inlineCss && this.inlineCss) {
            Promise.resolve().then(() => {
                this.customStyleContent = this.inlineCss;
                if (this.customStyleElement) {
                    this.customStyleElement.textContent = this.customStyleContent;
                } else {
                    this.customStyleElement = cssToDom(this.inlineCss);
                    this.shadowRoot?.appendChild(this.customStyleElement);
                }
            });
        }
    }
}
