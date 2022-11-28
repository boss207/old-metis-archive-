const { Command } = require('../../Core/Classes/Command.js'); 
const { defaultColor } = require('../../Core/Utils/Global.js'); 
const { resolveUser } = require('../../Core/Utils/Resolvers.js'); 
const config = require('../../../config.json'); 

class Id extends Command { 
    constructor(){
        super({
            name: 'numbers', 
            module: 'Moderation', 

            userperms: 'Moderator',
            helpDetail: 'Sends rule numbers for mod commands.', 
            helpUsage: 'numbers', 
        })
    }

    async execute(callisto, msg, args) {
        if (!config.helpers.includes(msg.member.id)) return;

        const data = {
            embed: {
                description: `1: Spam/copypasta.\n2: Ads outside of <#713876168721301566>.\n3: Uselessly tagging members/staff.\n4: NSFW.\n5: Abusing exploits..\n6: Racial slurs/discriminatory terminology..\n7: Impersonation.\n8: Causing drama/controversial topic dicussion.\n9: Mini-modding.\n10: Harassment/threats.\n11: Illegal conversations.\n12: Trolling.\n13: Making users feel uncomfortable\n-underage Underaged user.\n-bc: Bot commands in <#713873296680288266>.`,
                author: {
                    name: 'Moderation Command Reason Numbers'
                },
                timestamp: new Date
            }
        }
        callisto.createMessage(msg.channel.id, data)
    }
    }
    module.exports.cmd = Id;