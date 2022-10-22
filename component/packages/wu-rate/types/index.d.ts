import { OnBeforeRender, OnConnected, OnInstall, WuComponent } from '@wu-component/web-core-plus';
export declare class WuRate extends WuComponent implements OnConnected, OnBeforeRender, OnInstall {
    constructor();
    beforeInstall(): any;
    beforeRender(): void;
    checkoutProps(): void;
    connected(shadowRoot: ShadowRoot): void;
    pointerAtLeftHalf: boolean;
    currentValue: number;
    hoverIndex: number;
    valueList: number[];
    allowUpdate: boolean;
    timeout: any;
    wuForm: any;
    wuFormItem: any;
    value: number;
    lowThreshold: number;
    highThreshold: number;
    max: number;
    colors: string[];
    voidColor: number;
    disabledVoidColor: number;
    disabled: boolean;
    allowHalf: boolean;
    showText: boolean;
    showScore: boolean;
    textColor: boolean;
    texts: string[];
    rateList: string[];
    get text(): string;
    get rateDisabled(): any;
    getIconStyle(index: number): {
        color: string | number;
    };
    /**
     * 获取图标渲染
     * @param index
     */
    getRateRender(index: number): string;
    /**
     * 设置值
     * @param item
     * @param event
     */
    setCurrentValue(item: number, event: MouseEvent): void;
    /**
     * 重置
     */
    resetCurrentValue(): void;
    input(value: number): {
        value: number;
    };
    change(value: number): {
        value: number;
    };
    /**
     * 选择
     * @param item
     * @param event
     */
    selectValue(item: number, event: Event): void;
    /**
     * 设置值
     * @param value
     */
    setRateValue(value: number): void;
    /**
     * 键盘操作
     * @param e
     */
    handleKey(e: MouseEvent): void;
    render(_renderProps?: {}, _store?: {}): any;
}
