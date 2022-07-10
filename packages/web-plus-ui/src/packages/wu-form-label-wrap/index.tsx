import { h, Component, Prop, WuComponent, OnConnected, Inject } from '@canyuegongzi/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-form-label-wrap',
    css: css,
})
export class WuFormLabelWrap extends WuComponent implements OnConnected {
    private computedWidth: number = 0;
    constructor() {
        super();
    }

    @Inject('wuFormItemRef')
    public wuFormItem;

    @Inject('wuFormRef')
    public wuForm;

    @Prop({ default: false, type: Boolean })
    public isAutoWidth: boolean;

    @Prop({ default: false, type: Boolean })
    public updateAll: boolean;

    public override connected(shadowRoot: ShadowRoot) {

    }

    public getLabelWidth() {
        if (this.firstElementChild) {
            const computedWidth = window.getComputedStyle(this.firstElementChild).width;
            return Math.ceil(parseFloat(computedWidth));
        } else {
            return 0;
        }
    }
    public updateLabelWidth(action = 'update') {
        if (this.isAutoWidth && this.firstElementChild) {
            if (action === 'update') {
                this.computedWidth = this.getLabelWidth();
            } else if (action === 'remove') {
                this.wuForm?.deregisterLabelWidth?.(this.computedWidth);
            }
        }
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div></div>
        );
    }

}
