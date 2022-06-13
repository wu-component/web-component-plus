import { OnConnected, OnBeforeRender, WuComponent } from '@canyuegongzi/web-core-plus';
export declare class WuCheckboxButton extends WuComponent implements OnConnected, OnBeforeRender {
    constructor();
    beforeRender(): void;
    connected(shadowRoot: ShadowRoot): void;
    disabled: boolean;
    render(_renderProps?: {}, _store?: {}): any;
}
