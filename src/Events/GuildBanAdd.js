const { client } = require('../../main.js'); 
const config = require('../../config.json')
const { red } = require('../Core/Utils/Global.js'); 

client.on('guildBanAdd', async (guild, user) => {

    const log = {
        embed: {
            author: {
                name: 'Member Banned'
            },
            description: `<@${user.id}>\n${user.username}#${user.discriminator} (${user.id})`,
            timestamp: new Date,
            color: red,
            footer: {
                text: `Guild Name: ${guild.name}`
            },
            thumbnail: {
                url: user.avatarURL
            }
        }
    }

    client.createMessage(config.logChannel, log)
})