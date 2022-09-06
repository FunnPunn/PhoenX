const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('removeini')
	.setDescription('Removes initals')
	.addStringOption(option =>
		option.setName('initials')
			.setDescription('The initials you want to remove')
			.setRequired(true)
			);
module.exports = {data}