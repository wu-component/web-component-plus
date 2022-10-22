import { h, Component, Prop, OnConnected, OnBeforeRender, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-checkbox-button',
    css: css,
})
export class WuCheckboxButton extends WuComponent implements OnConnected, OnBeforeRender {
    constructor() {
        super();
    }

    public override beforeRender() {}

    public override connected(shadowRoot: ShadowRoot) {}

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div>
                <span>行</span>
            </div>
        );
    }
}
