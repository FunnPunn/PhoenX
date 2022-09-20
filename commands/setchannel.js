const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('setchannel')
	.setDescription('Set command channels')
    .addSubcommand(((subcommand) =>
        subcommand.setName('quest')
        .setDescription('Set quest channel')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel')
                .setRequired(true)
                )
    ))

module.exports = {data}