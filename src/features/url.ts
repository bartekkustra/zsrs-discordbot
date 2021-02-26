import validate from 'validator'
import { Message, MessageEmbed } from 'discord.js'
import { URL } from 'url'

// http://a.b
const MINIMUM_URL_LENGTH = 10

export const checkForUrl = (msg: Message): void => {
  const urlOptions = {
    require_protocol: true,
    require_valid_protocol: true
  }
  const allowListUrls = [
    'youtube',
    'youtu.be',
    'google',
    'wolfram',
    'stackoverflow',
  ]

  if (msg.content.length >= MINIMUM_URL_LENGTH) {
    const msgArr = msg.content.split(' ')
    msgArr.forEach(el => {
      if (validate.isURL(el, urlOptions)) {
        let url: URL;
        try {
          url = new URL(el)
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Error trying to convert string to URL', { string: el, error: err })
        }

        if (url) {
          if (allowListUrls.some(x => url.origin.includes(x))) {
            return
          }
          const baseUrl = url.origin + url.pathname
          const params = {
            str: url.search,
            map: url.searchParams,
          }

          if (params.str) {
            // TODO: add params to db for metrics
            let paramsStr = ''
            params.map.forEach((value: string, key: string) => {
              paramsStr += `- ${key} → ${value}\n`
            })
  
            msg.delete()
            const embed = new MessageEmbed({
              title: 'Possible Tracking ID in the url',
              description: 'Please make sure to remove tracking ids if necessary from the url.',
              author: {
                name: `by ${msg.author.username}`,
                iconURL: msg.author.displayAvatarURL(),
              },
              color: 0x33CC33
            })
            embed.addField('Clear link', baseUrl, false)
            embed.addField(`Original message (from: ${msg.author.username})`, msg.content, false)
            paramsStr && embed.addField('List of params', paramsStr, false)
            embed.addField('Report the issue', 'https://github.com/bartekkustra/zsrs-discordbot/issues/new', false)
            msg.channel.send(embed)
          }
        }
      }
    })
  }
}
