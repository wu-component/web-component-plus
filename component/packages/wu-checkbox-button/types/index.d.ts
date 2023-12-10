import { h, OnConnected, OnBeforeRender, WuComponent } from '@wu-component/web-core-plus';
export declare class WuCheckboxButton extends WuComponent implements OnConnected, OnBeforeRender {
    constructor();
    beforeRender(): void;
    connected(shadowRoot: ShadowRoot): void;
    disabled: boolean;
    render(_renderProps?: {}, _store?: {}): h.JSX.Element;
}
