import 'reflect-metadata';
import {
    COMPONENT_CUSTOM_EVENT, COMPONENT_CUSTOM_INJECT,
    COMPONENT_CUSTOM_METHOD, COMPONENT_CUSTOM_PROVIDE,
    COMPONENT_WATCH,
    PROP_META_KEY,
    STATE_META_KEY
} from '../app-data';
import { PropOptions } from './PropDecorators';
import { cssToDom, hyphenateReverse, isObject, toDotCase, getAttrMap } from '../utils';
import { EventOptions } from './EmitDecorators';
import { WatchMetaOptions } from './WatchDecorators';
import { StateOptions } from './StateDecorators';
import { ProvideConfig } from "./ProvideDecorators";
import { InjectOptions } from "./InjectDecorators";
import { MethodOptions } from "./MethodDecorators";
import { diff } from "../runtime";
import { formatValue, isEqual } from "../utils/format-type";
import { BaseCustomComponent, DefineComponent } from "../decorators";
type ComponentEnums = 'CustomWebComponent';
interface CustomTagOptions {
    name: string;
    is?: ComponentEnums;
    css?: string;
    options?: ElementDefinitionOptions;
}

/**
 * 数据响应式处理逻辑
 * @param keys
 * @param functions
 * @param customElement
 */
function injectKeys(keys: PropOptions[], functions: WatchMetaOptions[], customElement: any) {
    const onlyFunctions: WatchMetaOptions[] = [];
    for (let i = 0; i < functions.length; i++) {
        const current = keys.find(item => item.attr === functions[i].path);
        if (!current) {
            onlyFunctions.push(functions[i]);
        }
    }
    keys.forEach((props: PropOptions) => {
        const attr = props.attr;
        Object.defineProperty(customElement, props.attr, {
            get: function() {
                if (this.props === undefined) {
                    this.props = {};
                }
                if (this.props[attr] !== undefined) {
                    return this.props[attr];
                }
                return props.default;
            },
            set: function(val: any) {
                const oldValue = isObject(this.props[attr]) || Array.isArray(this.props[attr]) ? JSON.parse(JSON.stringify(this.props[attr])) : this.props[attr];
                const newValue = formatValue(val, props.type, props.default);
                this.props[attr] = newValue;
                val = newValue;
                customElement?.update.call(this);
                const watch: WatchMetaOptions = functions.find(item => item.path === props.attr);
                if (watch) {
                    if (!isEqual(this.props[attr], oldValue)) {
                        customElement[watch.callbackName].call(this, this.props[attr], oldValue);
                    }
                }
                return true;
            },
        });
    });
    injectWatch(onlyFunctions, customElement);
}

/**
 * 数据响应式处理逻辑
 * @param functions
 * @param customElement
 */
function injectWatch(functions: WatchMetaOptions[], customElement: any) {
    functions.forEach((props: WatchMetaOptions) => {
        const attr = `__${props.path}__watch__`;
        Object.defineProperty(customElement, props.path, {
            get: function() {
                return this[attr];
            },
            set: function(val: any) {
                const oldValue = isObject(this[attr]) || Array.isArray(this[attr]) ? JSON.parse(JSON.stringify(this[attr])) : this[attr];
                this[attr] = val;
                if (!isEqual(val, oldValue)) {
                    customElement[props.callbackName].call(this, this[attr], oldValue);
                }
                return true;
            },
        });
    });
}

/**
 * 事件响应逻辑处理
 * @param functions
 * @param customElement
 */
function injectEmit(functions: EventOptions[], customElement: any) {
    functions.forEach((event: EventOptions) => {
        Object.defineProperty(customElement, event.methodName, {
            get: function() {
                return function(...args: any) {
                    const result: any = event.methodFun.call(this, args);
                    const evtName = event.eventName ? event.eventName : toDotCase(event.methodName);
                    customElement._dispatchEvent.call(this, evtName, result);
                };
            },
        });
    });
}

/**
 * 注入方法
 * @param functions
 * @param customElement
 */
function injectMethod(functions: MethodOptions[], customElement: any) {
    functions.forEach((event: EventOptions) => {
        Object.defineProperty(customElement, event.methodName, {
            get: function() {
                return function(...args: any) {
                    return event.methodFun.call(this, args);
                };
            },
        });
    });
}

/**
 * 数据响应式处理逻辑
 * @param stateList
 * @param customElement
 */
function injectState(stateList: StateOptions[], customElement: any) {
    stateList.forEach((props: StateOptions) => {});
}
/**
 * 组件装饰器
 * @param options
 * @constructor
 */
export function Component(options: CustomTagOptions): ClassDecorator {
    return (target: any) => {
       return defineComponent(options, target, {});
    };
}


export function defineComponent(options: CustomTagOptions, target: { new (): DefineComponent }, helper: any) {
    const customElement: any = class extends (target as { new (): DefineComponent }) implements BaseCustomComponent {
        tagName!: string;
        public _shadowRootDom: any = null;
        public rootNode = null;
        public isInstalled = false;
        public willUpdate = false;
        public _customStyleContent = '';
        public props = {};
        public prevProps = {};
        public _customStyleElement = null;
        public _shadowRoot = null;
        public store;
        public inject!: any; // 提取注入的数据
        public injection!: any;
        public provideWeekMap = new WeakMap()
        public providesMap: Record<string, ProvideConfig>;
        public injectsList: InjectOptions[];
        public propsList: PropOptions[];
        public injects: InjectOptions[];
        public provides: ProvideConfig[] = [];
        public functions: EventOptions[] = [];
        public methodsFunctions: EventOptions[] = [];
        public watchs: WatchMetaOptions[] = [];
        public statesList: StateOptions[] = [];
        private parentNode: any;
        public shadowRoot!: any;

        public attachShadow!: any;

        public dispatchEvent!: any;

        private _initComponent_(){
            this.propsList = Reflect.getMetadata(PROP_META_KEY, target.prototype) ?? [] as PropOptions[];
            this.injects = Reflect.getMetadata(COMPONENT_CUSTOM_INJECT, target.prototype) ?? [] as InjectOptions[];
            this.provides = Reflect.getMetadata(COMPONENT_CUSTOM_PROVIDE, target.prototype) ?? [] as ProvideConfig[];
            this.functions = Reflect.getMetadata(COMPONENT_CUSTOM_EVENT, target.prototype) ?? [] as  EventOptions[];
            this.methodsFunctions = Reflect.getMetadata(COMPONENT_CUSTOM_METHOD, target.prototype) ?? [] as EventOptions[];
            this.watchs = Reflect.getMetadata(COMPONENT_WATCH, target.prototype) ?? [] as WatchMetaOptions[];
            this.statesList = Reflect.getMetadata(STATE_META_KEY, target.prototype) ?? [] as StateOptions[];
            // 数据响应式处理
            injectKeys(this.propsList, this.watchs, this);
            // 事件代理处理
            injectEmit(this.functions, this);
            // 方法注入
            injectMethod(this.methodsFunctions, this);
            injectState(this.statesList, this);
        }

        constructor() {
            super();
            this._initComponent_();
            this.injection = null;
            this._shadowRootDom = null;
            this.rootNode = null;
            this.isInstalled = false;
            this.willUpdate = false;
            this._customStyleContent = '';
            this.props = {};
            this.prevProps = {};
            this._customStyleElement = null;
            this._shadowRoot = null;
            this.store = null;
            this.injection = {};
            this.providesMap = this.getProvides();
            this.injectsList = this.getInjects();
        }

        __keyList__: PropOptions[];
        host: any;
        static is = 'CustomWebComponent';

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
            if (val && typeof val === 'object') {
                super.setAttribute(key, JSON.stringify(val));
            } else {
                super.setAttribute(key, val);
            }
            if (this.isInstalled) {
                this[key] = val;
                this.props[key] = val;
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
        public override attributeChangedCallback(name: string, oldValue: any, newValue: any) {
            super.attributeChangedCallback?.(name, oldValue, newValue);
            this.update([], false);
        }

        /**
         * 组件更新
         * @param ignoreAttrs
         * @param updateSelf
         */
        public override update(ignoreAttrs?: string[], updateSelf?: boolean) {
            if (!this.isInstalled || this.willUpdate) {
                return;
            }
            if (!this.preBeforeUpdate()) {
                return;
            }
            this.willUpdate = true;
            // this.attrsToProps();
            this.beforeUpdate();
            this.beforeRender();
            if (this._customStyleContent != options.css) {
                this._customStyleContent = options.css;
                // this.customStyleElement.textContent = this.customStyleContent;
            }
            // 属性变化，重新执行render 渲染， 走diff，生成新的dom
            const rendered = this.render(this.props, this.store);
            this.rendered();
            this.rootNode = diff(this.rootNode, rendered, this?.shadowRoot || this?._shadowRootDom || this, this, updateSelf);
            this.willUpdate = false;
            this.updated();
        }

        /**
         * 初始化影子dom
         * @private
         */
        public override initShadowRoot() {
            let shadowRoot: ShadowRoot;
            if ((this.constructor as any).isLightDom) {
                shadowRoot = (this as unknown) as ShadowRoot;
            } else {
                shadowRoot = this.shadowRoot || this.attachShadow?.({ mode: 'open' });
                let fc;
                while ((fc = shadowRoot.firstChild)) {
                    shadowRoot.removeChild(fc);
                }
            }
            if (options.css) {
                this._customStyleElement = cssToDom(options.css);
                this._customStyleContent = options.css;
                shadowRoot.appendChild(this._customStyleElement);
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
        public override connectedCallback() {
            this.updateInject(this.update.bind(this));
            const shadowRoot: ShadowRoot = this.initShadowRoot();
            this.attrsToProps();
            this.beforeInstall();
            this.install();
            this.afterInstall();
            this.beforeRender();
            const rendered = this.render(this.props, this.store);
            this.rootNode = diff(null, rendered, null, this);
            if (Array.isArray(this.rootNode)) {
                this.rootNode.forEach(item => shadowRoot.appendChild(item));
            } else {
                this.rootNode && shadowRoot.appendChild(this.rootNode);
            }
            this._shadowRootDom = shadowRoot;
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
        public override connected(shadowRoot: ShadowRoot) {
            super.connected?.(shadowRoot);
        }

        /**
         * 组件卸载
         */
        public override disConnected() {
            super.disConnected?.();
        }

        /**
         * 组件更新前检查
         */
        public override preBeforeUpdate(): boolean {
            if (super.preBeforeUpdate) {
                return super.preBeforeUpdate?.();
            }
            return true;
        }

        /**
         * 更新前
         */
        public override beforeUpdate() {
            super.beforeUpdate?.();
        }

        /**
         * 更新完成
         */
        public override updated() {
            super.updated?.();
        }

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
                this.props[key] = obj[key];
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
            if (!this.propsList || (Array.isArray(this.propsList) && !this.propsList.length)) return;
            // 拿到dom绑定的属性
            const attrMap = getAttrMap(this.shadowRoot.host);
            this.propsList.forEach((key: PropOptions) => {
                const attr = hyphenateReverse(key.attr);
                let val = attrMap[attr];
                if (!val) {
                    val = ele.getAttribute(attr);
                }
                const newValue = formatValue(val, key.type, key.default);
                this[attr] = newValue;
                this.props[attr] = newValue;
                this.setAttribute(attr, newValue);
            });
        }

        /**
         * 事件
         * @param evtName
         * @param result
         */
        public _dispatchEvent(evtName: string, result: any) {
            const event: CustomEvent = new CustomEvent(evtName, {
                detail: result || null,
                bubbles: true, // 设置为冒泡
                composed: true, // 设置为可穿透组件
            });
            if (this?.shadowRoot) {
                this?.shadowRoot.dispatchEvent(event);
                return;
            }
            if (this?._shadowRootDom) {
                this?._shadowRootDom.dispatchEvent(event);
                return;
            }
            this.dispatchEvent(event);
        }

        public override beforeInstall() {
            super.beforeInstall?.();
        }

        public override install() {
            super.install?.();
        }

        public override afterInstall() {
            super.afterInstall?.();
        }

        /**
         * 渲染前
         */
        public override beforeRender() {
            super.beforeRender?.();
        }

        /**
         * 渲染结束
         */
        public override rendered() {
            super.rendered?.();
        }

        public receiveProps() {}
    };
    if (!customElements.get(options.name)) {
        customElements.define(options.name, customElement, options.options || {});
    }
    return customElement;
}
