import { Component, Fragment, h, Prop, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
import css1 from 'xterm/css/xterm.css';
import { ITerminalInitOnlyOptions, ITerminalOptions, Terminal } from 'xterm';

@Component({
    name: 'wu-plus-terminal',
    css: css + css1,
})
export class WuTerminal extends WuComponent {
    constructor() {
        super();
    }

    public terminal: Terminal;

    public options: ITerminalOptions & ITerminalInitOnlyOptions = {};

    public override connected(shadowRoot: ShadowRoot) {
        this.terminal = new Terminal(this.options);
        this.open();
    }

    public open() {
        console.log(this.shadowRoot);
        // @ts-ignore
        this.terminal.open(this.shadowRoot);
        for (let i = 0; i < 40; i ++) {
            this.terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $\n\r');
        }

    }


    @Prop({ default: '', type: String })
    public text: string;

    public override render(_renderProps = {}, _store = {}) {
        return (
            <Fragment></Fragment>
        );
    }
}
