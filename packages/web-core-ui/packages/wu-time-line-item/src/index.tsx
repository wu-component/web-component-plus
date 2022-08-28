import { h, Component, Prop, Inject, OnConnected, OnBeforeUpdate, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-timeline-item',
    css: css,
})
export class WuTimeLineItem extends WuComponent implements OnConnected, OnBeforeUpdate {
    constructor() {
        super();
    }

    public override beforeUpdate() {
        this.updateStyle();
    }

    public override connected(shadowRoot: ShadowRoot) {
        this.updateStyle();
    }

    private updateStyle() {
        const childrenEl: this[] = (this.parentNode.children as unknown) as this[];
        if (childrenEl.length && this === childrenEl[childrenEl.length - 1]) {
            (this.shadowRoot.querySelector('.wu-timeline-item_tail') as HTMLElement).style.display = 'none';
        }
    }

    @Prop({ default: '', type: String })
    public name: string;

    @Prop({ default: '', type: String })
    public timestamp: string;

    @Prop({ default: false, type: Boolean })
    public hideTimestamp: boolean;

    @Prop({ default: false, type: Boolean })
    public isRenderDot: boolean;

    @Prop({ default: 'bottom', type: String })
    public placement: string;

    @Prop({ default: '', type: String })
    public type: string;

    @Prop({ default: '', type: String })
    public color: string;

    @Prop({ default: 'normal', type: String })
    public size: string;

    @Prop({ default: '', type: String })
    public icon: string;

    @Inject('timelineRef')
    public timelineRef: HTMLElement;

    public override render(_renderProps = {}, _store = {}) {
        return (
            <li class="wu-timeline-item">
                <div class="wu-timeline-item_tail" />
                <div class={`wu-timeline-item_node wu-timeline-item_node-${this.size || ''} wu-timeline-item_node-${this.type || ''}`} style={{ backgroundColor: this.color }}>
                    {this.icon ? <i class={`wu-timeline-item_icon ${this.icon}`} /> : null}
                </div>
                {this.isRenderDot ? (
                    <div class="wu-timeline-item_dot">
                        <slot name="dot" />
                    </div>
                ) : null}
                <div class="wu-timeline-item_wrapper">
                    {!this.hideTimestamp && this.placement === 'top' ? <div class="wu-timeline-item_timestamp is-top">{this.timestamp}</div> : null}
                    <div class="wu-timeline-item_content">
                        <slot />
                    </div>
                    {!this.hideTimestamp && this.placement === 'bottom' ? <div class="wu-timeline-item_timestamp is-bottom">{this.timestamp}</div> : null}
                </div>
            </li>
        );
    }
}
