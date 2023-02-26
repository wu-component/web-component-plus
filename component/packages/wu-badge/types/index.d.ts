import { OnConnected, OnBeforeUpdate, WuComponent } from '@wu-component/web-core-plus';
type TypeEnums = 'primary' | 'success' | 'warning' | 'info' | 'danger';
export declare class WuBadge extends WuComponent implements OnConnected, OnBeforeUpdate {
    constructor();
    beforeUpdate(): void;
    connected(shadowRoot: ShadowRoot): void;
    private initIsFixed;
    value: string;
    max: number;
    dot: boolean;
    hide: boolean;
    type: TypeEnums;
    isFixed: boolean;
    get content(): any;
    handleError(event: Event): Event;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
