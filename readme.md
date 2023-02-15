## web-component-ui

[中文官网](https://wu.canyuegongzi.xyz/)
[英文官网](https://wu-component.github.io/)

web-plus-ui 是一套基于 webComponent 的 UI 组件库，目前尚在开发阶段，其中样式基于 elementUI。
web-core-plus 是核心代码包，其中利用虚拟dom 实现了 WebComponent 的渲染;

### 如何开发 WebComponent 组件

#### 自定义标签

```tsx
import { h, Component, Prop } from "@canyuegongzi/web-core-plus";
import css from './index.scss';
import { UISize } from "@/interface";
import { extractClass } from "@/common";
type WuButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
type NativeType = 'button' | 'submit' | 'reset'

@Component({
    name: 'wu-plus-button',
    css: css
})
export class WuButton extends HTMLElement {
    constructor() {
        super();
    }

    @Prop({ default: 'primary', type: String })
    public type: WuButtonType;

    @Prop({ default: 'mini', type: String })
    public size: UISize;

    @Prop({ default: false, type: Boolean })
    public plain: boolean;

    @Prop({ default: false, type: Boolean })
    public round: boolean;

    @Prop({ default: false, type: Boolean })
    public circle: boolean;

    @Prop({ default: false, type: Boolean })
    public loading: boolean;

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    @Prop({ default: '', type: String })
    public icon: string;

    @Prop({ default: 'button', type: String })
    public nativeType: NativeType;

    @Prop({ default: '', type: String })
    public text: string;


    public render(_renderProps= {}, _store = {}) {
        return(
            <button
                disabled={this.disabled}
                {...extractClass({}, 'wu-button', {
                    ['wu-button-' + this.type]: this.type,
                    ['wu-button-' + this.size]: this.size,
                    'is-plain': this.plain,
                    'is-round': this.round,
                    'is-circle': this.circle,
                    'is-disabled': this.disabled
                })}
                type={this.nativeType}
            >
                {this.loading && [
                    <svg
                        class="loading"
                        viewBox="0 0 1024 1024"
                        focusable="false"
                        data-icon="loading"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"/>
                    </svg>,
                    ' ',
                ]}
                {this.text}
                <slot/>
            </button>
        );
    }
}
```




#### 使用标签

```html
<div>
    <wu-plus-button id="testDom2" type="primary">按钮</wu-plus-button>
    <wu-plus-button id="testDom3" type="success">按钮</wu-plus-button>
    <wu-plus-button id="testDom4" type="info">按钮</wu-plus-button>
</div>

```

### 参与开发

#### 依赖安装

```bin
// 核心包、路由插件依赖安装
pnpm install
// 组件库以来安装
cd ./packages/web-core-ui
pnpm install
```

#### 构建
```
// 核心包构建
cd web-core-plus
pnpm run build:rollup

// 路由插件构建
cd web-core-router
pnpm run build:rollup

// 组件库构建
cd web-core-ui
pnpm run build:ui
```
