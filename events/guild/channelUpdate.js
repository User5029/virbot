module.exports = async (Discord, client, oldChannel, newChannel) => {
    let log_channel = oldChannel.guild.channels.cache.find(c => c.name === 'logs');
    if(!log_channel) return;

    if(oldChannel.name === newChannel.name) return;

    const embed = new Discord.MessageEmbed()
    .setColor('FF8C00')
    .setTitle("Channel Update")
    .setDescription(`The ${oldChannel.type} channel [**${oldChannel.name}**] has been updated to [**${newChannel.name}**].`)
    .setTimestamp()
    log_channel.send(embed)
}