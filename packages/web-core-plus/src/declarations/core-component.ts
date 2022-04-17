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
    beforeInstall?(): any
    install?(): any
    afterInstall?(): any
    connected?(shadowRoot: ShadowRoot): any;
}

/**
 * 组件挂载过程中的生命周期
 */
export interface OnUpdate<T = any> {
    preBeforeUpdate?(): boolean
    beforeUpdate?(): any
    updated?(): any
}


