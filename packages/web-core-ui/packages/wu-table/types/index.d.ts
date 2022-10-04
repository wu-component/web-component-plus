import { OnBeforeRender, OnConnected, WuComponent } from '@wu-component/web-core-plus';
export declare class WuTable extends WuComponent implements OnConnected, OnBeforeRender {
    constructor();
    editingInput: any;
    beforeRender(): void;
    connected(shadowRoot: ShadowRoot): void;
    /**
     * 设置左侧固定
     * @private
     */
    private setFixedLeft;
    /**
     * 设置右侧固定
     * @private
     */
    private setFixedRight;
    data: any[];
    columns: any[];
    border: boolean;
    stripe: boolean;
    compact: boolean;
    width: string;
    height: string;
    fixedTop: boolean;
    fixedRight: boolean;
    fixedLeftCount: number;
    get checkbox(): boolean;
    get currentCheckList(): any[];
    /**
     * 获取选中状态
     */
    getCheckedState: () => {
        checked: boolean;
        indeterminate: boolean;
    };
    /**
     * 复选选中
     * @param event
     * @param columns
     * @param options
     */
    changeHandlerTh(event: any, columns: any, options: {
        isAllSelect: boolean;
    }): void;
    /**
     *
     * 单元格点击
     * @param event
     * @param item
     * @param options
     */
    changeHandlerTd(event: any, item: any, options: {
        isAllSelect: boolean;
    }): void;
    /**
     * 单元格点击
     */
    onTdClick(item: any, column: any, index: number, event: MouseEvent): void;
    /**
     * 输入框数据修改
     * @param evt
     * @param item
     * @param column
     */
    onChange: (evt: any, item: any, column: any) => void;
    selectionChange(value: any): any;
    /**
     * 当用户手动勾选全选 Checkbox 时触发的事件
     * @param selection
     */
    selectionAllChange(selection: any): any;
    /**
     * 单元格点击事件
     * @param row
     * @param column
     * @param index
     */
    cellClick(row: any, column: any, index: number): {
        row: any;
        column: any;
        index: number;
    };
    render(_renderProps?: {}, _store?: {}): any;
}
