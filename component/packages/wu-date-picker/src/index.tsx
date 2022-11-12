import DatePicker from './picker/DatePicker';
import { dayjs } from './picker/config';
import { h, Component, Prop, Watch, WuComponent, OnConnected, OnDisConnected, Emit } from '@wu-component/web-core-plus';
import css from './index.scss';
import css1 from './css/theme.scss';
import css2 from './css/xndatepicker.scss';
import css3 from './css/iconfont/iconfont.scss';
type UISize = 'medium' | 'small' | 'mini';
import { extractClass, newEval } from "@wu-component/common";


type PickerType = 'year' | 'month' | 'date' |'multiple' | 'week' |'datetime' |'datetimerange' | 'daterange' |'monthrange' |'yearrange';

export interface LocaleOptions {
    /****************************PC端***********************************/
    month?: string[];   // '1月','2月','3月','4月',
    monthHead?: string[];  // pc端特有
    week?: string[]; // ['日','一','二','三','四','五','六']
    clear?: string; // 清空
    cancel?: string; // '取消',
    confirm?: string; // '确定',
    yearHeadSuffix?: (year: string) => string; // 日历头部年份显示
    weekNum?: (weeknum: string) => string; // 周次选择器显示
    /****************************PC端***********************************/
    /****************************移动端***********************************/
    dateSuffix: string; // '日',
    hourSuffix: string; // '时',
    minuteSuffix: string; // '分',
    secondSuffix: string;// '秒',
    /****************************移动端***********************************/
}

export interface PickerOptions {
    type: PickerType;   //  // pc端支持的类型 日历类型 date,datetime,daterange,datetimerange,month,monthrange,year,yearrange,week,multiple,weeknum,weeknumrange
    showWeek?: boolean; // 是否显示周几 default  true
    placeholder?: {
        startTime: string;
        endTime: string;
    },
    linkPanels?: boolean; // 双日历面板联动  default  false
    firstDayOfWeek?: number; // 周起始日 default 7
    showClear?: boolean; // 是否显示清除按钮
    autoConfirm?: boolean;  // 单日历模式，和周日历模式，是否自动确定  default true
    showShortKeys?: boolean; // 是否显示快捷选项 default  true
    autoFillDate?: boolean; // 自动变更element里面的值 default  true
    separator?: string; // 双日历模式下的链接符 default 到
    startTime?: string; //初始开始时间
    endTime?: string; //初始结束时间
    minDate?: string; //最小时间
    maxDate?: string; //最大时间
    locale?: LocaleOptions;
    shortList?: { name: string; value: { startTime: any; endTime: any } }[];
    confirmFirst: boolean; //初始化的时候就触发confirm   default  true
    showType: 'modal', //显示样式
    showBottomButton: boolean, // 是否显示底部控制按钮
    disableDate: (date, dayjs) => boolean,  //date为当前日期,如果当前日期为不可选日期，返回true
}

@Component({
    name: 'wu-plus-date-picker',
    css: css + css1 + css2 + css3
})
export class WuDatePicker extends WuComponent implements OnConnected, OnDisConnected {

    private picker!: DatePicker;
    constructor() {
        super();
    }

    @Prop({ default: '' })
    public default: string[] | string;

    @Prop({ default: 'date', type: String })
    public type: PickerType;

    @Prop({ default: 'mini', type: String })
    public size: UISize;

    @Prop({ default: false, type: Boolean })
    public disabled: boolean;

    @Prop(
        {
            default: {
                type: 'date',
                multipleDates: [],
                startTime: dayjs().format('YYYY-MM-DD'),
                endTime: dayjs().format('YYYY-MM-DD'),
                maxDate: '',
                separator: ' 到 ',
                showType: 'modal',
                linkPanels: false,//面板联动
                showClear: true,//是否显示清除按钮
                autoConfirm: true,
                showShortKeys: false,
                shortList: [],
                showBottomButton: false,
                autoFillDate: true,//自动变更element里面的值
                disableDate: function(date, dayjs, calcType){//还未对初始时间做处理
                   return false;
                },
            },
            type: Object
        })
    public options: PickerOptions;

    public override connected(shadowRoot: ShadowRoot) {
        this.mountPicker();

    }

    public override disConnected() {
        this.picker?.destroy();
    }

    @Emit("change")
    public change(data: any) {
        return data;
    }

    public mountPicker() {
        const that = this;
        const options: PickerOptions = this.options;
        // 数据降级处理
        if (typeof this.options === 'string'  && this.default.indexOf('{') > -1 && this.default.indexOf('}') > -1) {
            try {
                this.options = JSON.parse(this.options);
            }
            catch (e) {
                // @ts-ignore
                this.options = newEval(this.options);
            }
        }
        options.type = this.type || options.type;
        if (typeof this.default === "string" && this.default.indexOf('[') > -1 && this.default.indexOf(']') > -1) {
            this.default = newEval(this.default);
        }
        if (Array.isArray(this.default)) {
            if(this.default.length === 2) {
                options.startTime = this.default[0];
                options.endTime = this.default[1];
            }
            if (this.default.length === 1) {
                options.startTime = this.default[0];
            }
        }
        else {
            options.startTime = this.default;
        }

        // 處理日期选择的
        if (options.type === 'datetime' || options.type === 'datetimerange') {
            options.showBottomButton = true;
        }

        this.picker = new DatePicker(this.shadowRoot.querySelector("#dataPicker"), options,function(data: any){
            that.change(data);
        });
    }

    @Prop({ default: '60px', type: String })
    public height: string;

    @Watch("disabled", { immediate: true })
    public disabledChange(val: boolean, old: boolean) {}

    @Watch("value", { immediate: true })
    public valueChange(newValue: any, oldValue) {
        let startTime, endTime;
        if (Array.isArray(newValue)) {
            if(newValue.length === 2) {
                startTime = newValue[0];
                endTime = newValue[1];
            }
            if (newValue.length === 1) {
                startTime = newValue[0];
                endTime = '';
            }
        }else {
            startTime = newValue;
            endTime = '';
        }
        this.picker?.resetDate?.(startTime, endTime);
    }




    public override render(_renderProps = {}, _store = {}) {
        return (
            <div
                class="wu-data-picker"
                id="dataPicker"
                {...extractClass({}, 'wu-data-picker', {
                    ['wu-data-picker-' + this.size]: this.size,
                    'is-disabled': this.disabled,
                })}
            />
        );
    }
}
