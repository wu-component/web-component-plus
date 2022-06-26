import { OnConnected, WuComponent, OnDisConnected } from '@canyuegongzi/web-core-plus';
export declare class WuColorPane extends WuComponent implements OnConnected, OnDisConnected {
    private type;
    private typeindex;
    private palette;
    private colors;
    private pane;
    private rangeHue;
    private rangeOpacity;
    private copyBtn;
    private copyinfo;
    private switch;
    private colorHexa;
    private colorRgba;
    private colorHlsa;
    private $value;
    private nativeclick;
    private start;
    val: any;
    private timeout;
    constructor();
    defaultvalue: string;
    choose(ev: any): void;
    connected(shadowRoot: ShadowRoot): void;
    mousemove: (ev: any) => void;
    mouseup: () => any;
    disConnected(): void;
    get value(): any;
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
    };
    valueChange(val: string, old?: string): void;
    valueChangeEvent(): {
        value: any;
        color: {
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
    init(color: string): void;
    /**
     * 更新
     */
    updatePicker(): void;
    render(_renderProps?: {}, _store?: {}): any;
}
