import dayjs from '../dayjs/esm/index.js';
import isSameOrBefore from '../dayjs/plugin/isSameOrBefore';
import isSameOrAfter from '../dayjs/plugin/isSameOrAfter';
import isoWeeksInYear from '../dayjs/plugin/isoWeeksInYear';
import WeekOfYear from '../dayjs/plugin/weekOfYear';
import isLeapYear from '../dayjs/plugin/isLeapYear';
import advancedFormat from '../dayjs/plugin/advancedFormat';

// @ts-ignore
dayjs.extend(isSameOrBefore);
// @ts-ignore
dayjs.extend(isoWeeksInYear);
// @ts-ignore
dayjs.extend(isSameOrAfter);
// @ts-ignore
dayjs.extend(isLeapYear);
// @ts-ignore
dayjs.extend(WeekOfYear);
// @ts-ignore
dayjs.extend(advancedFormat);
export const format = {
    week: 'YYYY-MM-DD',
    date: 'YYYY-MM-DD',
    daterange: 'YYYY-MM-DD',
    datetime: 'YYYY-MM-DD HH:mm:ss',
    datetimerange: 'YYYY-MM-DD HH:mm:ss',
    month: 'YYYY-MM',
    monthrange: 'YYYY-MM',
    year: 'YYYY',
    yearrange: 'YYYY',
    multiple: 'YYYY-MM-DD',
    weeknum: 'YYYY第w周',
    weeknumrange: 'YYYY第w周',
};
export const shortList = {
    multiple: [],
    week: [
        { name: '最近一周', value: { startTime: dayjs().startOf('week'), endTime: dayjs().endOf('week') } },
        {
            name: '本月第一周',
            value: {
                startTime: dayjs()
                    .startOf('month')
                    .startOf('week'),
                endTime: dayjs()
                    .startOf('month')
                    .endOf('week'),
            },
        },
        {
            name: '本年第一周',
            value: {
                startTime: dayjs()
                    .startOf('year')
                    .startOf('week'),
                endTime: dayjs()
                    .startOf('year')
                    .endOf('week'),
            },
        },
    ],
    date: [
        { name: '今天', value: { startTime: dayjs().startOf('day') } },
        {
            name: '昨天',
            value: {
                startTime: dayjs()
                    .subtract(1, 'days')
                    .startOf('day'),
            },
        },
        {
            name: '本周第一天',
            value: {
                startTime: dayjs()
                    .startOf('week')
                    .startOf('day'),
            },
        },
        {
            name: '本月第一天',
            value: {
                startTime: dayjs()
                    .startOf('month')
                    .startOf('day'),
            },
        },
        {
            name: '本年第一天',
            value: {
                startTime: dayjs()
                    .startOf('year')
                    .startOf('day'),
            },
        },
    ],
    datetime: [
        { name: '现在', value: { startTime: dayjs() } },
        { name: '今天', value: { startTime: dayjs().startOf('day') } },
        {
            name: '昨天',
            value: {
                startTime: dayjs()
                    .subtract(1, 'days')
                    .startOf('day'),
            },
        },
        {
            name: '本周第一天',
            value: {
                startTime: dayjs()
                    .startOf('week')
                    .startOf('day'),
            },
        },
        {
            name: '本月第一天',
            value: {
                startTime: dayjs()
                    .startOf('month')
                    .startOf('day'),
            },
        },
        {
            name: '本年第一天',
            value: {
                startTime: dayjs()
                    .startOf('year')
                    .startOf('day'),
            },
        },
    ],
    daterange: [
        { name: '最近一天', value: { startTime: dayjs().subtract(1, 'days'), endTime: dayjs() } },
        {
            name: '最近三天',
            value: {
                startTime: dayjs()
                    .subtract(3, 'days')
                    .startOf('day'),
                endTime: dayjs(),
            },
        },
        {
            name: '最近一周',
            value: {
                startTime: dayjs()
                    .subtract(7, 'days')
                    .startOf('day'),
                endTime: dayjs(),
            },
        },
        {
            name: '最近一月',
            value: {
                startTime: dayjs()
                    .subtract(1, 'months')
                    .startOf('day'),
                endTime: dayjs(),
            },
        },
        {
            name: '最近一年',
            value: {
                startTime: dayjs()
                    .subtract(1, 'years')
                    .startOf('day'),
                endTime: dayjs(),
            },
        },
        {
            name: '本月',
            value: {
                startTime: dayjs()
                    .startOf('month')
                    .startOf('day'),
                endTime: dayjs(),
            },
        },
        {
            name: '本年',
            value: {
                startTime: dayjs()
                    .startOf('year')
                    .startOf('day'),
                endTime: dayjs(),
            },
        },
    ],
    datetimerange: [
        { name: '今天', value: { startTime: dayjs().startOf('day'), endTime: dayjs() } },
        { name: '最近一天', value: { startTime: dayjs().subtract(1, 'days'), endTime: dayjs() } },
        { name: '最近三天', value: { startTime: dayjs().subtract(3, 'days'), endTime: dayjs() } },
        { name: '最近一周', value: { startTime: dayjs().subtract(7, 'days'), endTime: dayjs() } },
        { name: '最近一月', value: { startTime: dayjs().subtract(1, 'months'), endTime: dayjs() } },
        { name: '最近一年', value: { startTime: dayjs().subtract(1, 'years'), endTime: dayjs() } },
        { name: '本月', value: { startTime: dayjs().startOf('month'), endTime: dayjs() } },
        { name: '本年', value: { startTime: dayjs().startOf('year'), endTime: dayjs() } },
    ],
    month: [
        { name: '本月', value: { startTime: dayjs().startOf('month'), endTime: dayjs() } },
        {
            name: '上月',
            value: {
                startTime: dayjs()
                    .subtract(1, 'month')
                    .startOf('month'),
                endTime: dayjs(),
            },
        },
        {
            name: '本年一月',
            value: {
                startTime: dayjs()
                    .startOf('year')
                    .startOf('month'),
                endTime: dayjs(),
            },
        },
    ],
    monthrange: [
        {
            name: '最近一月',
            value: {
                startTime: dayjs()
                    .subtract(1, 'months')
                    .startOf('month'),
                endTime: dayjs(),
            },
        },
        {
            name: '最近两月',
            value: {
                startTime: dayjs()
                    .subtract(2, 'months')
                    .startOf('month'),
                endTime: dayjs(),
            },
        },
        {
            name: '最近三月',
            value: {
                startTime: dayjs()
                    .subtract(3, 'months')
                    .startOf('month'),
                endTime: dayjs(),
            },
        },
        {
            name: '最近一年',
            value: {
                startTime: dayjs()
                    .subtract(1, 'years')
                    .startOf('month'),
                endTime: dayjs(),
            },
        },
        {
            name: '本年',
            value: {
                startTime: dayjs()
                    .startOf('year')
                    .startOf('month'),
                endTime: dayjs(),
            },
        },
    ],
    year: [
        { name: '本年', value: { startTime: dayjs().startOf('year') } },
        {
            name: '去年',
            value: {
                startTime: dayjs()
                    .subtract(1, 'years')
                    .startOf('year'),
            },
        },
        {
            name: '三年前',
            value: {
                startTime: dayjs()
                    .subtract(3, 'years')
                    .startOf('year'),
            },
        },
        {
            name: '五年前',
            value: {
                startTime: dayjs()
                    .subtract(5, 'years')
                    .startOf('year'),
            },
        },
    ],
    yearrange: [
        { name: '最近一年', value: { startTime: dayjs().startOf('year'), endTime: dayjs() } },
        {
            name: '最近两年',
            value: {
                startTime: dayjs()
                    .subtract(2, 'years')
                    .startOf('year'),
                endTime: dayjs(),
            },
        },
        {
            name: '最近三年',
            value: {
                startTime: dayjs()
                    .subtract(3, 'years')
                    .startOf('year'),
                endTime: dayjs(),
            },
        },
        {
            name: '最近五年',
            value: {
                startTime: dayjs()
                    .subtract(5, 'years')
                    .startOf('year'),
                endTime: dayjs(),
            },
        },
        {
            name: '最近十年',
            value: {
                startTime: dayjs()
                    .subtract(10, 'years')
                    .startOf('year'),
                endTime: dayjs(),
            },
        },
    ],
    weeknum: [
        { name: '本周', value: { startTime: dayjs().startOf('week') } },
        {
            name: '上周',
            value: {
                startTime: dayjs()
                    .subtract(1, 'weeks')
                    .startOf('week'),
            },
        },
        { name: '本月第一周', value: { startTime: dayjs().startOf('month') } },
        { name: '本年第一周', value: { startTime: dayjs().startOf('year') } },
    ],
    weeknumrange: [
        { name: '当前周', value: { startTime: dayjs().startOf('week'), endTime: dayjs().startOf('week') } },
        {
            name: '最近两周',
            value: {
                startTime: dayjs()
                    .subtract(2, 'weeks')
                    .startOf('week'),
                endTime: dayjs().startOf('week'),
            },
        },
        {
            name: '最近三周',
            value: {
                startTime: dayjs()
                    .subtract(3, 'weeks')
                    .startOf('week'),
                endTime: dayjs().startOf('week'),
            },
        },
        {
            name: '最近五周',
            value: {
                startTime: dayjs()
                    .subtract(5, 'weeks')
                    .startOf('week'),
                endTime: dayjs().startOf('week'),
            },
        },
        {
            name: '最近十周',
            value: {
                startTime: dayjs()
                    .subtract(10, 'weeks')
                    .startOf('week'),
                endTime: dayjs().startOf('week'),
            },
        },
    ],
};
export const option = {
    showWeek: true, //是否显示周几
    placeholder: { startTime: '开始时间', endTime: '结束时间' }, //{start:'',end:''}
    shortList: [],
    locale: {
        month: [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ],
        monthHead: [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ],
        week: [ '日', '一', '二', '三', '四', '五', '六' ],
        clear: '清空',
        confirm: '确定',
        yearHeadSuffix: function(year) {
            return year + '年';
        },
        weekNum: function(weeknum) {
            return '第' + weeknum + '周';
        },
    }, //显示信息
    confirmFirst: true, //第一次就搜索
    separator: ' 到 ', //双日历模式下的链接符
    showType: 'modal', //显示样式
    linkPanels: false, //双日历面板联动
    showClear: true, //是否显示清除按钮
    autoConfirm: true, //单日历模式，和周日历模式，是否自动确定
    showShortKeys: true, //是否显示快捷选项
    autoFillDate: true, //自动变更element里面的值，如果自动变更，则按照插件样式显示
    firstDayOfWeek: 7, //周起始日 1-7
    theme: 'default', //主题,blue,orange
    multipleDates: [], //当为多选日期类型时的初始值
    startTime: '', //初始开始时间
    endTime: '', //初始结束时间
    minDate: '', //最小时间
    maxDate: '', //最大时间
    showBottomButton: true, // 是否显示底部的控制按钮
    disableDate: function(date, dayjs) {
        return false; //date为当前日期,如果当前日期为不可选日期，返回true
    }, //不可选择日期
};

export {
    dayjs
};
