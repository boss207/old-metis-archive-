const { client } = require('../../main.js'); 
const config = require('../../config.json')
const { blue } = require('../Core/Utils/Global.js'); 
const { Guild } = require('eris');

client.on('channelDelete', async channel => {
    if (channel.type === 1 || channel.type === 3) return;

    const log = {
        embed: {
            author: {
                name: 'Channel Delete'
            },
            description: `**Channel Name: #${channel.name}**`,
            timestamp: new Date,
            color: blue,
        }
    }



    client.createMessage(config.logChannel, log)
})