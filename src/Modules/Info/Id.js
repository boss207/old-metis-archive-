const { Command } = require('../../Core/Classes/Command.js'); 
const { defaultColor } = require('../../Core/Utils/Global.js'); 
const { resolveUser } = require('../../Core/Utils/Resolvers.js'); 
const config = require('../../../config.json'); 

class Id extends Command { 
    constructor(){
        super({
            name: 'id', 
            module: 'Info', 
            userperms: 'User', 
            helpDetail: 'Sends the ID of the user you provide/your ID if no user supplied.',
            helpUsage: `${config.prefix}id\n${config.prefix}id [user]`, 
            helpExample: `${config.prefix}id\n${config.prefix}id boss`
        })
    }

    async execute(client, msg, args) { 
        const guild = msg.member.guild; 
        let member = resolveUser(guild, msg, args.join('')); 
        if (!member) { 
            member = msg.member
        }
        client.createMessage(msg.channel.id, `${member.username}'s ID is \`${member.id}\``)
    }
}
module.exports.cmd = Id
