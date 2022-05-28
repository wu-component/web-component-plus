import { h, Component, Prop, OnConnected } from '@canyuegongzi/web-core-plus';
import { createPopper } from '@popperjs/core/dist/esm';
import css from './index.scss';
import { Placement } from '@popperjs/core/lib/enums';
import { classNames } from '@/common';
export type TypeEnums = 'success' | 'warning' | 'info' | 'error';

@Component({
    name: 'wu-plus-popover',
    css: css,
})
export class WuPopover extends HTMLElement implements OnConnected {
    constructor() {
        super();
    }

    public connected(shadowRoot: ShadowRoot) {
        window.addEventListener('click', (e: Event) => {
            if (this.trigger === 'manual') return;
            if (this.isShow) {
                this.leave();
            }
        });
    }

    @Prop({ type: String, default: 'bottom' })
    public position: Placement;

    @Prop({ type: String, default: 'light' })
    public effect: string;

    @Prop({ type: String, default: 'click' })
    public trigger: string;

    @Prop({ type: Boolean, default: false })
    public block: boolean;

    @Prop({ type: String, default: '' })
    public content: string;

    private timeout: any;

    @Prop({ type: Boolean, default: false })
    private isShow = false;

    @Prop({ type: Boolean, default: false })
    private appear = false;

    @Prop({ type: Boolean, default: false })
    public disappear = false;

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    private popper = null;

    public onEnter = evt => {
        if (this.disabled) return;
        clearTimeout(this.timeout);
        this.isShow = !this.isShow;
        if (this.isShow) {
            this.appear = true;
            this.disappear = false;
        } else {
            this.appear = false;
            this.disappear = true;
        }
        //html 模式过滤文本
        const tip: Element = this.shadowRoot
            .querySelector('slot')
            .assignedNodes()
            .find(node => node.nodeType !== 3) as Element;
        this.popper = createPopper(tip, this.shadowRoot.querySelector('.tip'), {
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
        evt.stopPropagation();
    };

    public onEnterPopover = evt => {
        clearTimeout(this.timeout);
        evt.stopPropagation();
    };

    public updatePosition() {
        this.popper.update();
    }

    public leave() {
        this.appear = false;
        this.disappear = true;
        setTimeout(() => {
            this.isShow = false;
        }, 300);
    }

    public onLeavePopover = () => {
        if (this.trigger === 'hover') {
            this.timeout = setTimeout(() => {
                this.leave();
            }, 300);
        }
    };

    public onLeave = () => {
        this.timeout = setTimeout(() => {
            this.leave();
        }, 300);
    };

    public render(_renderProps = {}, _store = {}) {
        const targetEvents: {
            onMouseEnter: (e: Event) => void;
            onMouseLeave: (e: Event) => void;
            onClick: (e: Event) => void;
        } = {
            onMouseEnter: null,
            onMouseLeave: null,
            onClick: null,
        };
        if (this.trigger === 'click') {
            targetEvents.onClick = this.onEnter;
        } else if (this.trigger === 'hover') {
            targetEvents.onMouseEnter = this.onEnter;
            targetEvents.onMouseLeave = this.onLeave;
        }
        return (
            <div style="position:relative" appear={this.appear} disappear={this.disappear} name="fade">
                <slot {...targetEvents} />
                <div
                    style={{ display: this.isShow ? 'block' : 'none' }}
                    class={classNames({
                        tip: true,
                        [`is-${this.effect}`]: this.effect,
                    })}
                >
                    <slot onMouseEnter={this.onEnterPopover} onMouseLeave={this.onLeavePopover} name="popover" />
                    <i class="tip-arrow" data-popper-arrow />
                </div>
            </div>
        );
    }
}
