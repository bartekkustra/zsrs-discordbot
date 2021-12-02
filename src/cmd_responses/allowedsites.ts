const IS_EPHEMERAL = true
import { CommandInteraction, CacheType } from 'discord.js';
import { URL } from 'url';
import { AllowedSites } from '../db'

const allowedsites = async (interaction: CommandInteraction<CacheType>): Promise<void> => {
  const { options } = interaction;

  const subcommand = options.getSubcommand()
  let allowedUrl
  
  switch (subcommand) {
    case 'add': {
      try {
        allowedUrl = options.get('url').value
        // eq: INSERT INTO tags (name, createdBy) values (?, ?)
        
        let newUrl: URL
        try {
          newUrl = new URL(allowedUrl.toString())
          allowedUrl = newUrl.hostname
        } catch(error) {
          console.error(error)
          return interaction.reply({
            content: `Looks like the URL was not valid. You typed:\n${allowedUrl}`,
            ephemeral: IS_EPHEMERAL,
          })
        }

        await AllowedSites.create({
          url: allowedUrl,
          createdBy: interaction.user.username,
        })

        return interaction.reply({
          content: `${allowedUrl} added.`,
          ephemeral: IS_EPHEMERAL,
        })
      } catch (error: any) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          return interaction.reply({
            content: 'That URL already exists.',
            ephemeral: IS_EPHEMERAL
          })
        }
  
        return interaction.reply({
          content: 'Something went wrong with adding a site.',
          ephemeral: IS_EPHEMERAL,
        })
      }
      break;
    }
    case 'info': {
      allowedUrl = options.get('url').value
      const url = await AllowedSites.findOne({ where: { url: allowedUrl } })
  
      if (url) {
        const createdBy = url.getDataValue('createdBy')
        const createdAt = new Date(url.getDataValue('createdAt')).toLocaleString()
        return interaction.reply({
          content: `${allowedUrl} was added by ${createdBy} at ${createdAt}.`,
          ephemeral: IS_EPHEMERAL,
        })
      }
      return interaction.reply({
        content: `${allowedUrl} does not exist in database`,
        ephemeral: IS_EPHEMERAL,
      })
      break;
    }
    
    case 'list': {
      const urlList = await AllowedSites.findAll({ attributes: ['url'] })
  
      const urlString = urlList
        .map(t => `- ${t.getDataValue('url')}`)
        .join('\n') || 'No URLs set.'
      return interaction.reply({
        content: `List of URLs: \`\`\`\n${urlString}\`\`\``,
        ephemeral: IS_EPHEMERAL,
      })
      break;
    }

    case 'remove': {
      allowedUrl = options.get('url').value
  
      const rowCount = await AllowedSites.destroy({ where: { url: allowedUrl } })
      if (!rowCount) {return interaction.reply('That URL does not exist.')}
      return interaction.reply('URL deleted')
      break;
    }    
  }
}

export default allowedsites
