const { client } = require('../../main.js');
const config = require('../../config.json')
const { blue } = require('../Core/Utils/Global.js');

client.on('guildRoleDelete', async (guild, role) => {

    const log = {
        embed: {
            author: {
                name: 'Role Delete'
            },
            description: `Role: \`${role.name}\` (${role.id})`,
            timestamp: new Date,
            color: blue,
            footer: {
                text: `Role ID: ${role.id}`
            },
        }
    }

    client.createMessage(config.logChannel, log)
})