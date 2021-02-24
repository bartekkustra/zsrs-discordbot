console.clear()
import Discord from 'discord.js'
import dotenv from 'dotenv'

import features from './features'
const {checkForEdyta} = features

const client = new Discord.Client()
dotenv.config()

client.on('ready', () => {
  // eslint-disable-next-line no-console
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.author === client.user) {
    return
  }

  checkForEdyta(msg)
})

client.login(process.env.DISCORD_TOKEN)
