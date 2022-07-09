import { h, Component, Prop, WuComponent } from '@canyuegongzi/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-form',
    css: css,
})
export class WuFrom extends WuComponent {
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
