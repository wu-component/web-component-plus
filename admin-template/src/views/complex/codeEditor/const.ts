export const initialCode =
`export abstract class  CommonRouter {
    public routeByTo = false;
    public data: Record<any, any> = {};
    public params: Record<any, any> = {};
    public query: Record<any, any> = {};
    public historyLength = 0;

    protected constructor(options: RouterOptions) {
        this.init(options);
    }
    public abstract push(path: string, data: Record<any, any>, ...args): void
    public abstract back(...args): void
    public abstract init(options: RouterOptions): void
    public abstract before(...args): boolean
    public abstract after(...args): boolean
}

export interface BaseRouter {
    push(path: string, data?: Record<any, any>, ...args): void
    back(...args): void
}

export interface RouterOptions {
    type: 'hash' | 'history';
    after?: () => boolean;
    before?: () => boolean;
    routers?: RouterItem[];
}

export interface RouterItem {
    path: string;
    element: any[] | string | Function;
}`
