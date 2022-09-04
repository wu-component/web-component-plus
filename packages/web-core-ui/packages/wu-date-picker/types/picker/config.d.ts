import dayjs from '../dayjs/esm/index.js';
export declare const format: {
    week: string;
    date: string;
    daterange: string;
    datetime: string;
    datetimerange: string;
    month: string;
    monthrange: string;
    year: string;
    yearrange: string;
    multiple: string;
    weeknum: string;
    weeknumrange: string;
};
export declare const shortList: {
    multiple: any[];
    week: {
        name: string;
        value: {
            startTime: dayjs.Dayjs;
            endTime: dayjs.Dayjs;
        };
    }[];
    date: {
        name: string;
        value: {
            startTime: dayjs.Dayjs;
        };
    }[];
    datetime: {
        name: string;
        value: {
            startTime: dayjs.Dayjs;
        };
    }[];
    daterange: {
        name: string;
        value: {
            startTime: dayjs.Dayjs;
            endTime: dayjs.Dayjs;
        };
    }[];
    datetimerange: {
        name: string;
        value: {
            startTime: dayjs.Dayjs;
            endTime: dayjs.Dayjs;
        };
    }[];
    month: {
        name: string;
        value: {
            startTime: dayjs.Dayjs;
            endTime: dayjs.Dayjs;
        };
    }[];
    monthrange: {
        name: string;
        value: {
            startTime: dayjs.Dayjs;
            endTime: dayjs.Dayjs;
        };
    }[];
    year: {
        name: string;
        value: {
            startTime: dayjs.Dayjs;
        };
    }[];
    yearrange: {
        name: string;
        value: {
            startTime: dayjs.Dayjs;
            endTime: dayjs.Dayjs;
        };
    }[];
    weeknum: {
        name: string;
        value: {
            startTime: dayjs.Dayjs;
        };
    }[];
    weeknumrange: {
        name: string;
        value: {
            startTime: dayjs.Dayjs;
            endTime: dayjs.Dayjs;
        };
    }[];
};
export declare const option: {
    showWeek: boolean;
    placeholder: {
        startTime: string;
        endTime: string;
    };
    shortList: any[];
    locale: {
        month: string[];
        monthHead: string[];
        week: string[];
        clear: string;
        confirm: string;
        yearHeadSuffix: (year: any) => string;
        weekNum: (weeknum: any) => string;
    };
    confirmFirst: boolean;
    separator: string;
    showType: string;
    linkPanels: boolean;
    showClear: boolean;
    autoConfirm: boolean;
    showShortKeys: boolean;
    autoFillDate: boolean;
    firstDayOfWeek: number;
    theme: string;
    multipleDates: any[];
    startTime: string;
    endTime: string;
    minDate: string;
    maxDate: string;
    showBottomButton: boolean;
    disableDate: (date: any, dayjs: any) => boolean;
};
export { dayjs };
