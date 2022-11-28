const { Command } = require('../../Core/Classes/Command.js'); 
const { yellow, userError, noUser, error } = require('../../Core/Utils/Global.js'); 
const { resolveUser } = require('../../Core/Utils/Resolvers.js'); 
const config = require('../../../config.json'); 
const { stripIndents } = require('common-tags'); 

class Warn extends Command {
     constructor(){
         super({
             name: 'warn', 
             module: 'Moderation', 

             helpDetail: 'Warns a user.', 
             helpUsage: '-warn @user [reason]',
             helpExample: '-warn @boss bot commands\n-ban @Remmii hi', 
         })
     }

     async execute(client, msg, args) {
         if (!config.helpers.includes(msg.member.id)) return;

         if (!args.length) {
             return client.createMessage(msg.channel.id, `${noUser}`)
         }

         let guild = msg.member.guild;
         let member = resolveUser(guild, msg, args.join(' '));
         if (!member) {
             let member = guild.members.get(args.join(' '))
         }
         if (!member) {
             return client.createMessage(msg.channel.id, `${userError}`)
         }
       

         let reason = args.slice(1).join(' ');
         if (!reason) {
             reason = 'No reason provided.'
         }

         if (reason === '1') {
            reason = 'Copypasta/spam.'
        }
        if (reason === '2') {
            reason = 'Self promotion outside of <#713876168721301566>.'
        }
        if (reason === '3') {
            reason = 'Uselessly tagging members/staff.'
        }
        if (reason === '4') {
            reason = 'NSFW.'
        }
        if (reason === '5') {
            reason = 'Misusing exploits.'
        }
        if (reason === '6') {
            reason = 'Racial slurs/discriminatory terminology.'
        }
        if (reason === '7') {
            reason = 'Impersonation.'
        }
        if (reason === '8') {
            reason = 'Drama/overly sensitive topiced conversations.'
        }
        if (reason === '9') {
            reason = 'Mini-modding.'
        }
        if (reason === '-bc') {
            reason = 'Bot commands in <#713873296680288266>.'
        }
        if (reason === '10') {
            reason = 'Harassments/threats.'
        }
        if (reason === '11') {
            reason = 'Illegal conversation participation.'
        }
        if (reason === '12') {
            reason = 'Trolling.'
        }
        if (reason === '-underage') { 
                reason = 'Underaged user.'
            }
        if (reason === '13') { 
            reason = 'Making users feel uncomfortable.'
        }

         const modlog = {
             embed: {
                 color: yellow,
                 footer: {
                     text: `ID: ${member.id}`,
                 },
                 timestamp: new Date,
                 fields: [{
                         name: 'User',
                         value: `${member.username}#${member.discriminator} (<@${member.id}>)`,
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
                     name: `Warn | ${member.username}#${member.discriminator}`,
                     icon_url: member.avatarURL
                 }
             }
         }
         try { 
            client.getDMChannel(member.id).then(x => x.createMessage(`You have been warned in ${guild.name} for: ${reason}`))
            await client.createMessage(msg.channel.id, ':thumbsup:')
            await client.createMessage(config.modlogChannel, modlog)
            .catch(err => {
                if (err) return message.channel.send(`${error}An error has occured! Please contact boss with the error: ${err}`)
            });
        } catch { 
            await client.createMessage(msg.channel.id, ':thumbsup:')
            await client.createMessage(config.modlogChannel, modlog)
        }
     }
     }
     module.exports.cmd = Warn;