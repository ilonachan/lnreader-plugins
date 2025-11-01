"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fetch_1 = require("@libs/fetch");
var filterInputs_1 = require("@libs/filterInputs");
var cheerio_1 = require("cheerio");
var defaultCover_1 = require("@libs/defaultCover");
var novelStatus_1 = require("@libs/novelStatus");
// import { isUrlAbsolute } from '@libs/isAbsoluteUrl';
var storage_1 = require("@libs/storage");
// import { encode, decode } from 'urlencode';
// import dayjs from 'dayjs';
// import { Parser } from 'htmlparser2';
var MzNovelsPlugin = /** @class */ (function () {
    function MzNovelsPlugin() {
        var _this = this;
        this.id = 'mznovels';
        this.name = 'MZ Novels';
        this.icon = 'src/en/mznovels/icon.png';
        this.customCSS = 'src/en/mznovels/customCss.css';
        this.customJS = 'src/en/mznovels/customJs.js';
        this.site = 'https://mznovels.com';
        this.version = '1.0.1';
        this.filters = {
            rank_type: {
                label: 'Ranking Type',
                options: [
                    { label: 'Original', value: 'original' },
                    { label: 'Translated', value: 'translated' },
                    { label: 'Fanfiction', value: 'fanfiction' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
                value: 'original',
            },
            rank_period: {
                label: 'Ranking Period',
                options: [
                    { label: 'Daily', value: 'daily' },
                    { label: 'Weekly', value: 'weekly' },
                    { label: 'Monthly', value: 'monthly' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
                value: 'daily',
            },
        };
        this.imageRequestInit = undefined;
        this.pluginSettings = {
            authorNotes: {
                label: 'Author Notes',
                type: filterInputs_1.FilterTypes.Picker,
                value: 'footnotes',
                options: [
                    { label: 'Inline', value: 'inline' },
                    { label: 'Footnotes', value: 'footnotes' },
                    { label: 'None', value: 'none' },
                ],
            },
        };
        //flag indicates whether access to LocalStorage, SesesionStorage is required.
        this.webStorageUtilized = false;
        this.resolveUrl = function (path, isNovel) { return _this.normalizePath(path); };
    }
    MzNovelsPlugin.prototype.normalizePath = function (path, withDomain) {
        if (withDomain === void 0) { withDomain = true; }
        if (!path) {
            return path;
        }
        if (path.startsWith('/')) {
            if (withDomain) {
                return this.site + path;
            }
            return path;
        }
        else {
            if (!path.startsWith(this.site)) {
                console.warn("path doesn't seem to belong to this site");
            }
            if (!withDomain) {
                return path.slice(this.site.length);
            }
            return path;
        }
    };
    MzNovelsPlugin.prototype.normalizeAvatar = function (path) {
        path = this.normalizePath(path, true);
        if (path === 'https://mznovels.com/media/avatars/default.png') {
            return defaultCover_1.defaultCover;
        }
        return path;
    };
    MzNovelsPlugin.prototype.parseSearchResults = function ($, pageNo) {
        var _this = this;
        // When a page number larger than the max is used, mznovels simply repeats the final page.
        // Here we detect this and return an empty page instead.
        var curPage = $('div.pagination > span.active').text();
        if (curPage !== pageNo.toString()) {
            // throw new Error(`Incorrect page ${curPage} when searching for page ${pageNo}`);
            return [];
        }
        var novels = [];
        $('ul.search-results-list > li.search-result-item:not(.ad-result-item)').each(function (idx, ele) {
            var _a;
            var $ele = $(ele);
            var name = $ele.find('h2.search-result-title').first().text();
            var path = _this.normalizePath($ele.find('a.search-result-title-link').first().attr('href'));
            var cover = (_a = _this.normalizePath($ele.find('img.search-result-image').attr('src'))) !== null && _a !== void 0 ? _a : defaultCover_1.defaultCover;
            if (path) {
                novels.push({ name: name, path: path, cover: cover });
            }
        });
        return novels;
    };
    MzNovelsPlugin.prototype.applyLocalFilters = function (novels, filters) {
        // TODO
        return novels;
    };
    MzNovelsPlugin.prototype.popularNovels = function (pageNo_1, _a) {
        return __awaiter(this, arguments, void 0, function (pageNo, _b) {
            var url, result, body, loadedCheerio;
            var _c, _d, _e, _f;
            var showLatestNovels = _b.showLatestNovels, filters = _b.filters;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (showLatestNovels) {
                            url = this.normalizePath("/latest-updates/?page=".concat(pageNo));
                        }
                        else {
                            url = this.normalizePath("/rankings/".concat((_d = (_c = filters === null || filters === void 0 ? void 0 : filters.rank_type) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : 'original', "?period=").concat((_f = (_e = filters === null || filters === void 0 ? void 0 : filters.rank_period) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : 'daily', "&page=").concat(pageNo));
                        }
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url)];
                    case 1:
                        result = _g.sent();
                        if (!result.ok) {
                            throw new Error('Captcha error, please open in webview');
                        }
                        return [4 /*yield*/, result.text()];
                    case 2:
                        body = _g.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        // TODO: if I apply the filters here, but one search page doesn't happen to contain any matches, LNReader will believe there are no more pages!
                        // This means that the page numbers for this function and the website need to be diverged in a consistent way. How?
                        return [2 /*return*/, this.parseSearchResults(loadedCheerio, pageNo)];
                }
            });
        });
    };
    MzNovelsPlugin.prototype.parseNovel = function (novelPath) {
        return __awaiter(this, void 0, void 0, function () {
            var novel, url, result, body, $, categoryStr, category, author, origAuthor_1, tags, statusIndicator, ratingStr, ratingNum, pageNo, $page, lastPageLink, maxPage, chaptersBackwards, pageUrl, res, _a, chapters;
            var _this = this;
            var _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        novel = {
                            path: novelPath,
                            name: 'Untitled',
                        };
                        url = this.normalizePath(novelPath);
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url)];
                    case 1:
                        result = _f.sent();
                        if (!result.ok) {
                            throw new Error('Captcha error, please open in webview');
                        }
                        return [4 /*yield*/, result.text()];
                    case 2:
                        body = _f.sent();
                        $ = (0, cheerio_1.load)(body);
                        // TODO: get here data from the site and
                        // un-comment and fill-in the relevant fields
                        novel.name = $('h1.novel-title').first().text();
                        novel.cover =
                            (_b = this.normalizePath($('img#novel-cover-image').attr('src'))) !== null && _b !== void 0 ? _b : defaultCover_1.defaultCover;
                        categoryStr = $('span.category-value').text();
                        switch (categoryStr) {
                            case 'Original':
                                category = 'original';
                                break;
                            case 'Translated':
                                category = 'translated';
                                break;
                            case 'Fanfiction':
                                category = 'fanfiction';
                                break;
                            default:
                                category = null;
                                break;
                        }
                        author = $('p.novel-author > a').text();
                        if (category === 'translated') {
                            origAuthor_1 = 'Unknown';
                            $('div.translation-info-item').each(function (idx, ele) {
                                var $ele = $(ele);
                                if ($ele.find('span.translation-label').text() === 'Original Author:' &&
                                    !$ele.find('span.translation-value').hasClass('not-provided')) {
                                    origAuthor_1 = $ele.find('span.translation-value').text();
                                }
                            });
                            author = "".concat(origAuthor_1, " (translated by: ").concat(author, ")");
                        }
                        // novel.artist = '';
                        novel.author = author;
                        tags = [];
                        if (category) {
                            tags.push("Category: ".concat(category));
                        }
                        $('div.genres-container > a.genre').each(function (idx, ele) {
                            tags.push($(ele).text().replace(',', '_'));
                        });
                        $('div.tags-container > a.tag').each(function (idx, ele) {
                            tags.push($(ele).text().replace(',', '_'));
                        });
                        novel.genres = tags.join(', ');
                        statusIndicator = $('span.status-indicator');
                        novel.status = statusIndicator.hasClass('completed')
                            ? novelStatus_1.NovelStatus.Completed
                            : novelStatus_1.NovelStatus.Ongoing;
                        novel.summary = ((_c = $('p.summary-text').prop('innerHTML')) !== null && _c !== void 0 ? _c : '<no description>').trim();
                        ratingStr = $('span.rating-score').text();
                        if (ratingStr) {
                            ratingNum = (_e = (_d = ratingStr.match(/^\((\d+\.\d+)\)$/)) === null || _d === void 0 ? void 0 : _d.groups) === null || _e === void 0 ? void 0 : _e[1];
                            if (ratingNum) {
                                novel.rating = parseFloat(ratingNum);
                            }
                        }
                        pageNo = 1;
                        $page = $;
                        lastPageLink = $('div#chapters .pagination')
                            .children()
                            .last()
                            .filter(function (i, el) { return el.tagName === 'a'; })
                            .attr('href');
                        maxPage = lastPageLink ? parseInt(lastPageLink.split('=')[1]) : 1;
                        chaptersBackwards = [];
                        _f.label = 3;
                    case 3:
                        if (!(pageNo <= maxPage)) return [3 /*break*/, 7];
                        if (!(pageNo > 1)) return [3 /*break*/, 6];
                        pageUrl = url + "?page=".concat(pageNo);
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(pageUrl)];
                    case 4:
                        res = _f.sent();
                        if (!res.ok) {
                            throw new Error('Captcha error, please open in webview');
                        }
                        _a = cheerio_1.load;
                        return [4 /*yield*/, res.text()];
                    case 5:
                        $page = _a.apply(void 0, [_f.sent()]);
                        _f.label = 6;
                    case 6:
                        $page('ul.chapter-list > li.chapter-item').each(function (idx, el) {
                            var $el = $page(el);
                            chaptersBackwards.push({
                                name: $el.find('span.chapter-title-text').text(),
                                path: _this.normalizePath($el.find('a.chapter-link').attr('href')),
                                // releaseTime: $el.find('span.chapter-date').text(),
                            });
                        });
                        pageNo++;
                        return [3 /*break*/, 3];
                    case 7:
                        chapters = chaptersBackwards.reverse().map(function (v, i) {
                            v.chapterNumber = i + 1;
                            return v;
                        });
                        novel.chapters = chapters;
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    MzNovelsPlugin.prototype.parseChapter = function (chapterPath) {
        return __awaiter(this, void 0, void 0, function () {
            var url, result, body, $, content, authorNotes, authorNotesMode, footnotes_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.normalizePath(chapterPath);
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url)];
                    case 1:
                        result = _b.sent();
                        if (!result.ok) {
                            throw new Error('Captcha error, please open in webview');
                        }
                        return [4 /*yield*/, result.text()];
                    case 2:
                        body = _b.sent();
                        $ = (0, cheerio_1.load)(body);
                        content = $('div.formatted-content');
                        content.remove('div.chapter-ad-banner');
                        authorNotes = $('.author-feedback');
                        authorNotesMode = (_a = storage_1.storage.get('authorNotes')) !== null && _a !== void 0 ? _a : this.pluginSettings.authorNotes.value;
                        console.log(storage_1.storage.getAllKeys().map(function (k) { return [k, storage_1.storage.get(k)]; }));
                        if (authorNotesMode !== 'inline') {
                            console.log(authorNotes);
                            if (authorNotesMode === 'footnotes') {
                                footnotes_1 = [];
                                authorNotes.each(function (i, el) {
                                    var $el = $(el);
                                    var content = $el.attr('data-note');
                                    if (!content)
                                        return;
                                    footnotes_1.push(content);
                                    $el.append("<a class=\"footnote-ref\" href=\"#footnote-".concat(i + 1, "\"><sup>").concat(i + 1, "</sup><span class=\"anchor\"><span id=\"ref-").concat(i + 1, "\"></span></span></a>"));
                                });
                                console.log(footnotes_1);
                                content.append("\n          <div class=\"footnotes\">\n            ".concat(footnotes_1
                                    .map(function (v, i) { return "\n                <a class=\"footnote-num\" href=\"#ref-".concat(i + 1, "\"><span class=\"anchor\"><span id=\"footnote-").concat(i + 1, "\"></span></span><sup>").concat(i + 1, "</sup></a>\n                <span class=\"footnote-content\">").concat(v, "</span>\n            "); })
                                    .join(''), "\n          </div>\n        "));
                            }
                            authorNotes.children().unwrap();
                        }
                        $('.author_note > .note_content').each(function (i, el) {
                            content.append("\n        <blockquote class=\"author_note\">\n          <h3>Author's Note</h3>\n          <p>".concat($(el).text(), "</p>\n        </blockquote>\n        "));
                        });
                        return [2 /*return*/, content.html()];
                }
            });
        });
    };
    MzNovelsPlugin.prototype.searchNovels = function (searchTerm, pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            var url, result, body, loadedCheerio;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.normalizePath("/search/?q=".concat(searchTerm));
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url)];
                    case 1:
                        result = _a.sent();
                        if (!result.ok) {
                            throw new Error('Captcha error, please open in webview');
                        }
                        return [4 /*yield*/, result.text()];
                    case 2:
                        body = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        return [2 /*return*/, this.parseSearchResults(loadedCheerio, pageNo)];
                }
            });
        });
    };
    return MzNovelsPlugin;
}());
exports.default = new MzNovelsPlugin();
