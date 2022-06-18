import { pathToRegexp } from "path-to-regexp";

interface RegisterRouterOptions {
    path: string;
    element: any[];
}

interface RegisterContainerOptions {
    id: string;
    container: HTMLElement
}

interface RouterItem {
    element: any[];
    reg: any;
}
class RouterConfig {
    public routeMap: Record<string, RouterItem> = {}

    public routerViewContainer: Record<string, any> = {}

    /**
     * 注册路由
     * @param options
     */
    public register(options: RegisterRouterOptions) {
        this.routeMap[options.path] = {
            element: options.element,
            reg: pathToRegexp(options.path)
        };
    }

    public registerContainer(options: RegisterContainerOptions) {
        this.routerViewContainer[options.id || 'default'] = options.container;
    }

}

export default new RouterConfig();
