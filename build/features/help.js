"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpCommand = void 0;
var discord_js_1 = require("discord.js");
var helpCommand = function (msg, bot) {
    if (msg.content === '!help') {
        var details = [
            {
                cmd: '!help',
                desc: 'Shows this message',
            },
            {
                cmd: 'edyta',
                desc: 'Shames Noizer for mentioning her (or anyone else for that matter)'
            },
            {
                cmd: 'czarek',
                desc: 'Shames Noizer for working with Czarek',
            },
            {
                cmd: '{url}?param=abc',
                desc: 'When URL with parameters is sent, bot will clean the url from parameters but keep also the original message'
            },
            {
                cmd: '!games',
                desc: 'Shows ip addresses of current game servers we play on',
            }
        ];
        var embed_1 = new discord_js_1.MessageEmbed({
            title: 'Help!',
            description: "Want to know what's triggering bot? Here's the list of commands and features",
            author: {
                name: bot.username,
                iconURL: bot.displayAvatarURL(),
            },
            color: 0x33CC33,
        });
        details.forEach(function (command) {
            embed_1.addField(command.cmd, command.desc, false);
        });
        msg.channel.send(embed_1);
    }
};
exports.helpCommand = helpCommand;
