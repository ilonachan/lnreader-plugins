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
// import { storage, localStorage, sessionStorage } from '@libs/storage';
// import { encode, decode } from 'urlencode';
// import dayjs from 'dayjs';
// import { Parser } from 'htmlparser2';
var TAG_LIST = [
    "'70s",
    '1960s',
    '1970s',
    '1970s Setting',
    '1980',
    '1980s',
    '1990s',
    '1V1',
    "70's Setting",
    '80s Setting',
    'Abandoned',
    'Abandoned Child',
    'ABO',
    'Abuse',
    'abuse scum',
    'Abuse Scumbag',
    'Abusive Characters',
    'Action',
    'Adopted Children',
    'Adorable Baby',
    'Adult',
    'Adventure',
    'Age Gap',
    'All Chapters Unlocked',
    'All Walks of Life',
    'Alpha Male',
    'Alpha/Beta/Omega/',
    'Alternate History',
    'Alternate World',
    'Amnesia',
    'Ancient',
    'Ancient and Modern Times',
    'Ancient China',
    'Ancient Farming',
    'Ancient Romance',
    'ancient style',
    'Ancient Times',
    'Angst',
    'Antagonist',
    'Apocalypse',
    'Arranged Marriage',
    'Artist (Painter)',
    'Awaken',
    'beast world',
    'Beastmen',
    'Beautiful Female Lead',
    'Beautiful protagonist',
    'BG',
    'Bickering Couple',
    'big brother',
    'BL',
    'Book Transmigration',
    'Both Pure',
    'Broken Mirror Reunion',
    'Building a Fortune',
    'Building Fortune',
    'Business',
    'Business management',
    'Bussiness',
    'Campus',
    'Campus Romance',
    'Cannon Fodder',
    'Capitalist Heiress',
    'Career Development',
    'Career Woman',
    'celebrity',
    'CEO',
    'Character Growth',
    'Charming Protagonist',
    'Chasing wife',
    'Child',
    'Childcare',
    'Childhood Love',
    'Childhood Sweethearts',
    'Chubby MC',
    'Cold-Hearted Prince',
    'College Life',
    'Comedy',
    'coming-of-age',
    'Competition',
    'contemporary',
    'Contract Marriage',
    'Cooking',
    'Countryside',
    'Court Marquis',
    'Court Nobility',
    'Crematorium Arc',
    'Crime',
    'Crime Fiction',
    'Crime Investigation',
    'Criminal',
    'Criminal Investigation',
    'cross-class encounters',
    'Crossing',
    'Cultivation',
    'Cunning Beauty',
    'Cute Babies',
    'cute baby',
    'Cute Child',
    'Cute Children',
    'Cute Protagonist',
    'Daily life',
    'Daily life with the Army',
    'Dark Villain',
    'Defying Fate',
    'Delicate Beauty',
    'Demons',
    'Depression',
    'Devoted Love',
    'Dimensional Space',
    'Disguise',
    'Divorce',
    'Divorced',
    'domi',
    'Doting Brother',
    'Doting Husband',
    'Doting Love Interest',
    'doting wife',
    'Double Purity',
    'Drama',
    'Dual Male Leads',
    'Easy',
    'Ecchi',
    'Elite',
    'Emperor',
    'Emptying Supplies',
    'Enemies to Lovers',
    'Ensemble Cast',
    'Ensemble Cast of Cannon Fodders',
    'Entertainment',
    'Entertainment Industry',
    'Era',
    'Era Farming',
    'Era novel',
    'Everyday Life',
    'Ex-Lovers',
    'Face-Slapping',
    'Face-Slapping Drama',
    'Face-Slapping Fiction',
    'Fake Daughter',
    'Fake Marriage',
    'fake vs. real',
    'fake vs. real daughter',
    'fake vs. real heiress',
    'Familial Love',
    'Family',
    'family affairs',
    'Family Bonds',
    'Family conflict',
    'Family Doting',
    'Family Drama',
    'Family Life',
    'family matters',
    'Famine Survival',
    'Famine Years',
    'Fanfiction',
    "Fanfiction (BL - Boys' Love/Yuri)",
    'Fantasy',
    'Fantasy Romance',
    'Farming',
    'Farming life',
    'Female Dominated',
    'Female Lead',
    'Female Protagonist',
    'Flash Marriage',
    'Flirtatious Beauty',
    'Food',
    'Forced Love',
    'Forced Marriage',
    'Forced Marriage & Possession',
    'forced plunder',
    'Fortune',
    'Frail Heroine',
    'FREE NOVEL‼️',
    'Friendship',
    'funny light',
    'Funny MC',
    'Game',
    'Game World',
    'Gender Bender',
    'General',
    'Getting Rich',
    'Ghost',
    'Girls Love',
    'Golden Finger',
    'Gourmet Food',
    'Group Favorite',
    'Group Pampering',
    'Growth System',
    'handsome male lead',
    'Harem',
    'HE',
    'Healing',
    'Heartwarming',
    'Heartwarming Daily Life',
    'Heaven’s Chosen',
    'Hidden Identity',
    'Hidden Marriage',
    'Historical',
    'Historical Era',
    'Historical Fiction',
    'Historical Romance',
    'Horror',
    'Humor',
    'Industry Elite',
    'Inner Courtyard Schemes',
    'Inspirational',
    'Interstellar',
    'Isekai',
    'Josei',
    'Just Sweetness',
    'large age gap',
    'Lazy',
    'Light Family Feuds',
    'Light Mystery',
    'Light Political Intrigue',
    'light romance',
    'Light-hearted',
    'Lighthearted',
    'Little Black Room',
    'Live Streaming',
    'Livestream',
    'livestreaming',
    'Lost Memory',
    'love',
    'Love After Marriage',
    'Love and Hate',
    'love as a battlefield',
    'love at first sight',
    'Love Later',
    'Love-hate relationship',
    'Lucky Charm',
    'Lucky Koi',
    'Lucky Protagonist',
    'Magic',
    'magical space',
    'male',
    'Male Protagonist',
    'Marriage',
    'Marriage Before Love',
    'Marriage First',
    'Martial Arts',
    'Match Made in Heaven',
    'Matriarchal Society',
    'Mature',
    'Mecha',
    'medical skills',
    'Medicine',
    'Medicine and Poison',
    'Melodrama',
    'Metaphysics',
    'Military',
    'Military Husband',
    'Military Island',
    'Military Life',
    'Military Marriage',
    'Military Romance',
    'Military Wedding',
    'Military Wife',
    'mind reading',
    'Misunderstanding',
    'Misunderstandings',
    'Modern',
    'Modern Day',
    'Modern Fantasy',
    'Modern Romance',
    'Modern/Contemporary',
    'Money Depreciation',
    'Motivational',
    'Mpreg',
    'Multiple Children',
    'Multiple Male Lead',
    'murder',
    'mutant',
    'Mutual Devotion',
    'Mutual Purity',
    'Mystery',
    'mystical face-slapping',
    'Mythical Beasts',
    'Mythology',
    'No CP',
    'No Rekindling of Old Flames',
    'No Schemes',
    'Non-human',
    'Obsessive Gong',
    'Obsessive love',
    'Office',
    'officialdom',
    'Older Love Interests',
    'omegaverse',
    'palace fighting',
    'Palace Struggles',
    'Pampering Wife',
    'Past Life',
    'Perfect Match',
    'Period Fiction',
    'Period Novel',
    'planes',
    'Plot Divergence',
    'Points Mall',
    'Poor Protagonist',
    'poor to powerful',
    'Poor to rich',
    'Popularity',
    'Possessive Love',
    'Possessive Male Lead',
    'Power Couple',
    'Power Fantasy',
    'Powerful Protagonist',
    'pregnancy',
    'Present Life',
    'President ML',
    'princess',
    'Protective Male Lead',
    'Psychological',
    'pursuing love',
    'Quick transmigration',
    'quick wear',
    'raising a baby',
    'Raising Children',
    'Real Daughter',
    'rebellion',
    'Rebirth',
    'Reborn',
    'Redemption',
    'Refreshing Fiction',
    'reincarnation',
    'Remarriage',
    'Reunion',
    'Revenge',
    'Revenge Drama',
    'Rich CEO',
    'Rich Family',
    'Rich President',
    'Rivalry',
    'Romance',
    'Romance of the Republic of China',
    'Romantic Comedy',
    'Royal Family',
    'Royalty',
    'Rural',
    'Rural life',
    'Ruthless Crown Prince',
    'Salted fish',
    'SameSexMarriage',
    'Schemes and Conspiracies',
    'Scheming Female Lead',
    'School Life',
    'Sci-fi',
    'Scum Abuse',
    'Scumbag Husband',
    'Second Chance',
    'Second Marriage',
    'Secret Crush',
    'Secret Identity',
    'Secret Love',
    'sect',
    'Seductive',
    'seinen',
    'Serious Drama',
    'Short Story',
    'Shoujo',
    'Shoujo Ai',
    'Shounen',
    'Shounen Ai',
    'Showbiz',
    'Sickly Beauty Shou',
    'Side Character Rise',
    'Slice',
    'Slice of Life',
    'Slight Magical Ability',
    'Slow Burn',
    'slow romance',
    'Slow-burn Romance',
    'smart couple',
    'Smut',
    'Space',
    'Space Ability',
    'Space Spirit',
    'Special Love',
    'Spirit Demons',
    'spoil',
    'Spoiled',
    'Spoiling Wife',
    'spy',
    'Starry Sky',
    'Stepmother',
    'stockpiling',
    'stolen',
    'Streaming',
    'strong',
    'Strong Female Lead',
    'Strong Love Interest',
    'strong pampering',
    'Student Life',
    'Studying',
    'Supernatural',
    'supporting characters',
    'Supporting Female Character',
    'Survival',
    'Suspense',
    'Swapped Baby',
    'Sweet',
    'Sweet Doting',
    'Sweet Love',
    'Sweet Pampering',
    'sweet pet',
    'Sweet Revenge',
    'Sweet Romance',
    'Sweet Story',
    'SweetNovel',
    'system',
    'System Fantasy',
    'System Transmigration',
    'Taciturn Rugged Man',
    'Thriller',
    'Time Travel',
    'Top-Notch Relatives',
    'Tragedy',
    'Transformation',
    'Transmigration',
    'transmigration into a novel',
    'Transmigration into Books',
    'Transmigration to the 1970s',
    'Traveling through space',
    'Traveling through time',
    'Treasure Appraisal',
    'Underdog Triumph',
    'Uniform Romance',
    'Unlimited Flow',
    'Unrequited Love',
    'Urban',
    'urban life',
    'urban realism',
    'Urban romance',
    'Vampires',
    'Village Life',
    'Villain',
    'war',
    'Weak to Strong',
    'wealthy characters',
    'Wealthy Families',
    'Wealthy Family',
    'Wealthy Male Lead',
    'Wealthy/Powerful Male Lead',
    'White Moonlight',
    'Wife-Chasing Crematorium',
    'Wish Fulfillment Novel',
    'Workplace',
    'Wuxia',
    'Xianxia',
    'Xuanhuan',
    'yandere',
    'Yandere Character',
    'Yandere Male Leads',
    'Yaoi',
    'Younger Love Interest',
    'Youth',
    'Yuri',
    'Zombie',
];
function unescapeHtmlText(escaped) {
    var txt = (0, cheerio_1.load)("<p>".concat(escaped, "</p>"));
    return txt.text();
}
var ShanghaiFantasyPlugin = /** @class */ (function () {
    function ShanghaiFantasyPlugin() {
        this.MAX_PAGE_CHAPTERS = 5000; // the highest possible value that WP won't complain about, to minimize API calls
        this.HIDE_LOCKED = false;
        this.FETCH_LOCKED_PRICE = true;
        this.id = 'shanghaifantasy';
        this.name = 'Shanghai Fantasy';
        this.icon = 'src/en/shanghaifantasy/icon.png';
        this.site = 'https://shanghaifantasy.com';
        this.version = '1.0.0';
        this.filters = {
            status: {
                label: 'Status',
                type: filterInputs_1.FilterTypes.Picker,
                value: '',
                options: [
                    { label: 'All', value: '' },
                    { label: 'Completed', value: 'Completed' },
                    { label: 'Draft', value: 'Draft' },
                    { label: 'Dropped', value: 'Dropped' },
                    { label: 'Hiatus', value: 'Hiatus' },
                    { label: 'Ongoing', value: 'Ongoing' },
                ],
            },
            genres: {
                label: 'Genres',
                type: filterInputs_1.FilterTypes.CheckboxGroup,
                value: [],
                options: TAG_LIST.map(function (v) { return ({ label: v, value: v.replace(' ', '+') }); }),
            },
            query: {
                label: 'Search Term',
                type: filterInputs_1.FilterTypes.TextInput,
                value: '',
            },
        };
        this.imageRequestInit = undefined;
        this.resolveUrl = function (path, isNovel) { return path; };
    }
    ShanghaiFantasyPlugin.prototype.popularNovels = function (pageNo_1, _a) {
        return __awaiter(this, arguments, void 0, function (pageNo, _b) {
            var term, novelstatus, orderCriterion, orderDirection, query, url, result, body;
            var _c, _d, _e, _f, _g, _h;
            var showLatestNovels = _b.showLatestNovels, filters = _b.filters;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        term = ((_d = (_c = filters === null || filters === void 0 ? void 0 : filters.genres) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : []).length > 0
                            ? filters.genres.value.join('*')
                            : '';
                        novelstatus = (_f = (_e = filters === null || filters === void 0 ? void 0 : filters.status) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : '';
                        orderCriterion = '';
                        orderDirection = '';
                        query = (_h = (_g = filters === null || filters === void 0 ? void 0 : filters.query) === null || _g === void 0 ? void 0 : _g.value) !== null && _h !== void 0 ? _h : '';
                        url = "".concat(this.site, "/wp-json/fiction/v1/novels/?novelstatus=").concat(novelstatus, "&term=").concat(term, "&page=").concat(pageNo, "&orderBy=").concat(orderCriterion, "&order=").concat(orderDirection, "&query=").concat(query);
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url)];
                    case 1:
                        result = _j.sent();
                        if (!result.ok) {
                            throw new Error('Captcha error, please open in webview');
                        }
                        return [4 /*yield*/, result.json()];
                    case 2:
                        body = _j.sent();
                        return [2 /*return*/, body.map(function (item) { return ({
                                name: unescapeHtmlText(item.title),
                                path: item.permalink,
                                cover: item.novelImage,
                            }); })];
                }
            });
        });
    };
    ShanghaiFantasyPlugin.prototype.searchNovels = function (searchTerm, pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            var url, result, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.site, "/wp-json/fiction/v1/novels/?novelstatus=&term=&page=").concat(pageNo, "&orderBy=&order=&query=").concat(searchTerm);
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url)];
                    case 1:
                        result = _a.sent();
                        if (!result.ok) {
                            throw new Error('Captcha error, please open in webview');
                        }
                        return [4 /*yield*/, result.json()];
                    case 2:
                        body = _a.sent();
                        return [2 /*return*/, body.map(function (item) { return ({
                                name: unescapeHtmlText(item.title),
                                path: item.permalink,
                                cover: item.novelImage,
                            }); })];
                }
            });
        });
    };
    ShanghaiFantasyPlugin.prototype.parseNovel = function (novelPath) {
        return __awaiter(this, void 0, void 0, function () {
            var novel, url, result, $, _a, detailsEl, statusEl, origAuthor, translator, tags, synopsisEl, category, pageNo, chPage, chapterNumber, url_1, result_1, _i, chPage_1, ch, title, chapter;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        novel = {
                            path: novelPath,
                            name: 'Untitled',
                        };
                        url = novelPath;
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url)];
                    case 1:
                        result = _d.sent();
                        if (!result.ok) {
                            throw new Error('Captcha error, please open in webview');
                        }
                        _a = cheerio_1.load;
                        return [4 /*yield*/, result.text()];
                    case 2:
                        $ = _a.apply(void 0, [_d.sent()]);
                        detailsEl = $('div:has(>#likebox)');
                        novel.cover = (_b = $(detailsEl).find('>img').attr('src')) !== null && _b !== void 0 ? _b : defaultCover_1.defaultCover;
                        novel.name = $(detailsEl).find('p.text-lg').text().trim();
                        statusEl = $(detailsEl).find('>div>a.mx-auto>p');
                        novel.status =
                            (_c = {
                                'Ongoing': novelStatus_1.NovelStatus.Ongoing,
                                'Completed': novelStatus_1.NovelStatus.Completed,
                                'Hiatus': novelStatus_1.NovelStatus.OnHiatus,
                                'Dropped': novelStatus_1.NovelStatus.Cancelled,
                                'Draft': 'Draft',
                            }[statusEl.text().trim()]) !== null && _c !== void 0 ? _c : novelStatus_1.NovelStatus.Unknown;
                        origAuthor = $(detailsEl).find('p:has(span:contains("Author:"))')[0]
                            .lastChild.data;
                        translator = $(detailsEl)
                            .find('p:has(span:contains("Translator:"))>a')
                            .text()
                            .trim();
                        novel.author = "".concat(origAuthor, " (Translated by: ").concat(translator, ")");
                        tags = [];
                        tags.push.apply(tags, $(detailsEl)
                            .find('>div>div.flex>span>a')
                            .get()
                            .map(function (el) { return $(el).text().trim().replace(',', '_'); }));
                        novel.genres = tags.join(', ');
                        synopsisEl = $("div[x-show=activeTab==='Synopsis']");
                        novel.summary = synopsisEl.text().trim();
                        category = $('ul#chapterList').attr('data-cat');
                        pageNo = 1;
                        chPage = [];
                        novel.chapters = [];
                        chapterNumber = 1;
                        _d.label = 3;
                    case 3:
                        url_1 = "".concat(this.site, "/wp-json/fiction/v1/chapters?category=").concat(category, "&order=asc&page=").concat(pageNo, "&per_page=").concat(this.MAX_PAGE_CHAPTERS);
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url_1)];
                    case 4:
                        result_1 = _d.sent();
                        if (!result_1.ok) {
                            throw new Error('Captcha error, please open in webview');
                        }
                        return [4 /*yield*/, result_1.json()];
                    case 5:
                        chPage = _d.sent();
                        for (_i = 0, chPage_1 = chPage; _i < chPage_1.length; _i++) {
                            ch = chPage_1[_i];
                            title = ch.title;
                            if (title.startsWith(novel.name)) {
                                title = title.slice(novel.name.length).trim();
                            }
                            if (ch.locked) {
                                // TODO: if the user is logged in, determine if they own the chapter
                                if (this.HIDE_LOCKED) {
                                    continue;
                                }
                                title = '🔒 ' + title;
                            }
                            chapter = {
                                name: unescapeHtmlText(title),
                                path: ch.permalink,
                                // releaseTime: '', // not provided
                                // chapterNumber: chapterNumber,
                            };
                            chapterNumber++;
                            novel.chapters.push(chapter);
                        }
                        pageNo++;
                        _d.label = 6;
                    case 6:
                        if (chPage.length > 0) return [3 /*break*/, 3];
                        _d.label = 7;
                    case 7: return [2 /*return*/, novel];
                }
            });
        });
    };
    ShanghaiFantasyPlugin.prototype.parseChapter = function (chapterPath) {
        return __awaiter(this, void 0, void 0, function () {
            var url, result, body, $, content, price, workUrl, result_2, work$, _a, workCategory, pageNo, chPage, thisChapter, url_2, result_3, _i, chPage_2, ch, priceMsg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = chapterPath;
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
                        content = $('div.contenta');
                        content.remove('script');
                        content.remove('.ai-viewports');
                        content.remove('.ai-viewport-1');
                        content.remove('.ai-viewport-2');
                        content.remove('.ai-viewport-3');
                        if (!($('div.mycred-sell-this-wrapper').length > 0)) return [3 /*break*/, 11];
                        price = null;
                        if (!this.FETCH_LOCKED_PRICE) return [3 /*break*/, 10];
                        workUrl = $(content.next()).find('a:not([rel])').attr('href');
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(workUrl)];
                    case 3:
                        result_2 = _b.sent();
                        if (!result_2.ok) {
                            throw new Error('Captcha error, please open in webview');
                        }
                        _a = cheerio_1.load;
                        return [4 /*yield*/, result_2.text()];
                    case 4:
                        work$ = _a.apply(void 0, [_b.sent()]);
                        workCategory = work$('ul#chapterList').attr('data-cat');
                        pageNo = 1;
                        chPage = [];
                        thisChapter = null;
                        _b.label = 5;
                    case 5:
                        url_2 = "".concat(this.site, "/wp-json/fiction/v1/chapters?category=").concat(workCategory, "&order=asc&page=").concat(pageNo, "&per_page=").concat(this.MAX_PAGE_CHAPTERS);
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url_2)];
                    case 6:
                        result_3 = _b.sent();
                        if (!result_3.ok) {
                            throw new Error('Captcha error, please open in webview');
                        }
                        return [4 /*yield*/, result_3.json()];
                    case 7:
                        chPage = _b.sent();
                        for (_i = 0, chPage_2 = chPage; _i < chPage_2.length; _i++) {
                            ch = chPage_2[_i];
                            if (ch.permalink === chapterPath) {
                                thisChapter = ch;
                                return [3 /*break*/, 9];
                            }
                        }
                        pageNo++;
                        _b.label = 8;
                    case 8:
                        if (chPage.length > 0) return [3 /*break*/, 5];
                        _b.label = 9;
                    case 9:
                        if (thisChapter !== null) {
                            price = thisChapter.price;
                        }
                        _b.label = 10;
                    case 10:
                        priceMsg = price !== null
                            ? "This chapter costs ".concat(price, " coins.")
                            : "To see the exact price, check the novel's landing page in WebView.";
                        return [2 /*return*/, "\n        <h3>This chapter is locked.</h3>\n        <p>\n          Viewing this chapter before it is publicly unlocked (if ever) requires payment.\n          If you have an account, use WebView to login and unlock the chapter.\n        </p>\n        <p>\n          ".concat(priceMsg, "\n        </p>\n        <p>\n          If you're certain that you are logged in and have unlocked the chapter, and are\n          receiving this message in error, feel free to post a bug report.\n        </p>\n      ")];
                    case 11: return [2 /*return*/, content.html()];
                }
            });
        });
    };
    return ShanghaiFantasyPlugin;
}());
exports.default = new ShanghaiFantasyPlugin();
