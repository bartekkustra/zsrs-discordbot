"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.szczepienie = void 0;
var szczepienie = function (msg) {
    var arr = [
        'covid',
        'koronawirus',
        'szczepienie',
        'szczepionka',
        'zaszczepić',
        'zaszczepic',
    ];
    var regexp = new RegExp("(^|\\W)(" + arr.join('|') + ")($|\\W)", 'gm');
    if (regexp.test(msg.content.toLowerCase())) {
        msg.channel.send('DIEGO ZASZCZEP SIE');
    }
};
exports.szczepienie = szczepienie;
