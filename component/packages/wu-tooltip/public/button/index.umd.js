!function(o,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@wu-component/web-core-plus")):"function"==typeof define&&define.amd?define(["exports","@wu-component/web-core-plus"],t):t((o="undefined"!=typeof globalThis?globalThis:o||self).WuButton={},o.webCorePlus)}(this,(function(o,t){"use strict";var e=function(o,t){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,t){o.__proto__=t}||function(o,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(o[e]=t[e])},e(o,t)};var r=function(){return r=Object.assign||function(o){for(var t,e=1,r=arguments.length;e<r;e++)for(var n in t=arguments[e])Object.prototype.hasOwnProperty.call(t,n)&&(o[n]=t[n]);return o},r.apply(this,arguments)};function n(o,t,e,r){var n,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(o,t,e,r);else for(var l=o.length-1;l>=0;l--)(n=o[l])&&(s=(i<3?n(s):i>3?n(t,e,s):n(t,e))||s);return i>3&&s&&Object.defineProperty(t,e,s),s}function i(o,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(o,t)}var s=':host{display:inline-block}:host([block]){display:block}.wu-button{-webkit-appearance:none;background:#fff;border:1px solid #c0c4cc;border-radius:4px;box-sizing:border-box;color:#606266;cursor:pointer;display:inline-block;font-size:14px;font-weight:500;line-height:1;margin:0;outline:none;padding:12px 20px;text-align:center;transition:.1s;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;white-space:nowrap}.wu-button+.wu-button{margin-left:10px}.wu-button.is-round{padding:12px 20px}.wu-button:focus,.wu-button:hover{background-color:#ecf5ff;border-color:#c6e2ff;color:#409eff}.wu-button:active{border-color:#3a8ee6;color:#3a8ee6;outline:none}.wu-button::-moz-focus-inner{border:0}.wu-button [class*=wu-icon-]+span{margin-left:5px}.wu-button.is-plain:focus,.wu-button.is-plain:hover{background:#fff;border-color:#409eff;color:#409eff}.wu-button.is-plain:active{background:#fff;outline:none}.wu-button.is-active,.wu-button.is-plain:active{border-color:#3a8ee6;color:#3a8ee6}.wu-button.is-disabled,.wu-button.is-disabled:focus,.wu-button.is-disabled:hover{background-color:#fff;background-image:none;border-color:#ebeef5;color:#c0c4cc;cursor:not-allowed}.wu-button.is-disabled.wu-button--text{background-color:transparent}.wu-button.is-disabled.is-plain,.wu-button.is-disabled.is-plain:focus,.wu-button.is-disabled.is-plain:hover{background-color:#fff;border-color:#ebeef5;color:#c0c4cc}.wu-button.is-loading{pointer-events:none;position:relative}.wu-button.is-loading:before{background-color:hsla(0,0%,100%,.35);border-radius:inherit;bottom:-1px;content:"";left:-1px;pointer-events:none;position:absolute;right:-1px;top:-1px}.wu-button.is-round{border-radius:20px;padding:12px 23px}.wu-button.is-circle{border-radius:50%;padding:12px}.wu-button-primary{background-color:#409eff;border-color:#409eff;color:#fff}.wu-button-primary:focus,.wu-button-primary:hover{background:#66b1ff;border-color:#66b1ff;color:#fff}.wu-button-primary:active{outline:none}.wu-button-primary.is-active,.wu-button-primary:active{background:#3a8ee6;border-color:#3a8ee6;color:#fff}.wu-button-primary.is-disabled,.wu-button-primary.is-disabled:active,.wu-button-primary.is-disabled:focus,.wu-button-primary.is-disabled:hover{background-color:#a0cfff;border-color:#a0cfff;color:#fff}.wu-button-primary.is-plain{background:#ecf5ff;border-color:#b3d8ff;color:#409eff}.wu-button-primary.is-plain:focus,.wu-button-primary.is-plain:hover{background:#409eff;border-color:#409eff;color:#fff}.wu-button-primary.is-plain:active{background:#3a8ee6;border-color:#3a8ee6;color:#fff;outline:none}.wu-button-primary.is-plain.is-disabled,.wu-button-primary.is-plain.is-disabled:active,.wu-button-primary.is-plain.is-disabled:focus,.wu-button-primary.is-plain.is-disabled:hover{background-color:#ecf5ff;border-color:#d9ecff;color:#8cc5ff}.wu-button-success{background-color:#67c23a;border-color:#67c23a;color:#fff}.wu-button-success:focus,.wu-button-success:hover{background:#85ce61;border-color:#85ce61;color:#fff}.wu-button-success:active{outline:none}.wu-button-success.is-active,.wu-button-success:active{background:#5daf34;border-color:#5daf34;color:#fff}.wu-button-success.is-disabled,.wu-button-success.is-disabled:active,.wu-button-success.is-disabled:focus,.wu-button-success.is-disabled:hover{background-color:#b3e19d;border-color:#b3e19d;color:#fff}.wu-button-success.is-plain{background:#f0f9eb;border-color:#c2e7b0;color:#67c23a}.wu-button-success.is-plain:focus,.wu-button-success.is-plain:hover{background:#67c23a;border-color:#67c23a;color:#fff}.wu-button-success.is-plain:active{background:#5daf34;border-color:#5daf34;color:#fff;outline:none}.wu-button-success.is-plain.is-disabled,.wu-button-success.is-plain.is-disabled:active,.wu-button-success.is-plain.is-disabled:focus,.wu-button-success.is-plain.is-disabled:hover{background-color:#f0f9eb;border-color:#e1f3d8;color:#a4da89}.wu-button-warning{background-color:#e6a23c;border-color:#e6a23c;color:#fff}.wu-button-warning:focus,.wu-button-warning:hover{background:#ebb563;border-color:#ebb563;color:#fff}.wu-button-warning:active{outline:none}.wu-button-warning.is-active,.wu-button-warning:active{background:#cf9236;border-color:#cf9236;color:#fff}.wu-button-warning.is-disabled,.wu-button-warning.is-disabled:active,.wu-button-warning.is-disabled:focus,.wu-button-warning.is-disabled:hover{background-color:#f3d19e;border-color:#f3d19e;color:#fff}.wu-button-warning.is-plain{background:#fdf6ec;border-color:#f5dab1;color:#e6a23c}.wu-button-warning.is-plain:focus,.wu-button-warning.is-plain:hover{background:#e6a23c;border-color:#e6a23c;color:#fff}.wu-button-warning.is-plain:active{background:#cf9236;border-color:#cf9236;color:#fff;outline:none}.wu-button-warning.is-plain.is-disabled,.wu-button-warning.is-plain.is-disabled:active,.wu-button-warning.is-plain.is-disabled:focus,.wu-button-warning.is-plain.is-disabled:hover{background-color:#fdf6ec;border-color:#faecd8;color:#f0c78a}.wu-button-danger{background-color:#f56c6c;border-color:#f56c6c;color:#fff}.wu-button-danger:focus,.wu-button-danger:hover{background:#f78989;border-color:#f78989;color:#fff}.wu-button-danger:active{outline:none}.wu-button-danger.is-active,.wu-button-danger:active{background:#dd6161;border-color:#dd6161;color:#fff}.wu-button-danger.is-disabled,.wu-button-danger.is-disabled:active,.wu-button-danger.is-disabled:focus,.wu-button-danger.is-disabled:hover{background-color:#fab6b6;border-color:#fab6b6;color:#fff}.wu-button-danger.is-plain{background:#fef0f0;border-color:#fbc4c4;color:#f56c6c}.wu-button-danger.is-plain:focus,.wu-button-danger.is-plain:hover{background:#f56c6c;border-color:#f56c6c;color:#fff}.wu-button-danger.is-plain:active{background:#dd6161;border-color:#dd6161;color:#fff;outline:none}.wu-button-danger.is-plain.is-disabled,.wu-button-danger.is-plain.is-disabled:active,.wu-button-danger.is-plain.is-disabled:focus,.wu-button-danger.is-plain.is-disabled:hover{background-color:#fef0f0;border-color:#fde2e2;color:#f9a7a7}.wu-button-info{background-color:#909399;border-color:#909399;color:#fff}.wu-button-info:focus,.wu-button-info:hover{background:#a6a9ad;border-color:#a6a9ad;color:#fff}.wu-button-info:active{outline:none}.wu-button-info.is-active,.wu-button-info:active{background:#82848a;border-color:#82848a;color:#fff}.wu-button-info.is-disabled,.wu-button-info.is-disabled:active,.wu-button-info.is-disabled:focus,.wu-button-info.is-disabled:hover{background-color:#c8c9cc;border-color:#c8c9cc;color:#fff}.wu-button-info.is-plain{background:#f4f4f5;border-color:#d3d4d6;color:#909399}.wu-button-info.is-plain:focus,.wu-button-info.is-plain:hover{background:#909399;border-color:#909399;color:#fff}.wu-button-info.is-plain:active{background:#82848a;border-color:#82848a;color:#fff;outline:none}.wu-button-info.is-plain.is-disabled,.wu-button-info.is-plain.is-disabled:active,.wu-button-info.is-plain.is-disabled:focus,.wu-button-info.is-plain.is-disabled:hover{background-color:#f4f4f5;border-color:#e9e9eb;color:#bcbec2}.wu-button-medium{border-radius:4px;font-size:14px;padding:10px 20px}.wu-button-medium.is-round{padding:10px 20px}.wu-button-medium.is-circle{padding:10px}.wu-button-small{border-radius:3px;font-size:12px;padding:9px 15px}.wu-button-small.is-round{padding:9px 15px}.wu-button-small.is-circle{padding:9px}.wu-button-mini{border-radius:3px;font-size:12px}.wu-button-mini,.wu-button-mini.is-round{padding:7px 15px}.wu-button-mini.is-circle{padding:7px}.wu-button-text{background:transparent;border-color:transparent;color:#409eff;padding-left:0;padding-right:0}.wu-button-text:focus,.wu-button-text:hover{background-color:transparent;border-color:transparent;color:#66b1ff}.wu-button-text:active{background-color:transparent;color:#3a8ee6}.wu-button-text.is-disabled,.wu-button-text.is-disabled:focus,.wu-button-text.is-disabled:hover,.wu-button-text:active{border-color:transparent}.loading{animation:loading 1s steps(12) infinite;display:inline-block;height:1em;vertical-align:-.125em;width:1em}@keyframes loading{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}';!function(o,t){void 0===t&&(t={});var e=t.insertAt;if(o&&"undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css","top"===e&&r.firstChild?r.insertBefore(n,r.firstChild):r.appendChild(n),n.styleSheet?n.styleSheet.cssText=o:n.appendChild(document.createTextNode(o))}}(s);const l={}.hasOwnProperty;function a(...o){const t=[];for(let o=0;o<arguments.length;o++){const e=arguments[o];if(!e)continue;const r=typeof e;if("string"===r||"number"===r)t.push(e);else if(Array.isArray(e)&&e.length){const o=a.apply(null,e);o&&t.push(o)}else if("object"===r)for(const o in e)l.call(e,o)&&e[o]&&t.push(o)}return t.join(" ")}const u=[];function c(o){"string"==typeof o&&(this.el=this.ConvertToArray(document.querySelectorAll(o))),o instanceof NodeList?this.el=this.ConvertToArray(o):Array.isArray(o)&&(this.el=o),o instanceof Node&&(this.el=[o]),this.el||(this.el=[])}function d(o){return new c(o)}document.addEventListener("DOMContentLoaded",(()=>{u.forEach((o=>{o()}))})),d.prototype=c.prototype={length(){return this.el.length},extend(){const o=arguments.length;let t,e,r,n,i,s=arguments[0]||{},l=1,a=!1;for("boolean"==typeof s&&(a=s,s=arguments[1]||{},l=2),"object"!=typeof s&&(s={}),o===l&&(s=this,--l);l<o;l++)if(null!=(t=arguments[l]))for(e in t)r=s[e],n=t[e],s!==n&&(a&&n&&("object"==typeof n||Array.isArray(n))?(i=Array.isArray(n)?r&&Array.isArray(r)?r:[]:r&&"object"==typeof r?r:{},s[e]=this.extend(a,i,n)):void 0!==n&&(s[e]=n));return s},parent(){const o=this.el[0];return o&&o.parentNode?d([o.parentNode]):d([])},parents(o,t){const e=this.el[0];o=void 0===o?[t||document]:this.ConvertToArray(t?t.querySelectorAll(o):document.querySelectorAll(o));const r=[];return e&&o.forEach((o=>{let t=e.parentNode;for(;t!=o&&null!=t;)t=t.parentNode;null!=t&&r.push(t)})),d(r)},reverseArryToNodeList:o=>o,hasClass(o){return this.el.length>0&&this.el[0].classList.contains(o)},attr(o,t){return t?(this.el.forEach((e=>{e.setAttribute(o,t)})),this):this.el[0]?this.el[0].getAttribute(o):null},find(o){if(!this.el||this.el.length<=0)return d([]);if("string"!=typeof o){const t=[];return this.el.forEach((e=>{const r=e.querySelectorAll("*");for(let e=0;e<r.length;e++)r[e]==o&&t.push(o)})),d(t)}{let t=[];return this.el.forEach((e=>{t=t.concat(this.ConvertToArray(e.querySelectorAll(o)))})),d(t)}},children(o){if(!this.el||this.el.length<=0)return d([]);let t=[];Array.isArray(o)&&(t=o);let e=[];this.el.forEach((r=>{e=e.concat(this.ConvertToArray(r.children)),"string"==typeof o&&(t=t.concat(this.ConvertToArray(r.querySelectorAll(o))))}));const r=[],n=t.length;for(let o=0;o<e.length;o++){const i=e[o];for(let o=0;o<n;o++)if(t[o]==i){r.push(i);break}}return d(r)},each(o){return this.el.forEach(o)},index(o){if(!o){const o=this.el[0].parentNode.childNodes;for(let t=0;t<o.length;t++)if(o[t]===this.el[0])return t;return null}for(let t=0;t<this.el.length;t++)if(this.el[t]===o)return t},eq(o){const t=this.el[o];return d(t?this.reverseArryToNodeList([t]):this.reverseArryToNodeList([]))},get(o){return this.el[o]},addClass(o){this.el.forEach((t=>{t.classList&&t.classList.add(...o.split(" "))}))},nextUntil(o,t=!1){const e=this.el[0];let r=null;if(!e)return d([]);r=o?"object"==typeof o&&o instanceof Node?o:e.parentNode.querySelector(o):null;const n=[],i=t?"previousSibling":"nextSibling";let s=e[i];for(;s!=r&&null!=s;)n.push(s),s=s[i];return d(n)},prevAll(){return this.nextUntil(null,!0)},nextAll(){return this.nextUntil()},removeClass(o){return this.el.forEach((t=>{t.classList.remove(o)})),this},val(o){if(!o)return this.el[0].value;this.el.forEach((t=>{t.value=o}))},html(o){if(this.el&&this.el[0])return o?void this.el.forEach((t=>{t.innerHTML=o})):this.el[0].innerHTML},empty(){return this.el.forEach((o=>{o.innerHTML=""})),this},parseToDOM(o){const t=document.createElement("div");return"string"==typeof o&&(t.innerHTML=o),t.childNodes},ConvertToArray(o){let t=null;try{t=Array.prototype.slice.call(o,0)}catch(e){t=[];for(let e=0;e<o.length;e++)t.push(o[0])}return t},parseDomToString(o){},append(o){let t;"string"==typeof o?(t=this.parseToDOM(o),t=this.ConvertToArray(t)):t=[o];for(let o=0;o<t.length;o++){const e=t[o];this.el.forEach((o=>{o.appendChild(e)}))}},remove(){this.el.forEach((o=>{o.parentNode&&o.parentNode.removeChild(o)}))},slideUp(o){this.el.forEach((o=>{o.style.display="none"}))},css(...o){if("object"==typeof o[0]){for(const t in o[0])this.el.forEach((e=>{e.style[t]=o[0][t]}));return this}return 1==o.length?this.el[0].style[o[0]]:2==o.length?(this.el.forEach((t=>{t.style[o[0]]=o[1]})),this):void 0},fadeOut(o,t){this.el.forEach((e=>{this.animate({opacity:0},o,e,(()=>{e.style.display="none","function"==typeof t&&t()}))}))},fadeIn(o,t){this.el.forEach((e=>{e.style.display="block",this.animate({opacity:1},o,e,t)}))},animate(o,t,e,r){t||(t=300);const n=t/50;let i=0;const s={};for(const t in o)isNaN(parseFloat(o[t]))||(s[t]={init:parseFloat(e.style[t])||0,unit:String(o[t]).substring(String(parseFloat(o[t])).length)});const l=window.setInterval((()=>{for(const t in s)e.style[t]=i>=n?o[t]:(parseFloat(o[t])-s[t].init)*i/n+s[t].init+s[t].unit;i>=n&&(window.clearInterval(l),"function"==typeof r&&r()),i++}),20)},outerWidth(){return this.el[0].offsetWidth},outerHeight(){return this.el[0].offsetHeight},hide(){return this.el.forEach((o=>{o.style.display="none"})),this},show(){return this.el.forEach((o=>{o.style.display="block"})),this},position(){return{top:this.el[0].offsetTop,left:this.el[0].offsetLeft}},not(o){return this.el=this.el.filter((t=>t!=o)),this}},d.extend=d.prototype.extend;var f=function(o){function l(){return o.call(this)||this}return function(o,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=o}e(o,t),o.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}(l,o),l.prototype.render=function(o,e){var n;return t.h("button",r({disabled:this.disabled},function(o,t,e){const[r,...n]=Array.prototype.slice.call(arguments,0);return r.class?(n.unshift(r.class),delete r.class):r.className&&(n.unshift(r.className),delete r.className),n.length>0?{class:a.apply(null,n)}:{class:""}}({},"wu-button",((n={})["wu-button-"+this.type]=this.type,n["wu-button-"+this.size]=this.size,n["is-plain"]=this.plain,n["is-round"]=this.round,n["is-circle"]=this.circle,n["is-disabled"]=this.disabled,n)),{type:this.nativeType}),this.loading&&[t.h("svg",{class:"loading",viewBox:"0 0 1024 1024",focusable:"false","data-icon":"loading",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},t.h("path",{d:"M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"}))," "],this.text,t.h("slot",null))},n([t.Prop({default:"primary",type:String}),i("design:type",String)],l.prototype,"type",void 0),n([t.Prop({default:"mini",type:String}),i("design:type",String)],l.prototype,"size",void 0),n([t.Prop({default:!1,type:Boolean}),i("design:type",Boolean)],l.prototype,"plain",void 0),n([t.Prop({default:!1,type:Boolean}),i("design:type",Boolean)],l.prototype,"round",void 0),n([t.Prop({default:!1,type:Boolean}),i("design:type",Boolean)],l.prototype,"circle",void 0),n([t.Prop({default:!1,type:Boolean}),i("design:type",Boolean)],l.prototype,"loading",void 0),n([t.Prop({default:!1,type:Boolean}),i("design:type",Boolean)],l.prototype,"disabled",void 0),n([t.Prop({default:"",type:String}),i("design:type",String)],l.prototype,"icon",void 0),n([t.Prop({default:"button",type:String}),i("design:type",String)],l.prototype,"nativeType",void 0),n([t.Prop({default:"",type:String}),i("design:type",String)],l.prototype,"text",void 0),l=n([t.Component({name:"wu-plus-button",css:s}),i("design:paramtypes",[])],l)}(t.WuComponent);o.WuButton=f,Object.defineProperty(o,"__esModule",{value:!0})}));
