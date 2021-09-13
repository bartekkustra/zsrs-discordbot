"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForCzarek = void 0;
var discord_js_1 = require("discord.js");
var checkForCzarek = function (msg) {
    var response = 'https://media.giphy.com/media/8vIFoKU8s4m4CBqCao/giphy.gif';
    var arr = [
        'czarek',
        'czarkowi',
        'czaruś',
        'czarus',
        'czarku',
    ];
    var details = {
        title: 'Czarek',
        fullTitle: 'Czarek Czarkus Maximus',
        wystepowanie: 'Poznań',
        desc: 'Szef wszystkich szefów. Przede wszystkim szef Macieja. Nie można go zwolnić nawet jeśli nic nie robi. Trudno to wykryć bo Maciej robi za niego.'
    };
    var embed = new discord_js_1.MessageEmbed({
        title: details.title,
        color: 0xE74C3C,
    });
    embed.addField('Full Title', details.fullTitle);
    embed.addField('Występowanie', details.wystepowanie);
    embed.addField('Opis', details.desc);
    embed.setImage('https://media.giphy.com/media/rCYMVPH3cInDdyDqNR/giphy-downsized.gif?cid=ecf05e474m67yy5igjkwoe9dti13sbyhfqie356t8v8u308z&rid=giphy-downsized.gif&ct=g');
    var regexp = new RegExp("(^|\\W)(" + arr.join('|') + ")($|\\W)", 'gm');
    if (regexp.test(msg.content.toLowerCase())) {
        msg.channel.send(embed);
    }
};
exports.checkForCzarek = checkForCzarek;
