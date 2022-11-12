export interface Menu {
    name: string,
    key?: string,
    callback?: () => void,
    menu?: Menu[]
}

export class RightMenuCore {
    public menu: Menu[] = [];
    public el: HTMLElement;
    public node: HTMLElement;
    public clickCallback: any;

    constructor(options: { el: HTMLElement, menu: Menu[], clickCallback? }) {
        this.menu = options.menu || [];
        this.el = options.el || null;
        this.node = this.init();
        const that = this;
        this.clickCallback = options?.clickCallback;
        this.el.oncontextmenu = function (e) {
            return false;
        };
        this.el.addEventListener('mouseup', function(event) {
            event.button == 2 && that.show(event.clientX, event.clientY);
        });
        this.addHandler(document, 'click', function() {
            that.hide();
        });

    }

    /**
     * 初始化
     * @private
     */
    private init() {
        const el = this.el?.shadowRoot || this.el;
        const node = el.appendChild(this.createMenu(this.menu));
        // 禁止右击事件
        this.el.oncontextmenu = function (e) {
            return false;
        };
        return node;
    }

    /**
     * 创建菜单
     * @param data
     * @private
     */
    private createMenu(data: Menu[]) {
        const that = this;
        const menu: HTMLUListElement = document.createElement('ul');
        menu.className = 'menu';
        for (let i = 0; i < data.length; i++) {
            const menuItem = document.createElement('li');
            menuItem.innerHTML = data[i]['name'];
            (function(i) {
                that.addHandler(menuItem, 'click', function() {
                    that.hide();
                    that.emitEvent(data[i], "menuclick");
                    // data[i].callback?.();
                    if (typeof that.clickCallback === "function") {
                        that.clickCallback.call(this, data[i]);
                    }

                });
            })(i);
            if (data[i]['menu']) {
                const arrow = document.createElement('img');
                arrow.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAwCAYAAABe6Vn9AAABJElEQVRoQ+3YXQ0CMRAE4DkHOEACSAAnIAEnOAAcIAEJOMACDiCbtAnhgeslO1NymXul7OWb6ZWfATO7hpl5YNC/N+qG3JA4AW85ceCTb+eGJkcmfoMbagh8A+AO4NmwNn0Jo6GAPABse6AYoDWAWy8UAxTbqBuKBQrUojT1ArAvz1X6M/M9kAn6RC3LMxWHBfVig+QoBUiKUoFkKCVIglKDKuoKYMU4KHqAArUDcCrH+Tnz2OsBqphLgWV65H9jUTGRjLIhOkYJkmBUIBlGAZJi2KCKOQA4ph5lP4axDgXa58xYMAxQNwxry8Vvnthiqd8AxpqprzMaar03ZZ1BlFgTh7qhxDApo9wQJdbEoW4oMUzKKDdEiTVxqBtKDJMyanYNvQHK1zAx+3qsRwAAAABJRU5ErkJggg==";
                menuItem.appendChild(arrow);
                menuItem.appendChild(this.createMenu(data[i]['menu']));
            }
            menu.appendChild(menuItem);
        }
        return menu;
    }

    /**
     * 添加菜单
     * @param element
     * @param type
     * @param handler
     * @private
     */
    private addHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, function(event) {
                handler();
                event.stopPropagation();
            }, false);
        } else if (element.attachEvent) {
            // 兼容IE8+
            element.attachEvent('on' + type, function(event) {
                handler();
                window.event.cancelBubble = true;
            });
        }
    };

    /**
     * 显示
     * @param x
     * @param y
     */
    public show(x: number, y: number) {
        let menuList: any[] = [];
        if (this.el.getElementsByClassName) {
            menuList = this.el?.getElementsByClassName("menu") as unknown as any[];
        } else {
            // 兼容IE8+
            const all = this.el.getElementsByTagName('*');
            for (let i = 0; i < all.length; i++) {
                if (all[i]['className'] == 'menu') {
                    menuList.push(all[i]);
                }
            }
        }
        for (let i = 0; i < menuList.length; i++) {
            menuList[i].removeAttribute('style');
        }
        this.node.style.display = 'inline-block';
        this.node.style.left = x + 1 + 'px';
        this.node.style.top = y + 1 + 'px';
    }

    /**
     * 隐藏
     */
    public hide() {
        this.node.style.display = "none";
    }

    /**
     * 销毁
     */
    public destroy() {
        this.node?.remove();
        this.el.oncontextmenu = function (e) {
            return true;
        };
        const that = this;
        this.el.removeEventListener('mouseup', function(event) {
            event.button == 2 && that.show(event.clientX, event.clientY);
        });
        document.removeEventListener("click", function() {
            that.hide();
        });

    }

    private emitEvent(result: Record<any, any>, eventName :string) {
        const event: CustomEvent = new CustomEvent(eventName, {
            detail: result || null,
            bubbles: true, // 设置为冒泡
            composed: true, // 设置为可穿透组件
            cancelable: false
        });
        if (this.el?.shadowRoot) {
            this.el?.shadowRoot.dispatchEvent(event);
            return;
        }
        document.dispatchEvent(event);
    }
}
