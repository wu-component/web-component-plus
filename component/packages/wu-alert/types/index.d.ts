import { h, WuComponent, OnConnected } from '@wu-component/web-core-plus';
type TypeEnums = 'success' | 'warning' | 'info' | 'error';
declare const TAG = "wu-plus-alert";
interface WuAlertProps {
    visible?: boolean;
    tip?: string;
    description?: string;
    type?: TypeEnums;
    closable?: boolean;
    closeText?: string;
    showIcon?: boolean;
    center?: boolean;
    effect?: string;
    onConfirm: (e: any) => void;
    onCancel: (e: any) => void;
    onClose: (e: any) => void;
    [key: string]: any;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [TAG]: WuAlertProps;
        }
    }
}
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
    render(_renderProps?: {}, _store?: {}): h.JSX.Element;
}
export {};
