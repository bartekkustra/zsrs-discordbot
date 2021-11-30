import { Message, MessageEmbed } from 'discord.js'

import { title } from 'process'

export const checkForCzarek = (msg: Message): void => {
  const response = 'https://media.giphy.com/media/8vIFoKU8s4m4CBqCao/giphy.gif'
  const arr = [
    'czarek',
    'czarkowi',
    'czaruś',
    'czarus',
    'czarku',
  ]

  const details = {
    title: 'Czarek',
    fullTitle: 'Czarek Czarkus Maximus',
    wystepowanie: 'Poznań',
    desc: 'Szef wszystkich szefów. Przede wszystkim szef Macieja. Nie można go zwolnić nawet jeśli nic nie robi. Trudno to wykryć bo Maciej robi za niego.'
  }

  const embed = new MessageEmbed({
    title: details.title,
    color: 0xE74C3C,
  })

  embed.addField('Full Title', details.fullTitle)
  embed.addField('Występowanie', details.wystepowanie)
  embed.addField('Opis', details.desc)
  embed.setImage('https://media.giphy.com/media/rCYMVPH3cInDdyDqNR/giphy-downsized.gif?cid=ecf05e474m67yy5igjkwoe9dti13sbyhfqie356t8v8u308z&rid=giphy-downsized.gif&ct=g')

  const regexp = new RegExp(`(^|\\W)(${arr.join('|')})($|\\W)`, 'gm')
  if (regexp.test(msg.content.toLowerCase())) {
    msg.channel.send(embed)
  }
}
