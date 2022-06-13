import { OnConnected, WuComponent } from '@canyuegongzi/web-core-plus';
declare type ShadowEnums = 'always' | 'hover' | 'never';
export declare class WuMenu extends WuComponent implements OnConnected {
    constructor();
    connected(shadowRoot: ShadowRoot): void;
    header: string;
    bodyStyle: Record<any, any>;
    shadow: ShadowEnums;
    headerShow: boolean;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
