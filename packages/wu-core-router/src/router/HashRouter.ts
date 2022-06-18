import { CommonRouter } from "./common";
import RouterConfig from "../router/RouterConfig";
import { getParams, getUrlParams } from "../common";

export class HashRouter extends CommonRouter {
    constructor() {
        super();
        this.push = this.push.bind(this);
        this.back = this.back.bind(this);
    }
    public back(...args): void {}

    public push(path: string, data?: Record<any, any>, ...args): void {
        this.routeByTo = true;
        this.data = data;
        if (path[0] === '#') {
            location.hash = path;
        } else {
            location.hash = '#' + path;
        }
    }

    /**
     * 初始化路由监听
     */
    public init(): void {
        window.addEventListener('hashchange', this.hashChange.bind(this));
        document.addEventListener('DOMContentLoaded', this.hashChange.bind(this));
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
        const prevent = false;
        // TODO 处理 before
        if (prevent) return;
        let path = window.location.hash.replace('#', '');
        if (path === '') path = '/';

        Object.keys(RouterConfig.routeMap).every( (key) => {
            const toArr = path.split('?')[0].match(RouterConfig.routeMap[key].reg);
            if (toArr) {
                const pathArr = key.match(RouterConfig.routeMap[key].reg);
                this.params = getParams(toArr, pathArr);
                this.query = getUrlParams(path);
                this.data = null;
                RouterConfig.routerViewContainer.default.shadowRoot.innerHTML = '';
                RouterConfig.routeMap[key].element.forEach(item => {
                    RouterConfig.routerViewContainer.default.shadowRoot.appendChild(item);
                });

                return false;
            }
            return true;
        });
    }

}
