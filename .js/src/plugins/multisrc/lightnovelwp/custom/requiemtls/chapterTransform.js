"use strict";
var _a;
$('div.entry-content script').remove();
var url = this.site + chapterPath.slice(0, -1);
var offsets = [
    [0, 12368, 12462],
    [1, 6960, 7054],
    [2, 4176, 4270],
];
var idx = (url.length * url.charCodeAt(url.length - 1) * 2) % 3;
var _b = (_a = offsets[idx]) !== null && _a !== void 0 ? _a : offsets[0], _ = _b[0], offsetLower = _b[1], offsetCap = _b[2];
var asciiA = 'A'.charCodeAt(0);
var asciiz = 'z'.charCodeAt(0);
$('div.entry-content > p').text(function (_, txt) {
    return txt
        .split('')
        .map(function (char) {
        var code = char.charCodeAt(0);
        var offset = code >= offsetLower + asciiA && code <= offsetLower + asciiz
            ? offsetLower
            : offsetCap;
        var decoded = code - offset;
        return decoded >= 32 && decoded <= 126
            ? String.fromCharCode(decoded)
            : char;
    })
        .join('');
});
