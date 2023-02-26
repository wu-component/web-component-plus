// @ts-ignore
import css from './index.scss';
import { Component, Emit, Prop, Watch, WuComponent, h, OnConnected, Provide, State } from "../";
import "./example1.tsx";
@Component({
    name: 'test-example',
    css: css,
    is: "LightDom"
})
export class TestComponent extends WuComponent  implements OnConnected {

    @Prop({ type: String, default: '12' })
    public attr: string;

    @Prop({ type: Number, default: 2 })
    public count: string;

    @Prop({ type: String, default: 'waring' })
    public type = 'waring';

    @Prop({ type: Boolean, default: true })
    public clearable = true;

    public updateCount() {
        this.count = this.count + 1;
        console.log(this.chRef);
    }

    @Provide('parentRefData')
    public parent() {
        return this;
    }

    public updateType() {
        this.type = this.type + '1';
        console.log(this.type);
    }

    public updateAttr() {
        this.attr = this.attr + 'as-';
    }

    @Emit("test")
    public testFun() {
        return {
            value: "0"
        };
    }
    public override connected(shadowRoot: ShadowRoot) {}

    @Watch("count", { immediate: true })
    public attrWatchChange(val: string, old: string) {
        console.log(val, old);
    }

    @Watch("attr", { immediate: true })
    public countChange(val: string, old: string) {
        // console.log(val, old);
    }

    @State()
    public ssCss = `.container {
    font-size: 49px;
    color: red;
}`
    public updateCss() {
        this.ssCss = `.container {
    font-size: 49px;
    color: blue;
}`;
    }

    private chRef = null;

    public override render() {
        console.log(this.clearable, typeof this.clearable)
        return (
            <div class="container">
                <button onClick={() => {
                    // console.log("this.clearable", this.clearable);
                    this.clearable = !this.clearable;
                    console.log(this.clearable)
                }}>
                    this修改
                </button>
                <span>{this.clearable? '能清除': '不能清楚'}</span>
            </div>
        );
    }
}
