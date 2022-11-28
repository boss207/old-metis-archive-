const { client } = require('../../main.js'); 
const config = require('../../config.json')
const { blue } = require('../Core/Utils/Global.js'); 
const { formatDate } = require('../Core/Utils/Functions.js'); 

client.on('inviteDelete', async (guild, invite) => {
    const inviteMaxAgeBetter = invite.maxAge
    const realTime = inviteMaxAgeBetter / 3600
    let temp = `${invite.temporary}`
    if (temp === false) {
        temp = 'No'
    } else {
        temo = 'Yes'
    }

    const log = {
        embed: {
            author: {
                name: 'Invite Delete'
            },
            timestamp: new Date,
            description: `Invite code: \`${invite.code}\`\ndiscord.gg/${invite.code}`,
            color: blue,
            footer: {
                text: `Guild ID: ${guild.id}`
            },
        }
    }

    client.createMessage(config.logChannel, log)

})
