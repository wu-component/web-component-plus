import { h, WuComponent, Component, OnConnected, Prop } from "@wu-component/web-core-plus";
import RouterConfig from "../router/RouterConfig";

const css = `
:host {
    width: 100%;
    height: 100%;
    margin: 0;
    display: block;
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


    @Prop({ default: '', type: String })
    public component: string | Function

    public override connected(shadowRoot: ShadowRoot) {
        console.log(this.slot);
        RouterConfig.register({
            path: this.path,
            element: this.component || this.slot
        });
    }

    public override render() {
        return (
            <slot id="defaultSlot" />
        );
    }
}
