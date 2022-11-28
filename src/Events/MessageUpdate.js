const { client } = require('../../main.js'); 
const config = require('../../config.json')
const { blue } = require('../Core/Utils/Global.js'); 

client.on('messageUpdate', async (message, oldMessage) => {
    if (message.channel.type === 1 || message.channel.type === 3) return;
    const log = {
        embed: {
            author: {
                name: 'Message Edit'
            },
            timestamp: new Date,
            color: blue,
            footer: { 
                text: `Message ID: ${message.id}`
            }, 
            fields: [
                { 
                    name: 'Author', 
                    value: `${message.author.username}#${message.author.discriminator} (${message.author.id})`, 
                    inline: true 
                }, 
                { 
                    name: 'Channel', 
                    value: `<#${message.channel.id}> (${message.channel.id})`, 
                    inline: true 
                }, 
                { 
                    name: 'Old Content', 
                    value: oldMessage.content 
                }, 
                { 
                    name: 'New Content', 
                    value: message.content
                }
            ]
        }
    }



    client.createMessage(config.messageLogChannel, log)
})