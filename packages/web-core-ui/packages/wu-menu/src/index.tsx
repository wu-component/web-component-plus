import { Component, Emit, h, OnConnected, Prop, Provide, Watch, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
import '@wu-component/wu-menu-sub';
import '@wu-component/wu-menu-item-group';
import '@wu-component/wu-menu-item';
import { extractClass } from "@wu-component/common";
import type { WuMenuItem, WuSubMenu } from "../types/type";

type ModeEnums = 'horizontal' | 'vertical';
type MenuTriggerEnums = 'hover' | 'click';

@Component({
    name: 'wu-plus-menu',
    css: css,
})
export class WuMenu extends WuComponent implements OnConnected {
    constructor() {
        super();
        this.activeIndex = this.defaultActive;
        this.openedMenus = (this.defaultOpeneds && !this.collapse) ? this.defaultOpeneds.slice(0) : [];
        this.items = {};
        this.submenus = {};
    }

    public activeIndex = '';

    public openedMenus = [];

    public items;

    public submenus;

    public override connected(shadowRoot: ShadowRoot) {}

    @Prop({ default: 'vertical', type: String })
    public mode: ModeEnums;

    @Prop({ default: false, type: Boolean })
    public collapse: boolean;

    @Prop({ default: '#ffffff', type: String })
    public backgroundColor: string;

    @Prop({ default: '#303133', type: String })
    public textColor: string;

    @Prop({ default: '#409EFF', type: String })
    public activeTextColor: string;

    // 当前激活菜单的 index
    @Prop({ type: String })
    public defaultActive: string;

    // 当前打开的 sub-menu 的 index 的数组
    @Prop({ type: Array })
    public defaultOpeneds: string[];

    // 是否只保持一个子菜单的展开
    @Prop({ default: false, type: Boolean })
    public uniqueOpened: boolean;

    @Prop({ default: 'click', type: String })
    public menuTrigger: MenuTriggerEnums;

    // 是否开启折叠动画
    @Prop({ default: false, type: Boolean })
    public collapseTransition: boolean;

    @Provide('wuMenuRef')
    public provideWuMenu() {
        return this;
    }

    @Watch('defaultActive')
    public defaultActiveChange(value){
        this.activeIndex = value;
        if(!this.items[value] && Object.keys(this.items).length > 0){
            this.activeIndex = null;
        }
        if (Object.keys(this.items).length > 0) {
            this.updateActiveIndex(value);
        }

    }

    @Watch('defaultOpeneds')
    public defaultOpenedsChange(value) {
        if (!this.collapse) {
            this.openedMenus = value;
        }
    }

    @Watch('collapse')
    public collapseChange(value) {
        if (value) this.openedMenus = [];
        // this.broadcast('ElSubmenu', 'toggle-collapse', value);
    }

    get hoverBackground() {
        return this.backgroundColor ? this.mixColor(this.backgroundColor, 0.2) : '';
    }

    get isMenuPopup() {
        return this.mode === 'horizontal' || (this.mode === 'vertical' && this.collapse);
    }

    public mixColor(color: any, percent: any) {
        let { red, green, blue } = this.getColorChannels(color);
        if (percent > 0) { // shade given color
            red *= 1 - percent;
            green *= 1 - percent;
            blue *= 1 - percent;
        } else { // tint given color
            red += (255 - red) * percent;
            green += (255 - green) * percent;
            blue += (255 - blue) * percent;
        }
        return `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`;
    }

    public getColorChannels(color: any) {
        color = color.replace('#', '');
        if (/^[0-9a-fA-F]{3}$/.test(color)) {
            color = color.split('');
            for (let i = 2; i >= 0; i--) {
                color.splice(i, 0, color[i]);
            }
            color = color.join('');
        }
        if (/^[0-9a-fA-F]{6}$/.test(color)) {
            return {
                red: parseInt(color.slice(0, 2), 16),
                green: parseInt(color.slice(2, 4), 16),
                blue: parseInt(color.slice(4, 6), 16)
            };
        } else {
            return {
                red: 255,
                green: 255,
                blue: 255
            };
        }
    }

    public updateActiveIndex(val) {
        const item = this.items[val] || this.items[this.activeIndex] || this.items[this.defaultActive];
        if (item) {
            this.activeIndex = item.index;
            this.initOpenedMenu();
        } else {
            this.activeIndex = null;
        }
    }

    public getMigratingConfig() {
        return {
            props: {
                'theme': 'theme is removed.'
            }
        };
    }

    // 初始化展开菜单
    // initialize opened menu
    public initOpenedMenu() {
        const index = this.activeIndex;
        const activeItem = this.items[index];
        if (!activeItem || this.mode === 'horizontal' || this.collapse) return;

        const indexPath = activeItem.indexPath;

        // 展开该菜单项的路径上所有子菜单
        // expand all submenus of the menu item
        indexPath.forEach(index => {
            const submenu = this.submenus[index];
            submenu && this.openMenu(index, submenu.indexPath);
        });
    }

    public routeToItem(item, onError) {
        try {

        } catch (e) {
            console.error(e);
        }
    }

    public open(index) {
        const { indexPath } = this.submenus[index.toString()];
        indexPath.forEach(i => this.openMenu(i, indexPath));
    }

    public close(index) {
        this.closeMenu(index);
    }

    public addItem(item) {
        // TODO this.$set(this.items, item.index, item);
        if (this.items === undefined) {
            this.items = {};
        }
        this.items[item.index] = item;

    }

    public removeItem(item) {
        delete this.items[item.index];
    }

    public addSubmenu(item) {
        if (!item.index) {
            return;
        }
        if (this.submenus === undefined) {
            this.submenus = {};
        }
        this.submenus[item.index] = item;
    }

    public removeSubmenu(item) {
        delete this.submenus[item.index];
    }

    public openMenu(index, indexPath) {
        const openedMenus = this.openedMenus;
        if (openedMenus.indexOf(index) !== -1) return;
        // 将不在该菜单路径下的其余菜单收起
        // collapse all menu that are not under current menu item
        if (this.uniqueOpened) {
            this.openedMenus = openedMenus.filter(index => {
                return indexPath.indexOf(index) !== -1;
            });
        }
        this.openedMenus.push(index);
    }

    public closeMenu(index) {
        const i = this.openedMenus.indexOf(index);
        if (i !== -1) {
            this.openedMenus.splice(i, 1);
        }
    }

    public handleSubmenuClick = (submenu: WuSubMenu) => {
        if (this.openedMenus === undefined) {
            this.openedMenus = (this.defaultOpeneds && !this.collapse) ? this.defaultOpeneds.slice(0) : [];
        }
        const { index, indexPath } = submenu;
        const isOpened = this.openedMenus.indexOf(index) !== -1;

        if (isOpened) {
            this.closeMenu(index);
            this.closeChange(submenu);
        } else {
            this.openMenu(index, indexPath);
            this.openChange(submenu);
        }
        this.updateSlotContent();

    }

    public handleItemClick(item: WuMenuItem) {
        const hasIndex = item.index !== null;
        if (hasIndex) {
            this.activeIndex = item.index;
        }

        if (this.mode === 'horizontal' || this.collapse) {
            this.openedMenus = [];
        }
        this.updateSlotContent();
        this.select(item);
    }

    private updateSlotContent() {
        Object.values(this.submenus).forEach(item => {
            (item as any).update();
        });
        Object.values(this.items).forEach(item => {
            (item as any).update();
        });
    }

    @Emit('select')
    public select(item: WuMenuItem) {
        return {
            index: item.index, indexPath: item.indexPath, item: item
        };
    }

    @Emit('open')
    public openChange(item: WuSubMenu) {
        return {
            index: item.index, indexPath: item.indexPath, item: item
        };
    }

    @Emit('close')
    public closeChange(item: WuSubMenu) {
        return {
            index: item.index, indexPath: item.indexPath, item: item
        };
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <ul
                role="menubar"
                key={+this.collapse}
                style={{ backgroundColor: this.backgroundColor || '' }}
                {...extractClass({}, '', {
                    'wu-menu-horizontal': this.mode === 'horizontal',
                    'wu-menu-collapse': this.collapse,
                    "wu-menu": true
                })}
            >
                <slot />
            </ul>
        );
    }
}
