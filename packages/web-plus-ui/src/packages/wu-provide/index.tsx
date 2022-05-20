import { Component, h, Method, OnConnected, Provide } from "@canyuegongzi/web-core-plus";

@Component({
    name: 'wu-plus-provide',
})
export class WuProvide extends HTMLElement implements OnConnected {

    public provide = "这是来自父级注入的数据";

    @Provide("parentDescTitle")
    public provideParentDescTitle() {
        return {
            parentDescTitle: this.provide
        };
    }

    /**
     * 获取
     * @private
     */
    @Method()
    public getProvide() {
        return this.provide;
    }

    public render(_renderProps = {}, _store = {}) {
        return <slot />;
    }

    public connected(shadowRoot: ShadowRoot): any {}
}
