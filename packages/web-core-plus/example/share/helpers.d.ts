export declare const isDef: (v: any) => boolean;
export declare const toLowerCase: (str: string) => string;
export declare const toDashCase: (str: string) => string;
export declare const dashToPascalCase: (str: string) => string;
export declare const toTitleCase: (str: string) => string;
export declare const noop: () => any;
export declare const isComplexType: (o: any) => boolean;
export declare const sortBy: <T>(array: T[], prop: (item: T) => string | number) => T[];
export declare const flatOne: <T>(array: T[][]) => T[];
export declare const unique: <T>(array: T[], predicate?: (item: T) => any) => T[];
export declare const fromEntries: <V>(entries: IterableIterator<[string, V]>) => {
    [key: string]: V;
};
export declare const pluck: (obj: {
    [key: string]: any;
}, keys: string[]) => {
    [key: string]: any;
};
export declare const isBoolean: (v: any) => v is boolean;
export declare const isDefined: (v: any) => boolean;
export declare const isUndefined: (v: any) => boolean;
export declare const isFunction: (v: any) => v is Function;
export declare const isNumber: (v: any) => v is boolean;
export declare const isObject: (val: Object) => boolean;
export declare const isString: (v: any) => v is string;
export declare const isIterable: (v: any) => v is Iterable<any>;
export declare const isPromise: <T = any>(v: any) => v is Promise<T>;
export declare const toDotCase: (str: string) => string;
