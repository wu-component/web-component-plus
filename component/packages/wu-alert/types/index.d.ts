import { WuComponent, OnConnected } from '@wu-component/web-core-plus';
type TypeEnums = 'success' | 'warning' | 'info' | 'error';
export declare class WuAlert extends WuComponent implements OnConnected {
    constructor();
    visible: boolean;
    show: boolean;
    tip: string;
    description: string;
    type: TypeEnums;
    closable: boolean;
    closeText: string;
    showIcon: boolean;
    center: boolean;
    effect: string;
    connected(shadowRoot: ShadowRoot): void;
    confirm(): this;
    cancel(): this;
    close(): this;
    get typeClass(): string;
    get iconClass(): any;
    get isBoldTitle(): "" | "is-bold";
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
