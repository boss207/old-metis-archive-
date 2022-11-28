const { Command } = require('../../Core/Classes/Command.js'); 
const { green, yellow, userError, noUser, error } = require('../../Core/Utils/Global.js'); 
const { resolveUser } = require('../../Core/Utils/Resolvers.js'); 
const config = require('../../../config.json'); 
const { stripIndents } = require('common-tags'); 
const ms = require('ms'); 
const schedule = require('node-schedule'); 

class Mute extends Command {
     constructor(){
         super({
             name: 'mute', 
             module: 'Moderation', 
             aliases: ['m'],

             helpDetail: 'Mutes a user.', 
             helpUsage: '-mute @user [time] [reason]',
             helpExample: '-mute @boss 24h spamming\n-mute @Remmii youre too cute', 
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
             let member = guild.members.get(search)
         }
         if (!member) {
             return client.createMessage(msg.channel.id, `${userError}`)
         }
        

         let reason = args.slice(2).join(' ');
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

         const muterole = msg.channel.guild.roles.get('713888164208574477');
         const timeImput = args[1];
         if (!timeImput) {
             return client.createMessage(msg.channel.id, `${error}Don't be a coward, set a length!`)
         }
         const length = ms(timeImput);
         const time = ms(length)
         const seconds = length / 1000
         const date = new Date(Date.now() + length)

         const modlog = {
             embed: {
                 color: yellow,
                 footer: {
                     text: `ID: ${member.id}`
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
                         name: 'Length',
                         value: `${time}`,
                         inline: true
                     },
                     {
                         name: 'Reason',
                         value: reason
                     }
                 ],
                 author: {
                     name: `Mute | ${member.username}#${member.discriminator}`,
                     icon_url: member.avatarURL
                 }
             }
         }
         const unmute = {
             embed: {
                 color: green,
                 footer: {
                     text: `ID: ${member.id}`
                 },
                 timestamp: new Date,
                 fields: [{
                         name: 'User',
                         value: `${member.username}#${member.discriminator} (<@${member.id}>)`,
                         inline: true
                     },
                     {
                         name: 'Moderator',
                         value: `Botski#4230`,
                         inline: true
                     },
                     {
                         name: 'Reason',
                         value: 'Automatic unmute.'
                     }
                 ],
                 author: {
                     name: `Unmute | ${member.username}#${member.discriminator}`,
                     icon_url: member.avatarURL
                 }
             }
         }
         try { 
            client.getDMChannel(member.id).then(x => x.createMessage(`You have been muted in ${guild.name} for: ${reason}`))
            member.addRole(muterole.id)
            await client.createMessage(msg.channel.id, ':thumbsup:')
            await client.createMessage(config.modlogChannel, modlog)
            .catch(err => {
                if (err) return message.channel.send(`${error}An error has occured! Please contact boss with the error: ${err}`)
            });
        } catch { 
            member.addRole(muterole.id, `[${msg.member.username}#${msg.member.discriminator}] ${reason}`) 
            await client.createMessage(msg.channel.id, ':thumbsup:')
            await client.createMessage(config.modlogChannel, modlog)
        }

         schedule.scheduleJob(`mute_time_${member.id}`, date, function () {
             member.removeRole(muterole.id)
             client.getDMChannel(member.id).then(c => c.createMessage(`You have been unmuted in ${msg.channel.guild.name}. Please take time to re-read over <#713872065316388874> again so you do not get muted once more.`))
             client.createMessage(config.modlogChannel, unmute)

         })
     }
     }
     module.exports.cmd = Mute;
