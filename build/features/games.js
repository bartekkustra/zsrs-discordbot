"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamesBot = void 0;
var discord_js_1 = require("discord.js");
var gamesBot = function (msg) {
    if (msg.content === '!games') {
        var games = [
            {
                name: 'Wolfenstein: Enemy Territory',
                desc: [
                    'https://www.etlegacy.com/',
                    'ip: et.teammuppet.com',
                ],
            },
            {
                name: 'Valheim',
                desc: [
                    'https://store.steampowered.com/app/892970/Valheim/',
                    "ip: " + process.env.VALHEIM_IP,
                    "pass: " + process.env.VALHEIM_PASS,
                ]
            }
        ];
        var embed_1 = new discord_js_1.MessageEmbed({
            color: 0x33CC33,
        });
        games.forEach(function (game) {
            embed_1.addField(game.name, game.desc.join('\n'), false);
        });
        msg.channel.send(embed_1);
    }
};
exports.gamesBot = gamesBot;
