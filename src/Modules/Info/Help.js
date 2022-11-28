const { Command } = require('../../Core/Classes/Command.js'); 
const { error, defaultColor } = require('../../Core/Utils/Global.js')
const config = require('../../../config.json')
class Help extends Command { 
    constructor(){
        super({
            name: 'help', 
            module: "Info", 
            aliases: ['h'], 

            helpDetail: 'Shows the bot\'s commands or information on a specfic command.', 
            helpUsage: '-help\n-ban @boss', 
            helpExample: '-help ping'
        });
    }

    async execute(client, msg, args) {
        if (!config.whitelistedChannels.includes(msg.channel.id)) {
            return;
        }
        const infoCommands = client.commands.filter(c => c.module === 'Info');
        const modCommands = client.commands.filter(c => c.module === 'Moderation')
        if (!args.length) {

            return client.createMessage(msg.channel.id, {

                embed: {
                    author: {
                        name: 'Moderation | Help'
                    },
                    color: `${defaultColor}`,
                    fields: [{
                            name: 'Info',
                            value: infoCommands.map(c => c.name).join(', ')
                        },
                        {
                            name: 'Moderation',
                            value: modCommands.map(c => c.name).join(', ')
                        }


                    ]

                }

            })

        }

        const foundCommand = client.commands.get(args[0].toLowerCase());
        if (!foundCommand) {
            return client.createMessage(msg.channel.id, {

                embed: {
                    author: {
                        name: 'Moderation | Help'
                    },
                    color: `${defualtColor}`,
                    fields: [{
                            name: 'Info',
                            value: infoCommands.map(c => c.name).join(', ')
                        },
                        {
                            name: 'Moderation',
                            value: modCommands.map(c => c.name).join(', ')
                        }

                    ]

                }

            })

        }
        let desc = `**Description:** ${foundCommand.helpDetail}\n**Usage:** ${foundCommand.helpUsage}`
        if (foundCommand.aliases) desc = `**Description:** ${foundCommand.helpDetail}**Aliases:** ${foundCommand.aliases.join(', ')}\n**Usage:** ${foundCommand.helpUsage}`
        if (foundCommand.helpExample) desc = `**Description:** ${foundCommand.helpDetail}\n**Aliases:** ${foundCommand.aliases.join(', ')}\n**Usage:** ${foundCommand.helpUsage}\n**Examples:** ${foundCommand.helpExample}`
        return client.createMessage(msg.channel.id, {
            embed: {
                title: `Help: -${foundCommand.name}`,
                description: desc,
                color: `${defaultColor}`,
                footer: {
                    text: `Syntax: <> = required | [] = optional`
                }
            }
        })

    }
    }



    module.exports.cmd = Help;