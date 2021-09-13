"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForCzarek = void 0;
var checkForCzarek = function (msg) {
    var response = 'https://media.giphy.com/media/8vIFoKU8s4m4CBqCao/giphy.gif';
    var arr = [
        'czarek',
        'czarkowi',
        'czaruś',
        'czarus',
        'czarku',
    ];
    var regexp = new RegExp("(^|\\W)(" + arr.join('|') + ")($|\\W)", 'gm');
    if (regexp.test(msg.content.toLowerCase())) {
        msg.channel.send(response);
    }
};
exports.checkForCzarek = checkForCzarek;
