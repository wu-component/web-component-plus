import { WuComponent } from '@wu-component/web-core-plus';
import "@wu-component/wu-popover/src/index";
import "@wu-component/wu-button/src/index";
export declare class WuPopconfirm extends WuComponent {
    constructor();
    private popoverRef;
    content: string;
    confirmButtonText: string;
    cancelButtonText: string;
    confirmButtonType: string;
    cancelButtonType: string;
    icon: any;
    iconColor: string;
    hideIcon: string;
    visible: boolean;
    get displayConfirmButtonText(): string;
    get displayCancelButtonText(): string;
    confirm(): void;
    cancel(): void;
    render(_renderProps?: {}, _store?: {}): any;
}
