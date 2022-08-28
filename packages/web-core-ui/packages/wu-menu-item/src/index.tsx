import { h, Component, Prop, OnConnected, WuComponent, Inject, OnDisConnected } from '@wu-component/web-core-plus';
import css from './index.scss';
import { extractClass } from "@wu-component/common";
import "@wu-component/wu-tooltip/src/index";
import type { WuMenu } from "../types/type";

@Component({
    name: 'wu-plus-menu-item',
    css: css,
})
export class WuMenuItem extends WuComponent implements OnConnected, OnDisConnected {
    constructor() {
        super();
    }

    public override connected(shadowRoot: ShadowRoot) {
        this.wuMenuRef?.addItem(this);
        this.parentMenu.addItem(this);
        this.update();
    }

    public override disConnected() {
        this.parentMenu.addItem(this);
        this.wuMenuRef?.addItem(this);
    }

    @Prop({ default: '', type: String })
    public index: string;

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    @Inject('wuMenuRef')
    public wuMenuRef: WuMenu


    public handleClick() {
        if (!this.disabled) {
            this.wuMenuRef?.handleItemClick(this);
            this.update();
        }

    }

    public onMouseEnter() {
        if (this.mode === 'horizontal' && !this.wuMenuRef?.backgroundColor) return;
        this.shadowRoot.querySelector('li').style.backgroundColor = this.hoverBackground;
    }

    public onMouseLeave() {
        if (this.mode === 'horizontal' && !this.wuMenuRef?.backgroundColor) return;
        this.shadowRoot.querySelector('li').style.backgroundColor = this.backgroundColor;
    }
    get paddingStyle() {
        if (this.wuMenuRef?.mode !== 'vertical') return {};

        let padding = 20;
        let parent = this.parentNode;

        if (this.wuMenuRef?.collapse) {
            padding = 20;
        } else {
            while (parent && parent.tagName !== 'WU-PLUS-MENU') {
                if (parent.tagName === 'WU-PLUS-SUB-MENU') {
                    padding += 20;
                }
                parent = parent.parentNode;
            }
        }
        return { paddingLeft: padding + 'px' };
    }

    get active() {
        return this.index === this.wuMenuRef?.activeIndex;
    }

    get hoverBackground() {
        return this.wuMenuRef?.hoverBackground;
    }
    get backgroundColor() {
        return this.wuMenuRef?.backgroundColor || '';
    }
    get activeTextColor() {
        return this.wuMenuRef?.activeTextColor || '';
    }
    get textColor() {
        return this.wuMenuRef?.textColor || '';
    }

    get mode() {
        return this.wuMenuRef?.mode;
    }
    get itemStyle() {
        const style: Record<any, any> = {
            color: this.active ? this.activeTextColor : this.textColor
        };
        if (this.mode === 'horizontal' && !this.isNested) {
            style.borderBottomColor = this.active
                ? (this.wuMenuRef?.activeTextColor ? this.activeTextColor : '')
                : 'transparent';
        }
        return style;
    }

    get isNested() {
        return this.parentMenu !== this.wuMenuRef;
    }

    get parentMenu() {
        return this?.parentNode;
    }

    get isSlotTitle() {
        return true;
    }

    get indexPath() {
        const path = [ this.index ];
        let parent = this.parentNode;
        while (parent.tagName !== 'WU-PLUS-MENU') {
            if (parent.index) {
                path.unshift(parent.index);
            }
            parent = parent.parentNode;
        }
        return path;
    }
    public override render(_renderProps = {}, _store = {}) {
        return (
            <li
                role="menuitem"
                tabindex="-1"
                {...extractClass({}, '', {
                    'is-active': this.active,
                    'is-disabled': this.disabled,
                    'wu-menu-item': true
                })}
                style={{ ...this.paddingStyle, ...this.itemStyle, backgroundColor: this.backgroundColor }}
                onClick={() => this.handleClick()}
                onMouseenter={() => this.onMouseEnter()}
                onFocus={() => this.onMouseEnter()}
                onBlur={() => this.onMouseLeave()}
                onMouseleave={() => this.onMouseLeave()}
            >
                {
                    this.parentNode.tagName === 'ElMenu' && this.wuMenuRef.collapse && this.isSlotTitle ? (
                        <wu-plus-tooltip effect="dark" position="right">
                            <div slot="content">
                                <slot name="title"></slot>
                            </div>
                            <div style="position: absolute;left: 0;top: 0;height: 100%;width: 100%;display: inline-block;box-sizing: border-box;padding: 0 20px;">
                                <slot></slot>
                            </div>
                        </wu-plus-tooltip>
                    ) : (
                        <div>
                            <slot></slot>
                            <slot name="title"></slot>
                        </div>
                    )
                }
            </li>
        );
    }
}
