type UISize = 'medium' | 'small' | 'mini';
import { OnConnected, WuComponent } from '@wu-component/web-core-plus';
import '@wu-component/wu-popover';
import '@wu-component/wu-button';
import { WuColorPane } from "./color-pane";
import './color-pane/index.tsx';
export declare class WuColorPicker extends WuComponent implements OnConnected {
    popover: any;
    popoverRef: any;
    popcon: any;
    colorPane: WuColorPane;
    nativeclick: boolean;
    constructor();
    size: UISize;
    defaultvalue: string;
    disabled: boolean;
    val: string;
    $value: any;
    connected(shadowRoot: ShadowRoot): void;
    /**
     * 确认颜色
     */
    okCallback(): void;
    /**
     * 确认颜色
     */
    cancleCallback(): void;
    /**
     * 打开选择器
     */
    openPicker(): void;
    valueChange(value: string, old: string): void;
    changeEvent(): {
        value: any;
        color: string | {
            h: number;
            s: number;
            v: number;
            a: number;
            toHSVA(): number[];
            toHSLA(): any[];
            toRGBA(): number[];
            toCMYK(): number[];
            toHEXA(): string[];
            clone: () => any;
        };
    };
    get color(): {
        h: number;
        s: number;
        v: number;
        a: number;
        toHSVA(): number[];
        toHSLA(): any[];
        toRGBA(): number[];
        toCMYK(): number[];
        toHEXA(): string[];
        clone: () => any;
    } | "";
    get value(): any;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
