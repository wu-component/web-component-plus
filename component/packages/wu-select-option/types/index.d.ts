import { WuComponent, OnConnected } from '@wu-component/web-core-plus';
type UISize = 'medium' | 'small' | 'mini';
export declare class WuSelectOptions extends WuComponent implements OnConnected {
    constructor();
    selectRef: any;
    label: string;
    disabled: string;
    visible: boolean;
    value: string;
    size: UISize;
    selected: boolean;
    show: boolean;
    handleClose(event: Event): {
        event: Event;
        label: string;
        value: string;
    };
    handleClick(event: any): {
        event: any;
        label: string;
        value: string;
    };
    /**
     * 设置勾选
     * @param val
     */
    setSelect(val: boolean): void;
    /**
     * 更新是否显示
     * @param val
     */
    setVisible(val: boolean): void;
    get hover(): boolean;
    selectOptionClick(): this;
    connected(shadowRoot: ShadowRoot): void;
    clickItem(event: MouseEvent): void;
    hoverItem(): void;
    /**
     * 更新是否选择
     */
    updateSelect(): void;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
