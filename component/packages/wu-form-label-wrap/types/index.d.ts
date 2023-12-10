import { h, WuComponent, OnConnected, OnUpdated, OnDisConnected } from '@wu-component/web-core-plus';
export declare class WuFormLabelWrap extends WuComponent implements OnConnected, OnUpdated, OnDisConnected {
    computedWidth: number;
    childDomList: Node[];
    slotDom: HTMLSlotElement;
    constructor();
    wuFormItem: any;
    wuForm: any;
    isAutoWidth: boolean;
    updateAll: boolean;
    connected(shadowRoot: ShadowRoot): void;
    updated(): void;
    disConnected(): void;
    getLabelWidth(): number;
    updateLabelWidth(action?: string): void;
    computedWidthChange(val: string, oldVal: string): void;
    render(_renderProps?: {}, _store?: {}): h.JSX.Element;
}
