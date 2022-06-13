import { ProvideConfig } from "../Provide";
import { InjectOptions } from "../Inject";
import { PropOptions, PropsReactive } from "../PropsReactive";
import { EmitReactive } from "../Emit";
import { StatesReactive } from "../StatesReactive";
import { cssToDom, getAttrMap, getGuid, hyphenateReverse } from "../../utils";
import { formatValue } from "../../utils/format-type";
import { diff } from "../../runtime";
import { COMPONENT_CUSTOM_INJECT, COMPONENT_CUSTOM_PROVIDE, PROP_META_KEY } from "../../app-data";
import { BaseCustomComponent } from "../../declarations";


export class WuComponent extends HTMLElement implements BaseCustomComponent {
    public override tagName!: string;
    public rootNode = null;
    public isInstalled = false;
    public willUpdate = false;
    public _customStyleContent = '';
    public props = {};
    public prevProps = {};
    public _customStyleElement = null;
    public store;
    public injects: InjectOptions[];
    public provides: ProvideConfig[] = [];
    public override parentNode!: any;
    public override shadowRoot!: any;
    public elementId!: string;
    public override attachShadow!: any;
    public override dispatchEvent!: any;

    public inject!: any; // 提取注入的数据
    public injection!: any;
    public providesMap: Record<string, ProvideConfig>;
    public injectsList: InjectOptions[];
    public propsList: PropOptions[];

    /**
     * 挂载组件定义的源数据
     * @private
     */
    private $options: any;

    public host!: any;
    static is = 'CustomWebComponent';


    private _initComponent_(){
        this.elementId = getGuid();
        this.propsList = Reflect.getMetadata(PROP_META_KEY, this) ?? [] as PropOptions[];
        this.injects = Reflect.getMetadata(COMPONENT_CUSTOM_INJECT, this) ?? [] as InjectOptions[];
        this.provides = Reflect.getMetadata(COMPONENT_CUSTOM_PROVIDE, this) ?? [] as ProvideConfig[];
        new PropsReactive(this);
        new StatesReactive(this);
        new EmitReactive(this);
    }

    constructor() {
        super();
        this.$options = (this.constructor as any).$options;
        this._initComponent_();
        this.injection = null;
        this.rootNode = null;
        this.isInstalled = false;
        this.willUpdate = false;
        this._customStyleContent = '';
        this.props = {};
        this.prevProps = {};
        this._customStyleElement = null;
        this.store = null;
        this.injection = {};
        this.providesMap = this.getProvides();
        this.injectsList = this.getInjects();
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
        // this.attrsToProps();
        this.beforeUpdate();
        this.beforeRender();
        if (this._customStyleContent != this.$options.css) {
            this._customStyleContent = this.$options.css;
            // this.customStyleElement.textContent = this.customStyleContent;
        }
        // 属性变化，重新执行render 渲染， 走diff，生成新的dom
        const rendered = this.render(this.props, this.store);
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
        if (this.$options.css) {
            this._customStyleElement = cssToDom(this.$options.css);
            this._customStyleContent = this.$options.css;
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
    public connectedCallback() {
        this.updateInject(this.update.bind(this));
        // @ts-ignore
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
        const host = this.shadowRoot && this.shadowRoot.host? this.shadowRoot.host: this;
        const attrMap = getAttrMap(host);
        this.propsList.forEach((key: PropOptions) => {
            const attr = hyphenateReverse(key.attr);
            let val = attrMap[attr];
            if (!val) {
                val = ele.getAttribute(attr);
            }
            const newValue = formatValue(val, key.type, key.default);
            this[attr] = newValue;
            this.props[attr] = newValue;
            // this.setAttribute(attr, newValue);
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
