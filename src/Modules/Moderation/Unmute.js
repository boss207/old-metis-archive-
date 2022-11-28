const { Command } = require('../../Core/Classes/Command.js'); 
const { green, userError, noUser, error } = require('../../Core/Utils/Global.js'); 
const { resolveUser } = require('../../Core/Utils/Resolvers.js'); 
const config = require('../../../config.json'); 
const { stripIndents } = require('common-tags'); 
const schedule = require('node-schedule'); 

class Unmute extends Command {
     constructor(){
         super({
             name: 'unmute', 
             module: 'Moderation', 
             aliases: ['um'],

             helpDetail: 'Unmutes a user.', 
             helpUsage: '-unmute @user [reason]',
             helpExample: '-unmute @boss appealed\n-unmute @Remmii good guy', 
         })
     }

     async execute(client, msg, args) {
         if (!config.staff.includes(msg.member.id)) return;

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

         const muterole = msg.channel.guild.roles.get('713888164208574477')
         if (!member.roles.includes(muterole.id)) {
             return client.createMessage(msg.channel.id, `${error}That user is not muted!`)
         }
         const job = schedule.scheduledJobs[`mute_time_${member.id}`]
         let reason = args.slice(1).join(' ');
         if (!reason) {
             reason = 'No reason provided.'
         }

         const modlog = {
             embed: {
                 color: green,
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
                     name: `Unmute | ${member.username}#${member.discriminator}`,
                     icon_url: member.avatarURL
                 }
             }
         }
         member.removeRole(muterole.id, `[${msg.member.username}#${msg.member.discriminator}] ${reason}`).then(() =>
             client.getDMChannel(member.id).then(c => c.createMessage(`You have been unmuted in ${msg.channel.guild.name} for: ${reason}`)))
         await job.cancel()
         await client.createMessage(msg.channel.id, `:thumbsup:`)
             .catch(err => {
                 if (err) return message.channel.send(`${error}An error has occured! Please contact boss with the error: ${err}`)
             });

         client.createMessage(config.modlogChannel, modlog)

     }
     }
     module.exports.cmd = Unmute;