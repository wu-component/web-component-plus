import { h, Component, Prop, OnConnected, WuComponent, Emit, OnDisConnected } from '@wu-component/web-core-plus';
import { createPopper } from '@popperjs/core/dist/esm';
import css from './index.scss';
import { Placement } from '@popperjs/core/lib/enums';
import { classNames } from '@wu-component/common';
export type TypeEnums = 'success' | 'warning' | 'info' | 'error';

@Component({
    name: 'wu-plus-popover',
    css: css,
})
export class WuPopover extends WuComponent implements OnConnected , OnDisConnected {
    constructor() {
        super();
    }

    private maskClick(e) {
        if(!this.mouseCloseEffective) {
            return;
        }
        if (this.trigger === 'manual') return;
        if (e?.target?.tagName !== "WU-PLUS-POPOVER"){
            if (this.closeOnClickHtml) {
                if (this.isShow) {
                    this.leave();
                }
            }
            return;
        }
        if (this.isShow) {
            this.leave();
        }
    }

    public override connected(shadowRoot: ShadowRoot) {
        document.addEventListener('click', (e: Event) => this.maskClick(e));
    }

    public override disConnected(shadowRoot: ShadowRoot) {
        document.removeEventListener('click', (e: Event) => this.maskClick(e));

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
    public isShow = false;

    /**
     * 打开关闭是否完全受控
     */
    @Prop({ type: Boolean, default: false })
    public controlled = false;


    @Prop({ type: Boolean, default: false })
    private appear = false;

    @Prop({ type: Boolean, default: false })
    public disappear = false;

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    @Prop({ default: true, type: Boolean })
    public closeOnClickHtml = true;

    private popper = null;

    /**
     * 鼠标点击关闭是有有效
     * @private
     */
    private mouseCloseEffective = true

    @Emit('close')
    public closeEmit() {
        return {
            value: true
        };
    }

    public onEnter = evt => {
        if (this.disabled) return;
        this.mouseCloseEffective = false;
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
            this.closeEmit();
        }, 0);
    }

    public onLeavePopover = () => {
        this.mouseCloseEffective = true;
        if (this.trigger === 'hover') {
            this.timeout = setTimeout(() => {
                this.leave();
            }, 0);
        }
    };

    public onLeave = () => {
        this.timeout = setTimeout(() => {
            this.leave();
        }, 0);
    };

    public override render(_renderProps = {}, _store = {}) {
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
            // @ts-ignore
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
                    <slot name="footer"></slot>
                </div>
            </div>
        );
    }
}
