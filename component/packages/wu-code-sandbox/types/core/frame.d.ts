import Connection from './connection';
declare class Frame {
    connection: Connection;
    constructor();
    /**
     * Creates script tag with passed code and attaches it. Runs synchronous
     * @param code
     */
    runCode(code: string): void;
    importScript(scriptUrl: string): Promise<void>;
    injectStyle(style: string): void;
    importStyle(styleUrl: string): void;
}
declare const Websandbox: Frame;
export default Websandbox;
