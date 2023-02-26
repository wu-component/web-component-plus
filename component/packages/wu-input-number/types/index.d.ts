import { OnInstall, WuComponent } from '@wu-component/web-core-plus';
type UISize = 'medium' | 'small' | 'mini';
type TypeEnums = 'textarea' | 'input';
export declare class WuInputNumber extends WuComponent implements OnInstall {
    wuForm: any;
    wuFormItem: any;
    size: UISize;
    value: string;
    disabled: boolean;
    type: TypeEnums;
    placeholder: string;
    clearable: boolean;
    suffixIcon: string;
    prefixIcon: string;
    maxLength: number;
    minLength: number;
    autoComplete: boolean;
    block: boolean;
    name: string;
    form: string;
    rows: number;
    onBlur: Function;
    onFocus: Function;
    onInput: Function;
    onChange: Function;
    onMouseEnter: Function;
    onMouseLeave: Function;
    $value: string | undefined;
    tempTagName: string;
    tempInputTagName: string;
    valueLength: number;
    /**
     * 处理数据
     */
    install(): void;
    /**
     * 渲染前
     */
    beforeInstall(): void;
    constructor();
    /**
     * 输入框失去焦点
     * @param e
     */
    handleBlur(e: any): any;
    /**
     * 输入框聚焦
     * @param e
     */
    handleFocus(e: any): any;
    /**
     * 输入框输入值修改
     * @param e
     */
    handleChange(e: any): any;
    /**
     * 输入框输入事件
     * @param e
     */
    handleInput(e: any): any;
    /**
     * 聚焦
     */
    focus(): void;
    /**
     * 失去焦点
     */
    blur(): void;
    /**
     * 清除
     */
    clearInput(): string;
    render(): any;
}
export {};
