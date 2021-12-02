import { SlashCommandBuilder } from '@discordjs/builders'

export const data = new SlashCommandBuilder()
  .setName('allowedsites')
  .setDescription('URL cleanup allowed sites')
  .addSubcommand(subcommand => {
    return subcommand
      .setName('add')
      .setDescription('Adds new allowed site to database')
      .addStringOption(option => option
        .setName('url')
        .setDescription('Website URL without protocol, eg. domain.com')
        .setRequired(true))
  })
  .addSubcommand(subcommand => {
    return subcommand
      .setName('info')
      .setDescription('Get details about specific url')
      .addStringOption(option => option
        .setName('url')
        .setDescription('Website URL without protocol, eg. domain.com')
        .setRequired(true))
  })
  .addSubcommand(subcommand => {
    return subcommand
      .setName('list')
      .setDescription('Get a list of all allowed domains')
  })
  .addSubcommand(subcommand => {
    return subcommand
      .setName('remove')
      .setDescription('Remove specific site from allowed list')
      .addStringOption(option => option
        .setName('url')
        .setDescription('Website URL without protocol, eg. domain.com')
        .setRequired(true))
  })
