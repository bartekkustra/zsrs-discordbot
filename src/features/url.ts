import validate from 'validator'
import { Message, MessageEmbed } from 'discord.js'
import { URL } from 'url'
import { Trackers, AllowedSites } from '../db'

// http://a.b
const MINIMUM_URL_LENGTH = 10

export const checkForUrl = async (msg: Message) => {
  const urlOptions = {
    require_protocol: true,
    require_valid_protocol: true
  }

  // TODO: allowlist instead of blocklist
  if (msg.content.length >= MINIMUM_URL_LENGTH) {
    const msgArr = msg.content.trim().replace(/\n/gi, ' ').split(' ')
    
    let allUrlsInMsg: Array<URL> = []
    msgArr.forEach(async el => {
      if (validate.isURL(el, urlOptions)) {
        let url: URL;
        try {
          url = new URL(el)
          allUrlsInMsg.push(url)
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Error trying to convert string to URL', { string: el, error: err })
        }
      }
    })
    
    if(allUrlsInMsg.length === 0) return
    
    // grab data from db
    const trackingList = await Trackers.findAll({ attributes: ['tracking_id'] })
    const trackingArr = trackingList.map(t => t.getDataValue('tracking_id'))
    const allowedSitesList = await AllowedSites.findAll({ attributes: ['url'] })
    const allowedSitesArr = allowedSitesList.map(t => t.getDataValue('url')).map(t => t.replace(/^www\./, ''))

    // check if they are whitelisted
    let finalEmbeds: Array<MessageEmbed> = []
    allUrlsInMsg.forEach(url => {
      if (allowedSitesArr.includes(url.hostname.replace(/^www\./, ''))) {
        return;
      } else {
        const baseUrl = url.origin + url.pathname
        const params = {
          search: url.search,
          searchParams: url.searchParams,
        }

        let paramsMap = new Map()
        params.searchParams.forEach((value, param) => {
          if (!trackingArr.includes(param)) {
            paramsMap.set(param, value)
          }
        })

        if (params.search) {
          let embedStr = ''
          paramsMap.forEach(( value: string, key: string ) => {
            embedStr += `- ${key} → ${value}\n`
          })

          const embed = new MessageEmbed()
          embedStr && embed.setDescription('Please make sure to remove tracking ids from the url.')
          embed.setColor('#33cc33')
          embedStr && embed.addField('Clear link', baseUrl, false)
          embedStr && embed.addField('List of unknown params', embedStr, false)
          embed.setFooter('1. If you want to add this website to allowed URLs, use `/allowedsites` command.\n2. If you want to add url parameter as a safe one, use `/tracking` command.')
          finalEmbeds.push(embed)
        }
      }
    })

    if (finalEmbeds.length > 0) {
      msg.reply({ embeds: finalEmbeds })
    }
  }
}


/*
if (url) {
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
*/