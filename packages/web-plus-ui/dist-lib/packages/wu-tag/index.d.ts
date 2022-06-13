import { WuComponent } from '@canyuegongzi/web-core-plus';
import { UISize } from '@/interface';
declare type EffectEnums = 'dark' | 'light' | 'plain';
declare type TypeEnums = 'success' | 'info' | 'warning' | 'danger';
export declare class WuTag extends WuComponent {
    constructor();
    text: string;
    value: string;
    color: string;
    closable: boolean;
    type: TypeEnums;
    hit: boolean;
    disableTransitions: boolean;
    size: UISize;
    effect: EffectEnums;
    handleClose(event: Event): {
        event: Event;
    };
    handleClick(event: any): {
        event: any;
        value: string;
        text: string;
    };
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
