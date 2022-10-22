/**
 * Convert HSV spectrum to RGB.
 * @param h Hue
 * @param s Saturation
 * @param v Value
 * @returns {number[]} Array with rgb values.
 */
export declare function hsvToRgb(h: any, s: any, v: any): number[];
/**
 * Convert HSV spectrum to Hex.
 * @param h Hue
 * @param s Saturation
 * @param v Value
 * @returns {string[]} Hex values
 */
export declare function hsvToHex(h: any, s: any, v: any): string[];
/**
 * Convert HSV spectrum to CMYK.
 * @param h Hue
 * @param s Saturation
 * @param v Value
 * @returns {number[]} CMYK values
 */
export declare function hsvToCmyk(h: any, s: any, v: any): number[];
/**
 * Convert HSV spectrum to HSL.
 * @param h Hue
 * @param s Saturation
 * @param v Value
 * @returns {number[]} HSL values
 */
export declare function hsvToHsl(h: any, s: any, v: any): any[];
/**
 * Convert RGB to HSV.
 * @param r Red
 * @param g Green
 * @param b Blue
 * @return {number[]} HSV values.
 */
export declare function rgbToHsv(r: any, g: any, b: any): number[];
/**
 * Convert CMYK to HSV.
 * @param c Cyan
 * @param m Magenta
 * @param y Yellow
 * @param k Key (Black)
 * @return {number[]} HSV values.
 */
export declare function cmykToHsv(c: any, m: any, y: any, k: any): number[];
/**
 * Convert HSL to HSV.
 * @param h Hue
 * @param s Saturation
 * @param l Lightness
 * @return {number[]} HSV values.
 */
export declare function hslToHsv(h: any, s: any, l: any): any[];
/**
 * Convert HEX to HSV.
 * @param hex Hexadecimal string of rgb colors, can have length 3 or 6.
 * @return {number[]} HSV values.
 */
export declare function hexToHsv(hex: any): number[];
/**
 * Try's to parse a string which represents a color to a HSV array.
 * Current supported types are cmyk, rgba, hsla and hexadecimal.
 * @param str
 * @return {*}
 */
export declare function parseToHSVA(str: any): {
    values: number[];
    type: "cmyk";
    a?: undefined;
} | {
    values: any[];
    a: any;
    type: "rgba";
} | {
    values: any[];
    a: any;
    type: "hexa";
} | {
    values: any[];
    a: any;
    type: "hsla";
} | {
    values: any[];
    a: any;
    type: "hsva";
};
