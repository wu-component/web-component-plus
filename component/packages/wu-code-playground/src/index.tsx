import { Component, h, OnConnected, WuComponent, Prop } from '@wu-component/web-core-plus';
import css from './index.scss';
// @ts-ignore
import { compileTS } from "./core/typescript";
import "@wu-component/wu-code-monaco-editor";
import "@wu-component/wu-code-sandbox";
import "@wu-component/wu-alert";
import type { WuCodeMonacoEditor } from "@wu-component/wu-code-monaco-editor/types";
import type { WuCodeSandbox } from "@wu-component/wu-code-sandbox/types";
/*import srcdoc from './srcdoc.html';*/
import initialSrcTs from './initialSrcTs.txt';

/*import * as esbuild from 'esbuild-wasm';*/

interface NoticeItem {
    close: boolean;
    text: string;
    id: string
}
interface NoticeContentItem  extends NoticeItem {
    show: boolean;
}

interface ResponseNotice {
    notice?: NoticeItem[]
}

interface StorageConfig {
    readMap: Record<string, boolean>;
    version: number;
}

const WU_COMPONENT_DOC = 'WU-COMPONENT-DOC';


@Component({
    name: 'wu-code-playground',
    css: css,
})
export class WuCodePlayground extends WuComponent implements OnConnected {
    constructor() {
        super();
    }


    @Prop({ type: Boolean, default: true })
    public isLoading: boolean;

    public noticeList: NoticeContentItem[] = []

    public editorContainer: WuCodeMonacoEditor = null;

    public previewContainer: WuCodeSandbox = null;

    public initialEvalSuccess = false;

    public override connected(shadowRoot: ShadowRoot): void {
        const code: WuCodeSandbox = this.shadowRoot.querySelector('wu-code-sandbox');
        const editor: WuCodeMonacoEditor = this.shadowRoot.querySelector('wu-code-monaco-editor');
        const config: StorageConfig = localStorage.getItem(WU_COMPONENT_DOC)? JSON.parse(localStorage.getItem(WU_COMPONENT_DOC)): {
            readMap: {},
            version: undefined
        };
        if (window.__DOC_VERSION__ &&  config.version !== window.__DOC_VERSION__) {
            localStorage.setItem(WU_COMPONENT_DOC, JSON.stringify({
                ...config,
                readMap: {},
                version: window.__DOC_VERSION__
            }));
        }
        this.fetchNoticeList().then((res) => {
            const noticeList = res?.notice || [];
            const container: HTMLElement = this.shadowRoot.querySelector("#noticeContainer");
            container.innerHTML = '';
            const readMap = config.readMap || {};
            for (let i = 0; i < noticeList.length; i ++) {
                if (!readMap[noticeList[i].id] || !readMap) {
                    this.noticeList.push({
                        show: true,
                        ...noticeList[i]
                    });
                }
            }
        });
        editor.addTsDeclaration("https://static-cdn.canyuegongzi.xyz/ts/Wu.d.ts");
        code.sandbox.importScript("https://unpkg.com/@wu-component/web-core-plus@next").then(r => {
            console.log('success script');
        });
       /* esbuild.initialize({
            wasmURL: 'https://cdn.jsdelivr.net/npm/esbuild-wasm@0.17.10/esbuild.wasm',
        }).then(() => {

        });*/
    }


    /**
     * 开始执行代码
     */
    public async runCode() {
        const editor = this.editorContainer.editor;
        if (!editor?.getModel) {
            return;
        }
        // editor.getModel().getValue()
        const tsJs: string = await compileTS(editor?.getModel?.().uri);

        await this.previewContainer.runCode(tsJs || '', () => {});
    }

    /**
     * 加载依赖
     */
    public loadDependencies() {
        /*this.previewContainer.loadDependencies({
                "name": "o(*≧▽≦)ツ┏━┓",
                "dependencies": {
                    "react": "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"

                },
                "types": {
                    "react": "https://cdn.jsdelivr.net/npm/@types/react/index.d.ts"
                }
            }
        ).then(r => {});*/
    }

    /**
     * 加载通告
     * @private
     */
    private async fetchNoticeList():Promise<ResponseNotice> {
        return new Promise((resolve, reject) => {
            fetch("https://static-cdn.canyuegongzi.xyz/config/playground/notice/notice-config.json")
                .then((response) => response.json())
                .then((json) => resolve(json))
                .catch(() => resolve({}));
        });
    }

    public getIp() {
        fetch("https://pv.sohu.com/cityjson")
            .then((response) => response.text())
            .then((json) =>{
                console.log(json);
            });
    }

    private sandboxSuccess() {
        if (!this.initialEvalSuccess) {
            this.editorContainer?.addTsDeclaration("https://static-cdn.canyuegongzi.xyz/ts/Wu.d.ts").then(r => {
                setTimeout(() => {
                    this.runCode().then(r => {
                        this.initialEvalSuccess = true;
                        this.isLoading = false;
                    }).catch(e => {
                        this.initialEvalSuccess = true;
                        this.isLoading = false;
                    });

                }, 1000);
            });
        }
    }

    /**
     * 消息关闭
     * @param item
     * @private
     */
    private noticeClose(item: NoticeItem) {
        try {
            const config: StorageConfig = localStorage.getItem(WU_COMPONENT_DOC)? JSON.parse(localStorage.getItem(WU_COMPONENT_DOC)): {
                readMap: {},
                version: 0
            };
            const readMap = config.readMap || {};
            readMap[item.id] = true;
            localStorage.setItem(WU_COMPONENT_DOC, JSON.stringify({
                ...config,
                readMap,
            }));
        }catch (e) {
            console.log(e);
        }


    }

    public renderLoading() {
        return (
            <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div>
        );
    }
    //
    public override render(_renderProps = {}, _store = {}) {
        return (
            <div class="playgroundContainer">
                <div id="noticeContainer">
                    {
                        this.noticeList.map((item => {
                            return (
                                // @ts-ignore
                                <wu-plus-alert
                                    center
                                    type="success"
                                    closable={String(item.close)}
                                    tip={item.text}
                                    onClose={() => this.noticeClose(item)}
                                    // @ts-ignore
                                ></wu-plus-alert>
                            );
                        }))
                    }
                </div>
                <div class="toolsNav">
                    <div class="runCode" onClick={() => this.runCode()}>
                        run
                    </div>
                    {/*<div class="loadDepend" onClick={() => this.loadDependencies()}>
                        loadDepend
                    </div>*/}
                </div>
                <div class="content">
                    <div className="loadingContainer" style={{ display: this.isLoading ? "flex": "none" }}>
                        {/*<div className="lottie">
                            <wu-plus-lottie
                                data="https://static-cdn.canyuegongzi.xyz/lf20/lf20_qD2Qe90HNO.json"></wu-plus-lottie>
                        </div>*/}
                        {this.renderLoading()}
                    </div>
                    <div className="editorContainer">
                        {/*@ts-ignore*/}
                        <wu-code-monaco-editor
                            className="editorContainer"
                            id="editor"
                            initial-value={initialSrcTs}
                            theme="vs-dark"
                            language="typescript"
                            ref={ref => this.editorContainer = ref}
                        //@ts-ignore
                        ></wu-code-monaco-editor>
                    </div>
                    <div className="codeViewerContainer">
                        {/*@ts-ignore*/}
                        <wu-code-sandbox ref={ref => this.previewContainer = ref} id="preview" onsuccess={() => this.sandboxSuccess()} isBeforeRefresh={true}></wu-code-sandbox>
                    </div>
                </div>
            </div>
        );
    }
}
