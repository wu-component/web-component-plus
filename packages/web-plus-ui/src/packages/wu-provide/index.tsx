import { Component, h, Method, OnConnected, Provide } from "@canyuegongzi/web-core-plus";

@Component({
    name: 'wu-plus-provide',
})
export class WuProvide extends HTMLElement implements OnConnected {

    public provide = { name: "测试" }

    @Provide({ key: "name" })
    public provideName() {
        return {
            name: "2222"
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

    public connected(shadowRoot: ShadowRoot): any {
        setTimeout(() => {
            this.provide = { name: "测试xxxxxx" };
        }, 10000);
    }
}
