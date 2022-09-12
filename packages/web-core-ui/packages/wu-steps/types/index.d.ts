import { WuComponent } from '@wu-component/web-core-plus';
declare type Direction = 'vertical' | 'horizontal';
declare type ProcessStatus = 'wait' | 'process' | 'finish' | 'error' | 'success';
declare type FinishStatus = 'wait' | 'process' | 'finish' | 'error' | 'success';
export declare class WuSteps extends WuComponent {
    constructor();
    space: string;
    direction: Direction;
    active: number;
    processStatus: ProcessStatus;
    finishStatus: FinishStatus;
    alignCenter: boolean;
    simple: boolean;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
