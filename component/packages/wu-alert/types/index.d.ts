import { WuComponent } from '@wu-component/web-core-plus';
declare type TypeEnums = 'success' | 'warning' | 'info' | 'error';
export declare class WuAlert extends WuComponent {
    constructor();
    visible: boolean;
    tip: string;
    description: string;
    type: TypeEnums;
    closable: boolean;
    closeText: string;
    showIcon: boolean;
    center: boolean;
    effect: string;
    confirm(): this;
    cancel(): this;
    close(): this;
    get typeClass(): string;
    get iconClass(): any;
    get isBoldTitle(): "" | "is-bold";
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
