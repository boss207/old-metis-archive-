const { client } = require('../../main.js');
const config = require('../../config.json')
const { blue } = require('../Core/Utils/Global.js');

client.on('channelCreate', async channel => {
    if (channel.type === 1 || channel.type === 3) return;

    const log = {
        embed: {
            author: {
                name: 'Channel Create'
            },
            description: `**Channel Name: #${channel.name}**`,
            timestamp: new Date,
            color: blue,

        }
    }

    client.createMessage(config.logChannel, log)
})