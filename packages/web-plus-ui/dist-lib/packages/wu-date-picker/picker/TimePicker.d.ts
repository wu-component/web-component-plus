export declare class TimePicker {
    private readonly $targetDom;
    private readonly option;
    private readonly id;
    private show;
    private readonly eventList;
    private $container;
    private format;
    constructor(targetDom: any, options: Record<any, any>);
    private init;
    updateCurrentTime(time: any): void;
    initCurTime(): void;
    initCallback(): void;
    addTargetEvent(): void;
    changeShowStatus(hide?: any): void;
    addPosEvent(): void;
    setPosition(): void;
    rendtime(): void;
    addEvent(): void;
    selectTime($ele: any, $target: any): void;
    confirm(): void;
    trigger(type: any, data: any): void;
    on(type: any, func: any): void;
    getRandomString(len?: number): string;
}
export default TimePicker;
