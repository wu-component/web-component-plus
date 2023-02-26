import { WuComponent } from '@wu-component/web-core-plus';
export type TypeEnums = 'success' | 'warning' | 'info' | 'error';
export type PositionEnums = 'top';
export declare class WuMessage extends WuComponent {
    constructor();
    timer: any;
    position: string;
    message: string;
    type: TypeEnums;
    duration: number;
    elId: number;
    center: boolean;
    showClose: boolean;
    customClass: string;
    verticalOffset: number;
    get positionStyle(): {
        top: string;
    };
    /**
     * 关闭
     */
    handleClose(): boolean;
    /**
     * 清除定时器
     */
    clearTimer(): void;
    /**
     * 开始定时器
     */
    startTimer(): void;
    render(_renderProps?: {}, _store?: {}): any;
}
export * from './MessagePopupManager';
