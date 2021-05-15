const mongo = require('../../mongo')
const punishmentSchema = require('../../schemas/punishmentlog')
const db = require('quick.db')

module.exports = {
    name: 'punishment-logs',
    aliases: ['plogs', 'pprofile', 'punishlogs'],
    async execute(client, msg, args, Discord, offlines) {
        msg.delete()
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

    await mongo().then(async (mongoose) => {
        try {
            const results = await punishmentSchema.find({
                userID: member.id,
            })
            let reply = '' 

            for(const result of results) {
               
                const date = new Date(result.createdAt).toLocaleTimeString
                reply += `**ID:** ${result._id}\n[**${result.type}**] at ${result.createdAt}. \n**Reason:** ${result.reason} \n**By:** <@${result.by}>\n\n`
            }
            if(reply.length > 1){
                const embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('Previous punishments for ' + member.user.username)
                .setDescription(reply)
                msg.channel.send(embed)
            } else {
                const embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('Previous punishments for ' + member.user.username)
                .setDescription("This person does have have any known punishments")
                msg.channel.send(embed)
            }
        } finally {
            mongoose.connection.close()
        }
        let dbinfo = db.get(`user_${member.id}`)
        if(dbinfo) {
            let bans = db.get(`user_${member.id}.bans`)
            let kicks = db.get(`user_${member.id}.kicks`)
            let mutes = db.get(`user_${member.id}.mutes`)
            let warns = db.get(`user_${member.id}.warns`)
            let automod = db.get(`user_${member.id}.automod`)
    
            msg.channel.send(`Bans: ${bans} Kicks: ${kicks} Mutes: ${mutes} Warns: ${warns} AutoMod: ${automod}`)
        }
    })
        


    }
}