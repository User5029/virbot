const Discord = require("discord.js"); // Require important constants
const ms = require('ms');
const db = require('quick.db')
const mongo = require('../../mongo')
const punishmentSchema = require('../../schemas/punishmentlog')

module.exports = {
    name:"mute",
    async execute(client, msg, args)  {
        msg.delete()
        var logs = msg.guild.channels.cache.find(c => c.name === '🔐↣｜logs'); // Define logging channel
        var verify = msg.guild.emojis.cache.find(emoji => emoji.name === 'yes'); // Define confirmation emoji
        if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply("You do not have permission to use this command");
 
        var target = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
        if(!target) return msg.reply('you need to mention a user for me to mute them!')

 
        var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
        var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
 
        var targetID = msg.guild.members.cache.get(target.id)
        if(targetID.hasPermission('MANAGE_MESSAGES')) return msg.reply("You can not mute a staff member"); 
        if(!args[1]) {         

            targetID.roles.add(muteRole)
            targetID.roles.remove(main)
            var confirmation = new Discord.MessageEmbed()
            .setColor('0x05ff4c')
            .setDescription(`${verify} <@${targetID.user.id}> has been succesfully muted by ${msg.author} until you unmute them using the \`unmute\` command!`)
            msg.channel.send(confirmation);
 
            var log = new Discord.MessageEmbed()
            .setColor('0x05ff4c')
            .setDescription(`${verify} <@${targetID.user.id}> has been **hard-muted** by ${msg.author}. They will not be unmuted until you unmute them manually!`)
            logs.send(log);
 
            var userLog = new Discord.MessageEmbed()
            .setColor('0x05ff4c')
            .setTitle(`You have been hard muted in ${msg.guild.name}!`)

            try {
                target.send(userLog)
            } catch(err) {
                console.warn(err);
            }  
            return;
    }

    
        targetID.roles.add(muteRole)
        targetID.roles.remove(main)
        if(!db.get(`user_${member.id}`)){
            db.set(`user_${member.id}`, {warns: 0, kicks: 0, bans: 0, mutes: 0, automod: 0})
        }
        db.add(`user_${member.id}.mutes`, 1)
        await mongo().then(async (mongoose) => {
            try {
                await new punishmentSchema({
                    userID: targetID.user.id,
                    type: 'MUTE',
                    reason: args[1],
                    by: msg.author.id
                }).save()
            } finally {
                mongoose.connection.close()
            }
        })


    
        var confirmation = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setDescription(`${verify} <@${targetID.user.id}> has been succesfully muted by ${msg.author} for ${ms(ms(args[1]))}.`)
        msg.channel.send(confirmation);
 
    
        var log = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setDescription(`${verify} <@${targetID.user.id}> has been muted by ${msg.author} for ${ms(ms(args[1]))}.`)
        logs.send(log);
 
        var userLog = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setTitle(`You have been muted in ${msg.guild.name}!`)
        .addField('Expires in:' , ms(ms(args[1])))
 
        try {
            await target.send(userLog);
        } catch(err) {
            console.warn(err);
        }
 
        setTimeout(function () {
            targetID.roles.remove(muteRole)
            targetID.roles.add(main)
        } , ms(args[1]));
 
}}