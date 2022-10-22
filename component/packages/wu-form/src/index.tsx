import { h, Component, Prop, WuComponent, OnConnected } from '@wu-component/web-core-plus';
import css from './index.scss';

@Component({
    name: 'wu-plus-form',
    css: css,
})
export class WuFrom extends WuComponent implements OnConnected {
    private form: any;
    private elements: any[];
    private submitBtn: Element;
    private resetBtn: Element;

    constructor() {
        super();
    }
    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    @Prop({ default: false, type: Boolean })
    public invalid: boolean;

    @Prop({ default: 'GET', type: String })
    public method: string;

    @Prop({ default: false, type: Boolean })
    public novalidate: boolean;

    @Prop({ default: '', type: String })
    public action: string;

    @Prop({ default: '', type: String })
    public name: string;

    @Prop({ default: '', type: String })
    public type: string;

    get validity() {
        return this.elements.every(el=>el.validity);
    }

    get formdata() {
        const formdata = new FormData();
        const jsondata = {};
        if(!this.disabled){
            (this.elements || []).forEach(el=>{
                formdata.set(el.name,el.value);
                jsondata[el.name] = el.value;
            });
        }
        (formdata as any).json = jsondata;
        return formdata;
    }

    public override connected(shadowRoot: ShadowRoot) {
        this.form  = this.shadowRoot.getElementById('form');
        const els = this.querySelectorAll('[name]:not([disabled])');
        this.elements = Array.from(els);
        this.submitBtn = this.querySelector('[htmltype=submit]');
        this.resetBtn = this.querySelector('[htmltype=reset]');
        if(this.submitBtn){
            this.submitBtn.addEventListener('click',()=>{
                this.submit();
            });
        }
        if(this.resetBtn){
            this.resetBtn.addEventListener('click',()=>{
                this.reset();
            });
        }
        this.form.addEventListener('keydown',(ev)=>{
            if(ev.target == this.resetBtn){
                return;
            }
            switch (ev.keyCode) {
                case 13://Enter
                    this.submit();
                    break;
                default:
                    break;
            }
        });
        if(!this.novalidate){
            this.elements.forEach((el)=>{
                if(el.tagName == "WU-PLUS-INPUT"){
                    el.addEventListener('input',()=>{
                        this.invalid = !this.validity;
                    });
                }else{
                    el.addEventListener('change',()=>{
                        this.invalid = !this.validity;
                    });
                }
            });
        }
    }


    public override render(_renderProps = {}, _store = {}) {
        return (
            <form id="form" method={this.method} action={this.action} novalidate={this.novalidate}>
                <slot></slot>
            </form>
        );
    }

    public async submit() {
        if(this.checkValidity() && !this.disabled){
            if(this.action){
                if(this.method == 'GET'){
                    const formdata = new URLSearchParams((this.formdata as any)?.json || {}).toString();
                    const data = await fetch(`${this.action}?${formdata}`);
                    if(data.headers.get("content-type") == 'application/json'){
                        this.dispatchEvent(new CustomEvent('submit',{
                            detail:{
                                data: data.json()
                            }
                        }));
                    }
                }else{
                    const data = await fetch(this.action, {
                        method: 'POST',
                        body: this.formdata,
                    });
                    if(data.headers.get("content-type") == 'application/json'){
                        this.dispatchEvent(new CustomEvent('submit',{
                            detail:{
                                data:data.json()
                            }
                        }));
                    }
                }
            }
        }
    }

    public checkValidity() {
        if(this.novalidate){
            return true;
        }
        const elements = [ ...this.elements ].reverse();
        let validity = true;
        elements.forEach(el=>{
            if(el.checkValidity && !el.checkValidity()){
                validity = false;
            }
        });
        this.invalid = !validity;
        return validity;
    }

    public reset() {
        this.invalid = false;
        this.elements.forEach(el=>{
            el.reset && el.reset();
            el.value = null;
        });

    }
}
