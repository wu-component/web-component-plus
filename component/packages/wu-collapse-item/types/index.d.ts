import { h, WuComponent } from '@wu-component/web-core-plus';
import type { WuCollapse } from "../types/type";
export declare class WuCollapseItem extends WuComponent {
    constructor();
    uId: string;
    wuCollapseRef: WuCollapse;
    contentWrapStyle: Record<string, string>;
    contentHeight: number;
    focusing: boolean;
    isClick: boolean;
    name: string;
    disabled: boolean;
    tip: string;
    get isActive(): boolean;
    handleFocus(): void;
    handleHeaderClick(): void;
    handleEnterClick(): void;
    render(_renderProps?: {}, _store?: {}): h.JSX.Element;
}
