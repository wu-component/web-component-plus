import { OnConnected, WuComponent } from '@wu-component/web-core-plus';
interface WuSteps {
    [key: string]: any;
}
declare type ProcessStatus = 'wait' | 'process' | 'finish' | 'error' | 'success';
export declare class WuStep extends WuComponent implements OnConnected {
    constructor();
    connected(shadowRoot: ShadowRoot): void;
    tip: string;
    icon: string;
    description: string;
    status: ProcessStatus;
    index: number;
    lineStyle: {};
    internalStatus: string;
    $parent: WuSteps;
    get currentStatus(): string;
    get prevStatus(): string;
    get isCenter(): any;
    get isVertical(): boolean;
    get isSimple(): any;
    get isLast(): boolean;
    get stepsCount(): any;
    get space(): any;
    get currentStyle(): Record<string, any>;
    updateStatus(val: any): void;
    calcProgress(status: any): void;
    updateComponent(): void;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
