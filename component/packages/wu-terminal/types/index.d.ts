import { OnConnected, OnDisConnected, WuComponent } from '@wu-component/web-core-plus';
import { AttachAddon } from "xterm-addon-attach";
import { FitAddon } from "xterm-addon-fit";
import { SearchAddon } from "xterm-addon-search";
import { SerializeAddon } from "xterm-addon-serialize";
import { Unicode11Addon } from "xterm-addon-unicode11";
import { WebLinksAddon } from "xterm-addon-web-links";
import { ITerminalInitOnlyOptions, ITerminalOptions, Terminal } from 'xterm';
export declare class WuTerminal extends WuComponent implements OnConnected, OnDisConnected {
    constructor();
    terminal: Terminal;
    ws: WebSocket;
    options: ITerminalOptions & ITerminalInitOnlyOptions;
    connected(shadowRoot: ShadowRoot): void;
    disConnected(shadowRoot: ShadowRoot): void;
    private initNodEnv;
    attachAddon: AttachAddon;
    fitAddon: FitAddon;
    searchAddon: SearchAddon;
    webLinksAddon: WebLinksAddon;
    unicode11Addon: Unicode11Addon;
    serializeAddon: SerializeAddon;
    open(): void;
    /**
     * socket 初始化
     * @private
     */
    private initSocket;
    /**
     * 窗口缩放自适应
     * @private
     */
    private initUI;
    /**
     * 控制台大小变化
     * @private
     */
    private termOnSize;
    pid: string;
    socket: string;
    render(_renderProps?: {}, _store?: {}): any;
}
