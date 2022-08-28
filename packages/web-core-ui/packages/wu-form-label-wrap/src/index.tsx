import { h, Component, Prop, WuComponent, OnConnected, Inject, OnUpdated, OnDisConnected, Watch } from '@wu-component/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-form-label-wrap',
    css: css,
})
export class WuFormLabelWrap extends WuComponent implements OnConnected, OnUpdated, OnDisConnected {
    public computedWidth = 0;
    public childDomList: Node[];
    public slotDom: HTMLSlotElement;
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
        this.updateLabelWidth('update');
        this.slotDom = this.shadowRoot.getElementById('defaultSlot') as HTMLSlotElement;
        this.childDomList = this.slotDom.assignedNodes();
    }

    public override updated() {
        this.updateLabelWidth('update');
        this.childDomList = this.slotDom.assignedNodes();
    }

    public override disConnected() {
        this.updateLabelWidth('remove');
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
            this.update();
        }
    }
    @Watch('computedWidth')
    public computedWidthChange(val: string, oldVal: string) {
        if (this.updateAll) {
            this.wuForm?.registerLabelWidth(val, oldVal);
            this.wuFormItem?.updateComputedLabelWidth(val);
        }
    }

    public override render(_renderProps = {}, _store = {}) {
        if (this.isAutoWidth) {
            const autoLabelWidth = this.wuForm?.autoLabelWidth;
            const style:Record<any, any> = {};
            if (autoLabelWidth && autoLabelWidth !== 'auto') {
                const marginLeft = parseInt(autoLabelWidth, 10) - this.computedWidth;
                if (marginLeft) {
                    style.marginLeft = marginLeft + 'px';
                }
            }
            return (
                <div className="el-form-item__label-wrap" style={style}>
                    <slot id="default"></slot>
                </div>
            );
        } else {
            return <slot id="default"></slot>;
        }
    }
}
