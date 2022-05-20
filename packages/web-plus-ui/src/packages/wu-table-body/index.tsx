import { h, Component, Prop, OnConnected, OnBeforeRender } from "@canyuegongzi/web-core-plus";
import css from './index.scss';
import "../wu-table-column";

@Component({
    name: 'wu-table-body',
    css: css
})
export class WuTableBody extends HTMLElement implements OnConnected, OnBeforeRender {
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
                <p>
                    主体
                    <wu-table-column />
                </p>
            </div>
        );
    }
}
