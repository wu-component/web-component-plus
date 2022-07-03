import { Component, Emit, h, Prop, State, Watch, WuComponent } from '../../index';
// @ts-ignore
import css from './index.scss';

console.log("22222222");

@Component({
    name: 'wu-plus-test-new1',
    css: css,
})
export class Index2 extends WuComponent {
    constructor() {
        super();
    }

    @Prop({ default: '300px', type: String })
    public width: string;

    @Prop({ type: Number, default: 45 })
    public numProp: number;

    @State({ type: Number, default: 34 })
    public numState: number;

    public changeNumProp() {
        this.numProp = this.numProp + 1;
    }

    public changeNumState() {
        this.numState = this.numState + 1;
    }

    @Watch('numProp')
    public numPropChange(val, old) {
        console.log("numProp", val, old);
    }

    @Watch('numState')
    public numStateChange(val, old) {
        console.log("numState", val, old);
    }

    @Emit("change")
    public emitEvent() {
        return {
            prop: this.numProp,
            state: this.numState
        };
    }


    public override render(_renderProps = {}, _store = {}) {
        return (
            <div class="test-container">
                <p>prop、事件通知 </p>
                <p>
                    <button>{this.numProp}</button>
                    <button onClick={this.changeNumProp.bind(this)}>增加</button>
                </p>
                <p>state、事件通知 </p>
                <p>
                    <button>{this.numState}</button>
                    <button onClick={this.changeNumState.bind(this)}>增加</button>
                </p>
                <p>
                    <button onClick={this.emitEvent.bind(this)}>触发事件</button>
                </p>

            </div>
        );
    }
}
