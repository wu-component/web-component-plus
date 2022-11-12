export interface Menu {
    name: string;
    key?: string;
    callback?: () => void;
    menu?: Menu[];
}
export declare class RightMenuCore {
    menu: Menu[];
    el: HTMLElement;
    node: HTMLElement;
    clickCallback: any;
    constructor(options: {
        el: HTMLElement;
        menu: Menu[];
        clickCallback?: any;
    });
    /**
     * 初始化
     * @private
     */
    private init;
    /**
     * 创建菜单
     * @param data
     * @private
     */
    private createMenu;
    /**
     * 添加菜单
     * @param element
     * @param type
     * @param handler
     * @private
     */
    private addHandler;
    /**
     * 显示
     * @param x
     * @param y
     */
    show(x: number, y: number): void;
    /**
     * 隐藏
     */
    hide(): void;
    /**
     * 销毁
     */
    destroy(): void;
    private emitEvent;
}
