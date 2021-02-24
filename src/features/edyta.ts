import { Message } from 'discord.js'

export const checkForEdyta = (msg: Message): string => {
  const response = 'https://media.giphy.com/media/8vIFoKU8s4m4CBqCao/giphy.gif'
  const arr = [
    'edyta',
    'edyte',
    'edytę',
    'edytą',
    'edytka',
    'eԁyta',
  ]

  const regexp = new RegExp(`(^|\\W)(${arr.join('|')})`)
  if (regexp.test(msg.content.toLowerCase())) {
    msg.channel.send(response)
  }
  
  return `Message: ${msg}`
}
