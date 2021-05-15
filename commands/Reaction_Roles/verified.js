module.exports = {
    name: 'verified',
    aliases: ['verify'],
    async execute(client, message, args, Discord) {
        message.delete()

        const channel = message.guild.channels.cache.find(c => c.name === '「✅」verify')
        
        const verified = message.guild.roles.cache.find(r => r.name === '✔️VERIFIED✔️');

        const Everified= '✅'


        const embed = new Discord.MessageEmbed()
        .setColor('008080')
        .setTitle('Verification')
        .setDescription(`React with the ${Everified} emoji for verified Role\n
        You will need to do this to see the whole server`)



        let msgsent = await channel.send(embed) 
        
        await msgsent.react(Everified)

    }
}