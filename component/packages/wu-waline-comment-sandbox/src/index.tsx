import { h, Prop, Component, WuComponent, OnConnected, OnDisConnected } from '@wu-component/web-core-plus';
import css from "./index.scss";
import "@wu-component/wu-code-sandbox";
import type { WuCodeSandbox } from "@wu-component/wu-code-sandbox";

@Component({
    name: 'wu-waline-comment-sandbox',
    css: css,
})
export class WuWalineCommentSandbox extends WuComponent implements OnConnected, OnDisConnected {
    constructor() {
        super();
    }

    @Prop({ default: 'https://unpkg.com/@wu-component/web-core-plus@next/dist/index.iife.min.js', type: String })
    public corepath = 'https://unpkg.com/@wu-component/web-core-plus@next/dist/index.iife.min.js';

    @Prop({ default: 'https://unpkg.com/@wu-component/wu-waline-comment@next/dist/index.umd.js', type: String })
    public compath = 'https://unpkg.com/@wu-component/wu-waline-comment@next/dist/index.umd.js';

    @Prop({ default: window.location.pathname, type: String })
    public path = window.location.pathname;

    @Prop({ default:'https://whl47bsd.api.lncldglobal.com', type: String })
    public serverurl = 'https://whl47bsd.api.lncldglobal.com';

    private sandboxDom: WuCodeSandbox;

    public messageFun(e) {
        const code = `
                    console.log(webCorePlus);
                    var div = document.createElement('div');
                    div.innerHTML = "<wu-waline-comment path='${this.path}' serverurl='${this.serverurl}' style='waline-theme-color:red' dark='body.theme-dark' language='zh-CN' comment='true' pageview='true'></wu-waline-comment>"
                    document.body.appendChild(div);
                    `;
        this.sandboxDom.sandbox.importScript(this.corepath).then((res) => {
            this.sandboxDom.sandbox.importScript(this.compath).then((res1) => {
                console.log(res1);
                this.sandboxDom.runCode(code, () => {
                    console.log("init success");
                });
            });
        });
    }



    public override render(_renderProps = {}, _store = {}) {
        return (
            // @ts-ignore
            <wu-code-sandbox ref={(ref) => this.sandboxDom = ref} onsuccess={(e) => this.messageFun(e)} id="codeSandbox" height="100%" width="100%" style="overflow: scroll;"></wu-code-sandbox>
        );
    }
}


