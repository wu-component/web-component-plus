import { h, Component, Prop, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-form-item',
    css: css,
})
export class WuFromItem extends WuComponent {
    constructor() {
        super();
    }
    @Prop({ default: false, type: Boolean })
    public plain: boolean;

    @Prop({ default: false, type: Boolean })
    public novalidate: boolean;

    public method() {

    }

    public action() {

    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <form id="form" method={() => this.method()} action={() => this.action()} novalidate={this.novalidate}>
                <slot></slot>
            </form>
        );
    }
}
