import { h, Component, Inject, OnConnected } from "@canyuegongzi/web-core-plus";

@Component({
    name: 'wu-plus-inject',
})
export class WuInject extends HTMLElement implements OnConnected {

    @Inject({ key: "name" })
    public injection

    public connected(shadowRoot: ShadowRoot) {}

    public render(_renderProps = {}, _store = {}) {
        return (
            <div style={{ width: '100px', height: '16px' }}>数据注入{(this as any).injection.name}</div>
        );
    }
}
