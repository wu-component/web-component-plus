import $ from '@/common/jquery';
import TimePicker from './TimePicker';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import WeekOfYear from 'dayjs/plugin/WeekOfYear';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { format, option, shortList } from './config';

dayjs.extend(isSameOrBefore);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isLeapYear);
dayjs.extend(WeekOfYear);
dayjs.extend(advancedFormat);

export class DatePicker {
    private readonly option = {} as any;
    private readonly type: any;
    private readonly placeholder: { startTime: any; endTime: any };
    private readonly disableDate: (date, dayjs, calcType) => boolean;
    private readonly onConfirm: any;
    private readonly selectedDate: {};
    private date1: any;
    private date2: any;
    private tempdate1: any;
    private tempdate2: any;
    private multipleDates: any;
    private readonly id: string;
    private show: boolean;
    private readonly eventList: {};
    private $t: any;
    private targetDom: any;
    private $container: any;
    private selectedMultiple: any[];
    timepicker1!: TimePicker;
    timepicker2!: TimePicker;
    private removeClickEvent: () => void;
    private removeMoveEvent: () => void;
    constructor(targetDom, options, onConfirm) {
        // this.$targetDom = $(targetDom);

        this.option = $.extend(true, {}, option, options);
        this.type = this.option.type;
        // @ts-ignore
        this.format = this.type.indexOf('year') > -1 ? 'YYYY' : this.type.indexOf('month') > -1 ? 'YYYY-MM' : this.type.indexOf('time') > -1 ? 'YYYY-MM-DD' : 'YYYY-MM-DD';

        if (typeof this.option.placeholder == 'string') {
            this.placeholder = {
                startTime: this.option.placeholder,
                endTime: this.option.placeholder,
            };
        }
        if (typeof this.option.placeholder == 'object') {
            this.placeholder = {
                startTime: this.option.placeholder.startTime,
                endTime: this.option.placeholder.endTime,
            };
        }
        this.initTargetDom(targetDom);
        this.option.startTime && (this.option.startTime = dayjs(this.option.startTime));
        this.option.endTime && (this.option.endTime = dayjs(this.option.endTime));

        this.option.minDate && (this.option.minDate = dayjs(this.option.minDate));
        this.option.maxDate && (this.option.maxDate = dayjs(this.option.maxDate));
        this.disableDate =
            this.option.disableDate ||
            function(date, dayjs, calcType) {
                return false;
            };
        this.onConfirm = onConfirm;
        this.selectedDate = {}; //已确认的时间
        this.date1 = this.option.startTime ? this.option.startTime.clone() : dayjs(); //当前选择的起始时间
        this.date2 = this.option.endTime ? this.option.endTime.clone() : dayjs(); //当前选择的起始时间
        this.tempdate1 = ''; //左侧选择器的时间
        this.tempdate2 = ''; //右侧选择器的时间
        this.multipleDates = $.extend(true, [], this.option.multipleDates || []);
        if (!options.shortList) {
            this.option.shortList = shortList[this.type];
        }
        if (!options.format) {
            this.option.format = format[this.type];
        }
        this.id = this.getRandomString();
        this.show = false;
        this.eventList = {};
        this.init();
        this.addPosEvent();
        this.addTargetEvent();
    }

    private init() {
        this.setCurrentTime({ startTime: this.option.startTime, endTime: this.option.endTime });
        this.rendPicker();
        this.initCallback();
        this.confirm(false, true);
    }

    private initTargetDom(targetDom) {
        this.$t = $(targetDom);
        this.targetDom = targetDom;
        this.$t.addClass('xndatepicker-pc-input');
        const num = [ 'startTime' ];
        if (this.type.indexOf('range') > -1 || this.type == 'week') {
            num.push('endTime');
        }
        for (let i = 0; i < num.length; i++) {
            const classname = num[i];
            const dateinput = document.createElement('div');
            dateinput.classList.add(classname);
            this.$t.append(dateinput);
            if (i == 0 && num.length == 2) {
                const span = document.createElement('span');
                span.innerHTML = this.option.separator;
                this.$t.append(span);
            }
            let innerHtml = `
            <div class="input" data-type="${classname}" data-placeholder="${this.placeholder[classname]}"></div>`;
            if (this.option.showClear) {
                innerHtml += `<i class="icon-xndatepickershanchu iconfont-xndatepicker clear-btn"></i><i class="icon-xndatepickerrili iconfont-xndatepicker date-icon"></i>`;
            }
            dateinput.innerHTML = innerHtml;
        }
    }

    public resetDate(startTime, endTime) {
        const start = startTime ? dayjs(startTime) : null;
        const end = endTime ? dayjs(endTime) : null;
        this.setCurrentTime({ startTime: start, endTime: end });
        this.confirm(false);
    }

    private rendPicker() {
        this.setCurrentTime({ startTime: this.selectedDate[0], endTime: this.selectedDate[1] });
        this.rendDatePicker();
        this.setPosition();
        this.addEvent();
        this.initTimePicker();
        this.rendHoverStyle();
        this.setDate();
    }

    public resetCurrentTime(startTime = '', endTime = '') {
        //显示日历的时候，重新设置当前的日期
        if (this.type == 'multiple') {
            this.multipleDates = $.extend(true, [], this.selectedMultiple || []);
        }
        if (!this.selectedDate[0]) {
            this.selectedDate[0] = dayjs();
        }
        if (!this.selectedDate[1] && (this.type == 'week' || this.type.indexOf('range') > -1)) {
            this.selectedDate[1] = dayjs();
        }
        if (startTime) {
            this.selectedDate[0] = dayjs(startTime);
        }
        if (endTime) {
            this.selectedDate[1] = dayjs(endTime);
        }
        this.setCurrentTime({ startTime: this.selectedDate[0], endTime: this.selectedDate[1] });
        this.setCurrentDay();
        this.updateCurrentTime(1);
        this.updateCurrentTime(2);
        this.setPosition();
    }

    public updateCurrentTime(num) {
        if (this['timepicker' + num]) {
            const date = dayjs(this.selectedDate[num - 1]).format('YYYY-MM-DD HH:mm:ss');
            this['timepicker' + num].updateCurrentTime(date);
        }
    }

    private initTimePicker() {
        const that = this;
        if (this.type == 'datetime' || this.type == 'datetimerange') {
            this.timepicker1 = new TimePicker(this.$container.find('.time1 .timecont'), {
                time: that.selectedDate[0],
                onConfirm(res) {
                    let currentTime = dayjs(that.selectedDate[0]);
                    currentTime = currentTime.hour(res.value.hour);
                    currentTime = currentTime.minute(res.value.minute);
                    currentTime = currentTime.second(res.value.second);
                    that.date1 = currentTime;
                    that.$container.find('.time1 .timecont>span').html(res.str);
                },
            });
        }
        if (this.type == 'datetimerange') {
            this.timepicker2 = new TimePicker(this.$container.find('.time2 .timecont'), {
                time: that.selectedDate[1],
                onConfirm(res) {
                    let currentTime = dayjs(that.selectedDate[1]);
                    currentTime = currentTime.hour(res.value.hour);
                    currentTime = currentTime.minute(res.value.minute);
                    currentTime = currentTime.second(res.value.second);
                    that.date2 = currentTime;
                    that.$container.find('.time2 .timecont>span').html(res.str);
                },
            });
        }
    }

    private initCallback() {
        this.on('confirm', this.onConfirm);
    }

    private addTargetEvent() {
        // var clickFunc = (e) => {
        //     if (e.target == this.$targetDom.get(0)) {
        //         this.changeShowStatus();
        //     } else if (!$(e.target).parents('.xndatepicker').get(0) || ($(e.target).parents('.xndatepicker').get(0).id != this.id)) {
        //
        //         this.changeShowStatus(true);
        //     }
        // }
        const clickFunc = e => {
            if (e.target == this.targetDom) {
                this.changeShowStatus();
            } else if (
                !$(e.target)
                    .parents('.xndatepicker')
                    .get(0) ||
                $(e.target)
                    .parents('.xndatepicker')
                    .get(0).id != this.id
            ) {
                this.changeShowStatus(true);
            }
        };
        this.removeClickEvent = () => {
            document.removeEventListener('click', clickFunc, true); //捕获阶段
        };
        document.addEventListener('click', clickFunc, true); //捕获阶段
        this.targetDom.addEventListener('click', e => {
            const $t = $(e.target);
            if ($t.hasClass('clear-btn')) {
                let type = 'endTime';
                if ($t.parent().hasClass('startTime')) {
                    type = 'startTime';
                }
                this.cleardate(type);
                // this.clear(type);
            } else if ($t.hasClass('input')) {
                this.changeShowStatus();
            }
        });
    }

    private changeShowStatus(hide = false) {
        if (this.show || hide) {
            if (this.$container) {
                this.$container.removeClass('xndatepicker-animate');
                this.$container.addClass('xndatepicker-animate-out');
                setTimeout(() => {
                    if (this.$container) {
                        this.$container.remove();
                        this.$container = null;
                    }
                }, 300);
                // this.$container.fadeOut(100, () => {
                //     if (this.$container) {
                //         this.$container.remove();
                //         this.$container = null
                //     }
                // });
            }
            this.show = false;
        } else {
            if (!this.$container) {
                this.rendPicker();
            }
            this.$container.css({ display: 'block' });
            // this.$container.css({display: 'block', opacity: '0'})
            this.resetCurrentTime();
            this.$container.addClass('xndatepicker-animate');
            // this.$container.fadeIn(200);
            this.show = true;
        }
        // this.show = !this.show;
    }

    private addPosEvent() {
        const that = this;
        window.addEventListener('scroll', function() {
            that.setPosition();
        });
        window.addEventListener('resize', function() {
            that.setPosition();
        });
    }

    private setPosition() {
        if (!this.$container || !this.$container.get(0)) {
            return;
        }
        const wwidth = document.documentElement.clientWidth;
        const wheight = document.documentElement.clientHeight;
        const curcolordom = this.targetDom;

        const targetTop = curcolordom.getBoundingClientRect().top;
        let top = targetTop;
        const targetLeft = curcolordom.getBoundingClientRect().left;
        let left = targetLeft;

        const targetWidth = this.targetDom.offsetWidth;
        const targetHeight = this.targetDom.offsetHeight;

        const domwidth = this.$container.outerWidth();
        const domheight = this.$container.outerHeight();

        top = top + targetHeight + 10;

        let trangletop = -6;
        let trangleleft = 20;
        let borderWidth = '1px 0 0 1px';
        this.$container.css('transform-origin', 'top');
        if (top + domheight > wheight) {
            top = targetTop - domheight - 10;
            trangletop = domheight - 7;
            borderWidth = '0 1px 1px 0';
            this.$container.css('transform-origin', 'bottom');
        }
        if (top < 0) {
            top = 0;
        }
        if (left + domwidth > wwidth) {
            left = targetLeft + targetWidth - domwidth;
            trangleleft = domwidth - 60;
        }
        if (left < 0) {
            left = 0;
        }
        this.$container.get(0).style.top = top + 'px';
        this.$container.get(0).style.left = left + 'px';
        this.$container.find('.xntriangle').get(0).style.left = trangleleft + 'px';
        this.$container.find('.xntriangle').get(0).style.top = trangletop + 'px';
        this.$container.find('.xntriangle').get(0).style.borderWidth = borderWidth;
    }

    private rendHoverStyle($t = null) {
        //判断$t是干啥来着？
        if ($t && $t.get(0) && ((this.type.indexOf('year') < 0 && $t.hasClass('year-item')) || (this.type.indexOf('date') >= 0 && !$t.hasClass('day-item')))) {
            return;
        }
        let format = 'YYYY-MM';
        // let curFormat = 'YYYY-MM-DD';
        let date1, date2;
        if (this.type.indexOf('month') > -1) {
            format = 'YYYY-MM';
        }
        if (this.type.indexOf('month') > -1) {
            format = 'YYYY';
        }
        if (this.type.indexOf('month') > -1 || this.type.indexOf('year') > -1 || this.type.indexOf('week') > -1) {
            format = 'YYYY';
        }
        if (this.type == 'week') {
            if ($t) {
                const date = $t.attr('data-date');
                date1 = dayjs(date)
                    .subtract(parseInt(this.option.firstDayOfWeek) % 7, 'days')
                    .startOf('week')
                    .add(parseInt(this.option.firstDayOfWeek) % 7, 'days')
                    .format('YYYY-MM-DD');
                date2 = dayjs(date)
                    .subtract(parseInt(this.option.firstDayOfWeek) % 7, 'days')
                    .endOf('week')
                    .add(parseInt(this.option.firstDayOfWeek) % 7, 'days')
                    .format('YYYY-MM-DD');
                if (this.option.minDate && dayjs(date2).isBefore(this.option.minDate)) {
                    return;
                }
                if (this.option.maxDate && dayjs(date1).isAfter(this.option.maxDate)) {
                    return;
                }
                if (this.option.minDate && dayjs(date1).isBefore(this.option.minDate)) {
                    date1 = dayjs(this.option.minDate).format('YYYY-MM-DD');
                }
                if (this.option.maxDate && dayjs(date2).isAfter(this.option.maxDate)) {
                    date2 = dayjs(this.option.maxDate).format('YYYY-MM-DD');
                }
                this.$container.find('.hover').removeClass('hover');
                this.$container.find("[data-date='" + date1 + "']").addClass('hover');
                this.$container.find("[data-date='" + date2 + "']").addClass('hover');
                this.$container
                    .find("[data-date='" + date1 + "']")
                    .nextUntil(this.$container.find("[data-date='" + date2 + "']").get(0))
                    .addClass('hover');
            } else {
                this.$container.find('.hover').removeClass('hover');
            }
            this.$container
                .find('.cur-date')
                .eq(0)
                .nextUntil(this.$container.find('.cur-date').get(1))
                .addClass('hover');
            this.$container
                .find('.cur-date')
                .eq(1)
                .addClass('right-date');
            return;
        }
        if ($t && !$t.hasClass('active-day')) {
            return;
        }
        if (this.type.indexOf('range') < 0) {
            this.$container.find('.cur-date').addClass('circle-date');
            return;
        }
        let inSame = undefined;
        this.$container.find('.hover').removeClass('hover');
        if ($t && !this.$container.find('.cur-date').get(1) && !this.date2) {
            date1 = this.$container
                .find('.cur-date')
                .eq(0)
                .attr('data-date');
            date2 = $t.attr('data-date');
            $('.circle-date').removeClass('circle-date');
            $('.right-date').removeClass('right-date');
            const isBefore = dayjs(date1).isBefore(date2);
            if (this.type.indexOf('year') > -1) {
                inSame = date1 - (date1 % 12) == date2 - (date2 % 12);
            } else {
                inSame = dayjs(date1).format(format) == dayjs(date2).format(format);
            }
            if (date1 != date2) {
                if (inSame) {
                    if (isBefore) {
                        this.$container
                            .find('.cur-date')
                            .eq(0)
                            .nextUntil($t.get(0))
                            .addClass('hover');
                    } else {
                        this.$container
                            .find('.cur-date')
                            .eq(0)
                            .addClass('right-date');
                        $t.nextUntil(this.$container.find('.cur-date').get(0)).addClass('hover');
                    }
                } else {
                    if (isBefore) {
                        this.$container
                            .find('.cur-date')
                            .eq(0)
                            .nextAll('span')
                            .addClass('hover');
                        $t.prevAll('span').addClass('hover');
                    } else {
                        this.$container
                            .find('.cur-date')
                            .eq(0)
                            .addClass('right-date');
                        this.$container
                            .find('.cur-date')
                            .eq(0)
                            .prevAll('span')
                            .addClass('hover');
                        $t.nextAll('span').addClass('hover');
                    }
                }
            }
        } else {
            date1 = this.$container
                .find('.cur-date')
                .eq(0)
                .attr('data-date');
            date2 = this.$container
                .find('.cur-date')
                .eq(1)
                .attr('data-date');
            if (
                this.$container
                    .find('.cur-date')
                    .eq(0)
                    .hasClass('circle-date')
            ) {
                date2 = date1;
            }
            $('.circle-date').removeClass('circle-date');
            $('.right-date').removeClass('right-date');
            const isBefore = dayjs(date1, 'YYYY-MM-DD').isBefore(dayjs(date2, 'YYYY-MM-DD'));
            if (this.type.indexOf('year') > -1) {
                inSame = date1 - (date1 % 12) == date2 - (date2 % 12);
            } else {
                inSame = dayjs(date1).format(format) == dayjs(date2).format(format);
            }

            if (date1 != date2) {
                if (inSame) {
                    if (isBefore) {
                        this.$container
                            .find('.cur-date')
                            .eq(0)
                            .nextUntil(this.$container.find('.cur-date').get(1))
                            .addClass('hover');
                    } else {
                        this.$container
                            .find('.cur-date')
                            .eq(1)
                            .nextUntil(this.$container.find('.cur-date').get(0))
                            .addClass('hover');
                    }
                } else {
                    this.$container
                        .find('.cur-date')
                        .eq(0)
                        .nextAll('span')
                        .addClass('hover');
                    this.$container
                        .find('.cur-date')
                        .eq(1)
                        .prevAll('span')
                        .addClass('hover');
                }
            }
        }
        if (date1 == date2) {
            this.$container
                .find('.cur-date')
                .eq(0)
                .addClass('circle-date');
        } else {
            this.$container
                .find('.cur-date')
                .eq(1)
                .addClass('right-date');
        }
    }

    public setDate() {
        const date = {};

        this.$container.find('.cur-date').each((ele, i) => {
            // @ts-ignore
            const _datekey = $(ele)
                .parents('.date-item')
                .attr('data-id');
            const day = dayjs($(ele).attr('data-date'), 'YYYY-MM-DD').format('YYYY-MM-DD');
            let time = '';
            if (this.type.indexOf('time')) {
                time = ' ' + this.$container.find('.time' + (i + 1) + ' .timecont>span').html();
            }
            date[i] = dayjs(day + time, 'YYYY-MM-DD HH:mm:ss');
            this.$container.find('.time' + (i + 1) + '>input').val(day);
            if (this.$container.find('.circle-date').get(0) == ele) {
                const j = 1;
                date[j] = dayjs(day + time, 'YYYY-MM-DD HH:mm:ss');
                this.$container.find('.time' + (j + 1) + '>input').val(day);
            }
        });
        this.date1 = date[0];
        this.date2 = date[1];
    }

    private rendOtherDateList(otherdatenum) {
        if (this.type.indexOf('range') < 0) {
            return;
        }
        const datenum = otherdatenum == 1 ? 2 : 1;

        if (otherdatenum < datenum) {
            if (this.type.indexOf('date') > -1 || this.type == 'week') {
                // @ts-ignore
                if (dayjs(this['tempdate' + otherdatenum].format('YYYY-MM')).isSameOrAfter(this['tempdate' + datenum].format('YYYY-MM')) || this.option.linkPanels) {
                    this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().add(1, 'months');
                    this.geneDateList(this['tempdate' + datenum], this.$container.find('.dater' + datenum));
                }
            }
            if (this.type.indexOf('month') > -1) {
                if (this['tempdate' + otherdatenum].isSameOrAfter(this['tempdate' + datenum], 'year') || this.option.linkPanels) {
                    this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().add(1, 'years');
                }
                this.rendMonth(datenum);
            }
            if (this.type.indexOf('weeknum') > -1) {
                if (this['tempdate' + otherdatenum].isSameOrAfter(this['tempdate' + datenum], 'year') || this.option.linkPanels) {
                    this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().add(1, 'years');
                }
                this.rendWeekNum(datenum);
            }
            if (this.type.indexOf('year') > -1) {
                const year1 = this['tempdate' + otherdatenum].format('YYYY');
                const year2 = this['tempdate' + datenum].format('YYYY');
                const year1P = year1 - (year1 % 12);
                const year2P = year2 - (year2 % 12);

                if (year1P >= year2P || this.option.linkPanels) {
                    this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().add(12, 'years');
                }
                this.rendYears(datenum);
            }
        } else {
            if (this.type.indexOf('date') > -1 || this.type == 'week') {
                // @ts-ignore
                if (dayjs(this['tempdate' + otherdatenum].format('YYYY-MM')).isSameOrBefore(this['tempdate' + datenum].format('YYYY-MM')) || this.option.linkPanels) {
                    this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().subtract(1, 'months');
                    this.geneDateList(this['tempdate' + datenum], this.$container.find('.dater' + datenum));
                }
            }
            if (this.type.indexOf('month') > -1) {
                if (this['tempdate' + otherdatenum].isSameOrBefore(this['tempdate' + datenum], 'year') || this.option.linkPanels) {
                    this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().subtract(1, 'years');
                }
                this.rendMonth(datenum);
            }
            if (this.type.indexOf('weeknum') > -1) {
                if (this['tempdate' + otherdatenum].isSameOrBefore(this['tempdate' + datenum], 'year') || this.option.linkPanels) {
                    this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().subtract(1, 'years');
                    this.rendWeekNum(datenum);
                }
            }
            if (this.type.indexOf('year') > -1) {
                // eslint-disable-next-line no-var
                const year1 = this['tempdate' + otherdatenum].format('YYYY');
                const year2 = this['tempdate' + datenum].format('YYYY');
                const year1P = year1 - (year1 % 12);
                const year2P = year2 - (year2 % 12);
                if (year1P <= year2P || this.option.linkPanels) {
                    this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().subtract(12, 'years');
                }
                this.rendYears(datenum);
            }
        }
        // console.log(this["tempdate" + otherdatenum].format('YYYY-MM-DD'))
    }

    public addEvent() {
        const mouseMoveFunc = e => {
            const $t = $(e.target);
            if (!this.$container) {
                return;
            }
            if ($t.parents('.xndatepicker').get(0) == this.$container.get(0)) {
                if ($t.hasClass('day-item') || $t.hasClass('month-item') || $t.hasClass('year-item') || $t.hasClass('week-item')) {
                    this.rendHoverStyle($t);
                }
            }
        };
        this.removeMoveEvent = () => {
            document.removeEventListener('mousemove', mouseMoveFunc); //捕获阶段
        };
        //
        document.addEventListener('mousemove', mouseMoveFunc);
        this.$container.get(0).addEventListener('click', e => {
            const $t = $(e.target);
            const datenum = $t.parents('.dater1').get(0) ? 1 : 2;
            if ($t.hasClass('skip-date')) {
                const func = $t.attr('data-func');
                const unit = $t.attr('data-unit');
                var newdate = dayjs(this['tempdate' + datenum]).clone();
                newdate = newdate[func](1, unit + 's').startOf(unit);
                if (this.checkDisable(newdate, unit, this.type, unit)) {
                    return;
                }
                this['tempdate' + datenum] = this['tempdate' + datenum][func](1, unit + 's');
                if (unit == 'year') {
                    if (this.option.minDate && this['tempdate' + datenum].isBefore(this.option.minDate)) {
                        this['tempdate' + datenum] = dayjs(this.option.minDate);
                    }
                    if (this.option.maxDate && this['tempdate' + datenum].isAfter(this.option.maxDate)) {
                        this['tempdate' + datenum] = dayjs(this.option.maxDate);
                    }
                }
                this.geneDateList(this['tempdate' + datenum], this.$container.find('.dater' + datenum));
                this.rendOtherDateList(datenum);
            }
            if ($t.hasClass('month-prev-year')) {
                this.rendMonth(datenum);
            }
            if ($t.hasClass('month-next-year')) {
                this.rendMonth(datenum);
            }
            if ($t.hasClass('week-prev-year')) {
                this.rendWeekNum(datenum);
            }
            if ($t.hasClass('week-next-year')) {
                this.rendWeekNum(datenum);
            }
            if ($t.hasClass('year-next-year')) {
                let newdate = $.extend(true, {}, dayjs(this['tempdate' + datenum]));
                newdate = newdate['add'](12, 'years').startOf('year');
                if (this.checkDisable(newdate, 1, 'year')) {
                    return;
                }
                this['tempdate' + datenum] = this['tempdate' + datenum].add(12, 'years');
                this.rendYears(datenum);
                this.rendOtherDateList(datenum);
            }
            if ($t.hasClass('year-prev-year')) {
                let newdate = $.extend(true, {}, dayjs(this['tempdate' + datenum]));
                newdate = newdate.startOf('year');
                if (this.checkDisable(newdate, -1, 'year')) {
                    return;
                }
                this['tempdate' + datenum] = this['tempdate' + datenum].subtract(12, 'years');
                this.rendYears(datenum);
                this.rendOtherDateList(datenum);
            }

            if ((this.type.indexOf('date') > -1 && $t.hasClass('active-day')) || ($t.hasClass('day-item') && this.type == 'week')) {
                this['date' + datenum] = this['tempdate' + datenum].date($t.html()).clone();

                this.setCurClass($t);
                this.setDate();
                if ((this.type.indexOf('date') > -1 || this.type == 'week') && $t.hasClass('day-item')) {
                    this.autoConfirm($t);
                }
            }
            if (this.type.indexOf('multiple') > -1 && $t.hasClass('day-item') && !$t.hasClass('disable-day')) {
                const date = $t.attr('data-date');
                const key = this.multipleDates.indexOf(date);
                if (key > -1) {
                    this.multipleDates.splice(key, 1);
                    $t.removeClass('cur-date');
                } else {
                    this.multipleDates.push(date);
                    $t.addClass('cur-date');
                }
            }
            if ($t.hasClass('confirm-date')) {
                this.confirm();
            }
            if ($t.hasClass('current-date')) {
                this.currentdate();
            }
            if ($t.hasClass('clear-date')) {
                this.cleardate();
            }
            if ($t.hasClass('year') || $t.hasClass('month-info')) {
                this.rendYears(datenum);
            }
            if ($t.hasClass('month')) {
                this.rendMonth(datenum);
            }
            if ($t.hasClass('year-item') && !$t.hasClass('disable-year')) {
                if (this.type.indexOf('year') > -1) {
                    this['date' + datenum] = dayjs($t.html());
                    this.setCurClass($t);
                    this.setDate();
                    this.autoConfirm($t);
                } else if (this.type.indexOf('weeknum') > -1) {
                    this['tempdate' + datenum] = this['tempdate' + datenum].year($t.html());
                    this.rendWeekNum(datenum);
                    this.rendOtherDateList(datenum);
                } else {
                    this['tempdate' + datenum] = this['tempdate' + datenum].year($t.html());
                    this.rendMonth(datenum);
                    this.rendOtherDateList(datenum);
                }
            }
            if ($t.hasClass('month-item') && !$t.hasClass('disable-month')) {
                if (this.type.indexOf('month') > -1) {
                    this['date' + datenum] = dayjs($t.attr('data-date'));
                    this.setCurClass($t);
                    this.setDate();
                    this.autoConfirm($t);
                } else {
                    this['tempdate' + datenum] = dayjs($t.attr('data-date'));
                    // this['date'+datenum]=null;
                    this.geneDateList(this['tempdate' + datenum], this.$container.find('.dater' + datenum));
                    this.rendOtherDateList(datenum);
                }
            }
            if ($t.hasClass('week-item') && !$t.hasClass('disable-week')) {
                this['date' + datenum] = dayjs($t.attr('data-date'));
                if (this.type.indexOf('weeknum') > -1) {
                    this.setCurClass($t);
                    this.setDate();
                    this.autoConfirm($t);
                }
            }
            if ($t.get(0).nodeName == 'LI' && $t.parents('.shortcut').get(0)) {
                const index = $t
                    .parent()
                    .find('LI')
                    .index($t.get(0));
                if (this.type == 'multiple') {
                    const startTime = Array.isArray(this.option.shortList[index].value.startTime) ? this.option.shortList[index].value.startTime : [ this.option.shortList[index].value.startTime ];
                    this.multipleDates = startTime;
                } else {
                    this.setCurrentTime(this.option.shortList[index].value);
                }
                this.setCurrentDay();
                this.updateCurrentTime(1);
                this.updateCurrentTime(2);
                this.autoConfirm();
            }
            this.rendHoverStyle();
            // this.rendOtherDateList(datenum);
        });
    }

    private autoConfirm(el?: HTMLElement) {
        if (!this.option.autoConfirm) {
            return;
        }
        if ((this.type.indexOf('range') < 0 && this.type.indexOf('time') < 0) || this.type == 'week') {
            this.confirm();
        } else if (this.type.indexOf('range') > -1 && this.date2 && this.date1 && this.type.indexOf('time') < 0) {
            this.confirm();
        }
    }

    private setCurClass($t) {
        if (this.type == 'week') {
            const date = $t.attr('data-date');
            let date1 = dayjs(date)
                .clone()
                .subtract(parseInt(this.option.firstDayOfWeek) % 7, 'days')
                .startOf('week')
                .add(parseInt(this.option.firstDayOfWeek) % 7, 'days')
                .format('YYYY-MM-DD');
            // var date1 = dayjs(date).clone().startOf('week').format('YYYY-MM-DD')
            let date2 = dayjs(date)
                .clone()
                .subtract(parseInt(this.option.firstDayOfWeek) % 7, 'days')
                .endOf('week')
                .add(parseInt(this.option.firstDayOfWeek) % 7, 'days')
                .format('YYYY-MM-DD');
            if (this.option.minDate && dayjs(date1).isBefore(this.option.minDate)) {
                date1 = dayjs(this.option.minDate).format('YYYY-MM-DD');
            }
            if (this.option.maxDate && dayjs(date2).isAfter(this.option.maxDate)) {
                date2 = dayjs(this.option.maxDate).format('YYYY-MM-DD');
            }
            $('.cur-date').removeClass('cur-date');
            this.date1 = dayjs(date1);
            this.date2 = dayjs(date2);
            this.$container.find('[data-date="' + this.date1.format('YYYY-MM-DD') + '"]').addClass('cur-date');
            this.$container.find('[data-date="' + this.date2.format('YYYY-MM-DD') + '"]').addClass('cur-date');
        } else {
            if (this.type.indexOf('range') > -1) {
                if (this.$container.find('.cur-date').length() > 1 || this.$container.find('.circle-date').get(0)) {
                    this.$container.find('.cur-date').removeClass('cur-date');
                } else {
                    if (
                        this.$container
                            .find('.cur-date')
                            .eq(0)
                            .attr('data-date') == $t.attr('data-date')
                    ) {
                        $t.addClass('circle-date');
                    }
                }
            } else {
                $('.cur-date').removeClass('cur-date');
            }
            $t.addClass('cur-date');
        }
    }

    private correctDate(date1) {
        //修正当前时间与最大最小值
        if (date1.startTime && this.option.maxDate && dayjs(date1.startTime).isAfter(this.option.maxDate)) {
            date1.startTime = dayjs(this.option.maxDate).clone();
        }
        if (date1.endTime && this.option.minDate && dayjs(date1.endTime).isBefore(this.option.minDate)) {
            date1.endTime = dayjs(this.option.minDate).clone();
        }
        if (date1.startTime && this.option.minDate && dayjs(date1.startTime).isBefore(this.option.minDate)) {
            date1.startTime = dayjs(this.option.minDate).clone();
        }
        if (date1.endTime && this.option.maxDate && dayjs(date1.endTime).isAfter(this.option.maxDate)) {
            date1.endTime = dayjs(this.option.maxDate).clone();
        }
        return date1;
    }

    public setCurrentTime(date2, _isinit = false) {
        let date1 = $.extend(true, {}, date2);
        date1.startTime = date2.startTime ? date2.startTime.clone() : dayjs();
        date1.endTime = date2.endTime ? date2.endTime.clone() : dayjs();
        date1 = this.correctDate(date1);

        const date = $.extend(true, {}, date1);
        date1.startTime && (date.startTime = date1.startTime.clone());
        date1.endTime && (date.endTime = date1.endTime.clone());
        this.selectedDate[0] = date1.startTime;
        this.selectedDate[1] = date1.endTime;
        const startTime = date.startTime;
        if (this.type.indexOf('range') > -1) {
            //双日历时
            if (this.type.indexOf('year') > -1) {
                const endTime = date.endTime;
                const endTime1 = endTime.format('YYYY');
                const startTime1 = startTime.format('YYYY');
                const endYearP = endTime1 - (endTime1 % 12);
                const startYearP = startTime1 - (startTime1 % 12);
                if (startYearP + 12 >= endYearP) {
                    this.tempdate2 = endTime;
                    this.tempdate1 = endTime.clone().subtract('12', 'years');
                } else {
                    this.tempdate1 = startTime;
                    this.tempdate2 = endTime;
                }
            } else if (this.type.indexOf('date') > -1) {
                const endTime = date.endTime;
                if (startTime.format('YYYY-MM') == endTime.format('YYYY-MM')) {
                    this.tempdate1 = dayjs(endTime).subtract(1, 'months');
                    this.tempdate2 = endTime;
                } else {
                    this.tempdate1 = startTime;
                    this.tempdate2 = endTime;
                }
            } else if (this.type.indexOf('month') > -1 || this.type.indexOf('weeknum') > -1) {
                const endTime = date.endTime;
                if (startTime.format('YYYY') == endTime.format('YYYY')) {
                    this.tempdate2 = endTime;
                    this.tempdate1 = dayjs(endTime)
                        .clone()
                        .subtract(1, 'years');
                } else {
                    this.tempdate1 = startTime;
                    this.tempdate2 = endTime;
                }
            }
        } else if (this.type != 'week') {
            //单日历时
            this.date1 = startTime;
            this.date2 = date.endTime;
            this.tempdate1 = this.date1.clone();
            delete this.selectedDate[1];
        } else {
            //周日历时
            let date1 = dayjs(startTime)
                .clone()
                .subtract(parseInt(this.option.firstDayOfWeek) % 7, 'days')
                .startOf('week')
                .add(parseInt(this.option.firstDayOfWeek) % 7, 'days');
            // var date1 = dayjs(startTime).startOf('week');
            let date2 = date1.clone().add(6, 'days');
            if (this.option.minDate && dayjs(date1).isBefore(this.option.minDate)) {
                date1 = dayjs(this.option.minDate.clone());
            }
            if (this.option.maxDate && dayjs(date2).isAfter(this.option.maxDate)) {
                date2 = dayjs(this.option.maxDate.clone());
            }
            this.tempdate1 = date1;
            this.tempdate2 = date2;
            this.selectedDate[0] = date1.clone();
            this.selectedDate[1] = date2.clone();
        }
        this.date1 = this.selectedDate[0].clone();
        this.selectedDate[1] && (this.date2 = this.selectedDate[1].clone());
    }

    public setCurrentDay() {
        if (this.type.indexOf('range') < 0) {
            this.$container.find('.dater2').remove();
            this.$container.find('.time2').remove();
        }
        if (this.type.indexOf('time') < 0) {
            this.$container.find('.timepicker').remove();
        }
        if (this.type.indexOf('year') > -1) {
            this.rendYears(1);
            this.rendYears(2);
        } else if (this.type.indexOf('month') > -1) {
            this.rendMonth(1);
            this.rendMonth(2);
        } else if (this.type.indexOf('weeknum') > -1) {
            this.rendWeekNum(1);
            this.rendWeekNum(2);
        } else {
            this.geneDateList(this.tempdate1, this.$container.find('.dater1'));
            this.geneDateList(this.tempdate2, this.$container.find('.dater2'));
        }
        if (this.type != 'multiple') {
            for (const i in this.selectedDate) {
                const yearmonth = this.selectedDate[i].format('YYYY-MM');
                const date = this.selectedDate[i].format('DD');
                //const time = this.selectedDate[i].format('HH:mm:ss');
                this.$container.find(".active-day[data-date='" + yearmonth + '-' + date + "']").addClass('cur-date');
            }
            this.setCurrentClass();
        }
    }

    public setCurrentClass() {
        if (this.selectedDate[0]) {
            const date1 = this.selectedDate[0].format(this.format);
            this.$container.find('.active-day[data-date="' + date1 + '"]').addClass('cur-date');
        }
        if (this.selectedDate[1]) {
            const date2 = this.selectedDate[1].format(this.format);
            this.$container.find('.active-day[data-date="' + date2 + '"]').addClass('cur-date');
            if (this.type == 'week') {
                this.$container.find('.day-item[data-date="' + date2 + '"]').addClass('cur-date');
            }
            if (this.selectedDate[0].format(this.format) == this.selectedDate[1].format(this.format)) {
                this.$container.find('.active-day[data-date="' + date2 + '"]').addClass('circle-date');
            }
        }
        this.rendHoverStyle();
    }

    public cleardate(type = '') {
        if (type == 'endTime') {
            this.date2 = '';
            this.selectedDate[1] = '';
        } else if (type == 'startTime') {
            this.date1 = '';
            this.selectedDate[0] = '';
            this.selectedMultiple = [];
        } else {
            this.date1 = '';
            this.date2 = '';
            this.selectedDate[0] = '';
            this.selectedDate[1] = '';
            this.selectedMultiple = [];
        }
        this.confirm();
    }

    public currentdate() {
        this.date1 = dayjs();
        this.date2 = dayjs();
        this.confirm();
    }

    public confirm(clear = false, isFirst = false) {
        let canconfirm = false;
        let showstrStart = '';
        let showstrEnd = '';
        if (this.type == 'multiple') {
            if (clear) {
                if ((isFirst && this.option.confirmFirst) || !isFirst) {
                    this.trigger('confirm', { startTime: this.selectedMultiple, dayjs: dayjs });
                }
                showstrStart = '';
                canconfirm = true;
            } else {
                this.multipleDates = this.multipleDates.map(e => {
                    return dayjs(e).format(this.option.format);
                });
                this.selectedMultiple = this.multipleDates;
                if ((isFirst && this.option.confirmFirst) || !isFirst) {
                    this.trigger('confirm', { startTime: this.selectedMultiple, dayjs: dayjs });
                }
                showstrStart = this.multipleDates.join(',');
                canconfirm = true;
            }
        } else {
            let startTime, endTime;
            if (isFirst) {
                const date1 = this.correctDate(this.option);
                startTime = date1.startTime ? dayjs(date1.startTime) : '';
                endTime = date1.endTime ? dayjs(date1.endTime) : '';
                if (this.type.indexOf('range') > -1 || this.type == 'week') {
                    if (this.option.confirmFirst) {
                        this.trigger('confirm', { startTime: startTime, endTime: endTime, dayjs: dayjs });
                    }
                    showstrStart = startTime ? startTime.format(this.option.format) : this.placeholder.startTime;
                    showstrEnd = endTime ? endTime.format(this.option.format) : this.placeholder.endTime;
                } else if (this.type.indexOf('range') < 0) {
                    if (this.option.confirmFirst) {
                        this.trigger('confirm', { startTime: startTime, dayjs: dayjs });
                    }
                    showstrStart = startTime ? startTime.format(this.option.format) : this.placeholder.startTime;
                }
                canconfirm = true;
            } else {
                this.date1 && (this.selectedDate[0] = this.date1.clone());
                this.date2 && (this.selectedDate[1] = this.date2.clone());
                if (clear) {
                    if ((isFirst && this.option.confirmFirst) || !isFirst) {
                        this.trigger('confirm', { startTime: this.selectedDate[0], endTime: this.selectedDate[1] });
                    }
                    showstrStart = '';
                    canconfirm = true;
                }
                if (this.type.indexOf('range') > -1 || this.type == 'week') {
                    if ((isFirst && this.option.confirmFirst) || !isFirst) {
                        this.trigger('confirm', {
                            startTime: this.selectedDate[0],
                            endTime: this.selectedDate[1],
                            dayjs: dayjs,
                        });
                    }
                    try {
                        showstrStart = this.selectedDate[0] ? this.selectedDate[0].format(this.option.format) : '';
                        showstrEnd = this.selectedDate[1] ? this.selectedDate[1].format(this.option.format) : '';
                    } catch (e) {
                        showstrStart = '';
                        showstrEnd = '';
                    }
                    canconfirm = true;
                } else if (this.type.indexOf('range') < 0) {
                    if ((isFirst && this.option.confirmFirst) || !isFirst) {
                        this.trigger('confirm', { startTime: this.selectedDate[0], dayjs: dayjs });
                    }
                    try {
                        showstrStart = this.selectedDate[0].format(this.option.format);
                    } catch (e) {
                        showstrStart = '';
                    }
                    canconfirm = true;
                }
            }
        }
        if (!canconfirm) {
            return;
        }
        this.changeShowStatus(true);
        this.fillInput(showstrStart, showstrEnd);
    }

    private fillInput(showstrStart, showstrEnd) {
        if (!this.option.autoFillDate) {
            return;
        }
        this.targetDom.querySelector('.' + 'startTime' + ' .input').innerHTML = showstrStart;
        this.targetDom.querySelector('.' + 'endTime' + ' .input') && (this.targetDom.querySelector('.' + 'endTime' + ' .input').innerHTML = showstrEnd);
        // if (this.targetDom.nodeName == 'INPUT') {
        //     this.targetDom.value = showstr;
        // } else {
        //     this.targetDom.innerHTML = showstr;
        // }
        // // this.$targetDom.addClass('iconfont-xndatepicker icon-xndatepickerrili xndatepicker-input')
        // this.targetDom.setAttribute('data-placeholder', this.placeholder.startTime)
    }

    private rendWeekNum(datenum) {
        if (!this.$container.find('.dater' + datenum).get(0)) {
            return;
        }
        const html = `
                <div class="year-picker">
                    <div class="prev">
                        <span class="iconfont-xndatepicker icon-xndatepickerprev1 week-prev-year skip-date" data-unit="year" data-func="subtract"></span>
                    </div>
                    <div class="month-info"></div>
                    <div class="next">
                        <span class="iconfont-xndatepicker icon-xndatepickerprev1 week-prev-year skip-date" data-unit="year" data-func="add"></span>
                    </div>
                </div>
                <div class="weeknum-list"></div>
            `;
        this.$container
            .find('.dater' + datenum)
            .empty()
            .append(html);
        const weeklist = this.getWeekNumList(datenum);
        this.$container
            .find('.dater' + datenum)
            .find('.weeknum-list')
            .append(weeklist);
        this.setTodayDot('week');
    }

    private getWeekNumList(datenum) {
        const curYear = dayjs(this['tempdate' + datenum]).format('YYYY');
        this.$container.find('.dater' + datenum + ' .month-info').get(0).innerHTML = curYear;
        let html = '';
        let date;
        const weeknums = dayjs(curYear + '/01/01').isoWeeksInYear();
        for (let i = 0; i < weeknums; i++) {
            date = dayjs(curYear + '01/01')
                .week(i + 1)
                .startOf('week');
            if (date.format('YYYY') != curYear) {
                date = dayjs(curYear + '01/01').format('YYYY-MM-DD');
            } else {
                date = date.format('YYYY-MM-DD');
            }
            const disable =
                !(
                    ((this.option.minDate &&
                        dayjs(this.option.minDate)
                            .startOf('week')
                            .isSameOrBefore(date)) ||
                        !this.option.minDate) &&
                    ((this.option.maxDate &&
                        dayjs(this.option.maxDate)
                            .endOf('week')
                            .isSameOrAfter(dayjs(date).endOf('week'))) ||
                        !this.option.maxDate)
                ) || this.disableDate(date, dayjs, 'weeknum');
            html += `<span class="week-item ${disable ? 'disable-week' : 'active-day'}" data-date="${date}">` + this.option.locale.weekNum(i + 1) + '</span>';
        }
        return html;
    }

    private rendMonth(datenum) {
        if (!this.$container.find('.dater' + datenum).get(0)) {
            return;
        }
        const html = `
                <div class="year-picker">
                    <div class="prev">
                    <span class="iconfont-xndatepicker icon-xndatepickerprev1 month-prev-year skip-date" data-unit="year" data-func="subtract"></span>
</div>
                    <div class="month-info"></div>
                    <div class="next">
                    <span class="iconfont-xndatepicker icon-xndatepickerprev1 month-next-year skip-date" data-unit="year" data-func="add"></span>
</div>
                </div>
                <div class="month-list">

</div>
            `;
        this.$container
            .find('.dater' + datenum)
            .empty()
            .append(html);
        const monthlist = this.getMonthList(datenum);
        this.$container
            .find('.dater' + datenum)
            .find('.month-list')
            .append(monthlist);
        this.setTodayDot('month');
    }

    private getMonthList(datenum) {
        const curYear = dayjs(this['tempdate' + datenum]).format('YYYY');
        this.$container.find('.dater' + datenum + ' .month-info').get(0).innerHTML = curYear;
        let html = '';
        for (let i = 0; i < 12; i++) {
            // @ts-ignore
            const disable =
                !(
                    ((this.option.minDate &&
                        dayjs(this.option.minDate)
                            .startOf('month')
                            .isSameOrBefore(curYear + '/' + (i + 1) + '/01')) ||
                        !this.option.minDate) &&
                    ((this.option.maxDate &&
                        dayjs(this.option.maxDate)
                            .startOf('month')
                            .isSameOrAfter(curYear + '/' + (i + 1) + '/01')) ||
                        !this.option.maxDate)
                ) || this.disableDate(dayjs(curYear + '/' + (i + 1), 'YYYY/MM'), dayjs, 'month');
            html += `<span class="month-item ${disable ? 'disable-month' : 'active-day'}" data-date="${dayjs(curYear + '/' + (i + 1), 'YYYY/MM').format('YYYY-MM')}">` + this.option.locale.month[i] + '</span>';
        }
        return html;
    }

    private rendYears(datenum) {
        if (!this.$container.find('.dater' + datenum).get(0)) {
            return;
        }
        const html = `
                <div class="year-picker">
                    <div class="prev">
                    <span class="iconfont-xndatepicker icon-xndatepickerprev1 year-prev-year"></span>
</div>
                    <div class="year-info"></div>
                    <div class="next">
                    <span class="iconfont-xndatepicker icon-xndatepickerprev1 year-next-year"></span>
</div>
                </div>
                <div class="year-list">

</div>
            `;
        this.$container
            .find('.dater' + datenum)
            .empty()
            .append(html);
        const yearlist = this.getYearList(datenum);
        this.$container
            .find('.dater' + datenum)
            .find('.year-list')
            .append(yearlist);
        this.setTodayDot('year');
    }

    private getYearList(datenum) {
        const chooseYear: number = (dayjs(this['tempdate' + datenum]).format('YYYY') as unknown) as number;
        const curYear: number = (chooseYear - (chooseYear % 12)) as number;
        this.$container.find('.dater' + datenum + ' .year-info').html(curYear + '-' + (parseInt(String(curYear)) + 11));
        let html = '';
        for (let i = 0; i < 12; i++) {
            // @ts-ignore
            const disable =
                !(
                    ((this.option.minDate &&
                        dayjs(this.option.minDate)
                            .startOf('year')
                            .isSameOrBefore(parseInt(curYear) + i + '/01/01')) ||
                        !this.option.minDate) &&
                    ((this.option.maxDate &&
                        dayjs(this.option.maxDate)
                            .startOf('year')
                            .isSameOrAfter(parseInt(curYear) + i + '/01/01')) ||
                        !this.option.maxDate)
                ) || this.disableDate(dayjs(parseInt(curYear) + i + '/01/01'), dayjs, 'year');
            html += `<span class="year-item ${disable ? 'disable-year' : 'active-day'}" data-date="${parseInt(String(curYear)) + i}">` + (parseInt(String(curYear)) + i) + '</span>';
        }
        return html;
    }

    private getDateCont() {
        let html = `<div class="year-picker">
                            <div class="prev">
                            <span class="iconfont-xndatepicker icon-xndatepickerprev prev-year skip-date" data-unit="year" data-func="subtract"></span>
                            <span class="iconfont-xndatepicker icon-xndatepickerprev1 prev-month skip-date" data-unit="month" data-func="subtract"></span>
</div>
                            <div class="year-info"></div>
                            <div class="next">
                            <span class="iconfont-xndatepicker icon-xndatepickerprev1 next-month skip-date" data-unit="month" data-func="add"></span>
                            <span class="iconfont-xndatepicker icon-xndatepickerprev next-year skip-date" data-unit="year" data-func="add"></span>
</div>
                        </div>`;
        if (this.option.showWeek) {
            html += `<div class="week">`;
            for (let i = parseInt(this.option.firstDayOfWeek); i < parseInt(this.option.firstDayOfWeek) + 7; i++) {
                html += `<span>${this.option.locale.week[i % 7]}</span>`;
            }
            html += `</div>`;
        }

        html += `<div class="dater">
                        </div>`;
        return html;
    }

    private rendDatePicker() {
        const div = document.createElement('div');
        div.classList.add('xndatepicker', this.type, this.option.theme);
        div.id = this.id;
        const bottomStr = this.option.showBottomButton
            ? `
                <div class="xn-bottom">
<!--            <a  class="xn-btn current-date">现在</a>-->
            <a  class="xn-btn clear-date">${this.option.locale.clear}</a>
            <a class="xn-btn confirm-date">${this.option.locale.confirm}</a>
        </div>`
            : '';
        const html =
            `
        <div class="xn-top">
            <div class="shortcut">

            </div>
            <div class="date-main">
                <div class="timepicker">
                    <div class="timeitem time1">
                        <input>
                        <div class="timecont">
                        <span></span>
</div>
                    </div>
                    <div class="timeitem time2">
                        <input>
                        <div class="timecont">
                        <span></span>
</div>
                    </div>
                </div>
                <div class="datepicker">
                    <div class="date-item dater1" data-id="1">
                        ` +
            this.getDateCont() +
            `
                    </div>
                    <div class="date-item dater2" data-id="2">
                        ` +
            this.getDateCont() +
            `
                    </div>
                </div>
            </div>
        </div>
        ${bottomStr}

        <div class="xntriangle"></div>`;
        div.innerHTML = html;
        document.body.appendChild(div);
        this.$container = $('#' + this.id);
        // this.changeShowStatus(true)
        this.setCurrentDay();
        this.geneShortList();
        if (this.type.indexOf('range') < 0 && this.type.indexOf('time') < 0 && this.type != 'multiple' && this.option.autoConfirm) {
            this.$container.find('.confirm-date').remove();
        } else {
            if (!this.option.showClear && this.option.autoConfirm && this.type != 'multiple') {
                this.$container.find('.xn-bottom').remove();
            }
        }
        if (!this.option.showClear) {
            this.$container.find('.clear-date').remove();
        }
        if (!this.option.showShortKeys || this.option.shortList.length < 1) {
            this.$container.find('.shortcut').remove();
        }
    }

    private geneShortList() {
        let ul = '<ul>';
        for (let i = 0; i < this.option.shortList.length; i++) {
            ul += '<li>' + this.option.shortList[i].name + '</li>';
        }
        ul += '</ul>';
        this.$container
            .find('.shortcut')
            .empty()
            .append(ul);
    }

    private _getDaysNum(date) {
        const ynow = date.year();
        const mnow = date.month();
        const m_days = [ 31, 28 + this.is_leap(ynow), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]; //每个月的天数
        return m_days[mnow];
    }

    private geneDateList(curdate, $cont) {
        if (!$cont || !curdate || (this.type.indexOf('date') < 0 && this.type != 'week' && this.type != 'multiple')) {
            return;
        }
        const date = curdate.clone();
        $cont.empty().html(this.getDateCont());
        const ynow = date.year();
        const mnow = date.month() + 1;
        let firstday =
            dayjs(date)
                .startOf('month')
                .day() - parseInt(this.option.firstDayOfWeek);
        if (firstday < 0) {
            firstday += 7;
        }
        const m_days = this._getDaysNum(date);
        const l_days = this._getDaysNum(dayjs(date).subtract(1, 'months'));
        const ldates = [];
        for (let i = firstday - 1; i >= 0; i--) {
            ldates.push({ day: l_days - i });
        }
        for (let i = 0; i < m_days; i++) {
            const disable = this.checkDisable(dayjs(ynow + '/' + mnow + '/' + (i + 1), 'YYYY/MM/DD'), 0, this.type, 'date') || this.disableDate(dayjs(ynow + '/' + mnow + '/' + (i + 1), 'YYYY/MM/DD'), dayjs, 'date');
            ldates.push({
                iscur: true,
                disable: disable,
                day: i + 1,
            });
        }
        const l = ldates.length;
        for (let i = 0; i < 42 - l; i++) {
            ldates.push({ day: i + 1, isnext: true });
        }
        this._rendDayHtml(ldates, $cont, ynow + '/' + mnow);
        this._rendYearHtml(date, $cont);
        if (this.type == 'multiple') {
            for (let i = 0; i < this.multipleDates.length; i++) {
                let date = this.multipleDates[i];
                if (typeof date == 'object') {
                    date = date.format('YYYY-MM-DD');
                } else {
                    date = dayjs(date).format('YYYY-MM-DD');
                }
                this.$container.find('span[data-date="' + date + '"]').addClass('cur-date');
            }
        }
    }

    private checkDisable(date, dir, type, unit = '') {
        let disable = true;
        if (!this.option.minDate && !this.option.maxDate) {
            return false;
        }
        if (this.type.indexOf('year') > -1 || type == 'year') {
            const year = date.format('YYYY');
            const min: number = (this.option.minDate ? dayjs(this.option.minDate).format('YYYY') : 0) as number;
            const max: number = this.option.maxDate ? dayjs(this.option.maxDate).format('YYYY') : year;
            const yearP = year - (year % 12) - 12;
            const minP = min - (min % 12);
            const maxP = max - (max % 12);
            if ((dir > 0 || minP <= yearP) && (dir < 0 || maxP >= yearP + 12)) {
                disable = false;
            }
        } else {
            let format = 'YYYY-MM';
            if (unit == 'year') {
                format = 'YYYY';
            }
            if (unit == 'date') {
                format = 'YYYY-MM-DD';
            }
            if ((!this.option.minDate || (this.option.minDate && this.option.minDate.format(format) <= date.format(format))) && (!this.option.maxDate || (this.option.maxDate && this.option.maxDate.format(format) >= date.format(format)))) {
                disable = false;
            }
        }
        return disable;
    }

    private _rendYearHtml(date, $cont) {
        //需要重新生成哦
        const ynow = date.year();
        const mnow = date.month() + 1;
        $cont.find('.year-info').html("<span class='year'>" + this.option.locale.yearHeadSuffix(ynow) + "</span><span class='month'>" + this.option.locale.monthHead[mnow - 1] + '</span>');
    }

    private _rendDayHtml(datelist, $cont, year) {
        const $c = $cont.find('.dater');
        if ($c.length() < 1) {
            $cont.append('<div class="dater"></div>');
        }
        $c.empty();
        for (let i = 0; i < 6; i++) {
            // let ul = document.createElement("ul")
            for (let j = i * 7; j < i * 7 + 7; j++) {
                /*const span = document.createElement("span");*/
                const li = document.createElement('span');
                li.classList.add('day-item');
                if (datelist[j].iscur) {
                    if (!datelist[j].disable) {
                        li.classList.add('active-day');
                    }
                    li.setAttribute('data-date', dayjs(year + '/' + datelist[j].day, 'YYYY/MM/DD').format('YYYY-MM-DD'));
                } else {
                    if (datelist[j].isnext) {
                        li.setAttribute(
                            'data-date',
                            dayjs(year + '/' + datelist[j].day, 'YYYY/MM/DD')
                                .add(1, 'months')
                                .format('YYYY-MM-DD'),
                        );
                    } else {
                        li.setAttribute(
                            'data-date',
                            dayjs(year, 'YYYY/MM')
                                .subtract(1, 'months')
                                .date(datelist[j].day)
                                .format('YYYY-MM-DD'),
                        );
                    }
                }
                if (datelist[j].disable) {
                    li.classList.add('disable-day');
                }
                li.innerHTML = datelist[j].day;
                $c.append(li);
                // ul.append(li)
            }
            // $c.append(ul)
        }
        this.setTodayDot('day');
    }

    private is_leap(year) {
        return year % 100 == 0 ? (year % 400 == 0 ? 1 : 0) : year % 4 == 0 ? 1 : 0;
    }

    private trigger(type, data) {
        if (this.eventList[type]) {
            for (let i = 0; i < this.eventList[type].func.length; i++) {
                if (typeof this.eventList[type].func[i] == 'function') this.eventList[type].func[i](data);
            }
        }
    }

    private on(type, func) {
        if (!this.eventList[type]) {
            this.eventList[type] = {
                func: [ func ],
            };
        } else {
            this.eventList[type].func.push(func);
        }
    }

    private getRandomString(len?: number) {
        len = len || 8;
        const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        const maxPos = $chars.length;
        let pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    private _setData(_key, $watch) {
        Object.defineProperty(this, _key, {
            get: () => {
                return this[_key];
            },
            set: val => {
                const oldVal = this[_key];
                this[_key] = val;
                $watch(val, oldVal);
                return val;
            },
        });
    }

    public watch(key, callback) {
        this._setData(key, callback);
    }

    private setTodayDot(type) {
        let date = dayjs().format('YYYY-MM-DD');
        if (type == 'year') {
            date = dayjs().format('YYYY');
        }
        if (type == 'month') {
            date = dayjs().format('YYYY-MM');
        }
        this.$container.find('.' + type + '-item[data-date="' + date + '"]').addClass('is-today');
    }

    public destroy() {
        this.removeMoveEvent();
        this.removeClickEvent();
        this.$container && this.$container.remove();
    }

    public format(date, format) {
        return dayjs(date).format(format);
    }
}

export default DatePicker;
