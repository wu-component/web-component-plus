import { OnConnected, WuComponent } from '@wu-component/web-core-plus';
import { Placement } from '@popperjs/core/lib/enums';
export declare type TypeEnums = 'success' | 'warning' | 'info' | 'error';
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
