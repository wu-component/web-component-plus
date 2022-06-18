import { WuComponent } from '@canyuegongzi/web-core-plus';
import { UISize } from '@/interface';
declare type WuButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
declare type NativeType = 'button' | 'submit' | 'reset';
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
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
