import { WuComponent } from '@canyuegongzi/web-core-plus';
import "../wu-popover";
import "../wu-button";
export declare class WuPopconfirm extends WuComponent {
    constructor();
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
