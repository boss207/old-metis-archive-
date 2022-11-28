const { client } = require('../../main.js'); 
const config = require('../../config.json')

client.on('messageCreate', async msg => {

                let prefix = '!'
                let devPrefix = '$'


                if (msg.author.bot) return;
                if (msg.content.startsWith(devPrefix) && msg.author.id === config.maintainers ? prefix = '$' : prefix = prefix)
                    if (!msg.content.startsWith(prefix)) return
                const messageArray = msg.content.split(' ')
                const commandName = messageArray[0]
                const args = messageArray.slice(1)
                const command = client.commands.get(commandName.toLowerCase().slice(prefix.length)) ||
                    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName.toLowerCase().slice(prefix.length)))
                if (commandName.length === 0) return;
                if (!command) return;
                if (!msg.channel.guild) return;
                if (command) command.execute(client, msg, args)



})