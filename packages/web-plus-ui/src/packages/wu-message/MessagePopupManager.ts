import './index';
import { WuMessage, TypeEnums, PositionEnums } from './index';
interface Options {
    center?: boolean;
    type?: TypeEnums;
    message?: string;
    showClose?: boolean;
    duration?: number;
    position?: PositionEnums;
    elementId?: number;
}
/**
 * 消息提示管理器
 * // example https://blog.csdn.net/asd0356/article/details/117672669
 */
export class PopupManager {
    public messageQueue = [];
    public position: PositionEnums = 'top';
    public type: TypeEnums = 'info';
    public duration = 3000;
    public body!: HTMLElement;
    public id: number;
    constructor() {
        // 消息队列
        this.messageQueue = [];
        // 设置默认值
        this.position = 'top';
        this.type = 'info';
        this.duration = 3000;
        this.body = document.getElementsByTagName('body')[0];
        this.id = 0;
    }

    /**
     * 设置消息类型
     * @param messageDom
     * @param type
     */
    public setType(messageDom: WuMessage, type: TypeEnums) {
        messageDom.type = type;
    }

    /**
     * 移除dom
     * @param messageDom
     * @param targetId
     */
    public removeMessageDom(messageDom, targetId) {
        const startIndex: number = this.messageQueue.findIndex(message => message.id === targetId);
        this.messageQueue.splice(startIndex, 1);
        this.updateMessageDom(startIndex);
        //增加移除动画
        messageDom.classList.add('ui-message-leave');
        setTimeout(() => {
            this.body.removeChild(messageDom);
        }, 400);
    }

    /**
     * 设置当前的dom
     */
    public setCurrentMessageDom() {
        const index: number = this.messageQueue.length - 1;
        const targetDom: WuMessage = this.messageQueue[index].messageDom;
        targetDom.verticalOffset = 64 * index + 20;
    }

    /**
     * 更新dom
     * @param startIndex
     */
    public updateMessageDom(startIndex) {
        for (let i = startIndex; i < this.messageQueue.length; i++) {
            const messageDom: WuMessage = this.messageQueue[i].messageDom;
            messageDom.verticalOffset = 64 * i + 20;
        }
    }

    /**
     * 消息提示
     * @param options
     */
    public setOption(options: Options) {
        if (typeof options !== 'object') {
            options = {};
        }
        if (!options.hasOwnProperty('position')) {
            options.position = this.position;
        }
        if (!options.hasOwnProperty('type')) {
            options.type = this.type;
        }
        if (!options.hasOwnProperty('duration')) {
            options.duration = this.duration;
        }
        if (!options.hasOwnProperty('showClose')) {
            options.showClose = false;
        }
        options.elementId = this.id;
        const messageDom: WuMessage = document.createElement('wu-plus-message') as WuMessage;
        for (const key in options) {
            messageDom.setAttribute(key, options[key]);
        }
        const targetId = this.id;
        this.messageQueue.push({
            id: targetId,
            messageDom,
        });
        this.setCurrentMessageDom();
        this.body.appendChild(messageDom);
        const duration = isNaN(Number(options.duration)) ? this.duration : Number(options.duration);
        let timeId;
        if (duration > 0) {
            timeId = setTimeout(() => {
                this.removeMessageDom(messageDom, targetId);
            }, duration);
        }
        if (options.showClose === true) {
            messageDom.addEventListener('close', () => {
                this.removeMessageDom(messageDom, targetId);
                if (targetId !== -1) {
                    timeId && clearTimeout(timeId);
                }
            });
        }
        this.id++;
    }
}
export const Message = new PopupManager();
