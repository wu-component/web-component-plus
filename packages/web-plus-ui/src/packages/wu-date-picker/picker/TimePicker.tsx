import $ from '@/common/jquery';
import dayjs from 'dayjs';
import { option } from './config';

export class TimePicker {
    private readonly $targetDom;
    private readonly option: any;
    private readonly id: any;
    private show: boolean;
    private readonly eventList: {};
    private $container;
    private format: string;
    constructor(targetDom: any, options: Record<any, any>) {
        this.$targetDom = $(targetDom.get(0));
        this.option = $.extend({}, option, options);

        this.id = this.getRandomString();
        this.show = false;
        this.eventList = {};
        this.init();
        this.addPosEvent();
        this.addTargetEvent();
    }

    private init() {
        this.rendtime();
        this.setPosition();
        this.addEvent();
        this.initCallback();
        this.initCurTime();
    }
    public updateCurrentTime(time) {
        const hour = dayjs(time).format('HH');
        const minute = dayjs(time).format('mm');
        const second = dayjs(time).format('ss');
        const time1 = hour + ':' + minute + ':' + second;
        this.trigger('confirm', { str: time1, value: { hour: hour, minute: minute, second: second } });
    }
    public initCurTime() {
        this.updateCurrentTime(this.option.time);
    }
    public initCallback() {
        this.on('confirm', this.option.onConfirm);
    }
    public addTargetEvent() {
        document.addEventListener(
            'click',
            e => {
                if (
                    e.target == this.$targetDom.get(0) ||
                    (this.$targetDom.find(e.target).get(0) &&
                        !$(e.target)
                            .parents('.xntimepicker')
                            .get(0))
                ) {
                    this.changeShowStatus();
                } else if (
                    !$(e.target)
                        .parents('.xntimepicker')
                        .get(0) ||
                    $(e.target)
                        .parents('.xntimepicker')
                        .get(0).id != this.id
                ) {
                    this.changeShowStatus(true);
                }
            },
            true,
        ); //捕获阶段
    }
    public changeShowStatus(hide?) {
        if (this.show || hide) {
            this.show = true;
            this.$container.hide();
        } else {
            this.$container.show();
            this.setPosition();
        }
        this.show = !this.show;
    }
    public addPosEvent() {
        const that = this;
        window.addEventListener('scroll', function() {
            that.setPosition();
        });
        window.addEventListener('resize', function() {
            that.setPosition();
        });
    }
    public setPosition() {
        if (!this.$container.get(0)) {
            return;
        }
        const wwidth = document.documentElement.clientWidth;
        // const wheight=document.documentElement.clientHeight;
        const curcolordom = this.$targetDom.get(0);
        let top = curcolordom.getBoundingClientRect().top;
        const targetLeft = curcolordom.getBoundingClientRect().left;
        let left = targetLeft;
        const targetWidth = this.$targetDom.outerWidth();
        const targetHeight = this.$targetDom.outerHeight();
        const domwidth = this.$container.outerWidth();
        // const domheight=this.$container.outerHeight();
        top = top + targetHeight + 8;
        if (left + domwidth > wwidth) {
            left = targetWidth + targetLeft - domwidth;
        }
        // this.$container.get(0).style.top = top + 'px';
        // this.$container.get(0).style.left = left + 'px';
    }
    public rendtime() {
        if (!this.option.format) {
            this.option.format = 'HH:mm:ss';
        }
        let html = `
          <div class="xntimepicker" id="${this.id}">`;
        let hours = '<ul class="hours">',
            minutes = '<ul class="minutes">',
            seconds = '<ul class="seconds">';
        // const hourlist = [], minutelist = [], secondlist = [];
        for (let i = 0; i < 60; i++) {
            const n = i < 10 ? '0' + i : i;
            if (i < 24) {
                hours += '<li data-i="' + n + '">' + n + '时</li>';
            }
            minutes += '<li data-i="' + n + '">' + n + '分</li>';
            seconds += '<li data-i="' + n + '">' + n + '秒</li>';
        }
        let option = `
        <div><div class="time-cont">`;
        option += hours + '</ul>';
        if (this.option.format.indexOf('mm') > -1) {
            option += minutes + '</ul>';
        }
        if (this.option.format.indexOf('ss') > -1) {
            option += seconds + '</ul>';
        }
        option += `</div><div class="time-btns"><span class="cur-time">当前时间</span><a class="confirm-time">确定</a></div></div>`;
        html +=
            ` <div class="time-picker">` +
            option +
            `</div>
         </div>
      `;
        this.$targetDom.append(html);
        this.$container = $('#' + this.id);
        this.changeShowStatus(true);
    }
    public addEvent() {
        this.$targetDom.get(0).addEventListener('click', e => {
            const $t = $(e.target);
            this.selectTime($t.parents('.timecont').eq(0), $t);
        });
        this.$container.get(0).addEventListener('click', e => {
            const $t = $(e.target);
            // if ($t.parents(".timecont")[0]) {
            //     this.selectTime($t.parents(".timecont").eq(0), $t);
            // }
            if ($t.hasClass('confirm-time')) {
                this.confirm();
            }
            if ($t.hasClass('cur-time')) {
                const hour = dayjs().format('HH');
                const minute = dayjs().format('mm');
                const second = dayjs().format('ss');
                const time = hour + ':' + minute + ':' + second;
                this.trigger('confirm', { str: time, value: { hour: hour, minute: minute, second: second } });
                this.changeShowStatus(true);
            }
        });
    }
    public selectTime($ele, $target) {
        // const that = this;
        if ($target.parent().hasClass('timecont')) {
            // $ele.children("div").toggle();
            if ($ele.children('div').get(0).style.display == 'none') {
                return;
            }
            const curTime = $ele
                .children('span')
                .get(0)
                .innerHTML.split(':');
            const hour = curTime[0];
            const minute = curTime[1];
            const second = curTime[2];
            $ele.find('.on').removeClass('on');
            $ele.find(".hours li[data-i='" + hour + "']").addClass('on');
            $ele.find(".minutes li[data-i='" + minute + "']").addClass('on');
            $ele.find(".seconds li[data-i='" + second + "']").addClass('on');
            $ele.find('.on').each((ele, i) => {
                const top = $(ele).position().top - 20;
                $(ele)
                    .parent()
                    .get(0)
                    .scrollBy(0, top);
            });
            return;
        }
        if ($target.get(0).nodeName == 'LI') {
            $target
                .parent()
                .find('li')
                .removeClass('on');
            $target.addClass('on');
            return;
        }
    }
    public confirm() {
        const hour = this.$container.find('.hours .on').attr('data-i') || '00';
        const minute = this.$container.find('.minutes .on').attr('data-i') || '00';
        const second = this.$container.find('.seconds .on').attr('data-i') || '00';
        const time = dayjs('1900-08-08 ' + hour + ':' + minute + ':' + second).format(this.format || 'HH:mm:ss');
        this.trigger('confirm', { str: time, value: { hour: hour, minute: minute, second: second } });
        this.changeShowStatus(true);
    }
    public trigger(type, data) {
        if (this.eventList[type]) {
            for (let i = 0; i < this.eventList[type].func.length; i++) {
                this.eventList[type].func[i](data);
            }
        }
    }
    public on(type, func) {
        if (!this.eventList[type]) {
            this.eventList[type] = {
                func: [ func ],
            };
        } else {
            this.eventList[type].func.push(func);
        }
    }
    public getRandomString(len = 8) {
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
}

export default TimePicker;
