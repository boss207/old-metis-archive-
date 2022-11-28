const { Command } = require('../../Core/Classes/Command.js'); 
const config = require('../../../config.json'); 

class Ping extends Command { 
    constructor(){
        super({
            name: 'ping', 
            module: "Info", 
            aliases: ['pong'], 

            userperms: 'User', 
            helpDetail: 'Pings the bot.', 
            helpUsage: '-ping', 
        });
    }

    async execute(client, msg) {
        if (!config.whitelistedChannels.includes(msg.channel.id)) {
            return;
        }
        let time = Date.now();
        let m = await client.createMessage(msg.channel.id, 'Pong!');
        let now = Date.now()
        m.edit(`Pong! \`${now - time}ms\``)

    }

    }

    module.exports.cmd = Ping;