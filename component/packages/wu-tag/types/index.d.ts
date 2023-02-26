import { WuComponent } from '@wu-component/web-core-plus';
type UISize = 'medium' | 'small' | 'mini';
type EffectEnums = 'dark' | 'light' | 'plain';
type TypeEnums = 'success' | 'info' | 'warning' | 'danger';
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
        value: string;
        text: string;
    };
    handleClick(event: any): {
        event: any;
        value: string;
        text: string;
    };
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
