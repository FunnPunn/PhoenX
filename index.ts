import DiscordJS, { GatewayIntentBits, REST , Routes} from 'discord.js'
import Keyv from 'keyv'
import dotenv from 'dotenv'
import fs from 'node:fs'

const Client = new DiscordJS.Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages
	]
})

dotenv.config()
const commands = []
const commanddir = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

const keyv = new Keyv('sqlite://Storage/botstorage.sqlite')
keyv.on('error', err => console.error('Keyv connection error:', err));

const clientid = '1013808234580156606'
const guildid = '995264254322147408'
const guild = Client.guilds.cache.get(guildid)
for (const file of commanddir) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}
console.log(String(process.env.TOKEN))

const rest = new REST({version: '10'}).setToken(String(process.env.TOKEN));



(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientid, guildid),
			{ body: commands },
		);

		console.log(`Reloaded ${(data as unknown[]).length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();

Client.on('interactionCreate', async (interaction) =>{
	if (!interaction.isChatInputCommand()) return;
	const {commandName, options} = interaction
	switch(commandName) {
		case 'addini':
			interaction.reply({
				content: 'Coming soon',
				ephemeral: true
			})
			break;
		case 'removeini':
			interaction.reply({
				content: 'Coming soon',
				ephemeral: true
			})
			break;
	}
})
Client.login(process.env.TOKEN)