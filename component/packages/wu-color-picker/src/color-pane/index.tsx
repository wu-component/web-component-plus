const Material_colors = [ '#f44336','#E91E63','#9C27B0','#673AB7','#3F51B5','#2196F3','#03A9F4','#00BCD4','#009688','#4CAF50','#8BC34A','#CDDC39','#FFEB3B','#FFC107','#FF9800','#FF5722','#795548','#9E9E9E','#607D8B','rgba(0,0,0,.65)','transparent' ];
import {
    h,
    Component,
    Prop,
    OnConnected,
    WuComponent,
    OnDisConnected,
    Watch,
    Emit
} from '@wu-component/web-core-plus';
import css from './index.scss';
import { parseToHSVA } from "../utils/color";
import { HSVaColor } from "../utils/hsvacolor";

@Component({
    name: 'wu-plus-color-pane',
    css: css,
})
export class WuColorPane extends WuComponent implements OnConnected, OnDisConnected {
    private type: string[];
    private typeindex: number;
    private palette: any;
    private colors: any;
    private pane: any;
    private rangeHue: any;
    private rangeOpacity: any;
    private copyBtn: any;
    private copyinfo: any;
    private switch: any;
    private colorHexa: any;
    private colorRgba: any;
    private colorHlsa: any;
    private $value: any;
    private nativeclick: boolean;
    private start: boolean;
    public val: any = undefined
    private timeout: any;

    constructor() {
        super();
    }

    @Prop({ default: '#ffffff', type: String })
    public defaultvalue: string;

    public choose(ev){
        const { x,y,width:w,height:h } = this.palette.getBoundingClientRect();
        const value = [ ...this.$value ];
        const _x = Math.min(Math.max(0,(ev.clientX - x) / w * 100),100);
        const _y = Math.min(Math.max(0,(ev.clientY - y) / h * 100),100);
        value[1] = _x;
        value[2] = 100 - _y;
        this.val = `hsva(${value[0]}, ${value[1]}%, ${value[2]}%, ${value[3]})`;
        this.updatePicker();
    }

    public override connected(shadowRoot: ShadowRoot){
        this.type = [ 'HEXA','RGBA','HSLA' ];
        this.typeindex = 0;
        this.palette = this.shadowRoot.getElementById('color-palette');
        this.colors = this.shadowRoot.getElementById('colors');
        this.pane = this.shadowRoot.getElementById('color-pane');
        this.rangeHue = this.shadowRoot.getElementById('range-hue');
        this.rangeOpacity = this.shadowRoot.getElementById('range-opacity');
        this.copyBtn = this.shadowRoot.getElementById('copy-btn');
        this.copyinfo = this.copyBtn.querySelector('input');
        this.switch = this.shadowRoot.getElementById('btn-switch');
        this.colorHexa = this.shadowRoot.getElementById('color-hexa').querySelectorAll('input');
        this.colorRgba = this.shadowRoot.getElementById('color-rgba').querySelectorAll('input');
        this.colorHlsa = this.shadowRoot.getElementById('color-hlsa').querySelectorAll('input');
        this.val = this.defaultvalue;
        this.rangeHue.addEventListener('input',()=>{
            const value = [ ...this.$value ];
            value[0] = Number(this.rangeHue.value);
            this.nativeclick = true;
            this.val = `hsva(${value[0]}, ${value[1]}%, ${value[2]}%, ${value[3]})`;
            this.updatePicker();
        });
        this.palette.addEventListener('mousedown',(ev)=>{
            this.start = true;
            this.choose(ev);
        });
        document.addEventListener('mousemove',this.mousemove);

        document.addEventListener('mouseup',this.mouseup);
        this.rangeOpacity.addEventListener('input',()=>{
            const value = [ ...this.$value ];
            value[3] = Number(this.rangeOpacity.value);
            this.nativeclick = true;
            this.val = `hsva(${value[0]}, ${value[1]}%, ${value[2]}%, ${value[3]})`;
            this.updatePicker();
        });
        this.colors.addEventListener('click',(ev)=>{
            const item = ev.target.closest('button');
            if(item){
                this.nativeclick = true;
                this.val = item.dataset.color;
                this.updatePicker();
            }
        });
        this.switch.addEventListener('click',()=>{
            this.typeindex ++;
            this.typeindex %= 3;
            this.switch.textContent = this.type[this.typeindex];
            this.nativeclick = true;
            // this.val = this.val;
            this.switch.parentNode.dataset.type = this.type[this.typeindex];
        });
        this.copyBtn.addEventListener('click',()=>{
            this.copyinfo.select();
            if (document.execCommand('copy')) {
                document.execCommand('copy');
            }
        });
        this.colorHexa.forEach(el=>{
            el.addEventListener('change',()=>{
                this.nativeclick = true;
                this.val = el.value;
                this.updatePicker();
            });
        });
        this.colorRgba.forEach((el,i)=>{
            el.addEventListener('change',()=>{
                const value = HSVaColor(...this.$value).toRGBA();
                value[i] = Number(el.value);
                this.nativeclick = true;
                this.val = `rgba(${value[0]}, ${value[1]}, ${value[2]}, ${value[3]})`;
                this.updatePicker();
            });
        });
        this.colorHlsa.forEach((el,i)=>{
            el.addEventListener('change',()=>{
                const value = HSVaColor(...this.$value).toHSLA();
                value[i] = Number(el.value);
                this.nativeclick = true;
                this.val = `hsla(${value[0]}, ${value[1]}%, ${value[2]}%, ${value[3]})`;
                this.updatePicker();
            });
        });
    }

    public mousemove = (ev) => {
        if(this.start){
            this.choose(ev);
        }
    }

    public mouseup = (): any => {
        if(this.start && this.palette && (getComputedStyle(this.palette).opacity + '' !== '1')){
            this.valueChangeEvent();
        }
        this.start = false;
    }

    public override disConnected() {
        document.removeEventListener('mousemove', this.mousemove);
        document.removeEventListener('mouseup', this.mouseup);
    }

    get value() {
        return HSVaColor(...this.$value)['to' + this.type[this.typeindex]]().toString();
    }

    get color() {
        return HSVaColor(...this.$value);
    }

    @Watch('val', { immediate: true })
    public valueChange(val: string, old?: string) {
        this.$value = parseToHSVA(val).values;
        //[h,s,v,a]
        const [ h,s,v,a = 1 ] = this.$value;
        this.pane.style.setProperty('--h',h);
        this.pane.style.setProperty('--s',s);
        this.pane.style.setProperty('--v',v);
        this.pane.style.setProperty('--a',a);
        this.pane.style.setProperty('--c',this.value);
        this.copyinfo.value = this.value;
        this.rangeHue.value = h;
        this.rangeOpacity.value = a.toFixed(2);
        const COLOR = HSVaColor(...this.$value);
        this.colorHexa[0].value = COLOR.toHEXA().toString();
        const RGBA = COLOR.toRGBA();
        this.colorRgba[0].value = RGBA[0].toFixed(0);
        this.colorRgba[1].value = RGBA[1].toFixed(0);
        this.colorRgba[2].value = RGBA[2].toFixed(0);
        this.colorRgba[3].value = RGBA[3].toFixed(2);
        const HSLA = COLOR.toHSLA();
        this.colorHlsa[0].value = HSLA[0].toFixed(0);
        this.colorHlsa[1].value = HSLA[1].toFixed(0);
        this.colorHlsa[2].value = HSLA[2].toFixed(0);
        this.colorHlsa[3].value = HSLA[3].toFixed(2);
        if(this.nativeclick){
            this.nativeclick = false;
            this.valueChangeEvent();
        }
    }

    @Emit('picker-change')
    public valueChangeEvent() {
        return {
            value: this.value,
            color: this.color
        };

    }

    public init(color: string) {
        this.val = color;
        this.defaultvalue = color;
        this.update();
        this.valueChange(color);
    }

    /**
     * 更新
     */
    public updatePicker() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            // this.update();
            this.valueChange(this.val);
        }, 100);
    }

    public override render(_renderProps = {}, _store = {}) {
        return (
            <div className="color-pane" id="color-pane">
                <div className="color-palette" id="color-palette"></div>
                <div className="color-chooser">
                    <a className="color-show" id="copy-btn">
                        <svg className="icon-file" viewBox="0 0 1024 1024">
                            <path
                                d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32z"></path>
                            <path
                                d="M704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
                        </svg>
                        <input/>
                    </a>
                    <div className="color-range">
                        <input className="color-hue" value="0" min="0" max="360" type="range" id="range-hue"/>
                        <input className="color-opacity" value="1" min="0" max="1" step="0.01" type="range"
                               id="range-opacity"/>
                    </div>
                </div>
                <div className="color-footer" data-type="HEXA">
                    <div className="color-input">
                        <div className="color-label" id="color-hexa">
                            <input spellCheck="false"/>
                        </div>
                        <div className="color-label" id="color-rgba">
                            <input type="number" min="0" max="255" spellCheck="false"/>
                            <input type="number" min="0" max="255" spellCheck="false"/>
                            <input type="number" min="0" max="255" spellCheck="false"/>
                            <input type="number" min="0" max="1" step="0.01" spellCheck="false"/>
                        </div>
                        <div className="color-label" id="color-hlsa">
                            <input type="number" min="0" max="360" spellCheck="false"/>
                            <input type="number" min="0" max="100" spellCheck="false"/>
                            <input type="number" min="0" max="100" spellCheck="false"/>
                            <input type="number" min="0" max="1" step="0.01" spellCheck="false"/>
                        </div>
                    </div>
                    <button className="btn-switch" id="btn-switch" type="flat">HEXA</button>
                </div>
                <div className="color-sign" id="colors">
                    {
                        Material_colors.map(item =>  {
                            return (
                                <button style={{ backgroundColor: item }} data-color={item}></button>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
