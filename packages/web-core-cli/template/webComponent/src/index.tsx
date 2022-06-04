import { h, Prop, Component, WuComponent } from '@canyuegongzi/web-core-plus';
import css from "./index.scss";

@Component({
    name: 'wu-test-example',
    css: css,
})
export class TestExample extends WuComponent {
    constructor() {
        super();
    }

    @Prop({ default: 'example', type: String })
    public name: string;

    @Prop({ default: 0, type: Number })
    public count: number;

    public countChange() {
        this.count ++;
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div class="container">
                <div>
                    <h1>这是example组件</h1>
                    <h2>这是name{this.name}</h2>
                    <h2>这是count{this.count}</h2>
                    <button onClick={() => this.countChange()}>修改count</button>
                </div>
            </div>
        );
    }
}


