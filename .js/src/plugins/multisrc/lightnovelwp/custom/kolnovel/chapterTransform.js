"use strict";
var _a;
(_a = $('article > style')
    .text()
    .match(/\\.\\w+(?=\\s*[,{])/g)) === null || _a === void 0 ? void 0 : _a.forEach(function (tag) { return $("p".concat(tag)).remove(); });
$('.epcontent .code-block').remove();
