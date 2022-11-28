const { client } = require('../../main.js');
const config = require('../../config.json')
const { blue } = require('../Core/Utils/Global.js');

client.on('guildRoleUpdate', async (guild, oldRole, role) => {
    // role name
    if (oldRole.name !== role.name) {
        const log = {
            embed: {
                author: {
                    name: 'Role Name Change'
                },
                description: `**Name: ${role.name} ==> ${oldRole.name}**`,
                timestamp: new Date,
                color: blue,
                footer: {
                    text: `Role ID: ${oldRole.id}`
                },
            }
        }
        client.createMessage(config.logChannel, log)
    }

    // role mentionable change 
    if (oldRole.mentionable !== role.mentionable) {
        const log = {
            embed: {
                author: {
                    name: 'Role Mentionable Change'
                },
                description: `**Mentionable: ${role.mentionable} ==> ${oldRole.mentionable}**`,
                timestamp: new Date,
                color: blue,
                footer: {
                    text: `Role ID: ${oldRole.id}`
                },
            }
        }

        client.createMessage(config.logChannel, log)
    }
    // role hoist change 
    if (oldRole.hoist !== role.hoist) {
        const log = {
            embed: {
                author: {
                    name: 'Role Hoist Change'
                },
                description: `**Hoist: ${role.hoist} ==> ${oldRole.hoist}**`,
                timestamp: new Date,
                color: blue,
                footer: {
                    text: `Role ID: ${oldRole.id}`
                },
            }
        }
        client.createMessage(config.logChannel, log)
    }

    // role pos change 
    if (oldRole.color !== role.color) {
        const log = {
            embed: {
                author: {
                    name: 'Role Color Change'
                },
                description: `**Color: ${role.color} ==> ${oldRole.color}**`,
                timestamp: new Date,
                color: blue,
                footer: {
                    text: `Role ID: ${oldRole.id}`
                },
            }
        }
        client.createMessage(config.logChannel, log)
    }
})