"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
var builders_1 = require("@discordjs/builders");
exports.data = new builders_1.SlashCommandBuilder()
    .setName('allowedsites')
    .setDescription('URL cleanup allowed sites')
    .addSubcommand(function (subcommand) {
    return subcommand
        .setName('add')
        .setDescription('Adds new allowed site to database')
        .addStringOption(function (option) { return option
        .setName('url')
        .setDescription('Website URL _with_ protocol, eg. https://domain.com')
        .setRequired(true); });
})
    .addSubcommand(function (subcommand) {
    return subcommand
        .setName('info')
        .setDescription('Get details about specific url')
        .addStringOption(function (option) { return option
        .setName('url')
        .setDescription('Website URL _with_ protocol, eg. https://domain.com')
        .setRequired(true); });
})
    .addSubcommand(function (subcommand) {
    return subcommand
        .setName('list')
        .setDescription('Get a list of all allowed domains');
})
    .addSubcommand(function (subcommand) {
    return subcommand
        .setName('remove')
        .setDescription('Remove specific site from allowed list')
        .addStringOption(function (option) { return option
        .setName('url')
        .setDescription('Website URL _with_ protocol, eg. https://domain.com')
        .setRequired(true); });
});
