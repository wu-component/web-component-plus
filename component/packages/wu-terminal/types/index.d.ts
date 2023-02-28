import { WuComponent } from '@wu-component/web-core-plus';
import { ITerminalInitOnlyOptions, ITerminalOptions, Terminal } from 'xterm';
export declare class WuTerminal extends WuComponent {
    constructor();
    terminal: Terminal;
    options: ITerminalOptions & ITerminalInitOnlyOptions;
    connected(shadowRoot: ShadowRoot): void;
    open(): void;
    text: string;
    render(_renderProps?: {}, _store?: {}): any;
}
