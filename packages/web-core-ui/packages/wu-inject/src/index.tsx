import { h, Component, Inject, OnConnected, WuComponent } from '@wu-component/web-core-plus';

@Component({
    name: 'wu-plus-inject',
})
export class WuInject extends WuComponent implements OnConnected {
    @Inject('parentDescTitle')
    public injectionName;

    public override connected(shadowRoot: ShadowRoot) {
        console.log(this.injectionName);
    }

    public override render(_renderProps = {}, _store = {}) {
        return <div style={{ width: '100vw', height: '48px', textAlign: 'center' }}>数据注入{this.injectionName?.parentDescTitle}</div>;
    }
}
