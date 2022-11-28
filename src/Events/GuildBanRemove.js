const { client } = require('../../main.js'); 
const config = require('../../config.json')
const { blue } = require('../Core/Utils/Global.js'); 

client.on('guildBanRemove', async (guild, user) => {

    const log = {
        embed: {
            author: {
                name: 'Member Unbanned'
            },
            description: `<@${user.id}>\n${user.username}#${user.discriminator} (${user.id})`,
            timestamp: new Date,
            color: blue,
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