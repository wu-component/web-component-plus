!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.dayjs_plugin_localizedFormat=t()}(this,function(){"use strict";var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};return function(t,n,o){var r=n.prototype,M=r.format;o.en.formats=e,r.format=function(t){void 0===t&&(t="YYYY-MM-DDTHH:mm:ssZ");var n=this.$locale().formats,o=function(t,n){return t.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(t,o,r){var M=r&&r.toUpperCase();return o||n[r]||e[r]||n[M].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(e,t,n){return t||n.slice(1)})})}(t,void 0===n?{}:n);return M.call(this,o)}}});