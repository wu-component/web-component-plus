import { Component, Emit, h, OnConnected, Prop, Provide, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
import "@wu-component/wu-breadcrumb-item";

@Component({
    name: 'wu-plus-breadcrumb',
    css: css,
})
export class WuBreadcrumb extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    @Prop({ default: '/', type: String })
    public separator: string;

    @Prop({ default: '', type: String })
    public separatorClass: string;

    @Provide('wuBreadcrumbRef')
    public provideWuBreadcrumb() {
        return this;
    }

    /**
     * 面包屑点击
     * @param args
     */
    public breadcrumbClick(...args) {
        this.change(...args);
    }

    @Emit('change')
    public change(...args) {
        return { ...args };
    }

    public override connected(shadowRoot: ShadowRoot): any {
        const slotDom = this.shadowRoot.getElementById('defaultSlot') as HTMLSlotElement;
        const items: Node[] = slotDom.assignedNodes().filter(item => (item as any).tagName === 'WU-PLUS-BREADCRUMB-ITEM');
        if (items.length) {
            const dom = items[items.length - 1] as HTMLSlotElement;
            dom.setAttribute('aria-current', 'page');
            setTimeout(() => {
                const htmlDom = dom.shadowRoot.querySelector('.wu-breadcrumb_separator') as HTMLElement;
                htmlDom.style.display = 'none';
                htmlDom.style.fontWeight = '400';
                htmlDom.style.color = '#606266';
                htmlDom.style.cursor = 'text';
            }, 0);
        }
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div class="wu-breadcrumb" aria-label="Breadcrumb" role="navigation">
                <slot id="defaultSlot" style={{ width: '100%' }} />
            </div>
        );
    }
}
