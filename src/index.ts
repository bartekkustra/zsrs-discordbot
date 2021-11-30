import { Client, Intents } from 'discord.js'
import dotenv from 'dotenv'
import features from './features'

const {
  checkForUrl,
  gamesBot,
  helpCommand,
} = features

const client = new Client({ intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
] })
dotenv.config()

client.on('message', async msg => {
  if (msg.author === client.user) {
    return
  }

  checkForUrl(msg)
  gamesBot(msg)
  helpCommand(msg, client.user)
})

client.login(process.env.DISCORD_TOKEN)
