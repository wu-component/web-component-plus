import { WuComponent, OnConnected, OnDisConnected } from '@canyuegongzi/web-core-plus';
import { UISize } from "@/interface";
declare type PickerType = 'year' | 'month' | 'date' | 'multiple' | 'week' | 'datetime' | 'datetimerange' | 'daterange' | 'monthrange' | 'yearrange';
export interface LocaleOptions {
    /****************************PC端***********************************/
    month?: string[];
    monthHead?: string[];
    week?: string[];
    clear?: string;
    cancel?: string;
    confirm?: string;
    yearHeadSuffix?: (year: string) => string;
    weekNum?: (weeknum: string) => string;
    /****************************PC端***********************************/
    /****************************移动端***********************************/
    dateSuffix: string;
    hourSuffix: string;
    minuteSuffix: string;
    secondSuffix: string;
}
export interface PickerOptions {
    type: PickerType;
    showWeek?: boolean;
    placeholder?: {
        startTime: string;
        endTime: string;
    };
    linkPanels?: boolean;
    firstDayOfWeek?: number;
    showClear?: boolean;
    autoConfirm?: boolean;
    showShortKeys?: boolean;
    autoFillDate?: boolean;
    separator?: string;
    startTime?: string;
    endTime?: string;
    minDate?: string;
    maxDate?: string;
    locale?: LocaleOptions;
    shortList?: {
        name: string;
        value: {
            startTime: any;
            endTime: any;
        };
    }[];
    confirmFirst: boolean;
    showType: 'modal';
    showBottomButton: boolean;
    disableDate: (date: any, dayjs: any) => boolean;
}
export declare class WuDatePicker extends WuComponent implements OnConnected, OnDisConnected {
    private picker;
    constructor();
    defaultValue: string[] | string;
    type: PickerType;
    size: UISize;
    options: PickerOptions;
    connected(shadowRoot: ShadowRoot): void;
    disConnected(): void;
    change(data: any): any;
    mountPicker(): void;
    height: string;
    valueChange(newValue: any, oldValue: any): void;
    render(_renderProps?: {}, _store?: {}): any;
}
export {};
