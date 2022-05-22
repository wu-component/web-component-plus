import { h, Component, Prop, OnConnected, Watch } from '@canyuegongzi/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-example',
    css: css,
})
export class WuExample extends HTMLElement implements OnConnected {
    constructor() {
        super();
    }

    connected(shadowRoot: ShadowRoot) {
        console.log('组件初始化完成');
        console.log(this.name);
        console.log(this);
        console.log(this.getValue);
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

    public render(_renderProps = {}, _store = {}) {
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
