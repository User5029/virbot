const db = require('quick.db')
const mongo = require('../../mongo')
const punishmentSchema = require('../../schemas/punishmentlog')

module.exports = {
    name: 'kick',
    async execute(client, msg, args, Discord, offlines) {
        msg.delete()
        if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.reply('you do not have permission to use this command!').then(msg => msg.delete({timeout: 600000}))

        var user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
        if(!user) return msg.reply('You did not mention a user!').then(msg => msg.delete({timeout: 60000}));
        var member;
        try{
            member = await msg.guild.members.fetch(user)
        } catch(err) {
            member = null;
        }
        if(member){
            if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('You can not kick a staff member!').then(msg => msg.delete({timeout: 60000}));
        }
    
        var reason = args.splice(1).join(' ');
        if(!reason) return msg.reply('You did not mention a reason!').then(msg => msg.delete({timeout: 60000}));
        let channel = msg.guild.channels.cache.find(c => c.name === 'logs');
        var log = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setDescription(`${user} has been kicked by ${msg.author} for "**${reason}**`)
        channel.send(log);
    
        var userLog = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setDescription(`You have been kicked from **${msg.guild.name}**. Here is the reason why: **${reason}**`)
        try {
            await user.send(userLog);
        } catch(err) {
            console.warn(err);
        }
        member.kick(reason)
        var confir = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setDescription(`${user} has been kicked by ${msg.author}`)
        msg.channel.send(confir);
        msg.delete();
        if(!db.get(`user_${member.id}`)){
            db.set(`user_${member.id}`, {warns: 0, kicks: 0, bans: 0, mutes: 0, automod: 0})
        }
        db.add(`user_${member.id}.kicks`, 1)
        await mongo().then(async (mongoose) => {
            try {
                await new punishmentSchema({
                    userID: member.id,
                    type: 'KICK',
                    reason: reason,
                    by: msg.author.id
                }).save()
            } finally {
                mongoose.connection.close()
            }
        })
    }
    }