import { h } from "../../runtime";
// @ts-ignore
import css from './index.css';
import {Component, Prop, Emit, Watch, OnConnected, OnDisConnected, OnBeforeRender, OnRendered, OnBeforeUpdate, OnUpdated } from "../../decorators";
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
        console.log('updated');
    }

    public beforeUpdate() {
        console.log('beforeUpdate');
    }

    public rendered() {
        console.log('rendered');
    }

    public beforeRender() {
        console.log('beforeRender');
    }

    public connected(shadowRoot: ShadowRoot) {
        console.log('connected', shadowRoot);
    }

    public disConnected() {
        console.log('disConnected');
    }
    @Prop({ default: 'primary' })
    public type: WuButtonType;

    public testValue = 1;

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
        console.log('newValue', newValue);
        console.log('oldValue', oldValue);
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
