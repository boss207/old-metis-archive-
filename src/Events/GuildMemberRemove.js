const { client } = require('../../main.js'); 
const config = require('../../config.json')
const { red } = require('../Core/Utils/Global.js'); 

client.on('guildMemberRemove', async (guild, member) => {

    const log = {
        embed: {
            author: {
                name: 'Member Left'
            },
            description: `<@${member.id}>\n${member.username}#${member.discriminator} (${member.id})`,
            timestamp: new Date,
            color: red,
            footer: {
                text: `Guild Name: ${guild.name}`
            },
            thumbnail: {
                url: member.avatarURL
            }
        }
    }

    client.createMessage(config.logChannel, log)
    client.createMessage('713872016788291604', `Goodbye, **${member.username}#${member.discriminator}**!`)

})
