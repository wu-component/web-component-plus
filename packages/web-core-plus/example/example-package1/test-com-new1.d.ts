import { WuComponent, OnBeforeUpdate, OnRendered } from '../index';
declare type WuButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
declare type NativeType = 'button' | 'submit' | 'reset';
declare type UISize = 'medium' | 'small' | 'mini';
export declare class WuButton extends WuComponent implements OnBeforeUpdate, OnRendered {
    constructor();
    indexNumber: number;
    type: WuButtonType;
    size: UISize;
    plain: boolean;
    round: boolean;
    circle: boolean;
    loading: boolean;
    disabled: boolean;
    icon: string;
    nativeType: NativeType;
    text: string;
    text1: string;
    typeChange(val: any, old: any): void;
    index: number;
    tapWatcher(): void;
    beforeUpdate(): void;
    rendered(): void;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
