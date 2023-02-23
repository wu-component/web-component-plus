import { h, Component, Prop, OnConnected, WuComponent, Inject, OnDisConnected } from '@wu-component/web-core-plus';
import css from './index.scss';
import { extractClass } from "@wu-component/common";
import type { WuMenu } from "../types/type";

@Component({
    name: 'wu-plus-sub-menu',
    css: css,
})
export class WuSubMenu extends WuComponent implements OnConnected, OnDisConnected {
    private currentPlacement = 'right-start'
    constructor() {
        super();
    }

    public override connected(shadowRoot: ShadowRoot) {
        this.parentMenu.addSubmenu(this);
        this.wuMenuRef?.addSubmenu(this);
        this.update();
    }

    public override disConnected() {
        this.parentMenu.removeSubmenu(this);
        this.wuMenuRef?.removeSubmenu(this);
    }

    @Prop({ default: '', type: String })
    public index: string;

    @Prop({ default: 300, type: Number })
    public showTimeout: string;

    @Prop({ default: 300, type: Number })
    public hideTimeout: string;

    @Prop({ default: '', type: String })
    public popperClass: string;

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    @Prop({ default: false, type: Boolean })
    public popperAppendToBody: boolean;

    @Inject('wuMenuRef')
    public wuMenuRef!: WuMenu

    public timeout = null;

    public items = {};

    public submenus = {};

    public mouseInChild = false


    /**
     * 点击
     */
    public handleClick() {
        const { wuMenuRef, disabled } = this;
        if (
            (wuMenuRef?.menuTrigger === 'hover' && wuMenuRef?.mode === 'horizontal') ||
            (wuMenuRef?.collapse && wuMenuRef?.mode === 'vertical') ||
            disabled
        ) {
            return;
        }
        // @ts-ignore
        wuMenuRef.handleSubmenuClick(this);
        this.update();

    }

    public onMouseEnter() {

    }

    public onMouseLeave() {

    }

    public addItem(item) {
        if (this.items === undefined) {
            this.items = {};
        }
        this.items[item.index] = item;
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

    get parentMenu() {
        return this?.parentNode;
    }

    get isSlotTitle() {
        return true;
    }

    get isNested() {
        return this.parentMenu !== this.wuMenuRef;
    }
    public handleMouseenter(event: any, time: number) {}

    public handleMouseleave(flg) {}

    public handleTitleMouseenter() {
        if (this.mode === 'horizontal' && !this?.wuMenuRef.backgroundColor) return;
        // const title = this.$refs['submenu-title'];
        // title && (title.style.backgroundColor = this?.wuMenuRef.hoverBackground);
    }
    public handleTitleMouseleave() {
        if (this.mode === 'horizontal' && !this?.wuMenuRef.backgroundColor) return;
        // const title = this.$refs['submenu-title'];
        // title && (title.style.backgroundColor = this?.wuMenuRef.backgroundColor || '');
    }
    public updatePlacement() {
        this.currentPlacement = this.mode === 'horizontal' && this.isFirstLevel
            ? 'bottom-start'
            : 'right-start';
    }


    get appendToBody() {
        return this.popperAppendToBody === undefined
            ? this.isFirstLevel
            : this.popperAppendToBody;
    }
    get menuTransitionName() {
        return this?.wuMenuRef?.collapse ? 'el-zoom-in-left' : 'el-zoom-in-top';
    }
    get opened() {
        return this?.wuMenuRef?.openedMenus?.indexOf(this.index) > -1;
    }
    get active() {
        let isActive = false;
        const submenus = this.submenus || {};
        const items = this.items || {};

        Object.keys(items).forEach(index => {
            if (items[index].active) {
                isActive = true;
            }
        });

        Object.keys(submenus).forEach(index => {
            if (submenus[index].active) {
                isActive = true;
            }
        });

        return isActive;
    }
    get hoverBackground() {
        return this?.wuMenuRef?.hoverBackground;
    }
    get backgroundColor() {
        return this?.wuMenuRef?.backgroundColor || '';
    }
    get activeTextColor() {
        return this?.wuMenuRef?.activeTextColor || '';
    }
    get textColor() {
        return this?.wuMenuRef?.textColor || '';
    }
    get mode() {
        return this?.wuMenuRef?.mode;
    }
    get isMenuPopup() {
        return this?.wuMenuRef?.isMenuPopup;
    }
    get titleStyle() {
        if (this.mode !== 'horizontal') {
            return {
                color: this.textColor
            };
        }
        return {
            borderBottomColor: this.active
                ? (this?.wuMenuRef?.activeTextColor ? this.activeTextColor : '')
                : 'transparent',
            color: this.active
                ? this.activeTextColor
                : this.textColor
        };
    }
    get isFirstLevel() {
        let isFirstLevel = true;
        let parent = this.parentNode;
        while (parent && parent !== this?.wuMenuRef) {
            if ([ 'WU-PLUS-SUB-MENU', 'WU-PLUS-MENU-ITEM-GROUP' ].indexOf(parent.tagName) > -1) {
                isFirstLevel = false;
                break;
            } else {
                parent = parent.$parent;
            }
        }
        return isFirstLevel;
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

    public RenderPopupMenu() {
        return (
            <div
                style={{ display: this.opened ? 'block' : 'none' }}

                {...extractClass({}, '', {
                    [`wu-menu-${this.mode}`]: true,
                    [this.popperClass]: true
                })}
                onMouseEnter={($event) => this.handleMouseenter($event, 100)}
                onMouseLeave={() => this.handleMouseleave(true)}
                onFocus={($event) => this.handleMouseenter($event, 100)}>
                <ul
                    role="menu"
                    {...extractClass({}, '', {
                        [`wu-menu-popup-${this.currentPlacement}`]: true,
                        'wu-menu': true,
                        'wu-menu-popup': true
                    })}
                    style={{ backgroundColor: this?.wuMenuRef?.backgroundColor || '' }}>
                    <slot></slot>
                </ul>
            </div>
        );
    }

    public RenderInlineMenu() {
        return (
            <ul
                role="menu"
                className="wu-menu wu-menu-inline"
                v-show={this.opened}
                style={{ backgroundColor: this?.wuMenuRef?.backgroundColor || '', display: this.opened ? 'block' : 'none' }}>
                <slot></slot>
            </ul>
        );
    }

    public RenderSubmenuTitleIcon() {
        return (
            this?.wuMenuRef?.mode === 'horizontal' && this.isFirstLevel ||
            this?.wuMenuRef?.mode === 'vertical' && !this?.wuMenuRef.collapse
        ) ? (
            <svg className="icon icon-arrow" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="4769" width="200" height="200">
                <path d="M500.8 604.779L267.307 371.392l-45.227 45.27 278.741 278.613L779.307 416.66l-45.248-45.248z"
                      p-id="4770"></path>
            </svg>
        ) : (
            <svg className="icon icon-arrow" style={{ marginLeft: '8px' }} viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="4630" width="200" height="200">
                <path
                    d="M593.450667 512.128L360.064 278.613333l45.290667-45.226666 278.613333 278.762666L405.333333 790.613333l-45.226666-45.269333z"
                    p-id="4631"></path>
            </svg>
        );
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <li
                {...extractClass({}, '', {
                    'is-active': this.active,
                    'is-opened': this.opened,
                    'is-disabled': this.disabled,
                    "wu-submenu": true
                })}
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={this.opened}
                onMouseenter={(event) => this.handleMouseenter(event, 100)}
                onMouseleave={(event) => this.handleMouseleave(false)}
                // @ts-ignore
                onFocus={this.handleMouseenter}
            >
                <div
                    {...extractClass({}, '', {
                        "wu-submenu_title": true,
                        [`wu-submenu_title-${this.mode}`]: true
                    })}
                    onClick={() => this.handleClick()}
                    // @ts-ignore
                    onMouseenter={() => this.handleTitleMouseenter()}
                    onMouseleave={() => this.handleTitleMouseleave()}
                    style={{ ...this.paddingStyle, ...this.itemStyle, backgroundColor: this.backgroundColor }}
                >
                    <slot name="title"></slot>
                    <i
                        {...extractClass({}, '', {
                            "wu-submenu_icon-arrow": true,
                            [`wu-submenu_icon-arrow-${this.mode}`]: true
                        })}
                        style={{ marginLeft: this.mode === 'horizontal' ? '0' : '0px' }}
                    >
                        {this.RenderSubmenuTitleIcon()}
                    </i>
                </div>
                {this.isMenuPopup ? this.RenderPopupMenu() : this.RenderInlineMenu()}
            </li>
        );
    }
}
