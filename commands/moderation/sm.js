const Discord = require('discord.js');
module.exports = {
    name: 'sm',
    async execute (client, msg, args) {
        msg.delete()
        if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('Dont have the permission MANAGE_MESSAGES').then(msg => msg.delete({timeout: 600000}));
        if(!args[0]) return msg.reply('You need to specify a time for me to set slowmode to!').then(msg => msg.delete({timeout: 600000}));
        if(isNaN(args[0])) return msg.reply('You need to specify a valid time for me to set slowmode to!').then(msg => msg.delete({timeout: 600000}));
        var time = args[0]
        if(args[0] < 0) return msg.reply('You need to specify a positive number for me to set slowmode to!').then(msg => msg.delete({timeout: 600000}));
        if(args[0] > 21600) return msg.reply('You need to specify a time that is less than 6 hours (21,600 seconds)').then(msg => msg.delete({timeout: 600000}));
        msg.channel.setRateLimitPerUser(time)

        var embed = new Discord.MessageEmbed()
        .setColor('0x05ff4c')
        .setTitle(`I have successfuly set slowmode to \`${time}\` seconds!`);
        msg.channel.send(embed)

}}