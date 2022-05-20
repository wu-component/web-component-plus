import { h, Component, Prop, OnConnected, OnBeforeRender } from "@canyuegongzi/web-core-plus";
import "../wu-table-header";
import "../wu-table-body";
import "../wu-table-footer";
import css from './index.scss';

@Component({
    name: 'wu-plus-table',
    css: css
})
export class WuTable extends HTMLElement implements OnConnected, OnBeforeRender {
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
                <wu-table-header />
                <span>table表格</span>
                <wu-table-body />
                <wu-table-footer />
            </div>
        );
    }
}
