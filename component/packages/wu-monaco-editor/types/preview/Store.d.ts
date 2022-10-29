export declare const CODE_DEPENDENCIES = "CODE_DEPENDENCIES";
export declare const CODE_TYPES = "CODE_TYPES";
export declare class Store {
    private __dependencies;
    private __types;
    code: string[];
    constructor(options?: {
        dependencies?: Record<string, string>;
        types?: Record<string, string>;
    });
    /**
     * 初始化值
     */
    private init;
    /**
     * 沙箱环境中追加一个依赖
     * @param name
     * @param url
     */
    createDependencies(name: string, url: string): void;
    get dependencies(): Record<string, string>;
    get types(): Record<string, string>;
    /**
     * 暂存代码
     * @param code
     */
    pushStackCode(code: string): void;
}
