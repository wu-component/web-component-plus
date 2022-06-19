import { CommonRouter, RouterOptions } from "./common";

export class HistoryRouter extends CommonRouter {
    constructor(options: RouterOptions) {
        super(options);
    }
    public back(...args): void {}

    public push(...args): void {}

    public init(options: RouterOptions): void {
        this.after = options.after? options.after.bind(this): () => true;
        this.before = options.before? options.before.bind(this): () => true;
    }


    public after(...args): boolean {
        return true;
    }

    public before(...args): boolean {
        return true;
    }


}
