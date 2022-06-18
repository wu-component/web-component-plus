import { OnConnected, OnBeforeRender, OnBeforeUpdate, WuComponent } from '@canyuegongzi/web-core-plus';
import { UISize } from '@/interface';
export declare class WuCheckboxGroup extends WuComponent implements OnConnected, OnBeforeRender, OnBeforeUpdate {
    constructor();
    slotRef: HTMLSlotElement;
    groupRef(): this;
    size: UISize;
    disabled: boolean;
    value: string[];
    beforeRender(): void;
    private change;
    /**
     * 值修改
     * @param vale
     */
    handleChange(vale: CustomEvent): void;
    connected(shadowRoot: ShadowRoot): void;
    beforeUpdate(): any;
    render(_renderProps?: {}, _store?: {}): any;
}
