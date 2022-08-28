import { OnConnected, WuComponent, OnDisConnected } from '@wu-component/web-core-plus';
import "@wu-component/wu-tooltip/src/index";
import type { WuMenu } from "../types/type";
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
