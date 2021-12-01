const IS_EPHEMERAL = true
import { CommandInteraction, CacheType } from 'discord.js';
import { Tags } from '../db'

const tracking = async (interaction: CommandInteraction<CacheType>): Promise<void> => {
  const { options } = interaction;

  const subcommand = options.getSubcommand()
  let tagName;
  
  switch (subcommand) {
    case 'add': {
      try {
        tagName = options.get('name').value
        // eq: INSERT INTO tags (name, createdBy) values (?, ?)
        await Tags.create({
          name: tagName,
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
      tagName = options.get('name').value
      const tag = await Tags.findOne({ where: { name: tagName } })
  
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
      const tagList = await Tags.findAll({ attributes: ['name'] })
  
      const tagString = tagList
        .map(t => `- ${t.getDataValue('name')}`)
        .join('\n') || 'No tags set.'
      return interaction.reply({
        content: `List of tags: \`\`\`\n${tagString}\`\`\``,
        ephemeral: IS_EPHEMERAL,
      })
      break;
    }

    case 'remove': {
      tagName = options.get('name').value
  
      const rowCount = await Tags.destroy({ where: { name: tagName } })
      if (!rowCount) {return interaction.reply('That tag does not exist.')}
      return interaction.reply('Tag deleted')
      break;
    }    
  }
}

export default tracking
