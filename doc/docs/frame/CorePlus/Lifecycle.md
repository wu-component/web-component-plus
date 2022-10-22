## Lifecycle 生命周期

定义组件时可以自定义各个渲染节点的钩子函数。

### 接口

```ts
/**
 * 渲染前
 */
export interface OnBeforeRender<T = any> {
    beforeRender(): any;
}

/**
 * 渲染后
 */
export interface OnRendered<T = any> {
    rendered(): any;
}

/**
 * 更新前预检查
 */
export interface OnPreBeforeUpdate<T = any> {
    preBeforeUpdate(): boolean;
}

/**
 * 更新前
 */
export interface OnBeforeUpdate<T = any> {
    beforeUpdate(): any;
}

/**
 * 更新前
 */
export interface OnUpdated<T = any> {
    updated(): any;
}

/**
 * 组件挂载
 */
export interface OnConnected<T = any> {
    connected(shadowRoot: ShadowRoot): any;
}

/**
 * 组件挂载
 */
export interface OnDisConnected<T = any> {
    disConnected(shadowRoot: ShadowRoot): any;
}

/**
 * 组件挂载过程中的生命周期
 */
export interface OnInstall<T = any> {
    beforeInstall?(): any;
    install?(): any;
    afterInstall?(): any;
    connected?(shadowRoot: ShadowRoot): any;
}

/**
 * 组件挂载过程中的生命周期
 */
export interface OnUpdate<T = any> {
    preBeforeUpdate?(): boolean;
    beforeUpdate?(): any;
    updated?(): any;
}
```

### 使用案例

```ts
@Component({
    name: 'wu-plus-test',
    css: css,
})
export class WuSwitch extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    // 此处可拿到初始化完成的 shadowRoot， 此处标识 dom 结构已经初始化完成
    public override connected(shadowRoot: ShadowRoot) {
        console.log(shadowRoot);
    }

    public override render(_renderProps = {}, _store = {}) {
        const checked = this.value === this.activeValue;
        return (
            <div>
                <p>view</p>
            </div>
        );
    }
}
```
