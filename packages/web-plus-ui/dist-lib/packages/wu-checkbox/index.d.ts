import { OnConnected, OnBeforeUpdate, WuComponent } from '@canyuegongzi/web-core-plus';
import { UISize } from '@/interface';
export declare class WuCheckbox extends WuComponent implements OnConnected, OnBeforeUpdate {
    isGroup: boolean;
    props: any;
    constructor();
    groupRef: any;
    beforeUpdate(): void;
    initProps(): void;
    connected(shadowRoot: ShadowRoot): void;
    focus: boolean;
    size: UISize;
    disabled: boolean;
    value: boolean;
    label: string;
    indeterminate: boolean;
    checked: boolean;
    border: boolean;
    name: string;
    id: string;
    controls: string;
    handleChange(ev: any): void;
    private change;
    private checkChange;
    onFocus(): void;
    onBlur(): void;
    render(_renderProps?: {}, _store?: {}): any;
}
