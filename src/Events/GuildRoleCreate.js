const { client } = require('../../main.js'); 
const config = require('../../config.json')
const { blue } = require('../Core/Utils/Global.js'); 
client.on('guildRoleCreate', async (guild, role) => {

    const log = {
        embed: {
            author: {
                name: 'Role Create'
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
