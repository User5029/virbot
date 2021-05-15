module.exports = {
    name: 'pingroles',
    aliases: ['ping-roles', 'proles'],
    async execute(client, message, args, Discord) {
        message.delete()

        const channel = message.guild.channels.cache.find(c => c.name === '「🔔」roles')
        
        const announcements = message.guild.roles.cache.find(r => r.name === '📢announcement📢');
        const staffevents = message.guild.roles.cache.find(r => r.name === '🏆Staff events🏆');
        const giveaway = message.guild.roles.cache.find(r => r.name === '🥳 giveaway🥳');
        const newvids = message.guild.roles.cache.find(r => r.name === '🎥Video room🎥');
        const vote = message.guild.roles.cache.find(r => r.name === '✋Vote✋');
        const events = message.guild.roles.cache.find(r => r.name === '📅events📅');

        const one = '📢'
        const two = '🏆'
        const three = '🥳'
        const four = '🎥'
        const five = '✋'
        const six = '📅'


        const embed = new Discord.MessageEmbed()
        .setColor('008080')
        .setTitle('Notification Roles')
        .setDescription(`React with the roles below to get notified\n
        📢 - announcements\n
        🏆 - staff events\n
        🥳 - giveaways\n
        🎥 - new videos\n
        ✋ - server votes\n
        📅 - server events`)



        let msgsent = await channel.send(embed) 
        
        await msgsent.react(one)
        await msgsent.react(two)
        await msgsent.react(three)
        await msgsent.react(four)
        await msgsent.react(five)
        await msgsent.react(six)

    }
}