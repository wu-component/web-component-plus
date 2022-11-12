// @ts-ignore
import css from './index.scss';
import { Component, Emit, Prop, Watch, WuComponent, h, OnConnected } from "./";
import "./example1.tsx";
@Component({
    name: 'test-example',
    css: css,
})
export class TestComponent extends WuComponent  implements OnConnected {

    @Prop({ type: String, default: '12' })
    public attr: string;

    @Prop({ type: Number, default: 0 })
    public count: string;

    public updateCount() {
        this.count = this.count + 1;
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
        console.log(val, old);
    }

    public override render() {
        return (
            <div class="container">
                <p>{this.attr}</p>
                <p>
                    <button onClick={() => this.updateCount()}>更新</button>
                    <span>{this.count}</span>
                </p>
                <p>
                    <button onClick={() => this.updateAttr()}>更新Attr</button>
                    <span>{this.attr}</span>
                </p>
                <p>
                    <button onClick={() => this.testFun()}>测试事件</button>
                </p>
                <test-example1 attr={this.attr} onchild-update={(res) => {
                    console.log(res);
                }}></test-example1>
            </div>
        );
    }
}
