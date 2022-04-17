## 自定义 WebComponent 核心包

该工具包是 @canyuegongzi/web-core 包的升级，可以通过装饰器的方式定义组件。


[@canyuegongzi/web-core](https://www.npmjs.com/package/@canyuegongzi/web-core "@canyuegongzi/web-core")
## 示例如下：

```
import { h, Component, Emit, Prop, Watch } from "@canyuegongzi/web-core-plus";
import css from './index.css';
import {OnBeforeRender, OnBeforeUpdate, OnConnected, OnDisConnected, OnRendered, OnUpdated} from "@canyuegongzi/web-core-plus/declarations";
type WuButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
@Component({
    name: 'wu-button',
    css: css
})
export class WuButton extends HTMLElement implements OnConnected, OnDisConnected, OnBeforeRender, OnRendered, OnBeforeUpdate, OnUpdated {
    constructor() {
        super();
    }

    public updated() {
        console.log('updated')
    }

    public beforeUpdate() {
        console.log('beforeUpdate')
    }

    public rendered() {
        console.log('rendered')
    }

    public beforeRender() {
        console.log('beforeRender')
    }

    public connected(shadowRoot: ShadowRoot) {
        console.log('connected', shadowRoot)
    }

    public disConnected() {
        console.log('disConnected');
    }
    @Prop({ default: 'primary'})
    public type: WuButtonType;

    public testValue = 1;

    @Emit('valueChange')
    public testTap() {
        this.testValue = 2;
        return {
            type: this.type
        }
    }

    @Watch('type')
    public typeChange(newValue: string, oldValue: string) {
        console.log('类型修改回调函数', this.type);
        console.log(newValue);
        console.log(oldValue);
    }

    @Watch('testValue')
    public testValueChange(newValue: string, oldValue: string) {
        console.log('testValue', newValue, oldValue);
    }

    public render(_renderProps= {}, _store = {}) {
        return(
            <div class={`_wu-button _wu-button__${this.type}`} onclick={this.testTap.bind(this)} >
                <slot />
            </div>
        );
    }
}

```
