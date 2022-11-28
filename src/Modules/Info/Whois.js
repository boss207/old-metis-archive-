const { Command } = require('../../Core/Classes/Command.js'); 
const { userError, defaultColor, online, idle, offline, dnd } = require('../../Core/Utils/Global.js'); 
const { resolveUser } = require('../../Core/Utils/Resolvers.js')
const { formatDate } = require('../../Core/Utils/Functions.js'); 
const config = require('../../../config.json'); 

class Whois extends Command { 
    constructor(){ 
        super({ 
            name: 'whois', 
            module: 'Info', 
            aliases: ['w', 'userinfo', 'user'], 

            userperms: 'User' , 
            helpDetail: 'Shows information on a user.', 
            helpUsage: '!whois\n!whois [user]', 
            helpExample: '!whois @boss'
        }); 
    }

    async execute(callisto, msg, args) {
        /* Defining guild and member  */
        if (!config.whitelistedChannels.includes(msg.channel.id)) return;
        let guild = msg.member.guild
        let member = resolveUser(guild, msg, args.join(' '));

        /* Checking if member exists and if there are no args */
        if (!args.length) {
            member = msg.member
        }
        if (!member) {
            return callisto.createMessage(msg.channel.id, `${userError}`)
        }

        /* Checking the user permissions for "Key Permissions" */
        function checkUserPermissions(guild, member) {
            const arrayOfPerms = [];

            if (member.permission.has('administrator')) {
                arrayOfPerms.push('Administrator')
            }
            if (member.permission.has('manageGuild')) {
                arrayOfPerms.push('Manage Server')
            }
            if (member.permission.has('manageRoles')) {
                arrayOfPerms.push('Manage Roles')
            }
            if (member.permission.has('manageChannels')) {
                arrayOfPerms.push('Manage Channels')
            }
            if (member.permission.has('viewAuditLogs')) {
                arrayOfPerms.push('View Audit Logs')
            }
            if (member.permission.has('kickMembers')) {
                arrayOfPerms.push('Kick Members')
            }
            if (member.permission.has('banMembers')) {
                arrayOfPerms.push('Ban Members')
            }
            if (member.permission.has('manageNicknames')) {
                arrayOfPerms.push('Manage Nicknames')
            }
            if (member.permission.has('manageEmojis')) {
                arrayOfPerms.push('Manage Emojis')
            }
            if (member.permission.has('manageWebhooks')) {
                arrayOfPerms.push('Manage Webhooks')
            }
            if (member.permission.has('manageMessages')) {
                arrayOfPerms.push('Manage Messages')
            }
            if (member.permission.has('mentionEveryone')) {
                arrayOfPerms.push('Mention Everyone')
            }
            return arrayOfPerms;
        }

        /* Acknowledgments */
        function userAcks(member) {
            var ackArray = []
            if (member.id == '344954369285947392') {
                ackArray.push('Owner, Developer, Visionwise Community Admin')
            }
            if (member.id == '675460790467166238') {
                ackArray.push('Visionwise, OG, CEO of stories')
            }
            if (member.id == '560944420959027220') {
                ackArray.push('Remmii, God Admin, Visionwise Co-owner')
            }
            if (member.id == '702371016764031046') {
                ackArray.push('Visionwise Community Manager')
            }
            if (member.id == '522440031600771085') {
                ackArray.push('Visionwise Community Manager')
            }
            if (member.id == '333713263160197130') {
                ackArray.push('Visionwise Community Admin')
            }
            if (member.id == '347737792555646986') {
                ackArray.push('Visionwise Community Helper')
            }
            if (member.id == '334048987608907787') {
                ackArray.push('Visionwise Community Helper')
            }
            if (member.id == '299746620956999681') {
                ackArray.push('Visionwise Community Helper')
            }
            if (member.id == '277849991496859648') {
                ackArray.push('Visionwise Community Helper')
            }
            if (member.id == '77205340050956288') {
                ackArray.push('Designer, Hot Pug, Cutie')
            }
            if (member.id == '252541269602074635') {
                ackArray.push('Chocolate Chipped, Cutie')
            }
            if (member.id == '395526710101278721') {
                ackArray.push('DBL Moderator, Best Mod, Cutie')
            }
            return ackArray;
        }
        /* Server Moderator, Manager, and Administrator */
        let aPerms = void 0;
        if (member.permission.has('manageMessages')) {
            aPerms = 'Server Moderator'
        }
        if (member.permission.has('manageGuild')) {
            aPerms = 'Server Manager'
        }
        if (member.permission.has('administrator')) {
            aPerms = 'Server Administrator'
        }
        if (member.id === msg.channel.guild.ownerID) {
            aPerms = 'Server Owner'
        }

        /* Defining a few things to make it easier */
        const roles = [];
        member.roles.forEach(r => roles.push(msg.channel.guild.roles.get(r)));
        const sortedRoles = roles.sort((a, b) => b.position - a.position);
        const roleList = sortedRoles.map(r => r.mention).join(', ')
        const createdAt = formatDate(member.createdAt);
        const joined = formatDate(member.joinedAt)
        const status = member.status;


        /* Embed Time */
        const data = {
            embed: {
                thumbnail: {
                    url: member.avatarURL
                },
                author: {
                    name: `${member.username}#${member.discriminator}`,
                    icon_url: member.avatarURL
                },
                timestamp: new Date,
                color: `${defaultColor}`,
                footer: {
                    text: `ID: ${member.id}`
                },
                fields: [{
                        name: 'Registered',
                        value: `${createdAt}`,
                        inline: true
                    },
                    {
                        name: 'Joined',
                        value: `${joined}`,
                        inline: true
                    },


                ]
            }
        }
        /* If Statements for the embed */
        if (!member.nick) {
            data.embed.description = `${member.username}#${member.discriminator}\n${member.mention}`
        } else {
            data.embed.description = `${member.username}#${member.discriminator} (${member.nick})\n${member.mention}`
        }

        if (member.status == 'online') {
            data.embed.fields.push({
                name: 'Status',
                value: `${status} ${online}`,
                inline: true
            })
        }
        if (member.status == 'idle') {
            data.embed.fields.push({
                name: 'Status',
                value: `${status} ${idle}`,
                inline: true
            })
        }
        if (member.status == 'dnd') {
            data.embed.fields.push({
                name: 'Status',
                value: `${status} ${dnd}`,
                inline: true
            })
        }
        if (member.status == 'offline') {
            data.embed.fields.push({
                name: 'Status',
                value: `${status} ${offline}`
            })
        }

        if (member.roles.size == 0) {
            data.embed.fields.push({
                name: `Roles [0]`,
                value: 'None'
            })
        } else {
            data.embed.fields.push({
                name: 'Roles [' + (roles.length) + ']',
                value: '' + `${roleList}`
            })
        }

        if (checkUserPermissions(msg.channel.guild, member).length > 0) {
            data.embed.fields.push({
                name: 'Key Permissions',
                value: '' + checkUserPermissions(msg.channel.guild, member).join(', ')
            })
        }

        if (aPerms) {
            data.embed.fields.push({
                name: 'Acknowledgements',
                value: `${aPerms}`
            })
        }

        if (userAcks(member).length) {
            data.embed.fields.push({
                name: 'Visionwise Community Team',
                value: '' + userAcks(member).join(', ')
            })
        }

        /* Send Message */
        callisto.createMessage(msg.channel.id, data);







    }
    }
    module.exports.cmd = Whois;