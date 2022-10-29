export const CODE_DEPENDENCIES = "CODE_DEPENDENCIES";
export const CODE_TYPES = "CODE_TYPES";
export class Store {
    // 依赖
    private __dependencies: Record<string, string>;
    // 类型管理
    private __types: Record<string, string>;
    // code 執行
    public code: string[] = [];

    constructor(options: { dependencies?: Record<string, string>, types?: Record<string, string>} = { dependencies: {}, types: {} }) {
        this.init(options);
    }

    /**
     * 初始化值
     */
    private init({ dependencies = {}, types = {} }) {
        let __dependencies = localStorage.getItem(CODE_DEPENDENCIES)? JSON.parse(localStorage.getItem(CODE_DEPENDENCIES)): {};
        let __types = localStorage.getItem(CODE_TYPES)? JSON.parse(localStorage.getItem(CODE_TYPES)): {};
        __dependencies = { ...__dependencies, dependencies:  dependencies|| {} };
        __types = { ...__types, types:  types|| {} };
        localStorage.setItem(CODE_DEPENDENCIES, JSON.stringify(__dependencies));
        localStorage.setItem(CODE_TYPES, JSON.stringify(__types));
        this.__dependencies = __dependencies;
        this.__types = __types;

    }

    /**
     * 沙箱环境中追加一个依赖
     * @param name
     * @param url
     */
    public createDependencies(name: string, url: string) {
        this.__dependencies = {
            ...this.__dependencies,
            name: url
        };
        localStorage.setItem(CODE_DEPENDENCIES, JSON.stringify(this.__dependencies));
    }

    get dependencies() {
        return this.__dependencies;
    }

    get types() {
        return this.__types;
    }

    /**
     * 暂存代码
     * @param code
     */
    public pushStackCode(code: string) {
        this.code.push(code);
    }
}
