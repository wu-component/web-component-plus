export abstract class  CommonRouter {
    public routeByTo = false;
    public data: Record<any, any> = {};
    public params: Record<any, any> = {};
    public query: Record<any, any> = {};
    public historyLength = 0;

    protected constructor() {
        this.init();
    }
    public abstract push(path: string, data: Record<any, any>, ...args): void
    public abstract back(...args): void
    public abstract init(): void
}

export interface BaseRouter {
    push(path: string, data?: Record<any, any>, ...args): void
    back(...args): void
}

export interface RouterOptions {
    type: 'hash' | 'history'
}
