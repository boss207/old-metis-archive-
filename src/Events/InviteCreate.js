const { client } = require('../../main.js'); 
const config = require('../../config.json')
const { blue } = require('../Core/Utils/Global.js'); 
const { formatDate } = require('../Core/Utils/Functions.js'); 

client.on('inviteCreate', async (guild, invite) => {
    const inviteMaxAgeBetter = invite.maxAge
    const realTime = inviteMaxAgeBetter / 3600
    let temp = `${invite.temporary}`
    if (temp === false) {
        temp = 'No'
    } else {
        temp = 'Yes'
    }

    const log = {
        embed: {
            author: {
                name: 'Invite Create'
            },
            timestamp: new Date,
            color: blue,
            footer: {
                text: `Guild ID: ${guild.id}`
            },
            fields: [{
                    name: 'Invite Code',
                    value: `\`${invite.code}\`\ndiscord.gg/${invite.code}`,
                    inline: true
                },
                {
                    name: 'Invite Channel',
                    value: `${invite.channel.name} (${invite.channel.id})`,
                    inline: true
                },
                {
                    name: 'Invite Creator',
                    value: `${invite.inviter.username} (${invite.inviter.id})`,
                    inline: true
                },
                {
                    name: 'Invite Length',
                    value: realTime,
                    inline: true
                },
                {
                    name: 'Invite Max Uses',
                    value: invite.maxUses,
                    inline: true
                },
                {
                    name: 'Temporary?',
                    value: temp,
                    inline: true
                }
            ]
        }
    }

    client.createMessage(config.logChannel, log)

})
