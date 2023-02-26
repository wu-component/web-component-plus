import { WuComponent } from '@wu-component/web-core-plus';
type WuButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
type NativeType = 'button' | 'submit' | 'reset';
type UISize = 'medium' | 'small' | 'mini';
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
