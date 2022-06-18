import { OnConnected, WuComponent } from '@canyuegongzi/web-core-plus';
import { Placement } from "@popperjs/core/lib/enums";
export declare class WuTooltip extends WuComponent implements OnConnected {
    constructor();
    connected(shadowRoot: ShadowRoot): void;
    content: string;
    effect: string;
    position: Placement;
    isShow: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    render(_renderProps?: {}, _store?: {}): any;
}
