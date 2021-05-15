module.exports = async (Discord, client, oldmsg, newmsg) => {
    if(newmsg.author.bot) return;
    const channel = newmsg.guild.channels.cache.find(c => c.name === 'logs')

    if(newmsg === oldmsg) return;

    const embed = new Discord.MessageEmbed()
    .setTitle(`Message Updated by <@${newmsg.author.id}>`)
    .setDescription(`OLD: **${oldmsg.content}**\nNEW: **${newmsg.content}**`)
    .setTimestamp()

    channel.send(embed)
}