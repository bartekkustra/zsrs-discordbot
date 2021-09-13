import { Message } from 'discord.js'

export const checkForCzarek = (msg: Message): void => {
  const response = 'https://media.giphy.com/media/8vIFoKU8s4m4CBqCao/giphy.gif'
  const arr = [
    'czarek',
    'czarkowi',
    'czaruś',
    'czarus',
    'czarku',
  ]

  const regexp = new RegExp(`(^|\\W)(${arr.join('|')})($|\\W)`, 'gm')
  if (regexp.test(msg.content.toLowerCase())) {
    msg.channel.send(response)
  }
}
