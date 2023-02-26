import { OnConnected, OnBeforeRender, OnUpdated, OnBeforeUpdate, WuComponent } from '@wu-component/web-core-plus';
import "@wu-component/wu-checkbox";
type UISize = 'medium' | 'small' | 'mini';
export declare class WuCheckboxGroup extends WuComponent implements OnConnected, OnUpdated, OnBeforeRender, OnBeforeUpdate {
    constructor();
    slotRef: HTMLSlotElement;
    groupRef(): this;
    size: UISize;
    disabled: boolean;
    value: string[];
    valueList: string[];
    beforeRender(): void;
    change(): {
        value: string[];
    };
    valuesChange(val: any, old: any): void;
    /**
     * 值修改
     * @param vale
     */
    handleChange(vale: CustomEvent): void;
    connected(shadowRoot: ShadowRoot): void;
    updated(): void;
    updateChild(): any;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
