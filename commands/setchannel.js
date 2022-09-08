const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('setquestchannel')
	.setDescription('Guess what it does')
	.addChannelOption(option =>
		option.setName('channel')
			.setDescription('channel')
			.setRequired(true)
			);
module.exports = {data}