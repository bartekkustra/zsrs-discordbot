"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForEdyta = void 0;
var checkForEdyta = function (msg) {
    var response = 'https://media.giphy.com/media/8vIFoKU8s4m4CBqCao/giphy.gif';
    var arr = [
        'edyta',
        'edyte',
        'edytę',
        'edytą',
        'edytka',
    ];
    var regexp = new RegExp("(^|\\W)(" + arr.join('|') + ")($|\\W)", 'gm');
    if (regexp.test(msg.content.toLowerCase())) {
        msg.channel.send(response);
    }
};
exports.checkForEdyta = checkForEdyta;
