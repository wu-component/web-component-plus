import { OnConnected, WuComponent, OnBeforeRender } from '@canyuegongzi/web-core-plus';
declare type WuLinkType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export declare class WuLink extends WuComponent implements OnConnected, OnBeforeRender {
    constructor();
    beforeRender(): void;
    private eleAttrsMap;
    connected(shadowRoot: ShadowRoot): void;
    type: WuLinkType;
    name: string;
    underline: boolean;
    disabled: boolean;
    href: string;
    handleClick(e: Event): Event;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
