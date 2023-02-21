import { WuComponent } from '@wu-component/web-core-plus';
import "@wu-component/wu-transition";
export declare class WuDialog extends WuComponent {
    constructor();
    visible: boolean;
    show: boolean;
    closeOnClickModal: boolean;
    showClose: boolean;
    lockScroll: boolean;
    zIndex: number;
    caption: string;
    width: string;
    transitionRef: any;
    visibleChange(val: boolean, old: boolean): void;
    /**
     * 弹框打开
     */
    open(): void;
    /**
     * 遮罩点击
     */
    handleMaskClick(): void;
    /**
     * 遮罩点击
     */
    handleMaskClickContent(e: any): void;
    /**
     * 主体点击
     */
    contentTap(e: MouseEvent): void;
    /**
     * 弹框关闭
     */
    close(): void;
    /**
     * 动画结束
     */
    onAfterLeave(): void;
    /**
     * 禁止滚动
     */
    disableScroll(): void;
    /**
     * 开启滚动
     */
    enableScroll(): void;
    render(_renderProps?: {}, _store?: {}): any;
}
