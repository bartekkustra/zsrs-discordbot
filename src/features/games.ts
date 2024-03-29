import { Message, MessageEmbed } from 'discord.js';

type GamesList = Array<{
  name: string,
  desc: Array<string>,
}>

export const gamesBot = (msg: Message): void => {
  if (msg.content === '!games') {
    const games: GamesList = [
      {
        name: 'Wolfenstein: Enemy Territory',
        desc: [
          'https://www.etlegacy.com/',
          'ip: et.teammuppet.com',
        ],
      },
      {
        name: 'Valheim',
        desc: [
          'https://store.steampowered.com/app/892970/Valheim/',
          `ip: ${process.env.VALHEIM_IP}`,
          `pass: ${process.env.VALHEIM_PASS}`,
        ]
      }
    ]
    const embed = new MessageEmbed({
      color: 0x33CC33,
    })
    
    games.forEach(game => {
      embed.addField(game.name, game.desc.join('\n'), false)
    })

    msg.channel.send({ embeds: [embed] })
  }
}
