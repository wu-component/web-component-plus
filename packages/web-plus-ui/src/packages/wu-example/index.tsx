import { h, Component, Prop, OnConnected, Watch, WuComponent } from '@canyuegongzi/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-example',
    css: css,
})
export class WuExample extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    override connected(shadowRoot: ShadowRoot) {
        setTimeout(() => {
            this.name = 'dsffvdfgbfnfgnfvcgmn';
        }, 2000);
    }

    @Watch('name')
    nameChange(old: string, newVal: string) {
        console.log('name变化');
        console.log(old, newVal);
    }

    @Prop({ default: '', type: String })
    public name: string;

    public getValue() {
        return this.name;
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div class="test-container">
                <div>
                    <span>232423453</span>
                    <p>{this.name}</p>
                </div>
            </div>
        );
    }
}
