import { WuComponent, OnConnected } from '@wu-component/web-core-plus';
export declare class WuFrom extends WuComponent implements OnConnected {
    private form;
    private elements;
    private submitBtn;
    private resetBtn;
    constructor();
    disabled: boolean;
    invalid: boolean;
    method: string;
    novalidate: boolean;
    action: string;
    name: string;
    type: string;
    get validity(): boolean;
    get formdata(): FormData;
    connected(shadowRoot: ShadowRoot): void;
    render(_renderProps?: {}, _store?: {}): any;
    submit(): Promise<void>;
    checkValidity(): boolean;
    reset(): void;
}
