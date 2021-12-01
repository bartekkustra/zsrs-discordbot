import { SlashCommandBuilder } from '@discordjs/builders'

export const data = new SlashCommandBuilder()
  .setName('tracking')
  .setDescription('URL tracking tags infos')
  .addSubcommand(subcommand => {
    return subcommand
      .setName('add')
      .setDescription('Adds new tracking id to database')
      .addStringOption(option => option.setName('name').setDescription('Tracking id name').setRequired(true))
  })
  .addSubcommand(subcommand => {
    return subcommand
      .setName('info')
      .setDescription('Get details about a tracking id')
      .addStringOption(option => option.setName('name').setDescription('Tracking id name').setRequired(true))
  })
  .addSubcommand(subcommand => {
    return subcommand
      .setName('list')
      .setDescription('Get a list of all saved tracking ids')
  })
  .addSubcommand(subcommand => {
    return subcommand
      .setName('remove')
      .setDescription('Remove a specific tracking id')
      .addStringOption(option => option.setName('name').setDescription('Tracking id name').setRequired(true))
  })