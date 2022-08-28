import { OnConnected, WuComponent } from '@wu-component/web-core-plus';
declare type ShadowEnums = 'always' | 'hover' | 'never';
export declare class WuCard extends WuComponent implements OnConnected {
    constructor();
    connected(shadowRoot: ShadowRoot): void;
    header: string;
    bodyStyle: Record<any, any>;
    shadow: ShadowEnums;
    headerShow: boolean;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
