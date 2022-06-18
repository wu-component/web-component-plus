import { WuComponent } from '@canyuegongzi/web-core-plus';
declare type TypeEnums = 'line' | 'circle' | 'dashboard';
declare type StatusEnums = 'success' | 'exception' | 'warning';
declare type StrokeLinecapEnums = 'butt' | 'round' | 'square';
export declare class WuProgress extends WuComponent {
    constructor();
    props: any;
    type: TypeEnums;
    percentage: number;
    status: StatusEnums;
    strokeWidth: number;
    strokeLinecap: StrokeLinecapEnums;
    textInside: boolean;
    width: number;
    showText: boolean;
    color: string;
    handleClose(event: Event): {
        event: Event;
    };
    handleClick(event: any): {
        event: any;
    };
    /**
     * 获取颜色
     * @param percentage
     */
    private getCurrentColor;
    /**
     * 内容
     */
    get content(): string;
    /**
     * 进度条大小
     */
    get progressTextSize(): number;
    /**
     * 图标类名
     */
    get iconClass(): "el-icon-warning" | "el-icon-circle-check" | "el-icon-circle-close" | "el-icon-check" | "el-icon-close";
    /**
     * 颜色
     */
    get stroke(): any;
    get barStyle(): Record<any, any>;
    get relativeStrokeWidth(): string;
    get radius(): number;
    get trackPath(): string;
    get perimeter(): number;
    get rate(): 1 | 0.75;
    get strokeDashoffset(): string;
    get trailPathStyle(): {
        strokeDasharray: string;
        strokeDashoffset: string;
    };
    get circlePathStyle(): {
        strokeDasharray: string;
        strokeDashoffset: string;
        transition: string;
    };
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
