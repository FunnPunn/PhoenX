import DiscordJS, { EmbedBuilder, embedLength, GatewayIntentBits, REST , Routes, SelectMenuBuilder} from 'discord.js'
import Keyv from 'keyv'
import dotenv from 'dotenv'
import fs from 'node:fs'
const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'Storage/quests.sqlite',
	logging: false
});

const Tags = sequelize.define('quests', {
	creator: {
		type: Sequelize.INTEGER,
		unique: true,
	},
	description: Sequelize.TEXT,
});

const Client = new DiscordJS.Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages
	]
})

dotenv.config()
const commands = []
const commanddir = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

const botstorage = new Keyv('sqlite://Storage/inits.sqlite')
botstorage.on('error', err => console.error('Inits connection error:', err));

const queststorage = new Keyv('sqlite://Storage/quests.sqlite')
queststorage.on('error', err => console.error('Quest connection error:', err));

const clientid = '1013808234580156606'
const guildid = '995264254322147408'
const guild = Client.guilds.cache.get(guildid)
for (const file of commanddir) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({version: '10'}).setToken(String(process.env.TOKEN));



(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const globaldata = await rest.put(
			Routes.applicationCommands(clientid),
			{ body: [] },
		);
		const data = await rest.put(
			Routes.applicationGuildCommands(clientid, guildid),
			{ body: commands },
		);

		console.log(`Reloaded ${(data as unknown[]).length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();

Client.on('ready',() =>{console.log("bot ready")})

Client.on('interactionCreate', async (interaction) =>{
	if (!interaction.isChatInputCommand()) return;
	const {commandName, options} = interaction
	const SendEmb = new EmbedBuilder()
	var prvt = true
	switch(commandName) {
		case 'addini':
			const initi = options.getString('initials')!
			const fullname = options.getString('fullname')!
			if (await botstorage.has(initi)) {
				SendEmb.setTitle('Initials').setFields([{name:'ERROR', value:'Initials already exist'}]).setColor([255, 0, 0])
			} else {
				botstorage.set(initi, fullname)
				SendEmb.setTitle('Initials').setFields([{name:'Success!', value:'Added initials!'}]).setColor([244, 174, 114])
			}
			
			
			break;
		case 'removeini':
			const init = options.getString('initials')!
			
			if (await botstorage.get(init) === undefined) {
				SendEmb.setTitle('Initials').setFields([{name:'ERROR', value:'Unable to find the given initials'}]).setColor([255, 0, 0])	
			} else {
				await botstorage.delete(init)
				SendEmb.setTitle('Initials').setFields([{name:'Success!', value:'Removed Initials!'}]).setColor([244, 174, 114])
			}
			break;
		case 'generate':
			const time = Math.floor(Date.now() / 1000)
			const giveninit = options.getString('initials')!
			if (await botstorage.has(giveninit)) {
				SendEmb.setTitle('Token').setFields([{name: 'Token generated:', value: '`'.concat(giveninit, ' ActCert - ', String(time), '`')}]).setColor([244, 174, 114])
			} else {
				SendEmb.setTitle('Token').setFields([{name:'ERROR', value:'Unable to find the given initials'}]).setColor([255, 0, 0])
			}
			break;
		case 'tokeninfo':
			const tokenstring = options.getString('token')!
			const items = tokenstring.split(' ActCert - ')
			if (await botstorage.has(items[0]) && tokenstring.includes(' ActCert - ')) {
				SendEmb.setTitle('Token').setFields([{name: 'Token info:', value: (await botstorage.get(items[0])).concat("'s token was created <t:", items[1], ':R>')}]).setColor([244, 174, 114])
			} else {
				SendEmb.setTitle('Token').setFields([{name:'ERROR', value:'Unable to decode.'}]).setColor([255, 0, 0])
			}
			break;
	}
	interaction.reply({
		embeds: [SendEmb],
		ephemeral: true
	})
})
Client.login(process.env.TOKEN)