import { converterFunction } from '@/type';
export declare function newEval(fn: string): any;
export declare const isEmpty: (val: unknown) => boolean;
export declare const defaultConverter: converterFunction;
export declare function deepCopy(data: any): any;
/**
 * 将骆驼命名规则的字符串转换成使用短横线命名法的字符串, 并且全小写 .例如:'getElementById'=>'get-element-by-id'
 * @param str
 */
export declare function getKebabCase(str: string): string;
/**
 * 将短横线命名法的字符串转换成使用骆驼命名规则的字符串, 并且全小写 .例如:'get-element-by-id'=>'getElementById'
 * @param str
 */
export declare function getCamelCase(str: string): string;
