const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('createquest')
	.setDescription('Make a quest!')
	.addStringOption(option =>

		option.setName('name')
			.setDescription('Quest name')
			.setRequired(true)
			).addStringOption(option => 

				option.setName('description').setDescription('Description of your quest.').setRequired(true)
				).addStringOption(option => 

                    option.setName('reward').setDescription('The reward you will give.').setRequired(true)
                    ).addBooleanOption(option => 

						option.setName('isroyal').setDescription('OWNERS ONLY').setRequired(true)
						)
module.exports = {data}