import { Message } from 'discord.js'

export const szczepienie = (msg: Message): void => {
  const arr = [
    'covid',
    'koronawirus',
    'szczepienie',
    'szczepionka',
    'zaszczepić',
    'zaszczepic',
  ]

  const regexp = new RegExp(`(^|\\W)(${arr.join('|')})($|\\W)`, 'gm')
  if (regexp.test(msg.content.toLowerCase())) {
    msg.channel.send('DIEGO ZASZCZEP SIE')
  }
}
