import { h, Component, Prop, OnConnected, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
import { createPopper } from '@popperjs/core/dist/esm';
import { Placement } from "@popperjs/core/lib/enums";
import { classNames } from "@wu-component/common";

@Component({
    name: 'wu-plus-tooltip',
    css: css,
})
export class WuTooltip extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    public override connected(shadowRoot: ShadowRoot) {}

    @Prop({ default: '', type: String })
    public content: string;

    @Prop({ default: 'light', type: String })
    public effect: string;

    @Prop({ type: String, default: 'bottom' })
    public position: Placement;

    @Prop({ default: false, type: Boolean })
    public isShow: boolean;


    public onMouseEnter = () => {
        this.isShow = true;
        const tip: Element = this.shadowRoot
            .querySelector('slot')
            .assignedNodes()
            .find(node => node.nodeType !== 3) as Element;
        createPopper(tip, this.shadowRoot.querySelector('.tip'), {
            placement: this.position,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [ 0, 8 ],
                    },
                },
                {
                    name: 'computeStyles',
                    options: {
                        adaptive: false, // true by default
                    },
                },
            ],
        });
    }

    public onMouseLeave = () => {
        this.isShow = false;
    }



    public override render(_renderProps = {}, _store = {}) {
        return (
            <div>
                <slot onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} />
                <div class={
                    classNames({
                        tip: true,
                        show: this.isShow,
                        [`is-${this.effect}`]: this.effect
                    })}>
                    {this.content ? this.content : <slot name="content" />}
                    <i class="tip-arrow" data-popper-arrow />
                </div>
            </div>
        );
    }
}
