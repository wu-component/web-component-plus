var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, h, Prop, State, WuComponent } from '@wu-component/web-core-plus';
import css from './index.scss';
import { extractClass } from '@wu-component/common';
var WuStep = /** @class */ (function (_super) {
    __extends(WuStep, _super);
    function WuStep() {
        var _this = _super.call(this) || this;
        _this.index = -1;
        _this.lineStyle = {};
        _this.internalStatus = '';
        return _this;
    }
    Object.defineProperty(WuStep.prototype, "$parent", {
        get: function () {
            return this.parentNode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WuStep.prototype, "currentStatus", {
        get: function () {
            return this.status || this.internalStatus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WuStep.prototype, "prevStatus", {
        get: function () {
            var _a;
            var prevStep = (_a = this.$parent) === null || _a === void 0 ? void 0 : _a.steps[this.index - 1];
            return prevStep ? prevStep.currentStatus : 'wait';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WuStep.prototype, "isCenter", {
        get: function () {
            var _a;
            return (_a = this.$parent) === null || _a === void 0 ? void 0 : _a.alignCenter;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WuStep.prototype, "isVertical", {
        get: function () {
            var _a;
            return ((_a = this.$parent) === null || _a === void 0 ? void 0 : _a.direction) === 'vertical';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WuStep.prototype, "isSimple", {
        get: function () {
            var _a;
            return (_a = this.$parent) === null || _a === void 0 ? void 0 : _a.simple;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WuStep.prototype, "isLast", {
        get: function () {
            var parent = this.$parent;
            return (parent === null || parent === void 0 ? void 0 : parent.steps[parent.steps.length - 1]) === this;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WuStep.prototype, "stepsCount", {
        get: function () {
            var _a;
            return (_a = this.$parent) === null || _a === void 0 ? void 0 : _a.steps.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WuStep.prototype, "space", {
        get: function () {
            var _a = this, isSimple = _a.isSimple, space = _a.$parent.space;
            return isSimple ? '' : space;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WuStep.prototype, "currentStyle", {
        get: function () {
            var style = {};
            var parent = this.$parent;
            var len = parent === null || parent === void 0 ? void 0 : parent.steps.length;
            style.flexBasis = (typeof this.space === 'number'
                ? this.space + 'px'
                : this.space
                    ? this.space
                    : 100 / (len - (this.isCenter ? 0 : 1)) + '%');
            if (this.isVertical)
                return style;
            if (this.isLast) {
                style.maxWidth = 100 / this.stepsCount + '%';
            }
            else {
                style.marginRight = -this.$parent.stepOffset + 'px';
            }
            return style;
        },
        enumerable: false,
        configurable: true
    });
    WuStep.prototype.updateStatus = function (val) {
        var _a;
        var prevChild = (_a = this.$parent) === null || _a === void 0 ? void 0 : _a.$children[this.index - 1];
        if (val > this.index) {
            this.internalStatus = this.$parent.finishStatus;
        }
        else if (val === this.index && this.prevStatus !== 'error') {
            this.internalStatus = this.$parent.processStatus;
        }
        else {
            this.internalStatus = 'wait';
        }
        if (prevChild)
            prevChild.calcProgress(this.internalStatus);
    };
    WuStep.prototype.calcProgress = function (status) {
        var _a, _b;
        var step = 100;
        var style = {};
        style.transitionDelay = 150 * this.index + 'ms';
        if (status === ((_a = this.$parent) === null || _a === void 0 ? void 0 : _a.processStatus)) {
            step = this.currentStatus !== 'error' ? 0 : 0;
        }
        else if (status === 'wait') {
            step = 0;
            style.transitionDelay = (-150 * this.index) + 'ms';
        }
        style.borderWidth = step && !this.isSimple ? '1px' : 0;
        ((_b = this.$parent) === null || _b === void 0 ? void 0 : _b.direction) === 'vertical'
            ? style.height = step + '%'
            : style.width = step + '%';
        this.lineStyle = style;
    };
    WuStep.prototype.render = function (_renderProps, _store) {
        var _a, _b, _c, _d, _e, _f;
        var _g, _h;
        if (_renderProps === void 0) { _renderProps = {}; }
        if (_store === void 0) { _store = {}; }
        return (h("div", __assign({}, extractClass({}, 'wu-step', (_a = {},
            _a["is-".concat((_g = this.$parent) === null || _g === void 0 ? void 0 : _g.direction)] = !this.isSimple,
            _a['is-simple'] = this.isSimple,
            _a['is-flex'] = this.isLast && !this.space && !this.isCenter,
            _a['is-center'] = this.isCenter && !this.isVertical && !this.isSimple,
            _a)), { style: this.currentStyle }),
            h("div", __assign({}, extractClass({}, 'wu-step_head', (_b = {},
                _b["is-".concat(this.currentStatus)] = true,
                _b))),
                h("div", { class: "wu-step_line", style: this.isLast ? '' : { marginRight: ((_h = this.$parent) === null || _h === void 0 ? void 0 : _h.stepOffset) + 'px' } },
                    h("i", { class: "el-step__line-inner", style: this.lineStyle })),
                h("div", __assign({}, extractClass({}, 'wu-step_icon', (_c = {},
                    _c["is-".concat(this.icon ? 'icon' : 'text')] = true,
                    _c))), this.currentStatus !== 'success' && this.currentStatus !== 'error' ? (h("slot", { name: "icon" }, !this.isSimple ? (h("div", { class: "wu-step_icon-inner" }, this.index + 1)) : null)) : (h("i", __assign({}, extractClass({}, 'wu-step_icon-inner', (_d = {},
                    _d["is-".concat(this.icon ? 'icon' : 'text')] = true,
                    _d['el-icon-' + (this.currentStatus === 'success' ? 'check' : 'close')] = true,
                    _d["is-status"] = true,
                    _d))))))),
            h("div", { className: "wu-step_main" },
                h("div", __assign({}, extractClass({}, 'wu-step_title', (_e = {}, _e['is-' + this.currentStatus] = true, _e)), { ref: "title" }),
                    h("slot", { name: "title" }, this.tip)),
                this.isSimple ? (h("div", { class: "wu-step_arrow" })) : (h("div", __assign({}, extractClass({}, 'wu-step_description', (_f = {},
                    _f['is-' + this.currentStatus] = true,
                    _f))),
                    h("slot", { name: "description" }, this.description))))));
    };
    __decorate([
        Prop({ default: '', type: String }),
        __metadata("design:type", String)
    ], WuStep.prototype, "tip", void 0);
    __decorate([
        Prop({ default: '', type: String }),
        __metadata("design:type", String)
    ], WuStep.prototype, "icon", void 0);
    __decorate([
        Prop({ default: '', type: String }),
        __metadata("design:type", String)
    ], WuStep.prototype, "description", void 0);
    __decorate([
        Prop({ default: '', type: String }),
        __metadata("design:type", String)
    ], WuStep.prototype, "status", void 0);
    __decorate([
        State({ default: -1, type: Number }),
        __metadata("design:type", Object)
    ], WuStep.prototype, "index", void 0);
    WuStep = __decorate([
        Component({
            name: 'wu-plus-step',
            css: css,
        }),
        __metadata("design:paramtypes", [])
    ], WuStep);
    return WuStep;
}(WuComponent));
export { WuStep };
//# sourceMappingURL=index.js.map