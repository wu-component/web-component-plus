// @ts-ignore
import css from './index.scss';
import { Component, Emit, Prop, Watch, State, WuComponent, h, OnConnected, Inject } from "./";
@Component({
    name: 'test-example1',
    css: css,
})
export class TestComponent1 extends WuComponent  implements OnConnected {

    @Prop({ type: String, default: '' })
    public attr: string;

    @Prop({ type: Number, default: 0 })
    public count: string;

    @State({ type: Number, default: 1 })
    public count1: number;

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

    @Watch("attr", { immediate: true })
    public attrWatchChange(val: string, old: string) {
        // console.log(val, old);
    }

    @Emit('child-update')
    public childUpdate(attr: string) {
        // console.log("222222222222222222222222")
        return attr;
    }
    public childUpdate1() {
        this.count1 = this.count1 + 1 ;
    }

    @Inject("parentRefData")
    public parentRefData

    public override render() {
        return (
            <div class="container">
                <h2>子组件</h2>
                <p>{this.attr}</p>
                <p>
                    <button onClick={() => this.childUpdate(this.attr)}>子组件更新</button>
                </p>
                <p>{this.count1}</p>
                <p>{this.parentRefData?.type}</p>
                <p>
                    <button onClick={() => this.childUpdate1()}>子组件更新count1</button>
                </p>
            </div>
        );
    }
}
