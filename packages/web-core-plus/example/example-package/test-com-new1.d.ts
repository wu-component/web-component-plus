import { WuComponent } from '../index';
declare type WuButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
declare type NativeType = 'button' | 'submit' | 'reset';
declare type UISize = 'medium' | 'small' | 'mini';
export declare class WuButton extends WuComponent {
    constructor();
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
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
