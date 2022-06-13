import { WuComponent } from '@canyuegongzi/web-core-plus';
export declare type TypeEnums = 'success' | 'warning' | 'info' | 'error';
export declare type PositionEnums = 'top';
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
