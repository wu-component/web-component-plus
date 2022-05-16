import {h, Component, Prop, OnConnected, OnBeforeRender} from "@canyuegongzi/web-core-plus";
import css from './index.scss';
import { UISize } from "../../interface";

@Component({
    name: 'wu-checkbox-group',
    css: css
})
export class WuCheckboxGroup extends HTMLElement implements OnConnected, OnBeforeRender {
    constructor() {
        super();
    }

    @Prop({ default: 'mini', type: String })
    public size: UISize;

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    @Prop({ default: "[]", type: Array })
    public value: string[];

    public beforeRender() {
    }

    public getProps() {
        return {
            size: this.size,
            disabled: this.disabled,
            value: this.value,

        }
    }

    public connected(shadowRoot: ShadowRoot) {}

    public render(_renderProps= {}, _store = {}) {
        return (
            <div class="wu-checkbox-group" role="group" aria-label="checkbox-group">
                <slot disabled={this.disabled} value={this.value} size={this.size} />
            </div>
        );
    }
}
