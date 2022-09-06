import DiscordJS, { REST } from 'discord.js'
import Keyv from 'keyv'
import dotenv from 'dotenv'
import fs from 'node:fs'

const commands = []
const commanddir = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

const keyv = new Keyv('sqlite://Storage/botstorage.sqlite')
keyv.on('error', err => console.error('Keyv connection error:', err));

const clientid = '1013808234580156606'
const guildid = '995264254322147408'

for (const file of commanddir) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({version: '10'});