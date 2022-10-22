import { WuComponent } from '@wu-component/web-core-plus';
import "./step/index.tsx";
declare type Direction = 'vertical' | 'horizontal';
declare type ProcessStatus = 'wait' | 'process' | 'finish' | 'error' | 'success';
declare type FinishStatus = 'wait' | 'process' | 'finish' | 'error' | 'success';
interface StepItem {
    title: string;
    description: string;
    status: ProcessStatus;
    icon: any;
}
export declare class WuSteps extends WuComponent {
    constructor();
    ss: number;
    data: StepItem[];
    space: string;
    direction: Direction;
    active: number;
    processStatus: ProcessStatus;
    finishStatus: FinishStatus;
    alignCenter: boolean;
    simple: boolean;
    provideSteps(): this;
    stepOffset: number;
    get steps(): ChildNode[];
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
