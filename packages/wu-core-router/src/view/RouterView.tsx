import { h, WuComponent, Component, OnConnected } from "@canyuegongzi/web-core-plus";
import RouterConfig from "../router/RouterConfig";

const css = `
:host {
    width: 100%;
    height: 100%;
    margin: 0;
}
`;
@Component({
    name: 'wu-plus-router-view',
    css: css,
    isMountDom: false
})
export class RouterView extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    public override connected(shadowRoot: ShadowRoot) {
        RouterConfig.registerContainer({
            id: 'default',
            container: this
        });

    }

    public override render() {
        return (
            <slot id="defaultSlot" />
        );
    }
}
