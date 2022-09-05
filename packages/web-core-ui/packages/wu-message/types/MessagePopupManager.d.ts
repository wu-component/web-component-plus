import './index.tsx';
import { WuMessage, TypeEnums, PositionEnums } from './index';
interface Options {
    center?: boolean;
    type?: TypeEnums;
    message?: string;
    showClose?: boolean;
    duration?: number;
    position?: PositionEnums;
    elId?: number;
}
/**
 * 消息提示管理器
 * // example https://blog.csdn.net/asd0356/article/details/117672669
 */
export declare class PopupManager {
    messageQueue: any[];
    position: PositionEnums;
    type: TypeEnums;
    duration: number;
    body: HTMLElement;
    id: number;
    constructor();
    /**
     * 此处保证任何时机都能拿到dom结构
     * @private
     */
    private __init__;
    /**
     * 设置消息类型
     * @param messageDom
     * @param type
     */
    setType(messageDom: WuMessage, type: TypeEnums): void;
    /**
     * 移除dom
     * @param messageDom
     * @param targetId
     */
    removeMessageDom(messageDom: any, targetId: any): void;
    /**
     * 设置当前的dom
     */
    setCurrentMessageDom(): void;
    /**
     * 更新dom
     * @param startIndex
     */
    updateMessageDom(startIndex: any): void;
    /**
     * 消息提示
     * @param options
     */
    setOption(options: Options): void;
}
export declare const Message: PopupManager;
export {};
