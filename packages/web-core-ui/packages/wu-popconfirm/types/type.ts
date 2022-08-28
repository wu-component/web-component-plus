import { OnConnected, WuComponent } from '@wu-component/web-core-plus';
export declare type TypeEnums = 'success' | 'warning' | 'info' | 'error';
export declare const top: "top";
export declare const bottom: "bottom";
export declare const right: "right";
export declare const left: "left";
export declare const auto: "auto";
export declare type BasePlacement = typeof top | typeof bottom | typeof right | typeof left;
export declare type VariationPlacement = "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end";
export declare type AutoPlacement = "auto" | "auto-start" | "auto-end";
export declare type Placement = AutoPlacement | BasePlacement | VariationPlacement;
export declare class WuPopover extends WuComponent implements OnConnected {
    constructor();
    connected(shadowRoot: ShadowRoot): void;
    position: Placement;
    effect: string;
    trigger: string;
    block: boolean;
    content: string;
    private timeout;
    isShow: boolean;
    private appear;
    disappear: boolean;
    disabled: boolean;
    private popper;
    closeEmit(): {
        value: boolean;
    };
    onEnter: (evt: any) => void;
    onEnterPopover: (evt: any) => void;
    updatePosition(): void;
    leave(): void;
    onLeavePopover: () => void;
    onLeave: () => void;
    render(_renderProps?: {}, _store?: {}): any;
}
