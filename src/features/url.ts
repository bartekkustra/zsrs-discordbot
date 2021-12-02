import validate from 'validator'
import { Message, MessageEmbed } from 'discord.js'
import { URL } from 'url'
import { Trackers } from '../db'

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

  // TODO: allowlist instead of blocklist
  if (msg.content.length >= MINIMUM_URL_LENGTH) {
    const msgArr = msg.content.trim().replace(/\n/gi, ' ').split(' ')
    msgArr.forEach(async el => {
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

          // get a list of params from the db
          const trackingList = await Trackers.findAll({ attributes: ['tracking_id'] })
          const trackingArr = trackingList.map(t => t.getDataValue('tracking_id'))

          let paramsMap = new Map()
          params.map.forEach((value, param) => {
            if (!trackingArr.includes(param)) {
              paramsMap.set(param, value)
            }
          })

          if (params.str) {
            let paramsStr = ''
            paramsMap.forEach(( value: string, key: string) => {
              paramsStr += `- ${key} → ${value}\n`
            })

            // msg.delete()

            const embed = new MessageEmbed()
            embed.setDescription('Please make sure to remove tracking ids if necessary from the url.')
            embed.setColor('#33cc33')
            embed.addField('Clear link', baseUrl, false)
            // embed.addField(`Original message (from ${msg.author.username})`, msg.content, false)

            paramsStr && embed.addField('List of unknown params', paramsStr, false)
            embed.addField('Add tracking ids', 'Use `/tracking` command to add known tracking ids', false)
            embed.addField('Report the issue', '[link](https://github.com/bartekkustra/zsrs-discordbot/issues/new)', false)

            msg.reply({ embeds: [embed] })
          }
        }
      }
    })
  }
}
