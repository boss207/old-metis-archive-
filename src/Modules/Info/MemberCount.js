const { Command } = require('../../Core/Classes/Command.js'); 
const { defaultColor, online, idle, dnd } = require('../../Core/Utils/Global.js'); 
const config = require('../../../config.json'); 

class MemberCount extends Command { 
    constructor(){
        super({
            name: 'membercount', 
            module: 'Info', 
            aliases: null,

            helpDetail: 'Shows the amount of members in the server.', 
            helpUsage: '-membercount\n-membercount full'
        })
    }

    async execute(client, msg, args) {
        /* Defining the members */
        if (!config.whitelistedChannels.includes(msg.channel.id)) {
            return;
        }
        const totalMemberCount = msg.channel.guild.members.size;
        const bots = msg.channel.guild.members.filter(r => r.bot).length;
        const members = msg.channel.guild.members.filter(r => !r.bot).length;
        const onlineMembers = msg.channel.guild.members.filter(r => r.status === 'online').length;
        const idleMembers = msg.channel.guild.members.filter(r => r.status === 'idle').length;
        const dndMembers = msg.channel.guild.members.filter(r => r.status === 'dnd').length;

        /* Embed time! */
        const data = {
            embed: {
                author: {
                    name: `${msg.channel.guild.name}`,
                    icon_url: `${msg.channel.guild.iconURL}`
                },
                footer: {
                    text: `Server ID: ${msg.channel.guild.id}`
                },

                timestamp: new Date,
                color: `${defaultColor}`,
                fields: [{
                        name: `Online ${online}`,
                        value: `${onlineMembers}`,
                        inline: true
                    },
                    {
                        name: `Idle ${idle}`,
                        value: `${idleMembers}`,
                        inline: true
                    },
                    {
                        name: `DnD ${dnd}`,
                        value: `${dndMembers}`,
                        inline: true
                    },
                    {
                        name: 'Members',
                        value: `${totalMemberCount}`,
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
                    }
                ]
            }

        }
        if (!args[0]) {
            return client.createMessage(msg.channel.id, data)
        }



        /* Subcommand */
        if (args.join(' ') === 'full') {
            client.createMessage(msg.channel.id, {
                embed: {
                    author: {
                        name: `${msg.channel.guild.name}`,
                        icon_url: `${msg.channel.guild.iconURL}`
                    },
                    footer: {
                        text: `Server ID: ${msg.channel.guild.id}`
                    },
                    timestamp: new Date,
                    color: `${defaultColor}`,
                    fields: [{
                            name: 'Members',
                            value: `${totalMemberCount}`,
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
                        }
                    ]
                }
            })
        }


    }
    }
    module.exports.cmd = MemberCount;