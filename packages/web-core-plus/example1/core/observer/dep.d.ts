import Watcher from './watcher';
export default class Dep {
    static target: Watcher | null;
    private subs;
    /**
     * 订阅中心构造器
     */
    constructor();
    /**
     * 收集依赖
     * @param {*} sub
     */
    addSub(sub: Watcher): void;
    /**
     * 派发更新
     */
    notify(): void;
    depend(): void;
}
