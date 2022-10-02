/**
 * classNames based on https://github.com/JedWatson/classnames
 * by Jed Watson
 * Licensed under the MIT License
 * https://github.com/JedWatson/classnames/blob/master/LICENSE
 * modified by dntzhang
 */
declare function classNames(...args: any[]): string;
declare function extractClass(a: any, b: any, c: any): {
    class: any;
};
/**
 * 庫歐戰屬性
 * @param props
 * @param prop
 */
declare function extract(props: any, prop: any): {
    [x: string]: any;
};
export { classNames, extract, extractClass };
