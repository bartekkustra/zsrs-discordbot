import Discord from 'discord.js'
import dotenv from 'dotenv'

import features from './features'
const {
  checkForEdyta,
  checkForUrl,
  helpCommand,
} = features

const client = new Discord.Client()
dotenv.config()

client.on('message', async msg => {
  if (msg.author === client.user) {
    return
  }

  checkForEdyta(msg)
  checkForUrl(msg)
  helpCommand(msg, client)
})

client.login(process.env.DISCORD_TOKEN)
