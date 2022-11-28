const { Command } = require('../../Core/Classes/Command.js'); 
const { defaultColor } = require('../../Core/Utils/Global.js'); 
const { resolveUser } = require('../../Core/Utils/Resolvers.js'); 
const config = require('../../../config.json'); 

class Id extends Command { 
    constructor(){
        super({
            name: 'seconds', 
            module: 'Moderation', 

            userperms: 'Moderator',
            helpDetail: 'Converts minutes to seconds for twitch moderation.', 
            helpUsage: 'numbers', 
        })
    }

    async execute(callisto, msg, args) {
        if (!config.helpers.includes(msg.member.id)) return;
        const input = args[0]; 

        const seconds = input * 60
        callisto.createMessage(msg.channel.id, seconds)
    }
    }
    module.exports.cmd = Id;