const { Command } = require('../../Core/Classes/Command.js'); 
const { defaultColor, noRole, roleError } = require('../../Core/Utils/Global.js'); 
const { formatDate } = require('../../Core/Utils/Functions.js'); 
const { resolveRole } = require('../../Core/Utils/Resolvers.js'); 
const { client } = require('../../../main.js');
const config = require('../../../config.json'); 

class Roleinfo extends Command { 
    constructor(){
        super({
            name: 'roleinfo', 
            module: 'Info', 
            aliases: ['ri'], 
            
            helpDetail: 'Shows information on the provided role.', 
            helpUsage: '-roleinfo <role>', 
            helpExample: '-roleinfo visionwise\n-roleinfo Moderator'
        })
    }

    async execute(client, msg, args) {
        /* Making sure there is a role specified */
        if (!config.whitelistedChannels.includes(msg.channel.id)) {
            return;
        }
        if (!args[0]) {
            return client.createMessage(msg.channel.id, `${noRole}`)
        }
        /* Making sure the role exists */
        let role = msg.channel.guild.roles.get(args[0]);
        if (!role && msg.roleMentions && msg.roleMentions[0]) {
            role = msg.channel.guild.roles.get(msg.roleMentions[0]);
        }
        if (!role) {
            role = msg.channel.guild.roles.find(r => r.name.toLowerCase().startsWith(args.join(' ').toLowerCase()))
        }
        if (!role || role.id === msg.channel.guild.id) {
            return client.createMessage(msg.channel.id, `${roleError}`)
        }

        const frole = role;

        const count = msg.channel.guild.members.filter(m => m.roles.includes(frole.id)).length;
        let title = `${role.name}`
        if (role.managed === true) title = `${role.name} - Integrated Bot Role`
        const createdAt = formatDate(role.createdAt)
        /* Functions to check perms and not use camel case */
        function checkRolePermission(guild, role) {
            const arrayOfPerms = [];

            if (role.permissions.has('administrator')) {
                arrayOfPerms.push('Administrator')
            }
            if (role.permissions.has('manageGuild')) {
                arrayOfPerms.push('Manage Server')
            }
            if (role.permissions.has('manageRoles')) {
                arrayOfPerms.push('Manage Roles')
            }
            if (role.permissions.has('manageChannels')) {
                arrayOfPerms.push('Manage Channels')
            }
            if (role.permissions.has('viewAuditLogs')) {
                arrayOfPerms.push('View Audit Logs')
            }
            if (role.permissions.has('kickMembers')) {
                arrayOfPerms.push('Kick Members')
            }
            if (role.permissions.has('banMembers')) {
                arrayOfPerms.push('Ban Members')
            }
            if (role.permissions.has('manageNicknames')) {
                arrayOfPerms.push('Manage Nicknames')
            }
            if (role.permissions.has('manageEmojis')) {
                arrayOfPerms.push('Manage Emojis')
            }
            if (role.permissions.has('manageWebhooks')) {
                arrayOfPerms.push('Manage Webhooks')
            }
            if (role.permissions.has('manageMessage')) {
                arrayOfPerms.push('Manage Messages')
            }
            if (role.permissions.has('mentionEveryone')) {
                arrayOfPerms.push('Mention Everyone')
            }
            return arrayOfPerms;
        }

        /* Embed time! */
        const data = {
            embed: {
                title: title,
                color: role.color,
                description: `<@&${role.id}>`,
                footer: {
                    text: `Created • ${createdAt} | Role ID: ${role.id}`
                },
                timestamp: new Date,
                fields: [{
                        name: 'Color',
                        value: `${role.color}`,
                        inline: true
                    },
                    {
                        name: 'Mention',
                        value: `\`\`<@&${role.id}>\`\``,
                        inline: true
                    },
                    {
                        name: 'Members',
                        value: `${count}`,
                        inline: true
                    },
                    {
                        name: 'Position',
                        value: role.position,
                        inline: true
                    },

                ]

            }

        }
        /* If statements for embed */
        if (role.hoist === false) {
            data.embed.fields.push({
                name: `Hoisted`,
                value: 'No',
                inline: true
            })
        } else {
            data.embed.fields.push({
                name: 'Hoisted',
                value: 'Yes',
                inline: true
            })
        }

        if (role.mentionable === false) {
            data.embed.fields.push({
                name: 'Mentionable',
                value: 'No',
                inline: true
            })
        } else {
            data.embed.fields.push({
                name: 'Mentionable',
                value: 'No',
                inline: true
            })
        }

        if (checkRolePermission(msg.channel.guild, role).length > 0) {
            data.embed.fields.push({
                name: 'Key Permissions',
                value: `${checkRolePermission(msg.channel.guild, role).join(', ')}`,
                inline: true
            })
        }


        client.createMessage(msg.channel.id, data)

    }
    }
    module.exports.cmd = Roleinfo;