const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('generate')
	.setDescription('Generates a time token')
	.addStringOption(option =>
		option.setName('initials')
			.setDescription('Initials for the token')
			.setRequired(true)
			);
module.exports = {data}