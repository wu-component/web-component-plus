/**
 * 判断是否是期望的类型
 * @param { unknown } param 将要判断的变量
 * @param { ...string } types 期望的类型
 * @return { boolean } 返回期望是否正确
 */
export declare const isExpectType: (param: unknown, ...types: string[]) => boolean;
export declare const get: (data: object, strKeys: string) => any;
export declare const has: (data: object, key: string | number) => boolean;
export declare const hasProto: boolean;
export declare function def(obj: object, key: string | number, val: any, enumerable?: boolean): void;
export declare function parsePath(path: string): (data: object | any[]) => any;
export declare function traverse(value: any): void;
