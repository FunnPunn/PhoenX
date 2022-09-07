const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('gettime')
	.setDescription('Decodes the token')
	.addStringOption(option =>
		option.setName('token')
			.setDescription('time token')
			.setRequired(true)
			);
module.exports = {data}