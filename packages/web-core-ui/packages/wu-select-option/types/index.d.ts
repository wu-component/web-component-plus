import { WuComponent } from '@wu-component/web-core-plus';
declare type UISize = 'medium' | 'small' | 'mini';
export declare class WuSelectOptions extends WuComponent {
    constructor();
    selectRef: any;
    label: string;
    disabled: string;
    visible: boolean;
    value: string;
    size: UISize;
    selected: boolean;
    handleClose(event: Event): {
        event: Event;
    };
    handleClick(event: any): {
        event: any;
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
    clickItem(event: MouseEvent): void;
    hoverItem(): void;
    /**
     * 更新是否选择
     */
    updateSelect(): void;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
