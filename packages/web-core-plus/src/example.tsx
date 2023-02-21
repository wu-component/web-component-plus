// @ts-ignore
import css from './index.scss';
import { Component, Emit, Prop, Watch, WuComponent, h, OnConnected, Provide, State } from "./";
import "./example1.tsx";
@Component({
    name: 'test-example',
    css: css,
})
export class TestComponent extends WuComponent  implements OnConnected {

    @Prop({ type: String, default: '12' })
    public attr: string;

    @Prop({ type: Number, default: 2 })
    public count: string;

    @Prop({ type: String, default: 'waring' })
    public type = 'waring';

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
        return (
            <div class="container">
                <p>{this.attr}</p>
                <p>
                    <button onClick={() => this.updateCount()}>更新</button>
                    <button onClick={() => this.updateType()}>type</button>
                    <span>{this.count}</span>
                    <span>{this.type}</span>
                </p>
                <p>
                    <button onClick={() => this.updateAttr()}>更新Attr</button>
                    <span>{this.attr}</span>
                </p>
                <p>
                    <button onClick={() => this.testFun()}>测试事件</button>
                </p>

                <p>
                    <button onClick={() => this.updateCss()}>更新css</button>
                </p>
                {{/*@ts-ignore*/}}
                <test-example1 css={this.ssCss} ref={(ref) => this.chRef = ref} attr={this.attr} onchild-update={(res) => {
                    console.log('jj', res);
                    {{/*@ts-ignore*/}}
                }}></test-example1>
            </div>
        );
    }
}
