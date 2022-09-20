const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('ini')
	.setDescription('Initials Handler')
    .addSubcommand(((subcommand) =>
        subcommand.setName('add')
        .setDescription('Adds initials')
        .addStringOption(option =>
            option.setName('initials')
                .setDescription('Initials you want to add')
                .setRequired(true)
                ).addStringOption(option => 
                    option.setName('fullname').setDescription('Who are these initials for?').setRequired(true)
                    ).addUserOption(option =>
                        option.setName('user')
                        .setDescription('The discord user for those initials')
                        .setRequired(true)
                        )
    )).addSubcommand(((subcommand) =>
    subcommand.setName('remove')
    .setDescription('Removes initials')
    .addStringOption(option =>
        option.setName('initials')
            .setDescription('Initials you want to remove')
            .setRequired(true)
            )
))

module.exports = {data}