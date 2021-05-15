const Discord = require('discord.js');
const db = require('quick.db')
const mongo = require('../../mongo')
const punishmentSchema = require('../../schemas/punishmentlog')
 
module.exports = {
    name:"warn",
    async execute(client, msg, args) {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('You do not have permiossion to use this command!');
    var user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
    if(!user) return msg.reply('You didn\'t mention anyone!');
 
    var member;
    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }
 
if(!member) return msg.reply('The user that you mentioned isn\'t in the server');
    
var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('you need to add a reason for me to punish this user!');
    if(msg.author.id === user.id) return msg.reply('you cannot warn yourself!');
    var warnEmbed = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setDescription(`${user} has been warned succesfully by ${msg.author}`)
        .setFooter('This message will auto-delete in 10 seconds.')
      var sendEm = await msg.channel.send(warnEmbed);
       msg.delete()
       setTimeout(() => {
       sendEm.delete()
        }, 10000);
var embed = new Discord.MessageEmbed()
.setColor('0xff3030')
    .setTitle(`You were warned by **${msg.guild.name}!`)
    .setDescription(`Server: **${msg.guild.name}**`)
    .addField('Reason:' , `${reason}`)
    try {
    user.send(embed);
    } catch(err) {
    console.warn(err);
        }

    var user = member

    await mongo().then(async (mongoose) => {
        try {
            await new punishmentSchema({
                userID: member.id,
                type: 'WARN',
                reason: reason,
                by: msg.author.id
            }).save()
        } finally {
            mongoose.connection.close()
        }
    })
    

    if(!db.get(`user_${member.id}`)){
        db.set(`user_${member.id}`, {warns: 0, kicks: 0, bans: 0, mutes: 0, automod: 0})
    }
    db.add(`user_${member.id}.warns`, 1)
    let warns = db.get(`user_${member.id}.warns`)

    if(db.get(`user_${member.id}.warns`) === 3){
        //Mute the person
        var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
        var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
        var userLog = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setTitle(`You have been muted for 30 minutes hour in ${msg.guild.name}!\nReason: Auto mute for 3 warns`)
        user.roles.add(muteRole)
        user.roles.remove(main)
        user.send(userLog)
        db.add(`user_${member.id}.mutes`, 1);

        await mongo().then(async (mongoose) => {
            try {
                await new punishmentSchema({
                    userID: member.id,
                    type: 'MUTE',
                    reason: 'Auto mute (30 minutes) for 3 warns',
                    by: 'AutoMod'
                }).save()
            } finally {
                mongoose.connection.close()
            }
        })
        
        setTimeout(function () {
            user.roles.remove(muteRole)
            user.roles.add(main)
        } , 1800000);    
    }
    if(db.get(`user_${member.id}.warns`) === 4){
        //Mute the person
        var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
        var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
        var userLog = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setTitle(`You have been muted for 1 hour in ${msg.guild.name}!\nReason: Auto mute for 4 warns`)
        user.roles.add(muteRole)
        user.roles.remove(main)
        user.send(userLog)
        db.add(`user_${member.id}.mutes`, 1);

        await mongo().then(async (mongoose) => {
            try {
                await new punishmentSchema({
                    userID: member.id,
                    type: 'MUTE',
                    reason: 'Auto mute (1 hour) for 4 warns',
                    by: 'AutoMod'
                }).save()
            } finally {
                mongoose.connection.close()
            }
        })
        
        setTimeout(function () {
            user.roles.remove(muteRole)
            user.roles.add(main)
        } , 3600000);    
    }
    if(db.get(`user_${member.id}.warns`) === 5){
        //Mute the person
        var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
        var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
        var userLog = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setTitle(`You have been kicked from ${msg.guild.name}!\nReason: Auto kick for 5 warns`)
        await user.send(userLog)
        db.add(`user_${member.id}.kicks`, 1);
        await member.kick("Auto kick for 5 warns") 
        await mongo().then(async (mongoose) => {
            try {
                await new punishmentSchema({
                    userID: member.id,
                    type: 'KICK',
                    reason: 'Auto kick for 5 warns',
                    by: 'AutoMod'
                }).save()
            } finally {
                mongoose.connection.close()
            }
        })
        
        
 
    }
    if(db.get(`user_${member.id}.warns`) === 6){
        //Mute the person
        var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
        var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
        var userLog = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setTitle(`You have been banned from ${msg.guild.name}!\nReason: Auto temp-ban (2 days) for 6 warns`)
        await user.send(userLog)
        db.add(`user_${member.id}.bans`, 1);
        await member.ban() 

        await mongo().then(async (mongoose) => {
            try {
                await new punishmentSchema({
                    userID: member.id,
                    type: 'BAN',
                    reason: 'Auto ban (2 bans) for 6 warns',
                    by: 'AutoMod'
                }).save()
            } finally {
                mongoose.connection.close()
            }
        })

        setTimeout(function () {
            user.unban()
        } , 172800000);     
 
    }
    if(db.get(`user_${member.id}.warns`) === 7){
        //Mute the person
        var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
        var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
        var userLog = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setTitle(`You have been banned from ${msg.guild.name}!\nReason: Auto perm-ban for 7 warns`)
        user.send(userLog)
        db.add(`user_${member.id}.bans`, 1);
        member.ban()  
        
        await mongo().then(async (mongoose) => {
            try {
                await new punishmentSchema({
                    userID: member.id,
                    type: 'BAN',
                    reason: 'Auto ban (cemi-perm) for 7 warns',
                    by: 'AutoMod'
                }).save()
            } finally {
                mongoose.connection.close()
            }
        })
 
    }
    if(db.get(`user_${member.id}.warns`) === 8){
        //Mute the person
        var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
        var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
        var userLog = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setTitle(`You have been kicked from ${msg.guild.name}!\nReason: Auto perm-ban for 8 warns`)
        user.send(userLog)
        db.add(`user_${member.id}.bans`, 1);
        member.ban()    

        await mongo().then(async (mongoose) => {
            try {
                await new punishmentSchema({
                    userID: member.id,
                    type: 'BAN',
                    reason: 'Auto perm ban for 8 warns',
                    by: 'AutoMod'
                }).save()
            } finally {
                mongoose.connection.close()
            }
        })
 
    }  
    



    }

}