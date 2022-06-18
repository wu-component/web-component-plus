import { OnConnected, OnBeforeUpdate, WuComponent } from '@canyuegongzi/web-core-plus';
export declare class WuTimeLineItem extends WuComponent implements OnConnected, OnBeforeUpdate {
    constructor();
    beforeUpdate(): void;
    connected(shadowRoot: ShadowRoot): void;
    private updateStyle;
    name: string;
    timestamp: string;
    hideTimestamp: boolean;
    isRenderDot: boolean;
    placement: string;
    type: string;
    color: string;
    size: string;
    icon: string;
    timelineRef: HTMLElement;
    render(_renderProps?: {}, _store?: {}): any;
}
