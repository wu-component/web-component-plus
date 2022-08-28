import { OnConnected, WuComponent, OnDisConnected } from '@wu-component/web-core-plus';
import type { WuMenu } from "../types/type";
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
