import { OnConnected, WuComponent } from '@wu-component/web-core-plus';
export declare class WuSwitch extends WuComponent implements OnConnected {
    constructor();
    wuForm: any;
    wuFormItem: any;
    inputRef: HTMLInputElement;
    coreRef: HTMLElement;
    connected(shadowRoot: ShadowRoot): void;
    disabled: boolean;
    value: boolean;
    activeValue: boolean;
    activeColor: string;
    inactiveColor: string;
    name: string;
    inactiveValue: boolean;
    width: number;
    validateEvent: boolean;
    checkedChange(val: any, oldVal: any): void;
    handleChange(): void;
    switchValue(): void;
    inputEmit(): boolean;
    changeEmit(): boolean;
    render(_renderProps?: {}, _store?: {}): any;
}
