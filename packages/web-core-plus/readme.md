
## Install 安装

## 快速创建


需要提前全局安装 t-cli 脚手架，关于 wu-cli 详见 [使用指南](https://www.npmjs.com/package/@wu-component/wu-cli) 。

```bash

wu init-web-component test-web-core-component

```

### 开发构建


### 开发

该命令用于本地启动一个热更新的服务，用于本地开发。

```bash

npm run dev:package

```

### 构建

该命令用于打包 webComponent， 该命令会构建出 umd、es、cjs 三种格式的产物，umd 格式可以直接在浏览器中预览效果。

```bash

npm run build:package

```

### 预览

该命令用于预览效果，浏览器默认打开根目录 index.html 文件， index.html 按需要修改，

```bash

npm run example:package

```

## 手动依赖

开发者可以根据需要手动安装依赖，相关 [Api]( https://wu-component.github.io/frame/CorePlus/Decorators.html) 。

```bash
npm install @wu-component/web-core-plus --save
```
## 示例如下：

```
import { h, Component, Prop, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
import { extractClass } from '@wu-component/common';
type WuButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
type NativeType = 'button' | 'submit' | 'reset';
type UISize = 'medium' | 'small' | 'mini';

@Component({
    name: 'wu-plus-button',
    css: css,
})
export class WuButton extends WuComponent {
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

    public override render(_renderProps = {}, _store = {}) {
        return (
            <button
                disabled={this.disabled}
                {...extractClass({}, 'wu-button', {
                    ['wu-button-' + this.type]: this.type,
                    ['wu-button-' + this.size]: this.size,
                    'is-plain': this.plain,
                    'is-round': this.round,
                    'is-circle': this.circle,
                    'is-disabled': this.disabled,
                })}
                type={this.nativeType}
            >
                {this.loading && [
                    <svg class="loading" viewBox="0 0 1024 1024" focusable="false" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                        <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" />
                    </svg>,
                    ' ',
                ]}
                {this.text}
                <slot />
            </button>
        );
    }
}


```
