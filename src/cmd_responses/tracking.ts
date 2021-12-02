const IS_EPHEMERAL = true
import { CommandInteraction, CacheType } from 'discord.js';
import { Trackers } from '../db'

const tracking = async (interaction: CommandInteraction<CacheType>): Promise<void> => {
  const { options } = interaction;

  const subcommand = options.getSubcommand()
  let tagName;
  
  switch (subcommand) {
    case 'add': {
      try {
        tagName = options.get('tracking_id').value
        // eq: INSERT INTO tags (name, createdBy) values (?, ?)
        await Trackers.create({
          tracking_id: tagName,
          createdBy: interaction.user.username,
        })

        return interaction.reply({
          content: `Tag ${tagName} added.`,
          ephemeral: IS_EPHEMERAL,
        })
      } catch (error: any) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          return interaction.reply({
            content: 'That tag already exists.',
            ephemeral: IS_EPHEMERAL
          })
        }
  
        return interaction.reply({
          content: 'Something went wrong with adding a tag.',
          ephemeral: IS_EPHEMERAL,
        })
      }
      break;
    }
    case 'info': {
      tagName = options.get('tracking_id').value
      const tag = await Trackers.findOne({ where: { tracking_id: tagName } })
  
      if (tag) {
        const createdBy = tag.getDataValue('createdBy')
        const createdAt = new Date(tag.getDataValue('createdAt')).toLocaleString()
        const usage_count = tag.getDataValue('usage_count')
        return interaction.reply({
          content: `${tagName} was added by ${createdBy} at ${createdAt} and has been used ${usage_count} times.`,
          ephemeral: IS_EPHEMERAL,
        })
      }
      return interaction.reply({
        content: `${tagName} does not exist in database`,
        ephemeral: IS_EPHEMERAL,
      })
      break;
    }
    
    case 'list': {
      const tagList = await Trackers.findAll({ attributes: ['tracking_id'] })
  
      const tagString = tagList
        .map(t => `- ${t.getDataValue('tracking_id')}`)
        .join('\n') || 'No tags set.'
      return interaction.reply({
        content: `List of tags: \`\`\`\n${tagString}\`\`\``,
        ephemeral: IS_EPHEMERAL,
      })
      break;
    }

    case 'remove': {
      tagName = options.get('tracking_id').value
  
      const rowCount = await Trackers.destroy({ where: { tracking_id: tagName } })
      if (!rowCount) {return interaction.reply('That tag does not exist.')}
      return interaction.reply('Tag deleted')
      break;
    }    
  }
}

export default tracking
