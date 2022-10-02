import { h, Component,  WuComponent } from '../index';
import {  Prop } from '../reactivity/PropsReactive';
import { extractClass } from "./class-name";
// @ts-ignore
import css from './index.scss';
import { Watch } from "../reactivity/WatchReactive";
import { State } from "../reactivity/StatesReactive";
type WuButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
type NativeType = 'button' | 'submit' | 'reset';
type UISize = 'medium' | 'small' | 'mini';
// import "../core/observer/example";

@Component({
    name: 'test-com-new1',
    css: css,
})
export class WuButton extends WuComponent {
    constructor() {
        super();
    }

    @Prop({ default: 'primary', type: String })
    public type: WuButtonType;

    @Prop({ default: 'mini', type: String })
    public size: UISize;

    @Prop({ default: false, type: Boolean })
    public plain: boolean;

    @Prop({ default: false, type: Boolean })
    public round: boolean;

    @Prop({ default: false, type: Boolean })
    public circle: boolean;

    @Prop({ default: false, type: Boolean })
    public loading: boolean;

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    @Prop({ default: '', type: String })
    public icon: string;

    @Prop({ default: 'button', type: String })
    public nativeType: NativeType;

    @Prop({ default: '', type: String })
    public text: string;

    @State({ default: '', type: String })
    public text1: string;

    @Watch("type")
    public typeChange(val, old) {
        console.log(val, old);
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <button
                onclick={() => {
                    const types: WuButtonType[] = [ "success", "primary", "warning", "danger" ];
                    const index= Math.floor(Math.random()*4);
                    this.type = types[index];
                }}
                disabled={this.disabled}
                {...extractClass({}, 'wu-button', {
                    ['wu-button-' + this.type]: this.type,
                    ['wu-button-' + this.size]: this.size,
                    'is-plain': this.plain,
                    'is-round': this.round,
                    'is-circle': this.circle,
                    'is-disabled': this.disabled,
                })}
                type={this.nativeType}
            >
                {this.loading && [
                    <svg class="loading" viewBox="0 0 1024 1024" focusable="false" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                        <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" />
                    </svg>,
                    ' ',
                ]}
                {this.text}
                <slot />
            </button>
        );
    }
}
