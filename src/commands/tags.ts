import { SlashCommandBuilder } from '@discordjs/builders'

export const data = new SlashCommandBuilder()
  .setName('tags')
  .setDescription('URL tracking tags infos')
  .addSubcommand(subcommand => {
    return subcommand
      .setName('add')
      .setDescription('Adds new tag to database')
      .addStringOption(option => option.setName('name').setDescription('Tag name').setRequired(true))
  })
  .addSubcommand(subcommand => {
    return subcommand
      .setName('info')
      .setDescription('Get details about a single tag')
      .addStringOption(option => option.setName('name').setDescription('Tag name').setRequired(true))
  })
  .addSubcommand(subcommand => {
    return subcommand
      .setName('list')
      .setDescription('Get a list of all tags')
  })
  .addSubcommand(subcommand => {
    return subcommand
      .setName('remove')
      .setDescription('Remove a specific tag')
      .addStringOption(option => option.setName('name').setDescription('Tag name').setRequired(true))
  })