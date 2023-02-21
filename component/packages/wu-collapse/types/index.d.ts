import { WuComponent, OnConnected } from '@wu-component/web-core-plus';
import "@wu-component/wu-collapse-item";
import "./ss/index.tsx";
export declare class WuCollapse extends WuComponent implements OnConnected {
    constructor();
    accordion: boolean;
    value: string[];
    activeNames: string[];
    valueChange(value: string[], old: string[]): void;
    inputChange(val: any): {
        value: any;
    };
    change(val: any): {
        value: any;
    };
    wuCollapseRef(): this;
    /**
     * 设置激活的item
     * @param activeNames
     */
    setActiveNames(activeNames: string[]): void;
    connected(shadowRoot: ShadowRoot): void;
    handleItemClick(item: any): void;
    render(_renderProps?: {}, _store?: {}): any;
}
