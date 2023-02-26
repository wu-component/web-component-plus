import { Component, Emit, Fragment, h, OnConnected, Prop, WuComponent } from "@wu-component/web-core-plus";
import css from './index.scss';
import Sandbox from './core/websandbox';


interface Options {
    frameSrc?: string | null;
    // A content of sandbox iFrame
    frameContent?: string;
    // A js code to run before any other iFrame code (will be injected in <head/>)
    codeToRunBeforeInit?: string | null,
    // A CSS markup to inject into iFrame <head/>
    initialStyles?: string | null,
    // A URL that will be used as base url for all relative pathes in tags like <script/>, <link/>. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base
    baseUrl?: string | null,
    // Is sandboxed iFrame allowed to capture pointer. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
    allowPointerLock?: boolean,
    // Is iFrame allowed to go fullscreen. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
    allowFullScreen?: boolean,
    // Additional attributes to add into sandboxed iFrame
    sandboxAdditionalAttributes?: string,
    // Additional attributes to add into sandboxed iFrame
    allowAdditionalAttributes?: string,
}
@Component({
    name: 'wu-code-sandbox',
    css: css,
})
export class WuCodeSandbox extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    @Prop({ type: String, default: '' })
    public code = '';

    @Prop({ type: Object, default: { } })
    public options: Options = {};

    @Prop({ type: String, default: "100%" })
    public width: string;

    @Prop({ type: String, default: "400px" })
    public height: string;

    public isSandboxInit = false;

    private localApi: Record<string, any>;

    private _sandbox: Sandbox;

    get sandbox() {
        if (this._sandbox) {
            return this._sandbox;
        }
        this._sandbox = this.initSandbox();
        return this._sandbox;
    }

    set sandbox(value) {
        this._sandbox = value;
    }

    public formatFile(doc: string): Promise<string> {
        return new Promise((resolve) => {
            if (doc.startsWith("data:")) {
                const arr = doc.split(',');
                // const mime = arr[0].match(/:(.*?);/)[1];
                // const suffix = mime.split('/')[1];
                const bstr = atob(arr[1]);
                let n = bstr.length;
                const u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                const file = new File([ u8arr ], `srcdoc.html`, {
                    type: "text/html"
                });
                const reader = new FileReader();
                reader.onload = ()=> {
                    // 语句是为了显示内容换行
                    // @ts-ignore
                    /*const str = reader.result?.replace(/\n/g,"<br/>");
                    console.log(str);*/
                    resolve(reader.result as string);
                };
                reader.readAsText(file,'utf-8');
            }
            else{
                resolve(doc);
            }
        });

    }

    public override async connected(shadowRoot: ShadowRoot) {
        this.sandbox = this.initSandbox();
    }

    /**
     * 初始化沙箱
     */
    public initSandbox() {
        this.localApi = {};
        const sandbox =  Sandbox.create(this.localApi, {
            frameContainer: '.iframe__container',
            frameClassName: 'simple__iframe',
            domContainer: this.shadowRoot as unknown as HTMLElement,
            codeToRunBeforeInit: this.code || '',
            allowFullScreen: false,
            ...this.options
        });
        sandbox.promise
            .then(() => {
                return sandbox.run(`
                    Websandbox.connection.setLocalApi({
                        getWebsandboxConnectionInstance: function(message) {
                            return Websandbox.connection;
                        }
                    });
                    `
                );
            }).then(() => {
                this.isSandboxInit = true;
                // 沙箱初始化成功
                this.emitEvent(sandbox);
                console.log("2222222");
                this.emitSuccessEvent();

        });
        return sandbox;
    }

    /**
     * 执行code
     * @param code
     * @param callback
     */
    public runCode(code: string, callback?: (...args) => void) {
        return new Promise((resolve, reject) => {
            const sandbox = this.sandbox;
            return sandbox.promise
                .then((res) => sandbox.run(code))
                .then((res) => {
                    callback?.(true);
                    resolve(res);
                });
        });
    }

    /**
     * 更新配置
     */
    public updateConfig(options: Options) {
        this.update();
        this.initSandbox();

    }

    /**
     * 调用iframe沙箱内部方法
     * @param name
     * @param params
     * @param callback
     */
    public callSandboxFunction(name: string, params: Record<any, any>, callback: (...args) => void) {
        const sandbox = this.sandbox;
        return new Promise(async (resolve, reject) => {
            return sandbox.promise
                .then(async (res) => {
                    const api = sandbox.connection.remote[name];
                    if(!api) {
                        reject(`sandbox.connection.remote.${name} not found, before that call Websandbox.connection.setLocalApi inside the sandbox `);
                    }
                    if (typeof api === 'function') {
                        const result = await api(params);
                        callback?.(result, res);
                        resolve(result);
                    } else {
                        callback?.(api, res);
                        resolve(api);
                    }
                });
        });

    }

    /**
     * Sandbox 注入数据
     * @param name
     * @param value
     * @param callback
     */
    public injectSandboxLocalApi(name: string, value: any, callback?: (...args) => void) {
        return new Promise((resolve, reject) => {
            const sandbox = this.sandbox;
            let functionValue = '';
            if (typeof value === 'function') {
                functionValue = value.toString().replace(/\n/g, "");
            }else {
                functionValue = value;
            }
            const code = `Websandbox.connection.setLocalApi({
                ${name}: ${functionValue}
            }); `;
            return sandbox.promise
                .then((res) => sandbox.run(code))
                .then((res) => {
                    callback?.(res);
                    resolve(res);
                });
        });
    }

    @Emit("message")
    public emitEvent(data: any) {
        console.log("data", data);
        return data || {};
    }

    @Emit("success")
    public emitSuccessEvent() {
        return true;

    }

    public override render(_renderProps = {}, _store = {}) {
        /*const sandbox = () => [ 'allow-forms', 'allow-modals', 'allow-pointer-lock', 'allow-popups',  'allow-same-origin', 'allow-scripts', 'allow-top-navigation-by-user-activation' ].join(' ');*/
        return (
            <Fragment>
                <div class="iframe__container" style={{ height: this.height, width: this.width }}></div>
                {/*<iframe frameBorder="0" ref={ref => this.container = ref} id="codeIframe" sandbox={sandbox()}></iframe>*/}
            </Fragment>
        );
    }
}
