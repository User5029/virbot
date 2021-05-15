const db = require('quick.db');

module.exports = {
    name: 'remove',
    alises: ['rem'],
    execute(client, msg, args) {

        if(!msg.author.id === '665562488158289943' || !msg.author.id === '721416593166303352') return msg.reply('You do not have permission to use this command!').then(msg => msg.delete({timeout: 60000}));
        var member = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);

        if(!member) return msg.reply(`You have not mentioned a user`).then(msg => msg.delete({timeout: 10000}));
        if(!args[1]) return msg.reply(`Please add  catagory to deduct. Options are:\n**Bans**, **Kicks**, **Mutes**, **Warns**, **Automods**`)
                
        let dbinfo = db.get(`user_${member.id}`)
        if(!dbinfo) return msg.reply('User not in database added them').then(msg => msg.delete({timeout: 60000}));
        let bans1 = db.get(`user_${member.id}.bans`)
        let kicks1 = db.get(`user_${member.id}.kicks`)
        let mutes1 = db.get(`user_${member.id}.mutes`)
        let warns1 = db.get(`user_${member.id}.warns`)
        let automod1 = db.get(`user_${member.id}.automod`)

        if(args[1] === 'bans' || args[1] === 'ban') {
            db.subtract(`user_${member.id}.bans`, 1)
            let bans = db.get(`user_${member.id}.bans`)
            let kicks = db.get(`user_${member.id}.kicks`)
            let mutes = db.get(`user_${member.id}.mutes`)
            let warns = db.get(`user_${member.id}.warns`)
            let automod = db.get(`user_${member.id}.automod`)
        
            msg.channel.send(`<@${member.id}> now has:\nBans: ${bans} Kicks: ${kicks} Mutes: ${mutes} Warns: ${warns} AutoMod: ${automod}`).then(msg => msg.delete({timeout: 60000}));

        } else if(args[1] === 'kicks' || args[1] === 'kick') {
            db.subtract(`user_${member.id}.kicks`, 1)
            let bans = db.get(`user_${member.id}.bans`)
            let kicks = db.get(`user_${member.id}.kicks`)
            let mutes = db.get(`user_${member.id}.mutes`)
            let warns = db.get(`user_${member.id}.warns`)
            let automod = db.get(`user_${member.id}.automod`)
        
            msg.reply(`<@${member.id}> now has:\nBans: ${bans} Kicks: ${kicks} Mutes: ${mutes} Warns: ${warns} AutoMod: ${automod}`);
        } else if(args[1] === 'mutes' || args[1] === 'mute') {
            db.subtract(`user_${member.id}.mutes`, 1)
            let bans = db.get(`user_${member.id}.bans`)
            let kicks = db.get(`user_${member.id}.kicks`)
            let mutes = db.get(`user_${member.id}.mutes`)
            let warns = db.get(`user_${member.id}.warns`)
            let automod = db.get(`user_${member.id}.automod`)
        
            msg.channel.send(`<@${member.id}> now has:\nBans: ${bans} Kicks: ${kicks} Mutes: ${mutes} Warns: ${warns} AutoMod: ${automod}`).then(msg => msg.delete({timeout: 60000}));
        } else if(args[1] === 'warns' || args[1] === 'warn') {
            db.subtract(`user_${member.id}.warns`, 1)
            let bans = db.get(`user_${member.id}.bans`)
            let kicks = db.get(`user_${member.id}.kicks`)
            let mutes = db.get(`user_${member.id}.mutes`)
            let warns = db.get(`user_${member.id}.warns`)
            let automod = db.get(`user_${member.id}.automod`)
        
            msg.channel.send(`<@${member.id}> now has:\nBans: ${bans} Kicks: ${kicks} Mutes: ${mutes} Warns: ${warns} AutoMod: ${automod}`).then(msg => msg.delete({timeout: 60000}));
        } else if(args[1] === 'automods' || args[1] === 'automod') {
            db.subtract(`user_${member.id}.automod`, 1)
            let bans = db.get(`user_${member.id}.bans`)
            let kicks = db.get(`user_${member.id}.kicks`)
            let mutes = db.get(`user_${member.id}.mutes`)
            let warns = db.get(`user_${member.id}.warns`)
            let automod = db.get(`user_${member.id}.automod`)
        
            msg.channel.send(`<@${member.id}> now has:\nBans: ${bans} Kicks: ${kicks} Mutes: ${mutes} Warns: ${warns} AutoMod: ${automod}`).then(msg => msg.delete({timeout: 60000}));
        } else {
            msg.channel.send(`Please make sure you used any of these arguments:\n**Bans**, **Kicks**, **Mutes**, **Warns**, **Automods**`).then(msg => msg.delete({timeout: 60000}));
            return;
        }
    
        msg.channel.send(`<@${member.id}> before changing had:\nBans: ${bans1} Kicks: ${kicks1} Mutes: ${mutes1} Warns: ${warns1} AutoMod: ${automod1}`).then(msg => msg.delete({timeout: 60000}));




    }
}