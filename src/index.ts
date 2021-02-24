import Discord from 'discord.js'
import dotenv from 'dotenv'

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
})

client.login(process.env.DISCORD_TOKEN)