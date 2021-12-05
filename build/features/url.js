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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForUrl = void 0;
var validator_1 = __importDefault(require("validator"));
var discord_js_1 = require("discord.js");
var url_1 = require("url");
var db_1 = require("../db");
// http://a.b
var MINIMUM_URL_LENGTH = 10;
var checkForUrl = function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var urlOptions, msgArr, allUrlsInMsg_1, trackingList, trackingArr_1, allowedSitesList, allowedSitesArr_1, finalEmbeds_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                urlOptions = {
                    require_protocol: true,
                    require_valid_protocol: true
                };
                if (!(msg.content.length >= MINIMUM_URL_LENGTH)) return [3 /*break*/, 3];
                msgArr = msg.content.trim().replace(/\n/gi, ' ').split(' ');
                allUrlsInMsg_1 = [];
                msgArr.forEach(function (el) { return __awaiter(void 0, void 0, void 0, function () {
                    var url;
                    return __generator(this, function (_a) {
                        if (validator_1.default.isURL(el, urlOptions)) {
                            url = void 0;
                            try {
                                url = new url_1.URL(el);
                                allUrlsInMsg_1.push(url);
                            }
                            catch (err) {
                                // eslint-disable-next-line no-console
                                console.error('Error trying to convert string to URL', { string: el, error: err });
                            }
                        }
                        return [2 /*return*/];
                    });
                }); });
                if (allUrlsInMsg_1.length === 0)
                    return [2 /*return*/];
                return [4 /*yield*/, db_1.Trackers.findAll({ attributes: ['tracking_id'] })];
            case 1:
                trackingList = _a.sent();
                trackingArr_1 = trackingList.map(function (t) { return t.getDataValue('tracking_id'); });
                return [4 /*yield*/, db_1.AllowedSites.findAll({ attributes: ['url'] })];
            case 2:
                allowedSitesList = _a.sent();
                allowedSitesArr_1 = allowedSitesList.map(function (t) { return t.getDataValue('url'); }).map(function (t) { return t.replace(/^www\./, ''); });
                finalEmbeds_1 = [];
                allUrlsInMsg_1.forEach(function (url) {
                    if (allowedSitesArr_1.includes(url.hostname.replace(/^www\./, ''))) {
                        return;
                    }
                    else {
                        var baseUrl = url.origin + url.pathname;
                        var params = {
                            search: url.search,
                            searchParams: url.searchParams,
                        };
                        var paramsMap_1 = new Map();
                        params.searchParams.forEach(function (value, param) {
                            if (!trackingArr_1.includes(param)) {
                                paramsMap_1.set(param, value);
                            }
                        });
                        if (params.search) {
                            var embedStr_1 = '';
                            paramsMap_1.forEach(function (value, key) {
                                embedStr_1 += "- ".concat(key, " \u2192 ").concat(value, "\n");
                            });
                            var embed = new discord_js_1.MessageEmbed();
                            embedStr_1 && embed.setDescription('Please make sure to remove tracking ids from the url.');
                            embed.setColor('#33cc33');
                            embedStr_1 && embed.addField('Clear link', baseUrl, false);
                            embedStr_1 && embed.addField('List of unknown params', embedStr_1, false);
                            embed.setFooter('1. If you want to add this website to allowed URLs, use `/allowedsites` command.\n2. If you want to add url parameter as a safe one, use `/tracking` command.');
                            finalEmbeds_1.push(embed);
                        }
                    }
                });
                if (finalEmbeds_1.length > 0) {
                    msg.reply({ embeds: finalEmbeds_1 });
                }
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.checkForUrl = checkForUrl;
/*
if (url) {
    const embed = new MessageEmbed()
    embed.setDescription('Please make sure to remove tracking ids if necessary from the url.')
    embed.setColor('#33cc33')
    embed.addField('Clear link', baseUrl, false)
    // embed.addField(`Original message (from ${msg.author.username})`, msg.content, false)

    paramsStr && embed.addField('List of unknown params', paramsStr, false)
    embed.addField('Add tracking ids', 'Use `/tracking` command to add known tracking ids', false)
    embed.addField('Report the issue', '[link](https://github.com/bartekkustra/zsrs-discordbot/issues/new)', false)

    msg.reply({ embeds: [embed] })
  }
}
*/ 
