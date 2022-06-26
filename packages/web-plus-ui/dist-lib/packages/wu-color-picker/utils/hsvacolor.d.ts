/**
 * Simple class which holds the properties
 * of the color represention model hsla (hue saturation lightness alpha)
 */
export declare function HSVaColor(h?: number, s?: number, v?: number, a?: number): {
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
