import { ClientUser, Message, MessageEmbed } from 'discord.js';

type DetailsList = Array<{
  cmd: string,
  desc: string,
}>

export const helpCommand = (msg: Message, bot: ClientUser): void => {
  if (msg.content === '!help') {
    const details: DetailsList = [
      {
        cmd: '!help',
        desc: 'Shows this message',
      },
      {
        cmd: 'edyta',
        desc: 'Shames Noizer for mentioning her (or anyone else for that matter)'
      },
      {
        cmd: '{url}?param=abc',
        desc: 'When URL with parameters is sent, bot will clean the url from parameters but keep also the original message'
      },
      {
        cmd: '!games',
        desc: 'Shows ip addresses of current game servers we play on',
      }
    ]

    const embed = new MessageEmbed({
      title: 'Help!',
      description: `Want to know what's triggering bot? Here's the list of commands and features`,
      author: {
        name: bot.username,
        iconURL: bot.displayAvatarURL(),
      },
      color: 0x33CC33,
    })

    details.forEach(command => {
      embed.addField(command.cmd, command.desc, false)
    })

    msg.channel.send(embed)
  }
}
