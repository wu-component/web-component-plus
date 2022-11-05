type UISize = 'medium' | 'small' | 'mini';
import { h, Component, Prop, OnConnected, WuComponent, State, Watch, Emit } from '@wu-component/web-core-plus';
import css from './index.scss';
import '@wu-component/wu-popover';
import '@wu-component/wu-button';
import { WuColorPane } from "./color-pane";
import './color-pane/index.tsx';
import { HSVaColor } from "./utils/hsvacolor";
import { parseToHSVA } from "./utils/color";
import { extractClass } from "@wu-component/common";

@Component({
    name: 'wu-plus-color-picker',
    css: css,
})
export class WuColorPicker extends WuComponent implements OnConnected {
    public popover: any;
    public popoverRef: any;
    public popcon: any;
    public colorPane: WuColorPane;
    public nativeclick: boolean;
    constructor() {
        super();
    }

    @Prop({ default: 'mini', type: String })
    public size: UISize;

    @Prop({ default: '#ffffff', type: String })
    public defaultvalue: string;

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    @State({ type: String })
    public val: string;

    public $value: any;


    public override connected(shadowRoot: ShadowRoot) {
        this.popover = this.shadowRoot.getElementById('popover');
        this.popcon = this.shadowRoot.getElementById('popcon');
        this.popcon.addEventListener('close',()=>{
            this.colorPane.val = this.value;
        });
        this.val = this.defaultvalue;
    }

    /**
     * 确认颜色
     */
    public okCallback() {
        this.nativeclick = true;
        this.val = this.colorPane.value;
        this.changeEvent();
        this.popoverRef?.leave();
    }

    /**
     * 确认颜色
     */
    public cancleCallback() {
        // this.colorPane.defaultvalue = this.val;
        this.colorPane.init(this.val);
        this.popoverRef?.leave();
    }

    /**
     * 打开选择器
     */
    public openPicker() {
        if (this.disabled) {
            return;
        }
        // this.colorPane = new WuColorPane();
        this.colorPane.init(this.defaultvalue);
        // this.colorPane.defaultvalue = this.defaultvalue;
        // this.popcon.prepend(this.colorPane);
    }

    @Watch('val')
    public valueChange(value: string, old: string) {
        this.$value = value;
        if(this.nativeclick){
            this.nativeclick = false;
            // this.changeEvent();
        }else{
            if(this.colorPane){
                // this.colorPane.val = this.value;
            }else{
                // this.defaultvalue = this.value;
            }
        }
    }

    @Emit('change')
    public changeEvent() {
        this.defaultvalue = this.val;
        return {
            value: this.value,
            color: this.color
        };
    }

    get color() {
        try {
            return HSVaColor(...parseToHSVA(this.$value)?.values);
        }catch (e) {
            return '';
        }

    }

    get value() {
        return this.$value;
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <wu-plus-popover trigger="click" id="popover" ref={e => (this.popoverRef = e)} disabled={this.disabled} position="bottom">
                <div class="color-btn wu-color-picker"
                     style={{ backgroundColor: this.val }}
                     id="color-btn"
                     onClick={() => this.openPicker()}
                     disabled={this.disabled}
                     {...extractClass({}, 'color-btn', {
                         ['wu-color-picker-' + this.size]: this.size,
                         'wu-color-picker': true,
                         'is-disabled': this.disabled
                     })}
                    >
                    <span class="wu-color-picker_inner">

                    </span>
                </div>
                <div slot="popover" tip="popover" id="popcon">
                    <wu-plus-color-pane ref={e => (this.colorPane = e)} defaultvalue={this.defaultvalue}></wu-plus-color-pane>
                    <div class="pop-footer">
                        <wu-plus-button type="text" onClick={() => this.cancleCallback()}>取 消</wu-plus-button>
                        <wu-plus-button type="primary" id="btn-submit" onClick={() => this.okCallback()}>确 认</wu-plus-button>
                    </div>
                </div>
            </wu-plus-popover>
        );
    }
}

