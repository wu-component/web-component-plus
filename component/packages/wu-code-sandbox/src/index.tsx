import { Component, h, OnConnected, Prop, WuComponent } from "@wu-component/web-core-plus";
import css from './index.scss';
import { PreviewProxy, LoadDependencies } from "./sandbox";
import { Store } from "./Store";
import srcdoc from './srcdoc.txt';

@Component({
    name: 'wu-code-sandbox',
    css: css,
})
export class WuMonacoEditorPreview extends WuComponent implements OnConnected {
    constructor() {
        super();
    }

    @Prop({ type: String, default: srcdoc })
    public initialSrcDoc: string;

    @Prop({ type: Boolean, default: false })
    public isBeforeRefresh: boolean;

    private container: HTMLIFrameElement = null;

    // 沙箱
    private proxy: PreviewProxy

    // 数据管理
    public previewStore: Store

    private formatFile(doc: string): Promise<string> {
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
        const initialSrcDoc = (this.props as any).initialSrcDoc;
        this.container = shadowRoot.querySelector("#codeIframe");
        const fragment = document.createElement("div");
        let current = {};
        if (initialSrcDoc) {
            this.initialSrcDoc = await this.formatFile(initialSrcDoc);
            fragment.innerHTML = this.initialSrcDoc;
            const dom = fragment.querySelector("#dependenciesMap");
            // 解析出dom模板中定义的依赖
            current = JSON.parse(dom.innerHTML)? JSON.parse(dom.innerHTML).imports: {};
        }

        // 依赖项同步到仓库中
        this.previewStore = new Store({ dependencies: current });
        // 示例话沙箱代理
        this.proxy = new PreviewProxy(this.container, {
            on_fetch_progress: (progress: any) => {
                // pending_imports = progress;
            },
            on_error: (event: any) => {
                console.log("on_error", event);
            },
            on_unhandled_rejection: (event: any) => {
                console.log("on_unhandled_rejection", event);
            },
            on_console: (log: any) => {
                console.log("log", log);
            },
            on_console_group: (action: any) => {
                // group_logs(action.label, false);
            },
            on_console_group_end: () => {
                // ungroup_logs();
            },
            on_console_group_collapsed: (action: any) => {
                // group_logs(action.label, true);
            }
        });
        // 沙箱实例完成
        this.container.addEventListener('load', () => {
            this.proxy.handle_links().then(r => {});
            // 同步新的依赖到沙箱中
            this.proxy.load_depend({
                "dependencies": this.previewStore.dependencies
            }).then(() => {
                for (let i = 0; i < this.previewStore.code.length; i ++) {
                    this.proxy.eval(this.previewStore.code[i]);
                }
                this.previewStore.code = [];
            });
        });
        this.container.setAttribute("srcdoc", this.initialSrcDoc);
    }

    /**
     * 沙箱执行code
     * @param type
     * @param code
     */
    public runCode(type: string, code: string) {
        if ((this.props as any).isBeforeRefresh) {
            // 此处做了定制，webComponent 中无法重复定义元素，所以此处需要重新加载沙箱
            this.container.contentWindow.location.reload();
            // 将需要执行的代码暂存
            this.previewStore.pushStackCode(code);
        } else {
            this.proxy.eval(code);
        }

    }

    public loadDependencies(options: LoadDependencies) {
        return this.proxy.load_depend(options);
    }

    public override render(_renderProps = {}, _store = {}) {
        const sandbox = () => [ 'allow-forms', 'allow-modals', 'allow-pointer-lock', 'allow-popups',  'allow-same-origin', 'allow-scripts', 'allow-top-navigation-by-user-activation' ].join(' ');
        return (
            <div class="containerViewer">
                <iframe frameBorder="0" id="codeIframe" sandbox={sandbox()}></iframe>
            </div>
        );
    }
}
