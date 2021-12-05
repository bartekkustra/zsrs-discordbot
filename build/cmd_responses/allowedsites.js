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
Object.defineProperty(exports, "__esModule", { value: true });
var IS_EPHEMERAL = true;
var url_1 = require("url");
var db_1 = require("../db");
var allowedsites = function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var options, subcommand, allowedUrl, _a, newUrl, error_1, url, createdBy, createdAt, urlList, urlString, rowCount;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                options = interaction.options;
                subcommand = options.getSubcommand();
                _a = subcommand;
                switch (_a) {
                    case 'add': return [3 /*break*/, 1];
                    case 'info': return [3 /*break*/, 5];
                    case 'list': return [3 /*break*/, 7];
                    case 'remove': return [3 /*break*/, 9];
                }
                return [3 /*break*/, 11];
            case 1:
                _b.trys.push([1, 3, , 4]);
                allowedUrl = options.get('url').value;
                newUrl = void 0;
                try {
                    newUrl = new url_1.URL(allowedUrl.toString());
                    allowedUrl = newUrl.hostname;
                }
                catch (error) {
                    console.error(error);
                    return [2 /*return*/, interaction.reply({
                            content: "Looks like the URL was not valid. You typed:\n".concat(allowedUrl, ". Make sure you add the protocol, eg. https://"),
                            ephemeral: IS_EPHEMERAL,
                        })];
                }
                return [4 /*yield*/, db_1.AllowedSites.create({
                        url: allowedUrl,
                        createdBy: interaction.user.username,
                    })];
            case 2:
                _b.sent();
                return [2 /*return*/, interaction.reply({
                        content: "".concat(allowedUrl, " added."),
                        ephemeral: IS_EPHEMERAL,
                    })];
            case 3:
                error_1 = _b.sent();
                if (error_1.name === 'SequelizeUniqueConstraintError') {
                    return [2 /*return*/, interaction.reply({
                            content: 'That URL already exists.',
                            ephemeral: IS_EPHEMERAL
                        })];
                }
                return [2 /*return*/, interaction.reply({
                        content: 'Something went wrong with adding a site.',
                        ephemeral: IS_EPHEMERAL,
                    })];
            case 4: return [3 /*break*/, 11];
            case 5:
                allowedUrl = options.get('url').value;
                return [4 /*yield*/, db_1.AllowedSites.findOne({ where: { url: allowedUrl } })];
            case 6:
                url = _b.sent();
                if (url) {
                    createdBy = url.getDataValue('createdBy');
                    createdAt = new Date(url.getDataValue('createdAt')).toLocaleString();
                    return [2 /*return*/, interaction.reply({
                            content: "".concat(allowedUrl, " was added by ").concat(createdBy, " at ").concat(createdAt, "."),
                            ephemeral: IS_EPHEMERAL,
                        })];
                }
                return [2 /*return*/, interaction.reply({
                        content: "".concat(allowedUrl, " does not exist in database"),
                        ephemeral: IS_EPHEMERAL,
                    })];
            case 7: return [4 /*yield*/, db_1.AllowedSites.findAll({ attributes: ['url'] })];
            case 8:
                urlList = _b.sent();
                urlString = urlList
                    .map(function (t) { return "- ".concat(t.getDataValue('url')); })
                    .join('\n') || 'No URLs set.';
                return [2 /*return*/, interaction.reply({
                        content: "List of URLs: ```\n".concat(urlString, "```"),
                        ephemeral: IS_EPHEMERAL,
                    })];
            case 9:
                allowedUrl = options.get('url').value;
                return [4 /*yield*/, db_1.AllowedSites.destroy({ where: { url: allowedUrl } })];
            case 10:
                rowCount = _b.sent();
                if (!rowCount) {
                    return [2 /*return*/, interaction.reply('That URL does not exist.')];
                }
                return [2 /*return*/, interaction.reply({
                        content: 'URL deleted',
                        ephemeral: IS_EPHEMERAL,
                    })];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.default = allowedsites;
