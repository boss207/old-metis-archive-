const { Command } = require('../../Core/Classes/Command.js'); 
const { error } = require('../../Core/Utils/Global.js'); 
const config = require('../../../config.json'); 

class Slowmode extends Command { 
    constructor(){
        super({
            name: 'slowmode', 
            module: 'Moderation', 
            aliases: ['sm'],

            helpDetail: 'Sets the slowmode for a channel.', 
            helpUsage: '!slowmode #channel [number]\n*Just type the number for the amount of seconds!*\n!slowmode check #channel', 
            helpExample: `!slowmode #general 3\n!slowmode check #lounge`
        })
    }

    async execute(client, msg, args) {
        if (!config.staff.includes(msg.member.id)) {
            return;
        }

        if (args[0] === 'check') {
            const channelargs = args[1]
            if (!channelargs) {
                return client.createMessage(msg.channel.id, `${error}Provide a channel!`)
            }

            let channel = false;
            msg.channelMentions.filter(c => c.type === 0);
            if (msg.channelMentions.length) {
                channel = msg.channelMentions[0]
            };

            channel = msg.channel.guild.channels.get(channel);
            if (!channel) {
                return client.createMessage(msg.channel.id, `${error}Invalid channel!`)
            }

            if (!channel.type === 0) {
                return client.createMessage(msg.channel.id, `${error}Invalid channel!`)
            }

            client.createMessage(msg.channel.id, `The slowmode for ${channelargs} is ${channel.rateLimitPerUser} seconds`)
        } else {
            const channelargs = args[0]
            const slowmodeNumber = args[1]
            if (!slowmodeNumber) {
                return client.createMessage(msg.channel.id, `${error}Provide a number!`)
            }
            if (!channelargs) {
                return client.createMessage(msg.channel.id, `${error}Provide a channel!`)
            }

            let channel = false;
            msg.channelMentions.filter(c => c.type === 0);
            if (msg.channelMentions.length) {
                channel = msg.channelMentions[0]
            };

            channel = msg.channel.guild.channels.get(channel);
            if (!channel) {
                return client.createMessage(msg.channel.id, `${error}Invalid channel!`)
            }

            if (!channel.type === 0) {
                return client.createMessage(msg.channel.id, `${error}Invalid channel!`)
            }

            channel.edit({
                rateLimitPerUser: slowmodeNumber,
                reason: `Responsible Moderator: ${msg.member.username}#${msg.member.discriminator}`
            })

            await client.createMessage(msg.channel.id, ':thumbsup:')
        }

    }
    }
    module.exports.cmd = Slowmode;