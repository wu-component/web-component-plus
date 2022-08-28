import { OnConnected, WuComponent } from '@wu-component/web-core-plus';
export declare class WuTransition extends WuComponent implements OnConnected {
    constructor();
    name: string;
    leavingTime: number;
    autoRemove: boolean;
    appear: boolean;
    disappear: boolean;
    delay: number;
    _show: boolean;
    toggle(): Promise<unknown>;
    private callback;
    private beforeEnter;
    afterEnter(): void;
    enterEvent(): void;
    leaveEvent(): void;
    beforeLeave(): void;
    afterLeave(): void;
    connected(shadowRoot: ShadowRoot): void;
    receiveProps(): void;
    /**
     * dom 加载
     * @private
     */
    enter(): Promise<unknown>;
    /**
     * dom 离开
     * @private
     */
    leave(): Promise<unknown>;
    /**
     * 绑定一次事件
     * @param name
     * @param callback
     * @private
     */
    private once;
    render(_renderProps?: {}, _store?: {}): any;
}
