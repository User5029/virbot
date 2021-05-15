module.exports = async (Discord, client, msg) => {
    if(msg.author.bot) return;
    const channel = msg.guild.channels.cache.find(c => c.name === 'logs-deleted')

    if(msg.author.id === client.user.id) return;

    const embed = new Discord.MessageEmbed()
    .setTitle(`Message Deleted by <@${msg.author.id}>`)
    .setDescription(`MESSAGE: **${msg.content}**`)
    .setTimestamp()

    channel.send(embed)
}
