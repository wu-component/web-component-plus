import { Component, Fragment, h, OnConnected, OnDisConnected, Prop, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
import css1 from 'xterm/css/xterm.css';
import { AttachAddon } from "xterm-addon-attach";
import { FitAddon } from "xterm-addon-fit";
import { SearchAddon } from "xterm-addon-search";
import { SerializeAddon } from "xterm-addon-serialize";
import { Unicode11Addon } from "xterm-addon-unicode11";
import { WebLinksAddon } from "xterm-addon-web-links";
import { ITerminalInitOnlyOptions, ITerminalOptions, Terminal } from 'xterm';
import axios from "axios";

@Component({
    name: 'wu-plus-terminal',
    css: css + css1,
})
export class WuTerminal extends WuComponent implements OnConnected, OnDisConnected {
    constructor() {
        super();
    }

    public terminal: Terminal;

    public ws!: WebSocket;

    public options: ITerminalOptions & ITerminalInitOnlyOptions = {
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontWeight: 400,
        fontSize: 14,
        rows: 200,
        disableStdin: false, //是否应禁用输入
        // cursorStyle: "underline", //光标样式
        cursorBlink: true, //光标闪烁
        cols: 80,
        allowProposedApi: true,
    };

    public override connected(shadowRoot: ShadowRoot) {
        this.terminal = new Terminal(this.options);
        this.open();
    }
    public override disConnected(shadowRoot: ShadowRoot) {
        this.ws.close();
        window.removeEventListener("resize", this.initUI);
        return this.terminal.dispose();
    }

    private initNodEnv(term: Terminal) {
        return axios
            .post("http://127.0.0.1:4000/terminal")
            .then((res) => res.data)
            .catch((err) => {
                throw new Error(err);
            });
    }

    public attachAddon: AttachAddon;
    public fitAddon: FitAddon;
    public searchAddon: SearchAddon;
    public webLinksAddon: WebLinksAddon;
    public unicode11Addon: Unicode11Addon;
    public serializeAddon: SerializeAddon;

    public open() {
        this.terminal.open(this.shadowRoot as unknown as HTMLElement);
        this.terminal.focus();
        this.initNodEnv(this.terminal).then((res) => {
            console.log(res);
            this.pid = res;
            this.ws = new WebSocket(this.socket + res);
            this.attachAddon = new AttachAddon(this.ws);
            this.fitAddon = new FitAddon();
            this.searchAddon = new SearchAddon();
            this.webLinksAddon = new WebLinksAddon();
            this.unicode11Addon = new Unicode11Addon();
            this.serializeAddon = new SerializeAddon();
            [
                this.attachAddon,
                this.fitAddon,
                this.searchAddon,
                this.webLinksAddon,
                this.unicode11Addon,
                this.serializeAddon,
            ].map((e) => this.terminal.loadAddon(e));
            this.initSocket();
            this.initUI();
            this.termOnSize();
            window.addEventListener("resize", this.initUI);
        });

    }

    /**
     * socket 初始化
     * @private
     */
    private initSocket() {
        this.ws.addEventListener("open", () => {
            console.info("WebSocket connected");
        });
        this.ws.addEventListener("message", (event) => {
            console.debug("Message from server ", event.data);
            try {
                const output = JSON.parse(event.data);
                this.terminal.write(output.output, () => {
                    console.log(this.serializeAddon.serialize());
                });
            } catch (e) {
                console.error(e);
            }
        });

        this.terminal.onData((data) => this.ws.send(JSON.stringify({ input: data })));
    }

    /**
     * 窗口缩放自适应
     * @private
     */
    private initUI() {
        this.fitAddon.fit();

    }

    /**
     * 控制台大小变化
     * @private
     */
    private termOnSize() {
        this.terminal.onResize((size) => {
            console.debug("resize");
            const resizer = JSON.stringify({ resizer: [ size.cols, size.rows ] });
            this.ws.send(resizer);
        });
    }


    @Prop({ default: '10001', type: String })
    public pid: string;

    @Prop({ default: 'ws://127.0.0.1:4000/socket/', type: String })
    public socket: string;

    public override render(_renderProps = {}, _store = {}) {
        return (
            <Fragment></Fragment>
        );
    }
}
