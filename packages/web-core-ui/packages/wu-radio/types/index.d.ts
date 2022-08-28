import { OnConnected, WuComponent } from '@wu-component/web-core-plus';
declare type UISize = 'medium' | 'small' | 'mini';
export declare class WuRadio extends WuComponent implements OnConnected {
    constructor();
    wuForm: any;
    wuFormItem: any;
    size: UISize;
    label: string;
    disabled: boolean;
    checked: boolean;
    value: string;
    name: string;
    border: string;
    private clickHandler;
    private change;
    private mounted;
    connected(shadowRoot: ShadowRoot): void;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
