import { OnConnected, WuComponent, OnDisConnected } from "@wu-component/web-core-plus";

declare type ModeEnums = 'horizontal' | 'vertical';
declare type MenuTriggerEnums = 'hover' | 'click';
export declare class WuMenuItem extends WuComponent implements OnConnected, OnDisConnected {
    constructor();
    connected(shadowRoot: ShadowRoot): void;
    disConnected(): void;
    index: string;
    disabled: boolean;
    wuMenuRef: WuMenu;
    handleClick(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    get paddingStyle(): {
        paddingLeft?: undefined;
    } | {
        paddingLeft: string;
    };
    get active(): boolean;
    get hoverBackground(): string;
    get backgroundColor(): string;
    get activeTextColor(): string;
    get textColor(): string;
    get mode(): "horizontal" | "vertical";
    get itemStyle(): Record<any, any>;
    get isNested(): boolean;
    get parentMenu(): any;
    get isSlotTitle(): boolean;
    get indexPath(): string[];
    render(_renderProps?: {}, _store?: {}): any;
}
export declare class WuSubMenu extends WuComponent implements OnConnected, OnDisConnected {
    private currentPlacement;
    constructor();
    connected(shadowRoot: ShadowRoot): void;
    disConnected(): void;
    index: string;
    showTimeout: string;
    hideTimeout: string;
    popperClass: string;
    disabled: boolean;
    popperAppendToBody: boolean;
    wuMenuRef: WuMenu;
    timeout: any;
    items: {};
    submenus: {};
    mouseInChild: boolean;
    /**
     * 点击
     */
    handleClick(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    addItem(item: any): void;
    get paddingStyle(): {
        paddingLeft?: undefined;
    } | {
        paddingLeft: string;
    };
    get itemStyle(): Record<any, any>;
    get parentMenu(): any;
    get isSlotTitle(): boolean;
    get isNested(): boolean;
    handleMouseenter(event: any, time: number): void;
    handleMouseleave(flg: any): void;
    handleTitleMouseenter(): void;
    handleTitleMouseleave(): void;
    updatePlacement(): void;
    get appendToBody(): boolean;
    get menuTransitionName(): "el-zoom-in-left" | "el-zoom-in-top";
    get opened(): boolean;
    get active(): boolean;
    get hoverBackground(): string;
    get backgroundColor(): string;
    get activeTextColor(): string;
    get textColor(): string;
    get mode(): "horizontal" | "vertical";
    get isMenuPopup(): boolean;
    get titleStyle(): {
        color: string;
        borderBottomColor?: undefined;
    } | {
        borderBottomColor: string;
        color: string;
    };
    get isFirstLevel(): boolean;
    get indexPath(): string[];
    RenderPopupMenu(): any;
    RenderInlineMenu(): any;
    RenderSubmenuTitleIcon(): any;
    render(_renderProps?: {}, _store?: {}): any;
}
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
