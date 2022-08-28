import { h, Component, Prop, OnConnected, OnBeforeUpdate, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';

type DirectionEnums = 'vertical' | 'horizontal' | any;
@Component({
    name: 'wu-plus-container',
    css: css,
})
export class WuContainer extends WuComponent implements OnConnected, OnBeforeUpdate {
    constructor() {
        super();
    }

    public isVertical = false;

    public override beforeUpdate() {
        this.isVertical = this.initIsVertical();
    }

    public override connected(shadowRoot: ShadowRoot) {
        this.isVertical = this.initIsVertical();
        (this as any).update();
    }

    private initIsVertical() {
        const slotDom: any = this.shadowRoot.getElementById('defaultSlot');
        const list: any[] = slotDom?.assignedNodes();
        if (!list || !list.length) {
            return false;
        }
        return slotDom.assignedNodes().some(item => {
            return item.tagName === 'WU-PLUS-HEADER' || item.tagName === 'WU-PLUS-FOOTER';
        });
    }

    @Prop({ default: '', type: String })
    public direction: DirectionEnums;


    public override render(_renderProps = {}, _store = {}) {
        return (
            <section class={`${this.isVertical ? 'wu-container is-vertical' : 'wu-container'}`}>
                <slot id="defaultSlot" class={`${this.isVertical ? 'wu-container is-vertical' : 'wu-container'}`}  />
            </section>
        );
    }
}
