import { h, Component, Prop, OnConnected, WuComponent, Inject } from '@canyuegongzi/web-core-plus';
import css from './index.scss';
import { WuMenu } from "../wu-menu";
import { extractClass } from "@/common";

@Component({
    name: 'wu-plus-sub-menu',
    css: css,
})
export class WuSubMenu extends WuComponent implements OnConnected {
    private currentPlacement = 'right-start'
    constructor() {
        super();
    }

    public override connected(shadowRoot: ShadowRoot) {}

    @Prop({ default: true, type: Boolean })
    public headerShow: boolean;

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
        return {};
    }

    get itemStyle() {
        return {};
    }

    get parentMenu() {
        return this?.parentNode;
    }

    get isSlotTitle() {
        return true;
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
        const submenus = this.submenus;
        const items = this.items;

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
            <svg t="1656840651123" className="icon icon-arrow" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="4769" width="200" height="200">
                <path d="M500.8 604.779L267.307 371.392l-45.227 45.27 278.741 278.613L779.307 416.66l-45.248-45.248z"
                      p-id="4770"></path>
            </svg>
        ) : (
            <svg t="1656840623816" className="icon icon-arrow" style={{ marginLeft: '8px' }} viewBox="0 0 1024 1024" version="1.1"
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
                onFocus={this.handleMouseenter}
            >
                <div
                    class="wu-submenu_title"
                    onClick={() => this.handleClick()}
                    onMouseenter={() => this.handleTitleMouseenter()}
                    onMouseleave={() => this.handleTitleMouseleave()}
                    style={{ ...this.paddingStyle, ...this.itemStyle, backgroundColor: this.backgroundColor }}
                >
                    <slot name="title"></slot>
                    <i className="wu-submenu_icon-arrow" style={{ marginLeft: this.mode === 'horizontal' ? '8px' : '0px' }}>
                        {this.RenderSubmenuTitleIcon()}
                    </i>
                </div>
                {this.isMenuPopup ? this.RenderPopupMenu() : this.RenderInlineMenu()}
            </li>
        );
    }
}
