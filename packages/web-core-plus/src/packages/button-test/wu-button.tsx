import { h } from "../../runtime";
// @ts-ignore
import css from './index.css';
import {
    Component,
    Prop,
    Emit,
    Watch,
    OnConnected,
    OnDisConnected,
    OnBeforeRender,
    OnRendered,
    OnBeforeUpdate,
    OnUpdated,
    State
} from "../../decorators";
type WuButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
@Component({
    name: 'wu-button-test',
    css: css
})
export class WuButtonTest extends HTMLElement implements OnConnected, OnDisConnected, OnBeforeRender, OnRendered, OnBeforeUpdate, OnUpdated {
    constructor() {
        super();
    }

    public updated() {}

    public beforeUpdate() {}

    public rendered() {}

    public beforeRender() {}

    public connected(shadowRoot: ShadowRoot) {}

    public disConnected() {}
    @Prop({ default: 'primary' })
    public type: WuButtonType;

    @State({ default: { a: 1, b: { c: 23, d: { w: 2 } } } })
    public stateList

    @State({ default: 12 })
    public state

    public testValue = 1;

    @Prop({ default: { color: 'red', fontSize: '12px' } })
    public testObjData = {
        color: 'red',
        fontSize: '12px'
    }

    @Emit('valueChange')
    public testTap() {
        this.testValue ++;
        return {
            type: this.type
        };
    }

    @Watch('type')
    public typeChange(newValue: string, oldValue: string) {
        console.log('类型修改回调函数', this.type);
    }

    @Watch('testValue')
    public testValueChange(newValue: string, oldValue: string) {
        console.log('testValue', newValue, oldValue);
    }

    @Watch('testObjData')
    public testObjDataChange(newValue: string, oldValue: string) {
        console.log('testObjData', newValue, oldValue);
    }

    /**
     * 点击测试
     */
    public testWatch() {
        console.log('开始测试watch');
        if (this.testObjData.color === 'red') {
            console.log('111111');
            this.testObjData = {
                color: 'blue',
                fontSize: '12px'
            };
        } else {
            this.testObjData = {
                color: 'red',
                fontSize: '12px'
            };
        }
        console.log(this.testObjData);
    }

    public render(_renderProps= {}, _store = {}) {
        return(
            <div>
                <div class={`_wu-button _wu-button__${this.type}`} onclick={this.testTap.bind(this)} >
                    <slot />
                </div>
                <button style={this.testObjData}  onclick={this.testWatch.bind(this)}>点击测试</button>
            </div>

        );
    }
}
