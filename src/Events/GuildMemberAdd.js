const { client } = require('../../main.js'); 
const config = require('../../config.json')
const { green } = require('../Core/Utils/Global.js'); 

client.on('guildMemberAdd', async (guild, member) => {
    const log = {
        embed: {
            author: {
                name: 'Member Joined'
            },
            description: `<@${member.id}>\n${member.username}#${member.discriminator} (${member.id})`,
            timestamp: new Date,
            color: green,
            footer: {
                text: `Guild Name: ${guild.name}`
            },
            thumbnail: {
                url: member.avatarURL
            }
        }
    }

    client.createMessage(config.logChannel, log)
    client.createMessage('713872016788291604', `Welcome to the server, <@${member.id}>! Please read over <#717462512664182867> and be sure to follow them when in the server! You can find visionwise's streams over in <#713871998563909723>. Enjoy your stay, talk in <#713873296680288266>, and if you have any questions do not hesitate to ask a Moderator+, or DM <@543586013184786453>!`)
// asdf
    member.addRole('713881052841771119', 'Automatic autorole.')
})
