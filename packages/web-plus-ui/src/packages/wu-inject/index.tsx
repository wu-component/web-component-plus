import { h, Component, Inject, OnConnected } from "@canyuegongzi/web-core-plus";

@Component({
    name: 'wu-plus-inject',
})
export class WuInject extends HTMLElement implements OnConnected {

    @Inject("parentDescTitle")
    public injectionName

    public connected(shadowRoot: ShadowRoot) {
        console.log(this.injectionName)
    }

    public render(_renderProps = {}, _store = {}) {
        return (
            <div style={{ width: '100vw', height: '48px', textAlign: "center" }}>数据注入{this.injectionName?.parentDescTitle}</div>
        );
    }
}
