import { h, WuComponent, Component, OnConnected, Prop } from "@canyuegongzi/web-core-plus";
import RouterConfig from "../router/RouterConfig";

const css = `
:host {
    width: 100%;
    height: 100%;
    margin: 0;
    display: block;
}
#defaultSlot {

}
`;
@Component({
    name: 'wu-plus-router-item',
    css: css,
})
export class RouterItem extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    // 是否显示
    @Prop({ default: '', type: String })
    public path: string;

    public override connected(shadowRoot: ShadowRoot) {
        console.log(this.children);
        // const slotDom: any = this.shadowRoot.getElementById('defaultSlot');
        RouterConfig.register({
            path: this.path,
            element: Array.from(this.children)
        });
    }

    public override render() {
        return (
            <slot id="defaultSlot" />
        );
    }
}
