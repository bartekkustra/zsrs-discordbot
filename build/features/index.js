"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("./url");
var games_1 = require("./games");
var help_1 = require("./help");
var features = {
    checkForUrl: url_1.checkForUrl,
    gamesBot: games_1.gamesBot,
    helpCommand: help_1.helpCommand,
};
exports.default = features;
