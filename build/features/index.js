"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var czarek_1 = require("./czarek");
var edyta_1 = require("./edyta");
var url_1 = require("./url");
var games_1 = require("./games");
var help_1 = require("./help");
var szczepienie_1 = require("./szczepienie");
var features = {
    checkForEdyta: edyta_1.checkForEdyta,
    checkForCzarek: czarek_1.checkForCzarek,
    checkForUrl: url_1.checkForUrl,
    gamesBot: games_1.gamesBot,
    helpCommand: help_1.helpCommand,
    szczepienie: szczepienie_1.szczepienie,
};
exports.default = features;
