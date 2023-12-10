import { h, OnConnected, WuComponent, OnDisConnected } from '@wu-component/web-core-plus';
import { Placement } from '@popperjs/core/lib/enums';
export type TypeEnums = 'success' | 'warning' | 'info' | 'error';
export declare class WuPopover extends WuComponent implements OnConnected, OnDisConnected {
    constructor();
    private maskClick;
    connected(shadowRoot: ShadowRoot): void;
    disConnected(shadowRoot: ShadowRoot): void;
    position: Placement;
    effect: string;
    trigger: string;
    block: boolean;
    content: string;
    private timeout;
    isShow: boolean;
    /**
     * 打开关闭是否完全受控
     */
    controlled: boolean;
    private appear;
    disappear: boolean;
    disabled: boolean;
    closeOnClickHtml: boolean;
    private popper;
    /**
     * 鼠标点击关闭是有有效
     * @private
     */
    private mouseCloseEffective;
    closeEmit(): {
        value: boolean;
    };
    onEnter: (evt: any) => void;
    onEnterPopover: (evt: any) => void;
    updatePosition(): void;
    leave(): void;
    onLeavePopover: () => void;
    onLeave: () => void;
    render(_renderProps?: {}, _store?: {}): h.JSX.Element;
}
