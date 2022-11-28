const { Command } = require('../../Core/Classes/Command.js'); 
const { green, userError, noUser, error } = require('../../Core/Utils/Global.js'); 
const { resolveUser } = require('../../Core/Utils/Resolvers.js'); 
const config = require('../../../config.json'); 
const { stripIndents } = require('common-tags'); 

class Unban extends Command {
     constructor(){
         super({
             name: 'unban', 
             module: 'Moderation', 
             aliases: ['ub'], 

             helpDetail: 'Unbans a user.', 
             helpUsage: '-unban @user [reason]',
             helpExample: '-unban @boss appealed\n-unban @Remmii good guy', 
         })
     }

     async execute(client, msg, args) {
         if (!config.staff.includes(msg.member.id)) return;

         if (!args.length) {
             return client.createMessage(msg.channel.id, `${noUser}`)
         }

         let banneduser = args[0]

         if (!banneduser) {
             return client.createMessage(msg.channel.id, `${userError}`)
         }


         let reason = args.slice(1).join(' ');
         if (!reason) {
             reason = 'No reason provided.'
         }

         const modlog = {
             embed: {
                 color: green,
                 footer: {
                     text: `ID: ${banneduser}`,
                 },
                 timestamp: new Date,
                 fields: [{
                         name: 'User',
                         value: `<@${banneduser}> (${banneduser})`,
                         inline: true
                     },
                     {
                         name: 'Moderator',
                         value: `${msg.member.username}#${msg.member.discriminator}`,
                         inline: true
                     },
                     {
                         name: 'Reason',
                         value: reason
                     }
                 ],
                 author: {
                     name: `Unban`,
                 }
             }
         }
         msg.channel.guild.unbanMember(banneduser, `${reason}`)
         await client.createMessage(msg.channel.id, ':thumbsup:')
             .catch(err => {
                 if (err) return message.channel.send(`${error}An error has occured! Please contact boss with the error: ${err}`)
             });

         client.createMessage(config.modlogChannel, modlog)

     }
}
module.exports.cmd = Unban;