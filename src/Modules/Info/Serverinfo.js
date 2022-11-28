const { Command } = require('../../Core/Classes/Command.js'); 
const { defaultColor, online, idle, offline, dnd } = require('../../Core/Utils/Global.js'); 
const { formatDate } = require('../../Core/Utils/Functions.js'); 
const config = require('../../../config.json'); 

class Serverinfo extends Command { 
    constructor(){
        super({
            name: 'serverinfo', 
            module: 'Info', 
            aliases: ['server', 'si'], 

            userperms: 'User', 
            helpDetail: 'Shows server information.', 
            helpUsage: '!serverinfo'
        });
    }

    async execute(client, msg) {
        /* Shit ton of defining for the embed */
        if (!config.whitelistedChannels.includes(msg.channel.id)) {
            return;
        }
        const guild = msg.channel.guild;
        let owner = guild.members.get(guild.ownerID);
        if (!owner === null) {
            owner = 'Not cached'
        }
        const totalMemberCount = guild.members.size;
        const bots = guild.members.filter(r => r.bot).length;
        const members = guild.members.filter(r => !r.bot).length;
        const onlineMembers = guild.members.filter(r => r.status === 'online').length;
        const idleMembers = guild.members.filter(r => r.status === 'idle').length;
        const dndMembers = guild.members.filter(r => r.status === 'dnd').length;
        const roleList = guild.roles.filter(r => r.id !== guild.id).sort((a, b) => b.position - a.position).map(r => r.mention).join(', ')
        const createdAt = formatDate(guild.createdAt);

        /* Verification Level & 2FA & Large Guild Stuff */
        let vLevel = guild.verificationLevel;
        if (vLevel === 0) {
            vLevel = 'None'
        }
        if (vLevel === 1) {
            vLevel = 'Low'
        }
        if (vLevel === 2) {
            vLevel = 'Medium'
        }
        if (vLevel === 3) {
            vLevel = 'High'
        }
        if (vLevel === 4) {
            vLevel = 'Extreme'
        }
        let mfaLevel = guild.mfaLevel
        if (mfaLevel === 0) {
            mfaLevel = 'Not Required'
        }
        if (mfaLevel === 1) {
            mfaLevel = 'Required'
        }
        let guildLarge = guild.large;
        if (guildLarge === true) {
            guildLarge = 'Yes'
        } else {
            guildLarge = 'No'
        }
        /* Embed Time */
        const data = {
            embed: {
                footer: {
                    text: `ID: ${guild.id}`
                },
                timestamp: new Date,
                color: `${defaultColor}`,
                thumbnail: {
                    url: guild.iconURL
                },
                author: {
                    name: guild.name,
                    icon_url: guild.iconURL
                },
                fields: [{
                        name: 'Server Owner',
                        value: `${owner.username}#${owner.discriminator}\n<@!${owner.id}>`,
                        inline: true
                    },
                    {
                        name: 'Server Region',
                        value: `${guild.region}`,
                        inline: true
                    },
                    {
                        name: 'Created',
                        value: `${createdAt}`,
                        inline: true
                    },

                    {
                        name: `Members [${totalMemberCount}]`,
                        value: `${online}Online: ${onlineMembers}\n${idle}Idle: ${idleMembers}\n${dnd}DnD: ${dndMembers}`,
                        inline: true
                    },
                    {
                        name: 'Humans',
                        value: `${members}`,
                        inline: true
                    },
                    {
                        name: 'Bots',
                        value: `${bots}`,
                        inline: true
                    },
                    {
                        name: 'Channels',
                        value: `${guild.channels.size}`,
                        inline: true
                    },
                    {
                        name: 'Channel Categories',
                        value: `${guild.channels.filter(r => r.type === 4).length}`,
                        inline: true
                    },
                    {
                        name: 'Text Channels',
                        value: `${guild.channels.filter(r => r.type === 0).length}`,
                        inline: true
                    },
                    {
                        name: 'News Channels',
                        value: `${guild.channels.filter(r => r.type === 5).length}`,
                        inline: true
                    },
                    {
                        name: 'Voice Channels',
                        value: `${guild.channels.filter(r => r.type === 2).length}`,
                        inline: true
                    },
                    {
                        name: 'Emotes',
                        value: `${guild.emojis.length}`,
                        inline: true
                    },
                    {
                        name: 'Verification Level',
                        value: `${vLevel}`,
                        inline: true
                    },
                    {
                        name: '2FA Level',
                        value: `${mfaLevel}`,
                        inline: true
                    },
                    {
                        name: `Large?`,
                        value: `${guildLarge}`,
                        inline: true
                    }
                ]
            }
        }

        if (roleList.length > 1020) {
            data.embed.fields.push({
                name: `Roles [${guild.roles.size - 1}]`,
                value: 'This server has too many roles to list.',
                inline: false
            })
        } else {
            if (guild.roles.size === 0) {
                data.embed.fields.push({
                    name: `Roles [${guid.roles.size -1}]`,
                    value: 'This server has no roles',
                    inline: false
                })
            } else {
                data.embed.fields.push({
                    name: `Roles [${guild.roles.size - 1}]`,
                    value: roleList,
                    inline: false
                })
            }
        }

        client.createMessage(msg.channel.id, data);
    }
    }
    module.exports.cmd = Serverinfo;