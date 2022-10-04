import { OnConnected, WuComponent } from '@wu-component/web-core-plus';
import '../../wu-popover/src/index';
import '../../wu-input/src/index';
declare type UISize = 'medium' | 'small' | 'mini';
interface CascaderOption {
    value: string;
    label: string;
    disabled?: boolean;
    children?: CascaderOption[];
}
export interface CascaderProps {
    /**
     * 当前值（从父到子应当是一个数组）
     */
    value: string[];
    /**
     * 选项列表
     */
    options: CascaderOption[];
    /**
     * 尺寸 Todo
     */
    size?: 'default' | 'medium' | 'small' | 'mini';
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 选项被点击后的回调函数
     */
    onOptionClick?: (item: any, index: any, evt: any) => void;
}
export declare class WuCascader extends WuComponent implements OnConnected {
    constructor();
    private popoverRef;
    private inputRef;
    value: string[];
    options: CascaderOption[];
    size: UISize;
    disabled: boolean;
    connected(shadowRoot: ShadowRoot): void;
    /**
     * 根据当前 value 获取 label 值
     * @param value
     */
    getLabelsByValue(value: string[]): string;
    itemClick(...args: any[]): {
        item: any;
        index: any;
        event: any;
        value: string[];
    };
    itemClickCallback: (item: any, index: number, evt: MouseEvent) => void;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
