!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("@wu-component/web-core-plus"), require("compile-code-loader!./frame.ts")) : "function" == typeof define && define.amd ? define(["exports", "@wu-component/web-core-plus", "compile-code-loader!./frame.ts"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).WuCodeSandbox = {}, e.webCorePlus, e.CompiledFrameScript)
}(this, (function (e, t, n) {
    "use strict";

    function o(e) {
        return e && "object" == typeof e && "default" in e ? e : {default: e}
    }

    var r = o(n), i = function (e, t) {
        return i = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
            e.__proto__ = t
        } || function (e, t) {
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
        }, i(e, t)
    };
    var a = function () {
        return a = Object.assign || function (e) {
            for (var t, n = 1, o = arguments.length; n < o; n++) for (var r in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e
        }, a.apply(this, arguments)
    };

    function s(e, t, n, o) {
        var r, i = arguments.length, a = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (r = e[s]) && (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
        return i > 3 && a && Object.defineProperty(t, n, a), a
    }

    function c(e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t)
    }

    function l(e, t, n, o) {
        return new (n || (n = Promise))((function (r, i) {
            function a(e) {
                try {
                    c(o.next(e))
                } catch (e) {
                    i(e)
                }
            }

            function s(e) {
                try {
                    c(o.throw(e))
                } catch (e) {
                    i(e)
                }
            }

            function c(e) {
                var t;
                e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                    e(t)
                }))).then(a, s)
            }

            c((o = o.apply(e, t || [])).next())
        }))
    }

    function u(e, t) {
        var n, o, r, i, a = {
            label: 0, sent: function () {
                if (1 & r[0]) throw r[1];
                return r[1]
            }, trys: [], ops: []
        };
        return i = {
            next: s(0),
            throw: s(1),
            return: s(2)
        }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
            return this
        }), i;

        function s(s) {
            return function (c) {
                return function (s) {
                    if (n) throw new TypeError("Generator is already executing.");
                    for (; i && (i = 0, s[0] && (a = 0)), a;) try {
                        if (n = 1, o && (r = 2 & s[0] ? o.return : s[0] ? o.throw || ((r = o.return) && r.call(o), 0) : o.next) && !(r = r.call(o, s[1])).done) return r;
                        switch (o = 0, r && (s = [2 & s[0], r.value]), s[0]) {
                            case 0:
                            case 1:
                                r = s;
                                break;
                            case 4:
                                return a.label++, {value: s[1], done: !1};
                            case 5:
                                a.label++, o = s[1], s = [0];
                                continue;
                            case 7:
                                s = a.ops.pop(), a.trys.pop();
                                continue;
                            default:
                                if (!(r = a.trys, (r = r.length > 0 && r[r.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
                                    a = 0;
                                    continue
                                }
                                if (3 === s[0] && (!r || s[1] > r[0] && s[1] < r[3])) {
                                    a.label = s[1];
                                    break
                                }
                                if (6 === s[0] && a.label < r[1]) {
                                    a.label = r[1], r = s;
                                    break
                                }
                                if (r && a.label < r[2]) {
                                    a.label = r[2], a.ops.push(s);
                                    break
                                }
                                r[2] && a.ops.pop(), a.trys.pop();
                                continue
                        }
                        s = t.call(e, a)
                    } catch (e) {
                        s = [6, e], o = 0
                    } finally {
                        n = r = 0
                    }
                    if (5 & s[0]) throw s[1];
                    return {value: s[0] ? s[1] : void 0, done: !0}
                }([s, c])
            }
        }
    }

    function p(e, t) {
        var n = "function" == typeof Symbol && e[Symbol.iterator];
        if (!n) return e;
        var o, r, i = n.call(e), a = [];
        try {
            for (; (void 0 === t || t-- > 0) && !(o = i.next()).done;) a.push(o.value)
        } catch (e) {
            r = {error: e}
        } finally {
            try {
                o && !o.done && (n = i.return) && n.call(i)
            } finally {
                if (r) throw r.error
            }
        }
        return a
    }

    function d(e, t, n) {
        if (n || 2 === arguments.length) for (var o, r = 0, i = t.length; r < i; r++) !o && r in t || (o || (o = Array.prototype.slice.call(t, 0, r)), o[r] = t[r]);
        return e.concat(o || Array.prototype.slice.call(t))
    }

    var f = ".containerViewer{height:100%;width:100%}.iframe__container{height:400px;position:relative}.simple__iframe{height:100%;left:calc(50% - 200px);position:absolute;width:400px}";
    !function (e, t) {
        void 0 === t && (t = {});
        var n = t.insertAt;
        if (e && "undefined" != typeof document) {
            var o = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
            r.type = "text/css", "top" === n && o.firstChild ? o.insertBefore(r, o.firstChild) : o.appendChild(r), r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document.createTextNode(e))
        }
    }(f);
    var h = "message", m = "response", y = "set-interface", v = "service-message",
        b = !!window.MSInputMethodContext && !!document.documentMode, g = {allowedSenderOrigin: void 0},
        w = function () {
            function e(e, t, n) {
                void 0 === n && (n = {});
                var o = this;
                this.remote = {}, this.serviceMethods = {}, this.localApi = {}, this.callbacks = {}, this._resolveRemoteMethodsPromise = null, this.options = a(a({}, g), n), this.incrementalID = Math.floor(1e5 * Math.random()), this.postMessage = e, this.remoteMethodsWaitPromise = new Promise((function (e) {
                    o._resolveRemoteMethodsPromise = e
                })), t((function (e) {
                    return o.onMessageListener(e)
                }))
            }

            return e.prototype.onMessageListener = function (e) {
                var t = this, n = e.data, o = this.options.allowedSenderOrigin;
                o && e.origin !== o && !b || (n.type === m ? this.popCallback(n.callId, n.success, n.result) : n.type === h ? this.callLocalApi(n.methodName, n.arguments).then((function (e) {
                    return t.responseOtherSide(n.callId, e)
                })).catch((function (e) {
                    return t.responseOtherSide(n.callId, e, !1)
                })) : n.type === y ? (this.setInterface(n.apiMethods), this.responseOtherSide(n.callId)) : n.type === v && this.callLocalServiceMethod(n.methodName, n.arguments).then((function (e) {
                    return t.responseOtherSide(n.callId, e)
                })).catch((function (e) {
                    return t.responseOtherSide(n.callId, e, !1)
                })))
            }, e.prototype.postMessageToOtherSide = function (e) {
                this.postMessage(e, "*")
            }, e.prototype.setInterface = function (e) {
                var t, n = this;
                this.remote = {}, e.forEach((function (e) {
                    return n.remote[e] = n.createMethodWrapper(e)
                })), null === (t = this._resolveRemoteMethodsPromise) || void 0 === t || t.call(this)
            }, e.prototype.setLocalApi = function (e) {
                var t = this;
                return new Promise((function (n, o) {
                    var r = t.registerCallback(n, o);
                    t.postMessageToOtherSide({callId: r, apiMethods: Object.keys(e), type: y})
                })).then((function () {
                    return t.localApi = e
                }))
            }, e.prototype.setServiceMethods = function (e) {
                this.serviceMethods = e
            }, e.prototype.callLocalApi = function (e, t) {
                var n;
                return Promise.resolve((n = this.localApi)[e].apply(n, d([], p(t), !1)))
            }, e.prototype.callLocalServiceMethod = function (e, t) {
                var n;
                if (!this.serviceMethods[e]) throw new Error("Serivce method ".concat(e, " is not registered"));
                return Promise.resolve((n = this.serviceMethods)[e].apply(n, d([], p(t), !1)))
            }, e.prototype.createMethodWrapper = function (e) {
                var t = this;
                return function () {
                    for (var n = [], o = 0; o < arguments.length; o++) n[o] = arguments[o];
                    return t.callRemoteMethod.apply(t, d([e], p(n), !1))
                }
            }, e.prototype.callRemoteMethod = function (e) {
                for (var t = this, n = [], o = 1; o < arguments.length; o++) n[o - 1] = arguments[o];
                return new Promise((function (o, r) {
                    var i = t.registerCallback(o, r);
                    t.postMessageToOtherSide({callId: i, methodName: e, type: h, arguments: n})
                }))
            }, e.prototype.callRemoteServiceMethod = function (e) {
                for (var t = this, n = [], o = 1; o < arguments.length; o++) n[o - 1] = arguments[o];
                return new Promise((function (o, r) {
                    var i = t.registerCallback(o, r);
                    t.postMessageToOtherSide({callId: i, methodName: e, type: v, arguments: n})
                }))
            }, e.prototype.responseOtherSide = function (e, t, n) {
                var o = this;
                void 0 === n && (n = !0), t instanceof Error && (t = d(d([], p(Object.keys(t)), !1), ["message"], !1).reduce((function (e, n) {
                    return e[n] = t[n], e
                }), {}));
                var r = function () {
                    return o.postMessage({callId: e, type: m, success: n, result: t}, "*")
                };
                try {
                    r()
                } catch (e) {
                    console.error("Failed to post response, recovering...", e), e instanceof DOMException && (t = JSON.parse(JSON.stringify(t)), r())
                }
            }, e.prototype.registerCallback = function (e, t) {
                var n = (++this.incrementalID).toString();
                return this.callbacks[n] = {successCallback: e, failureCallback: t}, n
            }, e.prototype.popCallback = function (e, t, n) {
                t ? this.callbacks[e].successCallback(n) : this.callbacks[e].failureCallback(n), delete this.callbacks[e]
            }, e
        }(), S = {
            frameContainer: "body",
            frameClassName: "websandbox__frame",
            frameSrc: null,
            frameContent: '\n<!DOCTYPE html>\n<html>\n<head><meta charset="UTF-8"></head>\n<body></body>\n</html>\n  ',
            codeToRunBeforeInit: null,
            initialStyles: null,
            baseUrl: null,
            allowPointerLock: !1,
            allowFullScreen: !1,
            sandboxAdditionalAttributes: ""
        }, x = function () {
            function e(e, t) {
                var n = this;
                this.connection = null, this.removeMessageListener = function () {
                }, this.validateOptions(t), this.options = a(a({}, S), t), this.iframe = this.createIframe(), this.promise = new Promise((function (t) {
                    n.connection = new w(n.iframe.contentWindow.postMessage.bind(n.iframe.contentWindow), (function (e) {
                        var t = function (t) {
                            if (t.source === n.iframe.contentWindow) return e(t)
                        };
                        window.addEventListener("message", t), n.removeMessageListener = function () {
                            return window.removeEventListener("message", t)
                        }
                    }), {allowedSenderOrigin: "null"}), n.connection.setServiceMethods({
                        iframeInitialized: function () {
                            return n.connection.setLocalApi(e).then((function () {
                                return t(n)
                            }))
                        }
                    })
                }))
            }

            return e.create = function (t, n) {
                return void 0 === n && (n = {}), new e(t, n)
            }, e.prototype.validateOptions = function (e) {
                var t;
                if (e.frameSrc && (e.frameContent || e.initialStyles || e.baseUrl || e.codeToRunBeforeInit)) throw new Error('You can not set both "frameSrc" and any of frameContent,initialStyles,baseUrl,codeToRunBeforeInit options');
                if ("frameContent" in e && !(null === (t = e.frameContent) || void 0 === t ? void 0 : t.includes("<head>"))) throw new Error('Websandbox: iFrame content must have "<head>" tag.')
            }, e.prototype._prepareFrameContent = function (e) {
                var t, n,
                    o = null !== (n = null === (t = e.frameContent) || void 0 === t ? void 0 : t.replace("<head>", "<head>\n<script>".concat(r.default, "<\/script>"))) && void 0 !== n ? n : "";
                return e.initialStyles && (o = o.replace("</head>", "<style>".concat(e.initialStyles, "</style>\n</head>"))), e.baseUrl && (o = o.replace("<head>", '<head>\n<base href="'.concat(e.baseUrl, '"/>'))), e.codeToRunBeforeInit && (o = o.replace("</head>", "<script>".concat(e.codeToRunBeforeInit, "<\/script>\n</head>"))), o
            }, e.prototype.createIframe = function () {
                var e, t = this.options.domContainer || document, n = this.options.frameContainer,
                    o = "string" == typeof n ? t.querySelector(n) : n;
                if (!o) throw new Error("Websandbox: Cannot find container for sandbox " + o);
                var r = document.createElement("iframe");
                return r.sandbox = "allow-scripts ".concat(this.options.sandboxAdditionalAttributes), r.allow = "".concat(this.options.allowAdditionalAttributes), r.className = null !== (e = this.options.frameClassName) && void 0 !== e ? e : "", r.frameBorder = "0", this.options.allowFullScreen && (r.allowFullscreen = !0), this.options.frameSrc ? (r.src = this.options.frameSrc, o.appendChild(r), r) : (r.setAttribute("srcdoc", this._prepareFrameContent(this.options)), o.appendChild(r), r)
            }, e.prototype.destroy = function () {
                this.iframe.remove(), this.removeMessageListener()
            }, e.prototype._runCode = function (e) {
                return this.connection.callRemoteServiceMethod("runCode", e)
            }, e.prototype._runFunction = function (e) {
                return this._runCode("(".concat(e.toString(), ")()"))
            }, e.prototype.run = function (e) {
                return e.name ? this._runFunction(e) : this._runCode(e)
            }, e.prototype.importScript = function (e) {
                return this.connection.callRemoteServiceMethod("importScript", e)
            }, e.prototype.injectStyle = function (e) {
                return this.connection.callRemoteServiceMethod("injectStyle", e)
            }, e
        }(), C = function (e) {
            function n() {
                var t = e.call(this) || this;
                return t.code = "", t.options = {}, t.isSandboxInit = !1, t
            }

            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

                function n() {
                    this.constructor = e
                }

                i(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }(n, e), Object.defineProperty(n.prototype, "sandbox", {
                get: function () {
                    return this._sandbox || (this._sandbox = this.initSandbox()), this._sandbox
                }, set: function (e) {
                    this._sandbox = e
                }, enumerable: !1, configurable: !0
            }), n.prototype.formatFile = function (e) {
                return new Promise((function (t) {
                    if (e.startsWith("data:")) {
                        for (var n = e.split(","), o = atob(n[1]), r = o.length, i = new Uint8Array(r); r--;) i[r] = o.charCodeAt(r);
                        var a = new File([i], "srcdoc.html", {type: "text/html"}), s = new FileReader;
                        s.onload = function () {
                            t(s.result)
                        }, s.readAsText(a, "utf-8")
                    } else t(e)
                }))
            }, n.prototype.connected = function (e) {
                return l(this, void 0, void 0, (function () {
                    return u(this, (function (e) {
                        return this.sandbox = this.initSandbox(), [2]
                    }))
                }))
            }, n.prototype.initSandbox = function () {
                var e = this;
                this.localApi = {};
                var t = x.create(this.localApi, a({
                    frameContainer: ".iframe__container",
                    frameClassName: "simple__iframe",
                    domContainer: this.shadowRoot,
                    codeToRunBeforeInit: this.code || "",
                    allowFullScreen: !0
                }, this.options));
                return t.promise.then((function () {
                    return t.run("\n                    Websandbox.connection.setLocalApi({\n                        getWebsandboxConnectionInstance: function(message) {\n                            return Websandbox.connection;\n                        }\n                    });\n                    ")
                })).then((function () {
                    console.log("22222222222222222222222222222222222")
                    e.isSandboxInit = !0, e.emitEvent(t), console.log("2222222"), e.emitSuccessEvent()
                })), t
            }, n.prototype.runCode = function (e, t) {
                var n = this;
                return new Promise((function (o, r) {
                    var i = n.sandbox;
                    return i.promise.then((function (t) {
                        return i.run(e)
                    })).then((function (e) {
                        null == t || t(!0), o(e)
                    }))
                }))
            }, n.prototype.updateConfig = function (e) {
                this.update(), this.initSandbox()
            }, n.prototype.callSandboxFunction = function (e, t, n) {
                var o = this, r = this.sandbox;
                return new Promise((function (i, a) {
                    return l(o, void 0, void 0, (function () {
                        var o = this;
                        return u(this, (function (s) {
                            return [2, r.promise.then((function (s) {
                                return l(o, void 0, void 0, (function () {
                                    var o, c;
                                    return u(this, (function (l) {
                                        switch (l.label) {
                                            case 0:
                                                return (o = r.connection.remote[e]) || a("sandbox.connection.remote.".concat(e, " not found, before that call Websandbox.connection.setLocalApi inside the sandbox ")), "function" != typeof o ? [3, 2] : [4, o(t)];
                                            case 1:
                                                return c = l.sent(), null == n || n(c, s), i(c), [3, 3];
                                            case 2:
                                                null == n || n(o, s), i(o), l.label = 3;
                                            case 3:
                                                return [2]
                                        }
                                    }))
                                }))
                            }))]
                        }))
                    }))
                }))
            }, n.prototype.injectSandboxLocalApi = function (e, t, n) {
                var o = this;
                return new Promise((function (r, i) {
                    var a = o.sandbox, s = "";
                    s = "function" == typeof t ? t.toString().replace(/\n/g, "") : t;
                    var c = "Websandbox.connection.setLocalApi({\n                ".concat(e, ": ").concat(s, "\n            }); ");
                    return a.promise.then((function (e) {
                        return a.run(c)
                    })).then((function (e) {
                        null == n || n(e), r(e)
                    }))
                }))
            }, n.prototype.emitEvent = function (e) {
                return console.log("data", e), e || {}
            }, n.prototype.emitSuccessEvent = function () {
                return !0
            }, n.prototype.render = function (e, n) {
                return t.h(t.Fragment, null, t.h("div", {class: "iframe__container"}))
            }, s([t.Prop({
                type: String,
                default: ""
            }), c("design:type", Object)], n.prototype, "code", void 0), s([t.Prop({
                type: Object,
                default: {}
            }), c("design:type", Object)], n.prototype, "options", void 0), s([t.Emit("message"), c("design:type", Function), c("design:paramtypes", [Object]), c("design:returntype", void 0)], n.prototype, "emitEvent", null), s([t.Emit("success"), c("design:type", Function), c("design:paramtypes", []), c("design:returntype", void 0)], n.prototype, "emitSuccessEvent", null), n = s([t.Component({
                name: "wu-code-sandbox",
                css: f
            }), c("design:paramtypes", [])], n)
        }(t.WuComponent);
    e.WuCodeSandbox = C, Object.defineProperty(e, "__esModule", {value: !0})
}));
