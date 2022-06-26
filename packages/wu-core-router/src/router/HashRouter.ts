import { CommonRouter, RouterOptions } from "./common";
import RouterConfig from "../router/RouterConfig";
import { decodeParams, getParams, getUrlParams } from "../common";

export class HashRouter extends CommonRouter {
    constructor(options: RouterOptions) {
        super(options);
        this.push = this.push.bind(this);
        this.back = this.back.bind(this);
    }

    /**
     * 路由回退
     * @param args
     */
    public back(...args): void {
        window.history.back();
    }

    /**
     * 路由跳转
     * @param path
     * @param data
     * @param args
     */
    public push(path: string, data?: Record<any, any>, ...args): void {
        this.routeByTo = true;
        this.query = data || {};
        if (path[0] === '#') {
            location.hash = decodeParams(path, data);
        } else {
            location.hash = '#' + decodeParams(path, data);
        }
    }

    /**
     * 初始化路由监听
     */
    public init(options: RouterOptions): void {
        window.addEventListener('hashchange', this.hashChange.bind(this));
        document.addEventListener('DOMContentLoaded', this.hashChange.bind(this));
        this.after = options.after? options.after.bind(this): () => true;
        this.before = options.before? options.before.bind(this): () => true;
    }

    /**
     * hash 值修改
     * @private
     */
    private hashChange(evt: Event) {
        if (!this.routeByTo ) {
            // byNative = true;
        }
        this.routeByTo = false;
        this.historyLength = window.history.length;
        let path = window.location.hash.replace('#', '');
        if (path === '') path = '/';

        Object.keys(RouterConfig.routeMap).every( (key) => {
            const toArr = path.split('?')[0].match(RouterConfig.routeMap[key].reg);
            if (toArr) {
                const pathArr = key.match(RouterConfig.routeMap[key].reg);
                this.params = getParams(toArr, pathArr);
                this.query = this.query? { ...this.query, ...getUrlParams(path) }: getUrlParams(path);
                this.data = null;
                if (this.before({ evt, query: this.query, params: this.params, data: this.data })) {
                    RouterConfig.routerViewContainer.default.shadowRoot.innerHTML = '';
                    if (Array.isArray(RouterConfig.routeMap[key].element)) {
                        (RouterConfig.routeMap[key].element as any).forEach(item => {
                            RouterConfig.routerViewContainer.default.shadowRoot.appendChild(item);
                        });
                    }
                    if (typeof RouterConfig.routeMap[key].element == 'function') {
                        RouterConfig.routerViewContainer.default.shadowRoot.appendChild((RouterConfig.routeMap[key] as any).element?.());
                    }
                    if (typeof RouterConfig.routeMap[key].element == 'string') {
                        RouterConfig.routerViewContainer.default.shadowRoot.innerHTML = RouterConfig.routeMap[key].element;
                    }

                    this.after?.(evt);
                }
                return false;
            }
            return true;
        });
    }

    /**
     * 路由前置拦截器
     * @param args
     */
    public after(...args): boolean {
        return true;
    }

    /**
     * 路由后置拦截器
     * @param args
     */
    public before(...args): boolean {
        return true;
    }

}
