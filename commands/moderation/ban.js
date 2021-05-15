const { execute } = require("./warn");
const db = require('quick.db')
const mongo = require('../../mongo')
const punishmentSchema = require('../../schemas/punishmentlog')

module.exports = {
    name: 'ban',
    aliases: ['banish', 'banishment', 'endtimeonserver'],
    async execute(client, msg, args, Discord, offlines) {
        msg.delete();
        if(!msg.member.hasPermission('BAN_MEMBERS')) return msg.reply('you do not have permission to use this command!').then(msg => msg.delete({timeout: 60000}));

        var user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
        if(!user) return msg.reply('You did not mention a user!').then(msg => msg.delete({timeout: 60000}));
        var member;
        try{
            member = await msg.guild.members.fetch(user)
        } catch(err) {
            member = null;
        }
        if(member){
            if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('You can not ban a staff member!').then(msg => msg.delete({timeout: 60000}));
        }

        var reason = args.splice(1).join(' ');
        if(!reason) return msg.reply('You did not mention a reason!').then(msg => msg.delete({timeout: 60000}));
        let channel = msg.guild.channels.cache.find(c => c.name === 'logs');
        var log = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setDescription(`${user} has been banned by ${msg.author} for "**${reason}**`)
        channel.send(log);

        var userLog = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setDescription(`You have been banned from the server **${msg.guild.name}**. You can apply here https://forms.gle/fZaGTaBxWBFRCBEz6`)
        try {
            await user.send(userLog);
        } catch(err) {
            console.warn(err);
        }
        msg.guild.members.ban(user);
        if(!db.get(`user_${member.id}`)){
            db.set(`user_${member.id}`, {warns: 0, kicks: 0, bans: 0, mutes: 0, automod: 0})
        }
        db.add(`user_${member.id}.bans`, 1)
        await mongo().then(async (mongoose) => {
            try {
                await new punishmentSchema({
                    userID: member.id,
                    type: 'BAN',
                    reason: reason,
                    by: msg.author.id
                }).save()
            } finally {
                mongoose.connection.close()
            }
        })
        }
    }