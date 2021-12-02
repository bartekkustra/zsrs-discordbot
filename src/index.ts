import { Client, Intents, Message } from 'discord.js'
import dotenv from 'dotenv'

import features from './features'
import { Trackers, AllowedSites } from './db'

import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import fs from 'fs'

import RESPONSES from './cmd_responses'

dotenv.config()

const commands: any[] = []
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'))

for (const file of commandFiles) {
  /* eslint-disable-next-line @typescript-eslint/no-var-requires */
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const {
  checkForUrl,
  gamesBot,
  helpCommand,
} = features

const client = new Client({ intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
] });

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

// register commands
(async () => {
  try {
    console.log('Started refreshing application (/) commands')
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), 
      { body: commands })
    console.log('Successfully reloaded application (/) commands')
  } catch (error) {
    console.log(error)
  }
})()

client.on('ready', async () => {
  Trackers.sync()
  AllowedSites.sync()
  console.log('Ready!')
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) {return;}

  const { commandName } = interaction

  if (commandName === 'tracking') {
    RESPONSES.tracking(interaction)
  } else if (commandName === 'allowedsites') {
    RESPONSES.allowedsites(interaction)
  }
});

client.on('message', async (msg: Message<boolean>) => {
  if (msg.author === client.user) {
    return
  }

  checkForUrl(msg)
  gamesBot(msg)
  helpCommand(msg, client.user)
})

client.login(process.env.DISCORD_TOKEN)
