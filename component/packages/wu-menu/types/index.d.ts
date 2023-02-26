import { OnConnected, WuComponent } from '@wu-component/web-core-plus';
import '@wu-component/wu-menu-sub';
import '@wu-component/wu-menu-item-group';
import '@wu-component/wu-menu-item';
import type { WuMenuItem, WuSubMenu } from "../types/type";
type ModeEnums = 'horizontal' | 'vertical';
type MenuTriggerEnums = 'hover' | 'click';
export declare class WuMenu extends WuComponent implements OnConnected {
    constructor();
    activeIndex: string;
    openedMenus: any[];
    items: any;
    submenus: any;
    connected(shadowRoot: ShadowRoot): void;
    mode: ModeEnums;
    collapse: boolean;
    backgroundColor: string;
    textColor: string;
    activeTextColor: string;
    defaultActive: string;
    defaultOpeneds: string[];
    uniqueOpened: boolean;
    menuTrigger: MenuTriggerEnums;
    collapseTransition: boolean;
    provideWuMenu(): this;
    defaultActiveChange(value: any): void;
    defaultOpenedsChange(value: any): void;
    collapseChange(value: any): void;
    get hoverBackground(): string;
    get isMenuPopup(): boolean;
    mixColor(color: any, percent: any): string;
    getColorChannels(color: any): {
        red: number;
        green: number;
        blue: number;
    };
    updateActiveIndex(val: any): void;
    getMigratingConfig(): {
        props: {
            theme: string;
        };
    };
    initOpenedMenu(): void;
    routeToItem(item: any, onError: any): void;
    open(index: any): void;
    close(index: any): void;
    addItem(item: any): void;
    removeItem(item: any): void;
    addSubmenu(item: any): void;
    removeSubmenu(item: any): void;
    openMenu(index: any, indexPath: any): void;
    closeMenu(index: any): void;
    handleSubmenuClick: (submenu: WuSubMenu) => void;
    handleItemClick(item: WuMenuItem): void;
    private updateSlotContent;
    select(item: WuMenuItem): {
        index: string;
        indexPath: string[];
        item: WuMenuItem;
    };
    openChange(item: WuSubMenu): {
        index: string;
        indexPath: string[];
        item: WuSubMenu;
    };
    closeChange(item: WuSubMenu): {
        index: string;
        indexPath: string[];
        item: WuSubMenu;
    };
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
