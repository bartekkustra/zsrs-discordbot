"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForUrl = void 0;
var validator_1 = __importDefault(require("validator"));
var discord_js_1 = require("discord.js");
var url_1 = require("url");
// http://a.b
var MINIMUM_URL_LENGTH = 10;
var checkForUrl = function (msg) {
    var urlOptions = {
        require_protocol: true,
        require_valid_protocol: true
    };
    var allowListUrls = [
        'youtube',
        'youtu.be',
        'google',
        'wolfram',
        'stackoverflow',
    ];
    if (msg.content.length >= MINIMUM_URL_LENGTH) {
        var msgArr = msg.content.trim().replace(/\n/gi, ' ').split(' ');
        msgArr.forEach(function (el) {
            if (validator_1.default.isURL(el, urlOptions)) {
                var url_2;
                try {
                    url_2 = new url_1.URL(el);
                }
                catch (err) {
                    // eslint-disable-next-line no-console
                    console.error('Error trying to convert string to URL', { string: el, error: err });
                }
                if (url_2) {
                    if (allowListUrls.some(function (x) { return url_2.origin.includes(x); })) {
                        return;
                    }
                    var baseUrl = url_2.origin + url_2.pathname;
                    var params = {
                        str: url_2.search,
                        map: url_2.searchParams,
                    };
                    if (params.str) {
                        // TODO: add params to db for metrics
                        var paramsStr_1 = '';
                        params.map.forEach(function (value, key) {
                            paramsStr_1 += "- " + key + " \u2192 " + value + "\n";
                        });
                        msg.delete();
                        var embed = new discord_js_1.MessageEmbed({
                            title: 'Possible Tracking ID in the url',
                            description: 'Please make sure to remove tracking ids if necessary from the url.',
                            author: {
                                name: "by " + msg.author.username,
                                iconURL: msg.author.displayAvatarURL(),
                            },
                            color: 0x33CC33
                        });
                        embed.addField('Clear link', baseUrl, false);
                        embed.addField("Original message (from: " + msg.author.username + ")", msg.content, false);
                        paramsStr_1 && embed.addField('List of params', paramsStr_1, false);
                        embed.addField('Report the issue', 'https://github.com/bartekkustra/zsrs-discordbot/issues/new', false);
                        msg.channel.send(embed);
                    }
                }
            }
        });
    }
};
exports.checkForUrl = checkForUrl;
