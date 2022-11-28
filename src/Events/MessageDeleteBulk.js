const { client } = require('../../main.js'); 
const config = require('../../config.json')
const { blue } = require('../Core/Utils/Global.js'); 

client.on('messageDeleteBulk', async messages => {
    const number = messages.length 
    const channel = messages[0].channel
    if (channel.type === 1 || channel.type === 3) return;

    const log = {
        embed: {
            author: {
                name: 'Message Delete'
            },
            timestamp: new Date,
            color: blue,
            description: `**Bulk delete in <#${channel.id}>, ${number} messages deleted.**`,
        }
    }



    client.createMessage(config.messageLogChannel, log)
})