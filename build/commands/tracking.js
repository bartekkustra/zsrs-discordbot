"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
var builders_1 = require("@discordjs/builders");
exports.data = new builders_1.SlashCommandBuilder()
    .setName('tracking')
    .setDescription('URL tracking tags infos')
    .addSubcommand(function (subcommand) {
    return subcommand
        .setName('add')
        .setDescription('Adds new tracking id to database')
        .addStringOption(function (option) { return option.setName('tracking_id').setDescription('Tracking id name').setRequired(true); });
})
    .addSubcommand(function (subcommand) {
    return subcommand
        .setName('info')
        .setDescription('Get details about a tracking id')
        .addStringOption(function (option) { return option.setName('tracking_id').setDescription('Tracking id name').setRequired(true); });
})
    .addSubcommand(function (subcommand) {
    return subcommand
        .setName('list')
        .setDescription('Get a list of all saved tracking ids');
})
    .addSubcommand(function (subcommand) {
    return subcommand
        .setName('remove')
        .setDescription('Remove a specific tracking id')
        .addStringOption(function (option) { return option.setName('tracking_id').setDescription('Tracking id name').setRequired(true); });
});
