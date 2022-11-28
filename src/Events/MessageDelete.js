const { client } = require('../../main.js'); 
const config = require('../../config.json')
const { red } = require('../Core/Utils/Global.js'); 
const { Guild } = require('eris');
const { stripIndents } = require('common-tags'); 

client.on('messageDelete', async message => {
    if (message.channel.type === 1 || message.channel.type === 3) return;
    let content = message.content 

    const log = {
        embed: {
            author: {
                name: 'Message Delete'
            },
            timestamp: new Date,
            color: red,
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
                    name: 'Content', 
                    value: content 
                }
            ]
        }
    }



    client.createMessage(config.messageLogChannel, log)
})