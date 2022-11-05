import { Component, Emit, h, OnBeforeRender, OnConnected, Prop, WuComponent } from '@wu-component/web-core-plus';
import '@wu-component/wu-checkbox';
import '@wu-component/wu-input';
import css from './index.scss';
import { classNames, extractClass } from '@wu-component/common';

@Component({
    name: 'wu-plus-table',
    css: css,
})
export class WuTable extends WuComponent implements OnConnected, OnBeforeRender {
    constructor() {
        super();
    }

    public editingInput!: any;

    public override beforeRender() {}

    public override connected(shadowRoot: ShadowRoot) {
        this.setFixedLeft();
        this.setFixedRight();
    }

    /**
     * 设置左侧固定
     * @private
     */
    private setFixedLeft() {
        if (this.rootNode) {
            const fixedLeftEls = this.rootNode.querySelectorAll('.fixed-left');
            const boxRect = this.rootNode.getBoundingClientRect();
            fixedLeftEls.forEach((fixedLeftEl: HTMLElement, index: number) => {
                const rect = fixedLeftEl.getBoundingClientRect();
                fixedLeftEl.style.left = rect.left - boxRect.left - 1 + 'px';
            });
        }
    }

    /**
     * 设置右侧固定
     * @private
     */
    private setFixedRight() {
        if (this.rootNode) {
            const fixedRightEls = this.shadowRoot.querySelectorAll('.fixed-right');
            fixedRightEls.forEach((fixedRightEl: HTMLElement, index: number) => {
                fixedRightEl.style.right = '0px';
            });
        }
    }

    @Prop({ default: [], type: Array })
    public data: any[];

    @Prop({ default: [], type: Array })
    public columns: any[];

    @Prop({ default: false, type: Boolean })
    public border: boolean;

    @Prop({ default: false, type: Boolean })
    public stripe: boolean;

    @Prop({ default: false, type: Boolean })
    public compact: boolean;

    @Prop({ default: 'auto', type: String })
    public width: string;

    @Prop({ default: 'auto', type: String })
    public height: string;

    @Prop({ default: false, type: Boolean })
    public fixedTop: boolean;

    @Prop({ default: false, type: Boolean })
    public fixedRight: boolean;

    @Prop({ default: 0, type: Number })
    public fixedLeftCount: number;

    get checkbox() {
        return Boolean(this.columns.find(item => item.type === 'selection'));
    }

    get currentCheckList() {
        return this.data.filter(item => item.checked) || [];
    }

    /**
     * 获取选中状态
     */
    public getCheckedState = () => {
        const checkedNum: number = this.currentCheckList.length;
        return {
            checked: checkedNum === this.data.length && this.data.length > 0, // 全部勾选时显示全选
            indeterminate: checkedNum > 0 && checkedNum !== this.data.length, // 数据有勾选但未全部勾选
        };
    };

    /**
     * 复选选中
     * @param event
     * @param columns
     * @param options
     */
    public changeHandlerTh(event: any, columns: any, options: { isAllSelect: boolean }) {
        // 勾选全选时强制勾选全部数据
        if (columns.type === 'selection' && options.isAllSelect) {
            const data = this.data;
            data.forEach(item => {
                item.checked = event.detail.value;
            });
            this.data = data;
            this.update();
            this.selectionAllChange({ selection: this.data });
            this.selectionChange({ selection: this.data, currentRow: null });
        }
    }

    /**
     *
     * 单元格点击
     * @param event
     * @param item
     * @param options
     */
    public changeHandlerTd(event: any, item: any, options: { isAllSelect: boolean }) {
        if (!options.isAllSelect) {
            item.checked = event.detail.value;
            this.update();
            // 触发勾选事件
            this.selectionChange({ list: this.currentCheckList, currentRow: item });
        }
    }

    /**
     * 单元格点击
     */
    public onTdClick(item: any, column: any, index: number, event: MouseEvent) {
        event = Array.isArray(event) && event.length ? event[0] : event;
        event.stopPropagation();
        this.cellClick(item, column, index);
    }

    /**
     * 输入框数据修改
     * @param evt
     * @param item
     * @param column
     */
    public onChange = (evt, item, column) => {
        const oldValue = item[column.key];
        item[column.key] = evt.detail;
        console.log(oldValue);
    };

    @Emit('selection-change')
    public selectionChange(value: any) {
        return value;
    }

    /**
     * 当用户手动勾选全选 Checkbox 时触发的事件
     * @param selection
     */
    @Emit('selection-all')
    public selectionAllChange(selection: any) {
        return selection;
    }

    /**
     * 单元格点击事件
     * @param row
     * @param column
     * @param index
     */
    @Emit('cell-click')
    public cellClick(row: any, column, index: number) {
        return {
            row,
            column,
            index,
        };
    }

    public override render(_renderProps = {}, _store = {}) {
        if (!this.columns.length) return;
        if (this.fixedRight) {
            this.columns[this.columns.length - 1].fixed = true;
        }
        const { width, height } = this;
        return (
            <div
                style={{ width: width, height: height && height }}
                {...extractClass({}, 'wu-table', {
                    'wu-table-checkbox': this.checkbox,
                    'wu-table-border': this.border,
                    'wu-table-stripe': this.stripe,
                })}
            >
                <table {...extractClass({}, 'wu-table-table', {})}>
                    <thead>
                        <tr>
                            {this.columns.map((column, index) => {
                                const obj: any = {};
                                const { width } = column;
                                if (width !== undefined) {
                                    obj.style = { width: typeof width === 'number' ? width + 'px' : width };
                                }
                                return (
                                    <th
                                        {...obj}
                                        class={classNames({
                                            [`wu-table-align-${column.align}`]: column.align,
                                            compact: this.compact,
                                            'wu-table_cell': true,
                                            'fixed-top': this.fixedTop,
                                            'fixed-left': index < this.fixedLeftCount,
                                            'fixed-right': column.fixed,
                                            'is-sortable': column.sortable,
                                            'wu-table-column-selection': column.type && column.selection === 'selection',
                                        })}
                                    >
                                        <div class="cell">{column.type && column.type === 'selection' ? <wu-plus-checkbox checked={false} {...this.getCheckedState()} onChange={_ => this.changeHandlerTh(_, column, { isAllSelect: true })} /> : <div class="cell">{column.title}</div>}</div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody class="wu-table-tbody">
                        {this.data.map((item, index) => (
                            <tr
                                key={item.id}
                                ref={e => (this['row' + item.id] = e)}
                                style={{
                                    background: item.$config && item.$config.bgColor,
                                }}
                            >
                                {this.columns.map((column, subIndex) => {
                                    const obj: any = {};
                                    const { width } = column;
                                    if (width !== undefined) {
                                        obj.style = { width: typeof width === 'number' ? width + 'px' : width };
                                    }
                                    return (
                                        <td
                                            onclick={evt => this.onTdClick(item, column, index, evt)}
                                            {...obj}
                                            class={classNames({
                                                [`wu-table-align-${column.align}`]: column.align,
                                                compact: this.compact,
                                                'wu-table_cell': true,
                                                'fixed-left': subIndex < this.fixedLeftCount,
                                                'fixed-right': column.fixed,
                                                'wu-table-column-selection': column.type && column.selection === 'selection',
                                            })}
                                        >
                                            {column.type && column.type === 'selection' ? (
                                                <div class="cell">
                                                    <wu-plus-checkbox checked={item.checked} onChange={_ => this.changeHandlerTd(_, item, { isAllSelect: false })} />
                                                </div>
                                            ) : column.editable && item.editingKey === column.key ? (
                                                <div class="cell">
                                                    <wu-plus-input ref={_ => (this.editingInput = _)} size="mini" onChange={evt => this.onChange(evt, item, column)} value={item[column.key]} />
                                                </div>
                                            ) : (
                                                <div class="cell">{column.render ? column.render(item) : item[column.key]}</div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
