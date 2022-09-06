const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('addini')
	.setDescription('Adds initials')
	.addStringOption(option =>
		option.setName('initials')
			.setDescription('Initials you want to add')
			.setRequired(true)
			).addStringOption(option => 
				option.setName('fullname').setDescription('Who are these initials for?').setRequired(true)
				)
module.exports = {data}