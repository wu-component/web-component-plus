import { OnConnected, WuComponent } from "@wu-component/web-core-plus";
import Sandbox from './core/websandbox';
interface Options {
    frameSrc?: string | null;
    frameContent?: string;
    codeToRunBeforeInit?: string | null;
    initialStyles?: string | null;
    baseUrl?: string | null;
    allowPointerLock?: boolean;
    allowFullScreen?: boolean;
    sandboxAdditionalAttributes?: string;
    allowAdditionalAttributes?: string;
}
export declare class WuCodeSandbox extends WuComponent implements OnConnected {
    constructor();
    code: string;
    options: Options;
    isSandboxInit: boolean;
    private localApi;
    private _sandbox;
    get sandbox(): Sandbox;
    set sandbox(value: Sandbox);
    formatFile(doc: string): Promise<string>;
    connected(shadowRoot: ShadowRoot): Promise<void>;
    /**
     * 初始化沙箱
     */
    initSandbox(): Sandbox;
    /**
     * 执行code
     * @param code
     * @param callback
     */
    runCode(code: string, callback?: (...args: any[]) => void): Promise<unknown>;
    /**
     * 更新配置
     */
    updateConfig(options: Options): void;
    /**
     * 调用iframe沙箱内部方法
     * @param name
     * @param params
     * @param callback
     */
    callSandboxFunction(name: string, params: Record<any, any>, callback: (...args: any[]) => void): Promise<unknown>;
    /**
     * Sandbox 注入数据
     * @param name
     * @param value
     * @param callback
     */
    injectSandboxLocalApi(name: string, value: any, callback?: (...args: any[]) => void): Promise<unknown>;
    emitEvent(data: any): any;
    emitSuccessEvent(): boolean;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
