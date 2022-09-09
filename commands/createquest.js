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
					option.setName('category').setDescription('what type of quest is it?').setRequired(true).addChoices(
						{name: 'Building', value: 'Building: building'},
						{name: 'Area Clearing', value: 'Building: Area clearing'},
						{name: 'Farming', value: 'Gathering: farming'},
						{name: 'Mining', value: 'Gathering: mining'},
						{name: 'Fighting', value: 'Combat'},
						{name: 'Other', value: 'Other: unknown'}
						)
					).addStringOption(option => 
                	    option.setName('reward').setDescription('The reward you will give.').setRequired(true)
                    	).addBooleanOption(option => 

							option.setName('isroyal').setDescription('OWNERS ONLY').setRequired(true)
							)
module.exports = {data}