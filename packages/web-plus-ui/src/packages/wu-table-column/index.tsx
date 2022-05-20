import { h, Component, Prop, OnConnected, OnBeforeRender } from "@canyuegongzi/web-core-plus";
import css from './index.scss';

@Component({
    name: 'wu-table-column',
    css: css
})
export class WuTableColumn extends HTMLElement implements OnConnected, OnBeforeRender {
    constructor() {
        super();
    }

    public beforeRender() {
    }

    public connected(shadowRoot: ShadowRoot) {}

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    public render(_renderProps= {}, _store = {}) {
        return (
            <div>
                <span>行</span>
            </div>
        );
    }
}
