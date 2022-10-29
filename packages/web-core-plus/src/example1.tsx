// @ts-ignore
import css from './index.scss';
import { Component, Emit, Prop, Watch, WuComponent, h, OnConnected } from "./";
@Component({
    name: 'test-example1',
    css: css,
})
export class TestComponent1 extends WuComponent  implements OnConnected {

    @Prop({ type: String, default: '' })
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
    public override connected(shadowRoot: ShadowRoot) {
        console.log([this])
    }

    @Watch("attr")
    public attrWatchChange(val: string, old: string) {
        console.log(val, old);
    }

    public override render() {
        return (
            <div class="container">
                <p>fdsgbdfsghd</p>
                <p>fdsgbdfsghd</p>
                <p>{this.attr}</p>
            </div>
        );
    }
}
